import { z } from "zod";

export const updateLocaleSchema = z.object({
  locale: z.enum(["en", "ha", "yo", "ig", "pcm"]),
});
export type UpdateLocaleInput = z.infer<typeof updateLocaleSchema>;
