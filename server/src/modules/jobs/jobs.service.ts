import { prisma } from "@/lib/prisma";
import { NotFoundError, ForbiddenError, ConflictError } from "@/lib/errors";
import { findJobsByFilter, countJobsByFilter, findJobById, findJobsByClient } from "./jobs.repository";
import type { CreateJobInput, UpdateJobInput } from "./jobs.schema";

export async function createJob(clientId: string, input: CreateJobInput) {
  const category = await prisma.category.findUnique({ where: { key: input.categoryKey } });
  if (!category) throw new NotFoundError("Category");

  return prisma.job.create({
    data: {
      clientId,
      title: input.title,
      description: input.description,
      categoryId: category.id,
      locationText: input.locationText,
      latitude: input.latitude,
      longitude: input.longitude,
      budgetMin: input.budgetMin,
      budgetMax: input.budgetMax,
      preferredDate: input.preferredDate,
      photoUrl: input.photoUrl,
    },
  });
}

export async function getJobDetail(jobId: string, requesterId: string) {
  const job = await findJobById(jobId);
  if (!job) throw new NotFoundError("Job");
  // Offers are only visible to the job owner
  if (job.clientId !== requesterId) {
    return { ...job, offers: [] };
  }
  return job;
}

export async function updateJob(jobId: string, requesterId: string, input: UpdateJobInput) {
  const job = await findJobById(jobId);
  if (!job) throw new NotFoundError("Job");
  if (job.clientId !== requesterId) throw new ForbiddenError("Only the job owner can update it");
  if (job.status !== "open") throw new ConflictError("Only open jobs can be updated");

  let categoryId: number | undefined;
  if (input.categoryKey) {
    const category = await prisma.category.findUnique({ where: { key: input.categoryKey } });
    if (!category) throw new NotFoundError("Category");
    categoryId = category.id;
  }

  return prisma.job.update({
    where: { id: jobId },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(categoryId !== undefined ? { categoryId } : {}),
      ...(input.locationText !== undefined ? { locationText: input.locationText } : {}),
      ...(input.latitude !== undefined ? { latitude: input.latitude } : {}),
      ...(input.longitude !== undefined ? { longitude: input.longitude } : {}),
      ...(input.budgetMin !== undefined ? { budgetMin: input.budgetMin } : {}),
      ...(input.budgetMax !== undefined ? { budgetMax: input.budgetMax } : {}),
      ...(input.preferredDate !== undefined ? { preferredDate: input.preferredDate } : {}),
      ...(input.photoUrl !== undefined ? { photoUrl: input.photoUrl } : {}),
    },
  });
}

export async function markJobComplete(jobId: string, clientId: string) {
  const job = await findJobById(jobId);
  if (!job) throw new NotFoundError("Job");
  if (job.clientId !== clientId) throw new ForbiddenError("Only the job owner can mark it complete");
  if (job.status !== "in_progress") throw new ConflictError("Only in-progress jobs can be completed");

  return prisma.job.update({ where: { id: jobId }, data: { status: "completed" } });
}

export async function listMyJobs(clientId: string, skip: number, take: number) {
  const [items, total] = await Promise.all([
    findJobsByClient(clientId, skip, take),
    countJobsByFilter({ clientId }),
  ]);
  return { items, total };
}

export { findJobsByFilter, countJobsByFilter };
