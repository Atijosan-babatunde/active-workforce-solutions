import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/server/prisma";
import { getAdminId } from "@/lib/server/adminJwt";
import { withErrorHandling } from "@/lib/server/withErrorHandling";

// Reads cookies, so it can never be prerendered at build time.
export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "in_progress", "won", "lost"] as const;

const listQuerySchema = z.object({
  status: z.enum(STATUSES).optional(),
  division: z.string().optional(),
  enquiryType: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const GET = withErrorHandling(async (req: NextRequest) => {
  if (!getAdminId()) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const parsed = listQuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid query" }, { status: 400 });
  }
  const { status, division, enquiryType, limit, offset } = parsed.data;
  const where = {
    ...(status && { status }),
    ...(division && { division }),
    ...(enquiryType && { enquiryType }),
  };

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({ where, orderBy: { createdAt: "desc" }, take: limit, skip: offset }),
    prisma.enquiry.count({ where }),
  ]);
  return NextResponse.json({ enquiries, total });
});
