import { PrismaClient } from "@prisma/client";

// Constructing PrismaClient doesn't open a connection — that happens lazily
// on the first query — so this is safe to import even before DATABASE_URL
// points at a reachable database.
export const prisma = new PrismaClient();
