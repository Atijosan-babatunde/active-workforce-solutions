import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";

export const requestsRouter = Router();

requestsRouter.use(requireAuth);

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

requestsRouter.post("/", asyncHandler(async (req, res) => {
  const parsed = createRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
  }

  const request = await prisma.serviceRequest.create({
    data: {
      ...parsed.data,
      details: parsed.data.details as Prisma.InputJsonValue | undefined,
      userId: req.userId!,
    },
  });
  res.status(201).json({ request });
}));

requestsRouter.get("/", asyncHandler(async (req, res) => {
  const requests = await prisma.serviceRequest.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" },
  });
  res.json({ requests });
}));
