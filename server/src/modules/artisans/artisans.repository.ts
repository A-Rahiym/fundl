import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  locale: true,
  locationText: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

const profileUserSelect = {
  ...publicUserSelect,
  reviewsReceived: {
    select: {
      id: true,
      jobId: true,
      rating: true,
      comment: true,
      createdAt: true,
      reviewer: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" as const },
  },
} satisfies Prisma.UserSelect;

export function findArtisanProfiles(where: Prisma.ArtisanProfileWhereInput, skip: number, take: number) {
  return prisma.artisanProfile.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: publicUserSelect },
      category: true,
    },
  });
}

export function countArtisanProfiles(where: Prisma.ArtisanProfileWhereInput) {
  return prisma.artisanProfile.count({ where });
}

export function findProfileByUserId(userId: string) {
  return prisma.artisanProfile.findUnique({
    where: { userId },
    include: {
      user: { select: profileUserSelect },
      category: true,
      portfolio: true,
      stamps: true,
    },
  });
}
