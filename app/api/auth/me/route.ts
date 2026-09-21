import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUserId } from "@/lib/server/jwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

export const GET = withErrorHandling(async () => {
  const userId = getAuthUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  return NextResponse.json({ user: { id: user.id, email: user.email } });
});
