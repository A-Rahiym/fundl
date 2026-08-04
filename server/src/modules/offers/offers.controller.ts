import type { Request, Response } from "express";
import { ok, created, paginated } from "@/lib/apiResponse";
import { parsePaginationParams, buildPaginationMeta } from "@/lib/pagination";
import * as offersService from "./offers.service";

export async function createOffer(req: Request, res: Response) {
  const offer = await offersService.createOffer(req.user!.id, req.params.jobId!, req.body);
  return created(res, offer);
}

export async function listJobOffers(req: Request, res: Response) {
  const offers = await offersService.listJobOffers(req.params.jobId!, req.user!.id);
  return ok(res, offers);
}

export async function accept(req: Request, res: Response) {
  const offer = await offersService.acceptOffer(req.params.id!, req.user!.id);
  return ok(res, offer);
}

export async function decline(req: Request, res: Response) {
  const offer = await offersService.declineOffer(req.params.id!, req.user!.id);
  return ok(res, offer);
}

export async function myOffers(req: Request, res: Response) {
  const { page, pageSize, skip, take } = parsePaginationParams(req.query);
  const { items, total } = await offersService.myOffers(req.user!.id, skip, take);
  return paginated(res, items, buildPaginationMeta(page, pageSize, total));
}
