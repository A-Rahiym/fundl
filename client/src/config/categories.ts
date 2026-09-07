import type { ApiCategory } from '@/lib/api'

/**
 * Static trade fallback so category pickers render instantly and survive
 * API failures (cold starts, offline). Mirrors `server/prisma/seed.ts` —
 * the server seed is the source of truth, keep this in sync with it.
 *
 * Ids follow seed insertion order so tile colors match live data.
 * Used as TanStack Query `initialData`; the background refetch replaces
 * these with live rows whenever the API is reachable.
 */
export const FALLBACK_CATEGORIES: ApiCategory[] = [
  { id: 1, key: 'carpentry', icon: 'hammer', sortOrder: 1 },
  { id: 2, key: 'plumbing', icon: 'wrench', sortOrder: 2 },
  { id: 3, key: 'electrical', icon: 'bolt', sortOrder: 3 },
  { id: 4, key: 'tailoring', icon: 'needle', sortOrder: 4 },
  { id: 5, key: 'painting', icon: 'roller', sortOrder: 5 },
  { id: 6, key: 'masonry', icon: 'trowel', sortOrder: 6 },
]
