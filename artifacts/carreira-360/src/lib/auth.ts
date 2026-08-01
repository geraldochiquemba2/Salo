const API_BASE = "";

export function getToken(): string | null {
  return localStorage.getItem("talentos_token");
}

export function setToken(token: string) {
  localStorage.setItem("talentos_token", token);
}

export function removeToken() {
  localStorage.removeItem("talentos_token");
}

export function getUser(): { id: number; email: string; name: string; role: string } | null {
  const raw = localStorage.getItem("talentos_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setUser(user: { id: number; email: string; name: string; role: string }) {
  localStorage.setItem("talentos_user", JSON.stringify(user));
}

export function removeUser() {
  localStorage.removeItem("talentos_user");
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
  
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers, signal: controller.signal });
    clearTimeout(timeout);
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { data = { error: text || "Erro de conexão com o servidor" }; }
    if (!res.ok) throw new Error(data.error || "Erro na requisição");
    return data;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") throw new Error("Servidor demorou a responder. Tenta novamente.");
    throw err;
  }
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  setUser(data.user);
  return data.user;
}

export async function register(email: string, password: string, name: string, role: string) {
  const data = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name, role }),
  });
  setToken(data.token);
  setUser(data.user);
  return data.user;
}

export function logout() {
  removeToken();
  removeUser();
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
