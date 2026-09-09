import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../lib/asyncHandler";
import * as notificationsController from "./notifications.controller";

export const notificationsRouter = Router();

notificationsRouter.get("/", requireAuth, asyncHandler(notificationsController.listNotifications));
notificationsRouter.put("/:id/read", requireAuth, asyncHandler(notificationsController.markRead));
