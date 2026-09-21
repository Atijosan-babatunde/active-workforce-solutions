import type { Enquiry, EnquiryStatus } from "./types";
import { ApiError } from "./client";

export type AdminUser = { id: string; email: string; name: string | null };

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

export async function adminLogin(email: string, password: string): Promise<AdminUser> {
  const res = await apiFetch("/api/admin/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  const { admin } = await parseOrThrow<{ admin: AdminUser }>(res);
  return admin;
}

export async function adminLogout(): Promise<void> {
  await apiFetch("/api/admin/auth/logout", { method: "POST" });
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const res = await apiFetch("/api/admin/auth/me");
  if (!res.ok) return null;
  const { admin } = await res.json();
  return admin;
}

export type EnquiryFilters = { status?: EnquiryStatus; division?: string; enquiryType?: string };

export async function listEnquiries(filters: EnquiryFilters = {}): Promise<{ enquiries: Enquiry[]; total: number }> {
  const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => !!v) as [string, string][]);
  const res = await apiFetch(`/api/admin/enquiries?${params.toString()}`);
  return parseOrThrow(res);
}

export async function getEnquiry(id: string): Promise<Enquiry> {
  const res = await apiFetch(`/api/admin/enquiries/${id}`);
  const { enquiry } = await parseOrThrow<{ enquiry: Enquiry }>(res);
  return enquiry;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry> {
  const res = await apiFetch(`/api/admin/enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  const { enquiry } = await parseOrThrow<{ enquiry: Enquiry }>(res);
  return enquiry;
}
