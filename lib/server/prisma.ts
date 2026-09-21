import { PrismaClient } from "@prisma/client";

// Standard Next.js + Prisma singleton pattern: without this, every hot
// reload in dev would create a new PrismaClient (and a new DB connection
// pool) without discarding the old one, eventually exhausting Postgres's
// connection limit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
