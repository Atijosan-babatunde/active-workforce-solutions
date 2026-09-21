import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/prisma";
import { comparePassword } from "@/lib/server/password";
import { signToken, authCookieOptions, AUTH_COOKIE_NAME } from "@/lib/server/jwt";
import { isRateLimited, rateLimitKeyFromRequest } from "@/lib/server/rateLimiter";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string(),
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  if (isRateLimited(`login:${rateLimitKeyFromRequest(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const parsed = credentialsSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  // Same generic error whether the account doesn't exist or the password is
  // wrong — avoids leaking which emails have accounts.
  const genericError = () => NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  if (!user) return genericError();

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) return genericError();

  const token = signToken({ sub: user.id, email: user.email });
  const res = NextResponse.json({ user: { id: user.id, email: user.email } });
  res.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions());
  return res;
});
