import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import { updateLocaleSchema } from "@/modules/users/users.schema";
import * as usersController from "@/modules/users/users.controller";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, asyncHandler(usersController.getMe));
usersRouter.put("/me/locale", requireAuth, validate(updateLocaleSchema), asyncHandler(usersController.updateLocale));
