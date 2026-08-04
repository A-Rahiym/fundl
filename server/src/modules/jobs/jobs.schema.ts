import { z } from "zod";

const jobStatusSchema = z.enum(["open", "in_progress", "completed", "cancelled"]);

export const createJobSchema = z.object({
  title: z.string().min(5).max(160),
  description: z.string().min(10),
  categoryKey: z.string().min(1),
  locationText: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  budgetMin: z.number().positive().optional(),
  budgetMax: z.number().positive().optional(),
  preferredDate: z.coerce.date().optional(),
  photoUrl: z.string().url().optional(),
});
export type CreateJobInput = z.infer<typeof createJobSchema>;

export const updateJobSchema = createJobSchema.partial();
export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export const listJobsQuerySchema = z.object({
  category: z.string().optional(),
  location: z.string().optional(),
  status: jobStatusSchema.optional(),
  budgetMax: z.coerce.number().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});
export type ListJobsQuery = z.infer<typeof listJobsQuerySchema>;
