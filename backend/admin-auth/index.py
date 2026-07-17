"""
Business: Единая backend-функция админ-панели лендинга (auth, content, seo, redirects, media, audit + публичные ручки).
Args: event - dict (httpMethod, headers, body, queryStringParameters); context - объект с request_id
Returns: HTTP response — JSON либо plain text/xml для robots/sitemap
"""
import json
import os
import hashlib
import hmac
import base64
import time
import uuid
import psycopg2
from psycopg2.extras import Json

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, X-Authorization',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}


def hash_password(password: str, salt: str = 'lady_drive_static_salt_v1') -> str:
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('ascii')


def b64url_decode(data: str) -> bytes:
    padded = data + '=' * (-len(data) % 4)
    return base64.urlsafe_b64decode(padded)


def make_jwt(payload, secret):
    header = {'alg': 'HS256', 'typ': 'JWT'}
    h = b64url(json.dumps(header, separators=(',', ':')).encode())
    p = b64url(json.dumps(payload, separators=(',', ':')).encode())
    signing = f'{h}.{p}'.encode()
    sig = hmac.new(secret.encode(), signing, hashlib.sha256).digest()
    return f'{h}.{p}.{b64url(sig)}'


def verify_jwt(token, secret):
    try:
        h, p, s = token.split('.')
        signing = f'{h}.{p}'.encode()
        expected = hmac.new(secret.encode(), signing, hashlib.sha256).digest()
        if not hmac.compare_digest(b64url(expected), s):
            return None
        payload = json.loads(b64url_decode(p))
        if payload.get('exp', 0) < int(time.time()):
            return None
        return payload
    except Exception:
        return None


def get_admin(event):
    secret = os.environ.get('ADMIN_JWT_SECRET', 'dev_secret')
    headers = event.get('headers', {}) or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    if not token:
        auth = headers.get('X-Authorization') or headers.get('x-authorization') or ''
        if auth.startswith('Bearer '):
            token = auth[7:]
    if not token:
        return None
    return verify_jwt(token, secret)


def s3_client():
    import boto3
    return boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )


def cdn_url(s3_key):
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{s3_key}"


def fetch_seo(cur):
    cur.execute("""SELECT page_path, title, description, keywords, og_title, og_description, og_image,
                          canonical_url, favicon_url, robots_txt, sitemap_xml, updated_at
                   FROM seo_settings WHERE page_path = '/'""")
    r = cur.fetchone()
    if not r:
        return {}
    return {'page_path': r[0], 'title': r[1], 'description': r[2], 'keywords': r[3],
            'og_title': r[4], 'og_description': r[5], 'og_image': r[6],
            'canonical_url': r[7], 'favicon_url': r[8],
            'robots_txt': r[9], 'sitemap_xml': r[10],
            'updated_at': r[11].isoformat() if r[11] else None}


def run_audit(seo, redirects_count):
    checks = []
    score = 0
    def add(name, ok, w, hint=''):
        nonlocal score
        if ok:
            score += w
        checks.append({'name': name, 'passed': bool(ok), 'weight': w, 'hint': hint})
    title = (seo.get('title') or '').strip()
    desc = (seo.get('description') or '').strip()
    add('Title заполнен', bool(title), 10, 'Заполните title')
    add('Title 30-65 символов', 30 <= len(title) <= 65, 5, f'Сейчас {len(title)} символов')
    add('Description заполнен', bool(desc), 10)
    add('Description 70-160 символов', 70 <= len(desc) <= 160, 5, f'Сейчас {len(desc)} символов')
    add('Keywords заполнены', bool((seo.get('keywords') or '').strip()), 5)
    add('OG-title', bool((seo.get('og_title') or '').strip()), 5)
    add('OG-description', bool((seo.get('og_description') or '').strip()), 5)
    add('OG-image', bool((seo.get('og_image') or '').strip()), 10)
    add('Canonical URL', bool((seo.get('canonical_url') or '').strip()), 5)
    add('Favicon', bool((seo.get('favicon_url') or '').strip()), 5)
    robots = (seo.get('robots_txt') or '')
    add('robots.txt настроен', bool(robots.strip()), 10)
    add('robots.txt содержит Sitemap', 'sitemap' in robots.lower(), 5)
    sitemap = (seo.get('sitemap_xml') or '')
    add('sitemap.xml содержит URL', bool(sitemap.strip()) and '<url>' in sitemap, 10)
    add('Редиректы настроены', redirects_count > 0, 5, 'Опционально')
    add('HTTPS canonical', (seo.get('canonical_url') or '').startswith('https://'), 5)
    return {'score': min(score, 100), 'max_score': 100, 'checks': checks}


