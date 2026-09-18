import { cookies } from "next/headers";
import type { AdminUser } from "./admin";
import type { Enquiry, EnquiryStatus } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Server Components have no ambient browser cookie jar — the admin_token
// cookie has to be forwarded by hand from next/headers on every call here,
// same pattern as lib/api/server.ts for client sessions.
function authHeaders() {
  return { Cookie: cookies().toString() };
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const res = await fetch(`${API_URL}/admin/auth/me`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) return null;
  const { admin } = await res.json();
  return admin;
}

export type EnquiryFilters = { status?: EnquiryStatus; division?: string; enquiryType?: string };

export async function getEnquiries(filters: EnquiryFilters = {}): Promise<{ enquiries: Enquiry[]; total: number }> {
  const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => !!v) as [string, string][]);
  const res = await fetch(`${API_URL}/enquiries?${params.toString()}`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) return { enquiries: [], total: 0 };
  return res.json();
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const res = await fetch(`${API_URL}/enquiries/${id}`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) return null;
  const { enquiry } = await res.json();
  return enquiry;
}
