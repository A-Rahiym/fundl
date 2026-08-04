import { z } from "zod";

export const createOfferSchema = z.object({
  price: z.number().positive(),
  message: z.string().max(500).optional(),
});
export type CreateOfferInput = z.infer<typeof createOfferSchema>;
