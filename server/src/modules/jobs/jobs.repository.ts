import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const publicUserSelect = {
  id: true,
  name: true,
  phone: true,
  locationText: true,
} satisfies Prisma.UserSelect;

export function findJobsByFilter(where: Prisma.JobWhereInput, skip: number, take: number) {
  return prisma.job.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export function countJobsByFilter(where: Prisma.JobWhereInput) {
  return prisma.job.count({ where });
}

export function findJobById(id: string) {
  return prisma.job.findUnique({
    where: { id },
    include: {
      category: true,
      offers: { include: { artisan: { select: publicUserSelect } }, orderBy: { createdAt: "asc" } },
    },
  });
}

export function findJobsByClient(clientId: string, skip: number, take: number) {
  return prisma.job.findMany({
    where: { clientId },
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}
