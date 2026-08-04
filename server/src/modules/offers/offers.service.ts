import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NotFoundError, ForbiddenError, ConflictError } from "@/lib/errors";
import type { CreateOfferInput } from "./offers.schema";

const publicUserSelect = {
  id: true,
  name: true,
  phone: true,
  locationText: true,
} satisfies Prisma.UserSelect;

export async function createOffer(artisanId: string, jobId: string, input: CreateOfferInput) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new NotFoundError("Job");
  if (job.clientId === artisanId) throw new ForbiddenError("You cannot offer on your own job");
  if (job.status !== "open") throw new ConflictError("This job is no longer open for offers");

  try {
    return await prisma.offer.create({
      data: { jobId, artisanId, price: input.price, message: input.message },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new ConflictError("You already have an offer on this job");
    }
    throw err;
  }
}

export async function listJobOffers(jobId: string, requesterId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { clientId: true } });
  if (!job) throw new NotFoundError("Job");
  if (job.clientId !== requesterId) throw new ForbiddenError("Only the job owner can view offers");

  return prisma.offer.findMany({
    where: { jobId },
    include: { artisan: { select: publicUserSelect } },
    orderBy: { createdAt: "asc" },
  });
}

export async function acceptOffer(offerId: string, clientId: string) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { job: true } });
  if (!offer) throw new NotFoundError("Offer");
  if (offer.job.clientId !== clientId) throw new ForbiddenError("Only the job owner can accept offers");
  if (offer.job.status !== "open") throw new ConflictError("This job is no longer accepting offers");
  if (offer.status !== "pending") throw new ConflictError("This offer is no longer pending");

  await prisma.$transaction([
    prisma.offer.updateMany({ where: { jobId: offer.jobId, status: "pending" }, data: { status: "declined" } }),
    prisma.offer.update({ where: { id: offerId }, data: { status: "accepted" } }),
    prisma.job.update({ where: { id: offer.jobId }, data: { status: "in_progress", acceptedOfferId: offerId } }),
  ]);

  return prisma.offer.findUnique({ where: { id: offerId } });
}

export async function declineOffer(offerId: string, clientId: string) {
  const offer = await prisma.offer.findUnique({ where: { id: offerId }, include: { job: true } });
  if (!offer) throw new NotFoundError("Offer");
  if (offer.job.clientId !== clientId) throw new ForbiddenError("Only the job owner can decline offers");
  if (offer.status !== "pending") throw new ConflictError("This offer is no longer pending");

  return prisma.offer.update({ where: { id: offerId }, data: { status: "declined" } });
}

export async function myOffers(artisanId: string, skip: number, take: number) {
  const [items, total] = await Promise.all([
    prisma.offer.findMany({
      where: { artisanId },
      skip,
      take,
      include: { job: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.offer.count({ where: { artisanId } }),
  ]);
  return { items, total };
}
