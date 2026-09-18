import { Router } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdminKey } from "../middleware/adminAuth";
import { requireAdminSession } from "../middleware/adminSessionAuth";
import { asyncHandler } from "../lib/asyncHandler";

export const enquiriesRouter = Router();

const STATUSES = ["new", "contacted", "in_progress", "won", "lost"] as const;

const createEnquirySchema = z.object({
  enquiryType: z.string().trim().min(1),
  division: z.string().trim().optional(),
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  organisation: z.string().trim().optional(),
  description: z.string().trim().optional(),
  sourcePage: z.string().trim().optional(),
  details: z
    .record(z.unknown())
    .refine((d) => JSON.stringify(d).length <= 10_000, "details is too large")
    .optional(),
});

// Internal ingestion — called server-to-server from the Next.js app's
// app/api/enquiry/route.ts on every form submission site-wide, authenticated
// with the same ADMIN_API_KEY bearer secret (a trusted-caller key, not a
// browser session). This is what makes the admin dashboard complete: every
// submission lands here regardless of whether the submitter also created a
// client account (which separately creates a ServiceRequest for /portal).
enquiriesRouter.post(
  "/",
  requireAdminKey,
  asyncHandler(async (req, res) => {
    const parsed = createEnquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
    }
    const enquiry = await prisma.enquiry.create({
      data: {
        ...parsed.data,
        details: parsed.data.details as Prisma.InputJsonValue | undefined,
      },
    });
    res.status(201).json({ enquiry });
  })
);

enquiriesRouter.use(requireAdminSession);

const listQuerySchema = z.object({
  status: z.enum(STATUSES).optional(),
  division: z.string().optional(),
  enquiryType: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

enquiriesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid query" });
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
    res.json({ enquiries, total });
  })
);

enquiriesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
    if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
    res.json({ enquiry });
  })
);

const updateStatusSchema = z.object({ status: z.enum(STATUSES) });

enquiriesRouter.patch(
  "/:id/status",
  asyncHandler(async (req, res) => {
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
    }
    try {
      const enquiry = await prisma.enquiry.update({
        where: { id: req.params.id },
        data: { status: parsed.data.status },
      });
      res.json({ enquiry });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      throw err;
    }
  })
);
