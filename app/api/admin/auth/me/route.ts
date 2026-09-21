import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAdminId } from "@/lib/server/adminJwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

// Reads cookies, so it can never be prerendered at build time.
export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async () => {
  const adminId = getAdminId();
  if (!adminId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
  if (!admin) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  return NextResponse.json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
});
