import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { env } from "./env";

export const AUTH_COOKIE_NAME = "auth_token"; // must match middleware.ts in the Next.js app

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;

export type JwtPayload = { sub: string; email: string };

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: SEVEN_DAYS_SECONDS });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
}

// SameSite=None (required for the cookie to survive a cross-domain request
// in production) is only accepted by browsers alongside Secure — which
// plain-HTTP localhost dev can't satisfy. Branch on NODE_ENV rather than
// inferring per-request, so behaviour is deterministic in both environments.
export function authCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? "none" : "lax",
    path: "/",
    maxAge: SEVEN_DAYS_SECONDS * 1000,
  };
}
