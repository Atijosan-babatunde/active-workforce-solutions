import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAdminId } from "@/lib/server/adminJwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

export const GET = withErrorHandling(async (_req: Request, { params }: { params: { id: string } }) => {
  if (!getAdminId()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const enquiry = await prisma.enquiry.findUnique({ where: { id: params.id } });
  if (!enquiry) return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });

  return NextResponse.json({ enquiry });
});
