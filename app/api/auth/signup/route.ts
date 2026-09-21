import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/prisma";
import { hashPassword } from "@/lib/server/password";
import { signToken, authCookieOptions, AUTH_COOKIE_NAME } from "@/lib/server/jwt";
import { isRateLimited, rateLimitKeyFromRequest } from "@/lib/server/rateLimiter";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  if (isRateLimited(`signup:${rateLimitKeyFromRequest(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const parsed = credentialsSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  const token = signToken({ sub: user.id, email: user.email });
  const res = NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
  res.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions());
  return res;
});
