// lib/prisma.ts
import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: logs all DB queries in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;