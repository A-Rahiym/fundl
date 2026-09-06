import { prisma } from "../../lib/prisma";
import type { Prisma } from "@prisma/client";

const publicUserSelect = {
  id: true,
  name: true,
  phone: true,
  locationText: true,
} satisfies Prisma.UserSelect;

type JobWithCount = Prisma.JobGetPayload<{
  include: { category: true; _count: { select: { offers: true } } };
}>;

function toWire(job: JobWithCount) {
  const { _count, ...rest } = job;
  return { ...rest, offerCount: _count.offers };
}

export async function findJobsByFilter(where: Prisma.JobWhereInput, skip: number, take: number) {
  const jobs = await prisma.job.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { category: true, _count: { select: { offers: true } } },
  });
  return jobs.map(toWire);
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

export async function findJobsByClient(clientId: string, skip: number, take: number) {
  const jobs = await prisma.job.findMany({
    where: { clientId },
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { category: true, _count: { select: { offers: true } } },
  });
  return jobs.map(toWire);
}
