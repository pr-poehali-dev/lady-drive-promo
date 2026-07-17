import funcUrls from "../../backend/func2url.json";

const BASE = funcUrls["admin-auth"];
const TOKEN_KEY = "ld_admin_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

interface ApiOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

export async function api<T = any>(
  query: string,
  { method = "GET", body, auth = true }: ApiOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["X-Auth-Token"] = token;
  }
  const res = await fetch(`${BASE}?${query}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    clearToken();
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    throw new Error((data as any)?.error || "Ошибка запроса");
  }
  return data as T;
}

export async function login(loginName: string, password: string) {
  const data = await api<{ token: string; admin: any }>(
    "resource=auth&action=login",
    { method: "POST", auth: false, body: { login: loginName, password } },
  );
  setToken(data.token);
  return data.admin;
}
