import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Must match the literal string in middleware.ts — that's where the
// cookie's mere presence is checked to gate /portal.
export const AUTH_COOKIE_NAME = "auth_token";

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET!;

export type JwtPayload = { sub: string; email: string };

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SEVEN_DAYS_SECONDS });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// Reads and verifies the auth cookie for the current request — usable from
// both Route Handlers and Server Components (both can call cookies() from
// next/headers). Returns null for a logged-out or invalid/expired session.
export function getAuthUserId(): string | null {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token)?.sub ?? null;
}

// Same-origin now that frontend and API live in one Next.js app, so there's
// no cross-domain SameSite=None/Secure dance to branch on — just the usual
// "https in production, http in local dev" rule.
export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SEVEN_DAYS_SECONDS,
  };
}
