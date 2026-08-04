import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { requireRole } from "@/middleware/requireRole";
import { validate } from "@/middleware/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import {
  searchArtisansQuerySchema,
  updateArtisanProfileSchema,
  addPortfolioImageSchema,
} from "./artisans.schema";
import * as artisansController from "./artisans.controller";

export const artisansRouter = Router();

artisansRouter.get(
  "/",
  requireAuth,
  validate(searchArtisansQuerySchema, "query"),
  asyncHandler(artisansController.search),
);
artisansRouter.put(
  "/me",
  requireAuth,
  requireRole("artisan"),
  validate(updateArtisanProfileSchema),
  asyncHandler(artisansController.updateMe),
);


artisansRouter.post(
  "/me/portfolio",
  requireAuth,
  requireRole("artisan"),
  validate(addPortfolioImageSchema),
  asyncHandler(artisansController.addPortfolio),
);


artisansRouter.delete(
  "/me/portfolio/:imageId",
  requireAuth,
  requireRole("artisan"),
  asyncHandler(artisansController.removePortfolio),
);


artisansRouter.get("/:id/stamps", requireAuth, asyncHandler(artisansController.getStamps));
artisansRouter.get("/:id", requireAuth, asyncHandler(artisansController.getProfile));
