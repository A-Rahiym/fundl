import { z } from "zod";

export const categoryKeySchema = z.object({
  key: z.string().min(1),
});
