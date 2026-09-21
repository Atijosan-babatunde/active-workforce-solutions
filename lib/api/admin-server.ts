import { prisma } from "@/lib/server/prisma";
import { getAdminId } from "@/lib/server/adminJwt";
import type { AdminUser } from "./admin";
import type { Enquiry, EnquiryStatus } from "./types";

// Server Component data access for the admin dashboard — direct Prisma
// calls, same reasoning as lib/api/server.ts. Client Components (the login
// form, the status-update button) go through lib/api/admin.ts's fetch
// wrapper instead.

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const adminId = getAdminId();
  if (!adminId) return null;
  const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
  return admin ? { id: admin.id, email: admin.email, name: admin.name } : null;
}

function toEnquiry(e: {
  id: string;
  enquiryType: string;
  division: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  description: string | null;
  sourcePage: string | null;
  details: unknown;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): Enquiry {
  return {
    ...e,
    details: e.details as Record<string, unknown> | null,
    status: e.status as EnquiryStatus,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}

export type EnquiryFilters = { status?: EnquiryStatus; division?: string; enquiryType?: string };

export async function getEnquiries(filters: EnquiryFilters = {}): Promise<{ enquiries: Enquiry[]; total: number }> {
  if (!getAdminId()) return { enquiries: [], total: 0 };

  const where = {
    ...(filters.status && { status: filters.status }),
    ...(filters.division && { division: filters.division }),
    ...(filters.enquiryType && { enquiryType: filters.enquiryType }),
  };
  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({ where, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.enquiry.count({ where }),
  ]);
  return { enquiries: enquiries.map(toEnquiry), total };
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  if (!getAdminId()) return null;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  return enquiry ? toEnquiry(enquiry) : null;
}
