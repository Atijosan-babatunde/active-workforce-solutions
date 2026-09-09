import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "crypto";
import { env } from "../lib/env";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Length differing is itself minor/unavoidable leakage, but comparing
  // arbitrary-length secrets byte-for-byte is the part that matters here.
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token || !safeEqual(token, env.adminApiKey)) {
    return res.status(401).json({ error: "Not authorised" });
  }
  next();
}
