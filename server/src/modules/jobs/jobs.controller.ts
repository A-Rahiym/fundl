import type { Request, Response } from "express";
import type { Prisma } from "@prisma/client";
import { ok, created, paginated } from "@/lib/apiResponse";
import { parsePaginationParams, buildPaginationMeta } from "@/lib/pagination";
import * as jobsService from "./jobs.service";
import type { ListJobsQuery } from "./jobs.schema";

export async function postJob(req: Request, res: Response) {
  const job = await jobsService.createJob(req.user!.id, req.body);
  return created(res, job);
}

export async function listJobs(req: Request, res: Response) {
  const { page, pageSize, skip, take } = parsePaginationParams(req.query);
  const query = req.query as unknown as ListJobsQuery;

  const where: Prisma.JobWhereInput = {};
  if (query.status) where.status = query.status;
  if (query.category) where.category = { key: query.category };
  if (query.location) where.locationText = { contains: query.location, mode: "insensitive" };
  if (query.budgetMax !== undefined) where.budgetMax = { lte: query.budgetMax };

  const [items, total] = await Promise.all([
    jobsService.findJobsByFilter(where, skip, take),
    jobsService.countJobsByFilter(where),
  ]);
  return paginated(res, items, buildPaginationMeta(page, pageSize, total));
}

export async function getJob(req: Request, res: Response) {
  const job = await jobsService.getJobDetail(req.params.id!, req.user!.id);
  return ok(res, job);
}

export async function updateJob(req: Request, res: Response) {
  const job = await jobsService.updateJob(req.params.id!, req.user!.id, req.body);
  return ok(res, job);
}

export async function completeJob(req: Request, res: Response) {
  const job = await jobsService.markJobComplete(req.params.id!, req.user!.id);
  return ok(res, job);
}

export async function myJobs(req: Request, res: Response) {
  const { page, pageSize, skip, take } = parsePaginationParams(req.query);
  const { items, total } = await jobsService.listMyJobs(req.user!.id, skip, take);
  return paginated(res, items, buildPaginationMeta(page, pageSize, total));
}
