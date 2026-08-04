import { z } from "zod";

export const searchArtisansQuerySchema = z.object({
  category: z.string().optional(),
  location: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxPrice: z.coerce.number().positive().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});
export type SearchArtisansQuery = z.infer<typeof searchArtisansQuerySchema>;

export const updateArtisanProfileSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  phone: z.string().optional(),
  locationText: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  bio: z.string().max(1000).optional(),
  categoryKey: z.string().optional(),
  rateType: z.enum(["hourly", "fixed", "negotiable"]).optional(),
  rateAmount: z.number().positive().optional(),
  isAvailable: z.boolean().optional(),
});
export type UpdateArtisanProfileInput = z.infer<typeof updateArtisanProfileSchema>;

export const addPortfolioImageSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().max(300).optional(),
});
export type AddPortfolioImageInput = z.infer<typeof addPortfolioImageSchema>;
