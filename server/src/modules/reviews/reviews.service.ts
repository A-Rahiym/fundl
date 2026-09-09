import { prisma } from "../../lib/prisma";
import {
  NotFoundError,
  ForbiddenError,
  ConflictError,
  ValidationError,
} from "../../lib/errors";
import type { CreateReviewInput } from "./reviews.schema";

const reviewerSelect = { id: true, name: true } as const;
const jobSelect = { id: true, title: true } as const;

const reviewInclude = {
  reviewer: { select: reviewerSelect },
  job: { select: jobSelect },
} as const;

export async function createReview(clientId: string, jobId: string, input: CreateReviewInput) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job");
  if (job.clientId !== clientId) throw new ForbiddenError("Only the job owner can review it");
  if (job.status !== "completed")
    throw new ConflictError("Only completed jobs can be reviewed");
  if (!job.acceptedOfferId)
    throw new ValidationError("Job has no accepted offer to review");

  const existing = await prisma.review.findUnique({ where: { jobId } });
  if (existing) throw new ConflictError("This job has already been reviewed");

  const acceptedOffer = await prisma.offer.findUnique({
    where: { id: job.acceptedOfferId },
  });
  if (!acceptedOffer) throw new NotFoundError("Accepted offer");

  const review = await prisma.review.create({
    data: {
      jobId,
      reviewerId: clientId,
      revieweeId: acceptedOffer.artisanId,
      rating: input.rating,
      comment: input.comment,
    },
    include: reviewInclude,
  });

  await refreshArtisanRating(acceptedOffer.artisanId);
  return review;
}

async function refreshArtisanRating(artisanId: string) {
  const agg = await prisma.review.aggregate({
    where: { revieweeId: artisanId },
    _avg: { rating: true },
    _count: true,
  });
  // updateMany (not update) so a missing profile row can't fail the review.
  await prisma.artisanProfile.updateMany({
    where: { userId: artisanId },
    data: {
      avgRating: Number((agg._avg.rating ?? 0).toFixed(2)),
      reviewCount: agg._count,
    },
  });
}

/** Resolve a profile by user id first, then by profile id (old links). */
async function resolveArtisanUserId(idOrUserId: string): Promise<string> {
  const byUser = await prisma.artisanProfile.findUnique({
    where: { userId: idOrUserId },
    select: { userId: true },
  });
  if (byUser) return byUser.userId;
  const byProfile = await prisma.artisanProfile.findUnique({
    where: { id: idOrUserId },
    select: { userId: true },
  });
  if (!byProfile) throw new NotFoundError("Artisan");
  return byProfile.userId;
}

export async function listArtisanReviews(
  artisanIdOrProfileId: string,
  skip: number,
  take: number,
) {
  const revieweeId = await resolveArtisanUserId(artisanIdOrProfileId);
  return prisma.review.findMany({
    where: { revieweeId },
    include: reviewInclude,
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}
