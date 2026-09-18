import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { env } from "./env";

// Deliberately a different cookie name from the client AUTH_COOKIE_NAME
// (see lib/jwt.ts) so an admin session and a client session can never be
// confused for one another, and so middleware.ts can gate /admin and
// /portal independently.
export const ADMIN_COOKIE_NAME = "admin_token";

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;

export type AdminJwtPayload = { sub: string; email: string; role: "admin" };

export function signAdminToken(payload: Omit<AdminJwtPayload, "role">): string {
  return jwt.sign({ ...payload, role: "admin" }, env.jwtSecret, { expiresIn: SEVEN_DAYS_SECONDS });
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AdminJwtPayload;
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export function adminCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? "none" : "lax",
    path: "/",
    maxAge: SEVEN_DAYS_SECONDS * 1000,
  };
}