def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')
    action = params.get('action', '')
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            body = {}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor() as cur:
            if resource == 'public':
                if action == 'seo':
                    seo = fetch_seo(cur)
                    cur.execute("SELECT source_path, target_path, status_code FROM redirects WHERE enabled = TRUE")
                    rr = [{'from': r[0], 'to': r[1], 'code': r[2]} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS,
                            'body': json.dumps({'seo': seo, 'redirects': rr})}
                if action == 'robots':
                    seo = fetch_seo(cur)
                    return {'statusCode': 200,
                            'headers': {'Content-Type': 'text/plain; charset=utf-8',
                                        'Access-Control-Allow-Origin': '*',
                                        'Cache-Control': 'public, max-age=300'},
                            'body': seo.get('robots_txt') or 'User-agent: *\nAllow: /\n'}
                if action == 'sitemap':
                    seo = fetch_seo(cur)
                    xml = seo.get('sitemap_xml') or '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
                    return {'statusCode': 200,
                            'headers': {'Content-Type': 'application/xml; charset=utf-8',
                                        'Access-Control-Allow-Origin': '*',
                                        'Cache-Control': 'public, max-age=300'},
                            'body': xml}
                if action == 'content':
                    cur.execute("SELECT block_key, block_name, section, content, sort_order FROM content_blocks ORDER BY sort_order, id")
                    rows = cur.fetchall()
                    blocks = [{'block_key': r[0], 'block_name': r[1], 'section': r[2],
                               'content': r[3], 'sort_order': r[4]} for r in rows]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'blocks': blocks})}
                if action == 'courses':
                    cur.execute("""SELECT title, hours, description, icon, badge, sort_order
                                   FROM courses WHERE enabled = TRUE ORDER BY sort_order, id""")
                    items = [{'title': r[0], 'hours': r[1], 'description': r[2],
                              'icon': r[3], 'badge': r[4], 'sort_order': r[5]} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'courses': items})}
                if action == 'lead' and method == 'POST':
                    name = (body.get('name') or '').strip()
                    phone = (body.get('phone') or '').strip()
                    if not phone:
                        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'phone required'})}
                    cur.execute("""INSERT INTO leads (name, phone, source, utm_source, utm_medium,
                                        utm_campaign, utm_content, utm_term)
                                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
                                (name, phone, body.get('source', 'landing'),
                                 body.get('utm_source'), body.get('utm_medium'), body.get('utm_campaign'),
                                 body.get('utm_content'), body.get('utm_term')))
                    lid = cur.fetchone()[0]
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True, 'id': lid})}
                return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown public action'})}

            if resource == 'auth' and action == 'login' and method == 'POST':
                login = (body.get('login') or '').strip()
                password = body.get('password') or ''
                if not login or not password:
                    return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'login/password required'})}
                cur.execute("SELECT id, login, password_hash, name, role FROM admins WHERE login = %s", (login,))
                row = cur.fetchone()
                if not row:
                    return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Invalid credentials'})}
                aid, alogin, pw_hash, name, role = row
                if pw_hash == 'CHANGE_ME_ON_FIRST_LOGIN':
                    cur.execute("UPDATE admins SET password_hash = %s, last_login_at = NOW() WHERE id = %s",
                                (hash_password(password), aid))
                    conn.commit()
                else:
                    if hash_password(password) != pw_hash:
                        return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Invalid credentials'})}
                    cur.execute("UPDATE admins SET last_login_at = NOW() WHERE id = %s", (aid,))
                    conn.commit()
                secret = os.environ.get('ADMIN_JWT_SECRET', 'dev_secret')
                payload = {'sub': aid, 'login': alogin, 'name': name, 'role': role,
                           'iat': int(time.time()), 'exp': int(time.time()) + 7 * 24 * 3600}
                token = make_jwt(payload, secret)
                return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({
                    'token': token,
                    'admin': {'id': aid, 'login': alogin, 'name': name, 'role': role}
                })}

            admin = get_admin(event)
            if not admin:
                return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

            if resource == 'auth':
                if action == 'me' and method == 'GET':
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'admin': admin})}
                if action == 'list' and method == 'GET':
                    cur.execute("SELECT id, login, name, role, created_at, last_login_at FROM admins ORDER BY id")
                    rr = [{'id': r[0], 'login': r[1], 'name': r[2], 'role': r[3],
                           'created_at': r[4].isoformat() if r[4] else None,
                           'last_login_at': r[5].isoformat() if r[5] else None} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'admins': rr})}
                if action == 'create' and method == 'POST':
                    if admin.get('role') != 'superadmin':
                        return {'statusCode': 403, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Forbidden'})}
                    login = (body.get('login') or '').strip()
                    password = body.get('password') or ''
                    name = body.get('name') or login
                    role = body.get('role') or 'admin'
                    if not login or not password:
                        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'login/password required'})}
                    cur.execute("INSERT INTO admins (login, password_hash, name, role) VALUES (%s, %s, %s, %s) RETURNING id",
                                (login, hash_password(password), name, role))
                    nid = cur.fetchone()[0]
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'id': nid})}
                if action == 'change_password' and method == 'POST':
                    new_pw = body.get('new_password') or ''
                    if len(new_pw) < 6:
                        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Password too short'})}
                    cur.execute("UPDATE admins SET password_hash = %s WHERE id = %s",
                                (hash_password(new_pw), admin['sub']))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'content':
                if method == 'GET':
                    cur.execute("SELECT id, block_key, block_name, section, content, sort_order, updated_at FROM content_blocks ORDER BY sort_order, id")
                    blocks = [{'id': r[0], 'block_key': r[1], 'block_name': r[2], 'section': r[3],
                               'content': r[4], 'sort_order': r[5],
                               'updated_at': r[6].isoformat() if r[6] else None} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'blocks': blocks})}
                if method == 'PUT':
                    bk = body.get('block_key')
                    content = body.get('content')
                    if not bk or content is None:
                        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'block_key and content required'})}
                    cur.execute("UPDATE content_blocks SET content = %s, updated_at = NOW() WHERE block_key = %s RETURNING id",
                                (Json(content), bk))
                    row = cur.fetchone()
                    if not row:
                        return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Block not found'})}
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'seo':
                if method == 'GET':
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'seo': fetch_seo(cur)})}
                if method == 'PUT':
                    fields = ['title', 'description', 'keywords', 'og_title', 'og_description',
                              'og_image', 'canonical_url', 'favicon_url', 'robots_txt', 'sitemap_xml']
                    vals = [body.get(f) for f in fields]
                    cur.execute("""UPDATE seo_settings SET
                            title=%s, description=%s, keywords=%s,
                            og_title=%s, og_description=%s, og_image=%s,
                            canonical_url=%s, favicon_url=%s,
                            robots_txt=%s, sitemap_xml=%s, updated_at=NOW()
                        WHERE page_path = '/'""", vals)
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'audit' and method == 'GET':
                seo = fetch_seo(cur)
                cur.execute("SELECT COUNT(*) FROM redirects WHERE enabled = TRUE")
                rcount = cur.fetchone()[0]
                return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps(run_audit(seo, rcount))}

            if resource == 'redirects':
                if method == 'GET':
                    cur.execute("SELECT id, source_path, target_path, status_code, enabled, created_at FROM redirects ORDER BY id")
                    items = [{'id': r[0], 'source_path': r[1], 'target_path': r[2],
                              'status_code': r[3], 'enabled': r[4],
                              'created_at': r[5].isoformat() if r[5] else None} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'redirects': items})}
                if method == 'POST' and action == 'create':
                    cur.execute("""INSERT INTO redirects (source_path, target_path, status_code, enabled)
                                   VALUES (%s, %s, %s, %s) RETURNING id""",
                                (body.get('source_path'), body.get('target_path'),
                                 body.get('status_code', 301), body.get('enabled', True)))
                    rid = cur.fetchone()[0]
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'id': rid})}
                if method == 'PUT':
                    cur.execute("""UPDATE redirects SET source_path=%s, target_path=%s, status_code=%s, enabled=%s WHERE id=%s""",
                                (body.get('source_path'), body.get('target_path'),
                                 body.get('status_code', 301), body.get('enabled', True), body.get('id')))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}
                if method == 'POST' and action == 'disable':
                    cur.execute("UPDATE redirects SET enabled = FALSE WHERE id = %s", (body.get('id'),))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'media':
                if method == 'GET':
                    q = (params.get('q') or '').strip()
                    if q:
                        pat = f'%{q}%'
                        cur.execute("""SELECT id, s3_key, url, filename, mime_type, size_bytes, width, height,
                                              alt_text, tags, uploaded_at FROM media
                                       WHERE (filename ILIKE %s OR alt_text ILIKE %s OR tags ILIKE %s)
                                         AND s3_key NOT LIKE 'deleted_%%'
                                       ORDER BY uploaded_at DESC LIMIT 500""", (pat, pat, pat))
                    else:
                        cur.execute("""SELECT id, s3_key, url, filename, mime_type, size_bytes, width, height,
                                              alt_text, tags, uploaded_at FROM media
                                       WHERE s3_key NOT LIKE 'deleted_%%'
                                       ORDER BY uploaded_at DESC LIMIT 500""")
                    items = [{'id': r[0], 's3_key': r[1], 'url': r[2], 'filename': r[3],
                              'mime_type': r[4], 'size_bytes': r[5], 'width': r[6], 'height': r[7],
                              'alt_text': r[8], 'tags': r[9],
                              'uploaded_at': r[10].isoformat() if r[10] else None} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'items': items})}

                if method == 'POST' and action == 'upload':
                    filename = body.get('filename', f'file_{uuid.uuid4().hex}')
                    mime_type = body.get('mime_type', 'application/octet-stream')
                    content_b64 = body.get('content_base64', '')
                    if not content_b64:
                        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'content_base64 required'})}
                    safe_name = ''.join(c if c.isalnum() or c in '._-' else '_' for c in filename)
                    key = f"media/{uuid.uuid4().hex}_{safe_name}"
                    data = base64.b64decode(content_b64)
                    s3 = s3_client()
                    s3.put_object(Bucket='files', Key=key, Body=data, ContentType=mime_type)
                    url = cdn_url(key)
                    cur.execute("""INSERT INTO media (s3_key, url, filename, mime_type, size_bytes, uploaded_by)
                                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                                (key, url, filename, mime_type, len(data), admin.get('sub')))
                    nid = cur.fetchone()[0]
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({
                        'id': nid, 'url': url, 's3_key': key, 'filename': filename
                    })}

                if method == 'PUT':
                    cur.execute("UPDATE media SET alt_text = %s, tags = %s WHERE id = %s",
                                (body.get('alt_text'), body.get('tags'), body.get('id')))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

                if method == 'POST' and action == 'remove':
                    mid = body.get('id')
                    cur.execute("SELECT s3_key FROM media WHERE id = %s", (mid,))
                    row = cur.fetchone()
                    if not row:
                        return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}
                    try:
                        s3 = s3_client()
                        s3.delete_object(Bucket='files', Key=row[0])
                    except Exception as e:
                        print(f'S3 delete failed: {e}')
                    cur.execute("UPDATE media SET s3_key = CONCAT('deleted_', s3_key), url = '' WHERE id = %s", (mid,))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'leads':
                if method == 'GET':
                    status = (params.get('status') or '').strip()
                    if status:
                        cur.execute("""SELECT id, name, phone, source, status, notes, created_at
                                       FROM leads WHERE status = %s ORDER BY created_at DESC LIMIT 500""", (status,))
                    else:
                        cur.execute("""SELECT id, name, phone, source, status, notes, created_at
                                       FROM leads ORDER BY created_at DESC LIMIT 500""")
                    items = [{'id': r[0], 'name': r[1], 'phone': r[2], 'source': r[3],
                              'status': r[4], 'notes': r[5],
                              'created_at': r[6].isoformat() if r[6] else None} for r in cur.fetchall()]
                    cur.execute("SELECT COUNT(*) FROM leads WHERE status = 'new'")
                    new_count = cur.fetchone()[0]
                    return {'statusCode': 200, 'headers': CORS_HEADERS,
                            'body': json.dumps({'leads': items, 'new_count': new_count})}
                if method == 'PUT':
                    cur.execute("UPDATE leads SET status = %s, notes = %s WHERE id = %s",
                                (body.get('status', 'new'), body.get('notes'), body.get('id')))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}
                if method == 'POST' and action == 'remove':
                    cur.execute("DELETE FROM leads WHERE id = %s", (body.get('id'),))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            if resource == 'courses':
                if method == 'GET':
                    cur.execute("""SELECT id, title, hours, description, icon, badge, sort_order, enabled, updated_at
                                   FROM courses ORDER BY sort_order, id""")
                    items = [{'id': r[0], 'title': r[1], 'hours': r[2], 'description': r[3],
                              'icon': r[4], 'badge': r[5], 'sort_order': r[6], 'enabled': r[7],
                              'updated_at': r[8].isoformat() if r[8] else None} for r in cur.fetchall()]
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'courses': items})}
                if method == 'POST' and action == 'create':
                    cur.execute("""INSERT INTO courses (title, hours, description, icon, badge, sort_order, enabled)
                                   VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id""",
                                (body.get('title'), body.get('hours'), body.get('description'),
                                 body.get('icon', 'BookOpen'), body.get('badge'),
                                 body.get('sort_order', 0), body.get('enabled', True)))
                    nid = cur.fetchone()[0]
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'id': nid})}
                if method == 'PUT':
                    cur.execute("""UPDATE courses SET title=%s, hours=%s, description=%s, icon=%s,
                                        badge=%s, sort_order=%s, enabled=%s, updated_at=NOW() WHERE id=%s""",
                                (body.get('title'), body.get('hours'), body.get('description'),
                                 body.get('icon', 'BookOpen'), body.get('badge'),
                                 body.get('sort_order', 0), body.get('enabled', True), body.get('id')))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}
                if method == 'POST' and action == 'remove':
                    cur.execute("DELETE FROM courses WHERE id = %s", (body.get('id'),))
                    conn.commit()
                    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown resource/action'})}
    finally:
        conn.close()