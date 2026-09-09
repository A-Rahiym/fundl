import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/requireRole";
import { validate } from "../../middleware/validate";
import { asyncHandler } from "../../lib/asyncHandler";
import { createReviewSchema } from "./reviews.schema";
import * as reviewsController from "./reviews.controller";

export const reviewsRouter = Router();

// Mounted at /api/v1 (same pattern as offersRouter): full paths below.
reviewsRouter.post(
  "/jobs/:jobId/review",
  requireAuth,
  requireRole("client"),
  validate(createReviewSchema),
  asyncHandler(reviewsController.createReview),
);

reviewsRouter.get(
  "/artisans/:artisanId/reviews",
  requireAuth,
  asyncHandler(reviewsController.listArtisanReviews),
);
