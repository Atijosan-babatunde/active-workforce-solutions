import type { Request, Response, NextFunction } from "express";
import { AUTH_COOKIE_NAME, verifyToken } from "../lib/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.userId = payload.sub;
  next();
}
