import type { Request, Response } from "express";
import { ok, paginated } from "@/lib/apiResponse";
import { parsePaginationParams, buildPaginationMeta } from "@/lib/pagination";
import * as artisansService from "./artisans.service";
import type { SearchArtisansQuery } from "./artisans.schema";

export async function search(req: Request, res: Response) {
  const { page, pageSize, skip, take } = parsePaginationParams(req.query);
  const { items, total } = await artisansService.searchArtisans(
    req.query as unknown as SearchArtisansQuery,
    skip,
    take,
  );
  return paginated(res, items, buildPaginationMeta(page, pageSize, total));
}

export async function getProfile(req: Request, res: Response) {
  const profile = await artisansService.getArtisanProfile(req.params.id!);
  return ok(res, profile);
}

export async function updateMe(req: Request, res: Response) {
  const profile = await artisansService.updateOwnProfile(req.user!.id, req.body);
  return ok(res, profile);
}

export async function addPortfolio(req: Request, res: Response) {
  const image = await artisansService.addPortfolioImage(req.user!.id, req.body);
  return ok(res, image, 201);
}

export async function removePortfolio(req: Request, res: Response) {
  const result = await artisansService.removePortfolioImage(req.user!.id, req.params.imageId!);
  return ok(res, result);
}

export async function getStamps(req: Request, res: Response) {
  const stamps = await artisansService.getArtisanStamps(req.params.id!);
  return ok(res, stamps);
}
