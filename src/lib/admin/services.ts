import { prisma } from "@/lib/prisma";

export async function getAllServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
}
