import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { checkAdminKey } from "@/lib/server/adminKey";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const STATUSES = ["submitted", "in_review", "in_progress", "completed"] as const;
const updateStatusSchema = z.object({ status: z.enum(STATUSES) });

export const PATCH = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
  if (!checkAdminKey(req)) return NextResponse.json({ error: "Not authorised" }, { status: 401 });

  const parsed = updateStatusSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  try {
    const request = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ request });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    throw err;
  }
});
