import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Deliberately a different cookie name from AUTH_COOKIE_NAME (lib/server/jwt.ts)
// so a client session and an admin session can never be confused for one
// another, and so middleware.ts can gate /admin and /portal independently.
// Must match the literal string in middleware.ts.
export const ADMIN_COOKIE_NAME = "admin_token";

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET!;

export type AdminJwtPayload = { sub: string; email: string; role: "admin" };

export function signAdminToken(payload: Omit<AdminJwtPayload, "role">): string {
  return jwt.sign({ ...payload, role: "admin" }, JWT_SECRET, { expiresIn: SEVEN_DAYS_SECONDS });
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export function getAdminId(): string | null {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token)?.sub ?? null;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SEVEN_DAYS_SECONDS,
  };
}
