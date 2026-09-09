import type { Request, Response } from "express";
import { ok, created } from "../../lib/apiResponse";
import { parsePaginationParams } from "../../lib/pagination";
import * as reviewsService from "./reviews.service";

export async function createReview(req: Request, res: Response) {
  const review = await reviewsService.createReview(req.user!.id, req.params.jobId!, req.body);
  return created(res, review);
}

export async function listArtisanReviews(req: Request, res: Response) {
  const { skip, take } = parsePaginationParams(req.query);
  const reviews = await reviewsService.listArtisanReviews(req.params.artisanId!, skip, take);
  return ok(res, reviews);
}
