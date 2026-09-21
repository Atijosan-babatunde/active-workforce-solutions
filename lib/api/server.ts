import { prisma } from "@/lib/server/prisma";
import { getAuthUserId } from "@/lib/server/jwt";
import type { ApiUser } from "./client";
import type { ServiceRequest } from "./types";

// Server Component data access — talks to Prisma directly rather than
// making an HTTP call to this same app's own API routes (a self-fetch is
// both slower and, for Server Components specifically, an anti-pattern in
// Next.js). Client Components still go through lib/api/client.ts's fetch
// wrapper, since they have no direct database access.

export async function getCurrentUser(): Promise<ApiUser | null> {
  const userId = getAuthUserId();
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? { id: user.id, email: user.email } : null;
}

export async function getMyServiceRequests(): Promise<ServiceRequest[]> {
  const userId = getAuthUserId();
  if (!userId) return [];
  const requests = await prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return requests.map((r) => ({
    id: r.id,
    division: r.division,
    source: r.source as ServiceRequest["source"],
    description: r.description,
    details: r.details as Record<string, unknown> | null,
    status: r.status as ServiceRequest["status"],
    createdAt: r.createdAt.toISOString(),
  }));
}
