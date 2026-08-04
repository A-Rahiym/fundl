import { z } from "zod";

const localeSchema = z.enum(["en", "ha", "yo", "ig", "pcm"]);

export const signupSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum(["client", "artisan", "both"]),
  locale: localeSchema.default("en"),
  phone: z.string().optional(),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;
