import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../lib/password";
import { signAdminToken, adminCookieOptions, ADMIN_COOKIE_NAME } from "../lib/adminJwt";
import { requireAdminKey } from "../middleware/adminAuth";
import { requireAdminSession } from "../middleware/adminSessionAuth";
import { authRateLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../lib/asyncHandler";

export const adminAuthRouter = Router();

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
});

// Gated by ADMIN_API_KEY (the same shared secret used for the status-update
// endpoint) rather than being open signup — this is how the first (and any
// later) staff account gets created: whoever holds the server's admin key
// runs this once, then the resulting login is a normal email+password.
adminAuthRouter.post(
  "/signup",
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const parsed = credentialsSchema.extend({ name: z.string().trim().optional() }).safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
    }
    const { email, password, name } = parsed.data;

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "An admin account with this email already exists" });
    }

    const passwordHash = await hashPassword(password);
    const admin = await prisma.adminUser.create({ data: { email, passwordHash, name } });
    res.status(201).json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
  })
);

adminAuthRouter.post(
  "/login",
  authRateLimiter,
  asyncHandler(async (req, res) => {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
    }
    const { email, password } = parsed.data;

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    const genericError = () => res.status(401).json({ error: "Incorrect email or password" });
    if (!admin) return genericError();

    const valid = await comparePassword(password, admin.passwordHash);
    if (!valid) return genericError();

    const token = signAdminToken({ sub: admin.id, email: admin.email });
    res.cookie(ADMIN_COOKIE_NAME, token, adminCookieOptions());
    res.json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
  })
);

adminAuthRouter.post("/logout", (_req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, adminCookieOptions());
  res.status(204).end();
});

adminAuthRouter.get(
  "/me",
  requireAdminSession,
  asyncHandler(async (req, res) => {
    const admin = await prisma.adminUser.findUnique({ where: { id: req.adminId } });
    if (!admin) return res.status(401).json({ error: "Not authenticated" });
    res.json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
  })
);
