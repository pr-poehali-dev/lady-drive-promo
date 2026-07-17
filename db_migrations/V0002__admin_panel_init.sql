CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  login VARCHAR(64) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(128),
  role VARCHAR(32) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seo_settings (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) UNIQUE NOT NULL DEFAULT '/',
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(512),
  canonical_url VARCHAR(512),
  favicon_url VARCHAR(512),
  robots_txt TEXT,
  sitemap_xml TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS redirects (
  id SERIAL PRIMARY KEY,
  source_path VARCHAR(512) UNIQUE NOT NULL,
  target_path VARCHAR(512) NOT NULL,
  status_code INTEGER DEFAULT 301,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  s3_key VARCHAR(512) UNIQUE NOT NULL,
  url VARCHAR(1024) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(128),
  size_bytes BIGINT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  tags TEXT,
  uploaded_by INTEGER,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_filename ON media(filename);
CREATE INDEX IF NOT EXISTS idx_media_tags ON media(tags);

CREATE TABLE IF NOT EXISTS content_blocks (
  id SERIAL PRIMARY KEY,
  block_key VARCHAR(128) UNIQUE NOT NULL,
  block_name VARCHAR(255) NOT NULL,
  section VARCHAR(64),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(64),
  source VARCHAR(128),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  status VARCHAR(64) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO admins (login, password_hash, name, role)
VALUES ('admin', 'CHANGE_ME_ON_FIRST_LOGIN', 'Главный администратор', 'superadmin')
ON CONFLICT (login) DO NOTHING;

INSERT INTO seo_settings (page_path, title, description, keywords, og_title, og_description, og_image, canonical_url, robots_txt, sitemap_xml)
VALUES (
  '/',
  'Леди Драйв — программа вождения для женщин в Симферополе',
  'Программа обучения вождению для женщин ЛЕДИ ДРАЙВ. Практика 72 ч. МКПП и 70 АКПП, женщины-инструкторы, KIA RIO, рассрочка. Симферополь.',
  'автошкола, обучение вождению, леди драйв, женская автошкола, симферополь, права для женщин',
  'Леди Драйв — программа вождения для женщин',
  'Получите права красиво: практика 72 ч. МКПП и 70 АКПП, женщины-инструкторы',
  'https://cdn.poehali.dev/files/59ce9226-c97d-4eda-abe7-791f0f1a4b37.jpg',
  'https://xn--80ahbyetb.xn--82-6kcadhwnl3cfdx.xn--p1ai/',
  E'User-agent: *\nAllow: /\nSitemap: https://xn--80ahbyetb.xn--82-6kcadhwnl3cfdx.xn--p1ai/sitemap.xml',
  E'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://xn--80ahbyetb.xn--82-6kcadhwnl3cfdx.xn--p1ai/</loc><priority>1.0</priority></url>\n</urlset>'
)
ON CONFLICT (page_path) DO NOTHING;

INSERT INTO content_blocks (block_key, block_name, section, content, sort_order) VALUES
('hero', 'Шапка / Hero', 'top', '{"title":"ЛЕДИ ДРАЙВ","subtitle":"ПРОГРАММА ВОЖДЕНИЯ ДЛЯ ЖЕНЩИН","cta_title":"Запишитесь на ЛЕДИ ДРАЙВ","cta_subtitle":"Оставьте заявку и мы свяжемся с вами в течение 15 минут","cta_button":"Получить права красиво","banner_url":"https://cdn.poehali.dev/files/59ce9226-c97d-4eda-abe7-791f0f1a4b37.jpg"}', 1),
('courses', 'Тариф / Курсы', 'middle', '{"title":"Всё включено. Без доплат.","subtitle":"Один тариф — полная свобода выбора коробки передач","price":"69 900 ₽ + ГСМ","hours":"Практика 72 ч. МКПП и 70 АКПП"}', 2),
('autopark', 'Автопарк', 'middle', '{"title":"Автопарк ЛЕДИ ДРАЙВ","subtitle":"Современные и безопасные автомобили для комфортного обучения","car":"KIA RIO"}', 3),
('instructors', 'Инструкторы', 'middle', '{"title":"Здесь не кричат. Здесь учат."}', 4),
('reasons', 'Почему мы', 'bottom', '{"title":"Почему выбирают ЛЕДИ ДРАЙВ"}', 5),
('footer', 'Подвал', 'bottom', '{"phone":"+7 (978) 000-00-00","address":"Симферополь"}', 7)
ON CONFLICT (block_key) DO NOTHING;