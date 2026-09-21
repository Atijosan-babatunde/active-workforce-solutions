import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { getAdminId } from "@/lib/server/adminJwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const STATUSES = ["new", "contacted", "in_progress", "won", "lost"] as const;
const updateStatusSchema = z.object({ status: z.enum(STATUSES) });

export const PATCH = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
  if (!getAdminId()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const parsed = updateStatusSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  try {
    const enquiry = await prisma.enquiry.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ enquiry });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }
    throw err;
  }
});
