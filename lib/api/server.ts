import { cookies } from "next/headers";
import type { ApiUser } from "./client";
import type { ServiceRequest } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Server Components have no ambient browser cookie jar — the auth cookie
// has to be forwarded by hand from next/headers on every call here.
function authHeaders() {
  return { Cookie: cookies().toString() };
}

export async function getCurrentUser(): Promise<ApiUser | null> {
  const res = await fetch(`${API_URL}/auth/me`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) return null;
  const { user } = await res.json();
  return user;
}

export async function getMyServiceRequests(): Promise<ServiceRequest[]> {
  const res = await fetch(`${API_URL}/requests`, { headers: authHeaders(), cache: "no-store" });
  if (!res.ok) return [];
  const { requests } = await res.json();
  return requests;
}
