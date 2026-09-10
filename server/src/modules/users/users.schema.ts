import { z } from "zod";
import { NIGERIAN_STATES } from "../../config/nigeria";

export const updateLocaleSchema = z.object({
  locale: z.enum(["en", "ha", "yo", "ig", "pcm"]),
});
export type UpdateLocaleInput = z.infer<typeof updateLocaleSchema>;

const KNOWN_STATES = NIGERIAN_STATES.map((s) => s.state);

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  phone: z.string().max(40).optional(),
  state: z.string().optional(),
  lga: z.string().max(100).optional(),
}).superRefine((input, ctx) => {
  if (input.state !== undefined && !KNOWN_STATES.includes(input.state)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["state"], message: "Unknown state" });
  }
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
