import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { requireRole } from "@/middleware/requireRole";
import { validate } from "@/middleware/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import { createOfferSchema } from "./offers.schema";
import * as offersController from "./offers.controller";

export const offersRouter = Router();

offersRouter.post(
  "/jobs/:jobId/offers",
  requireAuth,
  requireRole("artisan"),
  validate(createOfferSchema),
  asyncHandler(offersController.createOffer),
);


offersRouter.get("/jobs/:jobId/offers", requireAuth, asyncHandler(offersController.listJobOffers));
offersRouter.get("/offers/mine", requireAuth, requireRole("artisan"), asyncHandler(offersController.myOffers));
offersRouter.put("/offers/:id/accept", requireAuth, requireRole("client"), asyncHandler(offersController.accept));
offersRouter.put("/offers/:id/decline", requireAuth, requireRole("client"), asyncHandler(offersController.decline));
