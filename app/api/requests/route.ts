import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { getAuthUserId } from "@/lib/server/jwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

const SOURCES = ["contact-wizard", "employer-recruitment", "perm-temp-recruitment"] as const;

const createRequestSchema = z.object({
  division: z.string().trim().min(1),
  source: z.enum(SOURCES),
  description: z.string().trim().min(1),
  // Capped to keep the jsonb column bounded — a client can only submit as
  // much structured detail as a form actually collects, never arbitrary blobs.
  details: z
    .record(z.unknown())
    .refine((d) => JSON.stringify(d).length <= 10_000, "details is too large")
    .optional(),
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const userId = getAuthUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const parsed = createRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const request = await prisma.serviceRequest.create({
    data: {
      ...parsed.data,
      details: parsed.data.details as Prisma.InputJsonValue | undefined,
      userId,
    },
  });
  return NextResponse.json({ request }, { status: 201 });
});

export const GET = withErrorHandling(async () => {
  const userId = getAuthUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const requests = await prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ requests });
});
