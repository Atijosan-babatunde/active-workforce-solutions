import type { ServiceRequest, ServiceRequestSource } from "./types";

export type ApiUser = { id: string; email: string };

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// Relative paths — frontend and API are the same Next.js app now, so this
// is always same-origin (no CORS, no cross-domain cookie configuration).
async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
}

async function parseOrThrow<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, body.error ?? "Request failed");
  return body as T;
}

export async function signup(email: string, password: string): Promise<ApiUser> {
  const res = await apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify({ email, password }) });
  const { user } = await parseOrThrow<{ user: ApiUser }>(res);
  return user;
}

export async function login(email: string, password: string): Promise<ApiUser> {
  const res = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  const { user } = await parseOrThrow<{ user: ApiUser }>(res);
  return user;
}

export async function logout(): Promise<void> {
  await apiFetch("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<ApiUser | null> {
  const res = await apiFetch("/api/auth/me");
  if (!res.ok) return null;
  const { user } = await res.json();
  return user;
}

export async function createServiceRequest(payload: {
  division: string;
  source: ServiceRequestSource;
  description: string;
  details?: Record<string, unknown>;
}): Promise<ServiceRequest> {
  const res = await apiFetch("/api/requests", { method: "POST", body: JSON.stringify(payload) });
  const { request } = await parseOrThrow<{ request: ServiceRequest }>(res);
  return request;
}

export async function listServiceRequests(): Promise<ServiceRequest[]> {
  const res = await apiFetch("/api/requests");
  const { requests } = await parseOrThrow<{ requests: ServiceRequest[] }>(res);
  return requests;
}

export { ApiError };
