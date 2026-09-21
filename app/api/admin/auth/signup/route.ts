import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/prisma";
import { hashPassword } from "@/lib/server/password";
import { checkAdminKey } from "@/lib/server/adminKey";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
  name: z.string().trim().optional(),
});

// Gated by ADMIN_API_KEY, not open signup — this is how the first (and any
// later) staff account gets created: whoever holds the server's admin key
// runs this once, then the resulting login is a normal email+password.
export const POST = withErrorHandling(async (req: NextRequest) => {
  if (!checkAdminKey(req)) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

  const parsed = signupSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const { email, password, name } = parsed.data;

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An admin account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const admin = await prisma.adminUser.create({ data: { email, passwordHash, name } });
  return NextResponse.json({ admin: { id: admin.id, email: admin.email, name: admin.name } }, { status: 201 });
});
