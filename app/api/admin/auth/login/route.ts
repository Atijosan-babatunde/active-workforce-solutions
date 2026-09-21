import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/prisma";
import { comparePassword } from "@/lib/server/password";
import { signAdminToken, adminCookieOptions, ADMIN_COOKIE_NAME } from "@/lib/server/adminJwt";
import { isRateLimited, rateLimitKeyFromRequest } from "@/lib/server/rateLimiter";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string(),
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  if (isRateLimited(`admin-login:${rateLimitKeyFromRequest(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const parsed = credentialsSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  const genericError = () => NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  if (!admin) return genericError();

  const valid = await comparePassword(password, admin.passwordHash);
  if (!valid) return genericError();

  const token = signAdminToken({ sub: admin.id, email: admin.email });
  const res = NextResponse.json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
});
