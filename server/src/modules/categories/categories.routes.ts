import { Router } from "express";
import { asyncHandler } from "../../lib/asyncHandler";
import * as categoriesController from "./categories.controller";

export const categoriesRouter = Router();

categoriesRouter.get("/", asyncHandler(categoriesController.listCategories));
