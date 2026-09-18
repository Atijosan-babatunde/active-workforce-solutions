import type { Request, Response, NextFunction } from "express";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "../lib/adminJwt";

// Guards the dashboard's own endpoints (login-based session) — distinct
// from requireAdminKey in adminAuth.ts, which guards the bearer-key
// endpoints used by scripts/the internal enquiry-ingestion call.
export function requireAdminSession(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.adminId = payload.sub;
  next();
}
