import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { requireRole } from "@/middleware/requireRole";
import { validate } from "@/middleware/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import { createJobSchema, updateJobSchema, listJobsQuerySchema } from "./jobs.schema";
import * as jobsController from "./jobs.controller";

export const jobsRouter = Router();

jobsRouter.get("/mine", requireAuth, requireRole("client"), asyncHandler(jobsController.myJobs));
jobsRouter.post("/", requireAuth, requireRole("client"), validate(createJobSchema), asyncHandler(jobsController.postJob));
jobsRouter.get("/", requireAuth, validate(listJobsQuerySchema, "query"), asyncHandler(jobsController.listJobs));
jobsRouter.get("/:id", requireAuth, asyncHandler(jobsController.getJob));
jobsRouter.put("/:id", requireAuth, requireRole("client"), validate(updateJobSchema), asyncHandler(jobsController.updateJob));
jobsRouter.put("/:id/complete", requireAuth, requireRole("client"), asyncHandler(jobsController.completeJob));
