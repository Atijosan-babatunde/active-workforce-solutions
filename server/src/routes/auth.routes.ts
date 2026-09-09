import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../lib/password";
import { signToken, authCookieOptions, AUTH_COOKIE_NAME } from "../lib/jwt";
import { requireAuth } from "../middleware/auth";
import { authRateLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../lib/asyncHandler";

export const authRouter = Router();

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
});

authRouter.post("/signup", authRateLimiter, asyncHandler(async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  const token = signToken({ sub: user.id, email: user.email });
  res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions());
  res.status(201).json({ user: { id: user.id, email: user.email } });
}));

authRouter.post("/login", authRateLimiter, asyncHandler(async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  // Same generic error whether the account doesn't exist or the password is
  // wrong — avoids leaking which emails have accounts.
  const genericError = () => res.status(401).json({ error: "Incorrect email or password" });
  if (!user) return genericError();

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) return genericError();

  const token = signToken({ sub: user.id, email: user.email });
  res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions());
  res.json({ user: { id: user.id, email: user.email } });
}));

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions());
  res.status(204).end();
});

authRouter.get("/me", requireAuth, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ error: "Not authenticated" });
  res.json({ user: { id: user.id, email: user.email } });
}));
