import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { NotFoundError, ValidationError } from "@/lib/errors";
import {
  findArtisanProfiles,
  countArtisanProfiles,
  findProfileByUserId,
} from "./artisans.repository";
import type {
  SearchArtisansQuery,
  UpdateArtisanProfileInput,
  AddPortfolioImageInput,
} from "./artisans.schema";

function buildSearchWhere(query: SearchArtisansQuery): Prisma.ArtisanProfileWhereInput {
  const where: Prisma.ArtisanProfileWhereInput = {};
  if (query.category) where.category = { key: query.category };
  if (query.location) where.user = { locationText: { contains: query.location, mode: "insensitive" } };
  if (query.minRating !== undefined) where.avgRating = { gte: query.minRating };
  if (query.maxPrice !== undefined) where.rateAmount = { lte: query.maxPrice };
  return where;
}

export async function searchArtisans(query: SearchArtisansQuery, skip: number, take: number) {
  const where = buildSearchWhere(query);
  const [items, total] = await Promise.all([
    findArtisanProfiles(where, skip, take),
    countArtisanProfiles(where),
  ]);
  return { items, total };
}

export async function getArtisanProfile(artisanUserId: string) {
  const profile = await findProfileByUserId(artisanUserId);
  if (!profile) throw new NotFoundError("Artisan");
  return profile;
}

export async function updateOwnProfile(userId: string, input: UpdateArtisanProfileInput) {
  const existing = await findProfileByUserId(userId);
  if (!existing && !input.categoryKey) {
    throw new ValidationError("categoryKey is required to create a profile");
  }

  let categoryId = existing?.categoryId;
  if (input.categoryKey) {
    const category = await prisma.category.findUnique({ where: { key: input.categoryKey } });
    if (!category) throw new NotFoundError("Category");
    categoryId = category.id;
  }

  if (input.name || input.phone || input.locationText || input.latitude !== undefined || input.longitude !== undefined) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(input.name ? { name: input.name } : {}),
        ...(input.phone !== undefined ? { phone: input.phone } : {}),
        ...(input.locationText !== undefined ? { locationText: input.locationText } : {}),
        ...(input.latitude !== undefined ? { latitude: input.latitude } : {}),
        ...(input.longitude !== undefined ? { longitude: input.longitude } : {}),
      },
    });
  }

  return prisma.artisanProfile.upsert({
    where: { userId },
    update: {
      ...(input.bio !== undefined ? { bio: input.bio } : {}),
      ...(input.rateType ? { rateType: input.rateType } : {}),
      ...(input.rateAmount !== undefined ? { rateAmount: input.rateAmount } : {}),
      ...(input.isAvailable !== undefined ? { isAvailable: input.isAvailable } : {}),
      ...(categoryId !== undefined ? { categoryId } : {}),
    },
    create: {
      userId,
      categoryId: categoryId!,
      bio: input.bio,
      rateType: input.rateType ?? "negotiable",
      rateAmount: input.rateAmount,
      isAvailable: input.isAvailable ?? true,
    },
  });
}

export async function addPortfolioImage(userId: string, input: AddPortfolioImageInput) {
  const profile = await findProfileByUserId(userId);
  if (!profile) throw new NotFoundError("Artisan profile");
  return prisma.portfolioImage.create({
    data: {
      artisanProfileId: profile.id,
      imageUrl: input.imageUrl,
      caption: input.caption,
    },
  });
}

export async function removePortfolioImage(userId: string, imageId: string) {
  const profile = await findProfileByUserId(userId);
  if (!profile) throw new NotFoundError("Artisan profile");

  const image = await prisma.portfolioImage.findFirst({
    where: { id: imageId, artisanProfileId: profile.id },
  });
  if (!image) throw new NotFoundError("Portfolio image");

  await prisma.portfolioImage.delete({ where: { id: imageId } });
  return { id: imageId };
}

export async function getArtisanStamps(artisanUserId: string) {
  const profile = await findProfileByUserId(artisanUserId);
  if (!profile) throw new NotFoundError("Artisan");

  const stamps = await prisma.artisanStamp.findMany({
    where: { artisanProfileId: profile.id },
    orderBy: { earnedAt: "asc" },
  });
  return stamps.map((stamp) => stamp.stampKey);
}
