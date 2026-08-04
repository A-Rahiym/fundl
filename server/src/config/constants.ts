import type { Locale } from "@prisma/client";

export const LOCALES: readonly Locale[] = ["en", "ha", "yo", "ig", "pcm"];

export const STAMP_KEYS = ["first_job", "on_a_roll", "five_star_streak"] as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  pageSize: 20,
  maxPageSize: 50,
} as const;
