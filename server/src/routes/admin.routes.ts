import { Router } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { requireAdminKey } from "../middleware/adminAuth";
import { asyncHandler } from "../lib/asyncHandler";

export const adminRouter = Router();

adminRouter.use(requireAdminKey);

const STATUSES = ["submitted", "in_review", "in_progress", "completed"] as const;

const updateStatusSchema = z.object({
  status: z.enum(STATUSES),
});

adminRouter.patch("/requests/:id/status", asyncHandler(async (req, res) => {
  const parsed = updateStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid request" });
  }

  try {
    const request = await prisma.serviceRequest.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });
    res.json({ request });
  } catch (err) {
    // P2025 = Prisma's "record to update not found" — any other error is a
    // genuine failure and should surface as a 500, not a misleading 404.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return res.status(404).json({ error: "Request not found" });
    }
    throw err;
  }
}));
