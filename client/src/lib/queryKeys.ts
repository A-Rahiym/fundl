/** Centralized TanStack Query key factory — one source of truth per cache domain. */

export const queryKeys = {
  session: ['session'] as const,
  categories: ['categories'] as const,
  artisans: (filters?: unknown) => ['artisans', filters] as const,
  artisan: (id: string) => ['artisan', id] as const,
  artisanMe: ['artisan', 'me'] as const,
  artisanStamps: (id: string) => ['artisan', id, 'stamps'] as const,
  artisanReviews: (id: string) => ['artisan', id, 'reviews'] as const,
  jobs: (filters?: Record<string, unknown>) => ['jobs', filters] as const,
  job: (id: string) => ['job', id] as const,
  myJobs: ['myJobs'] as const,
  myOffers: ['myOffers'] as const,
  jobOffers: (jobId: string) => ['job', jobId, 'offers'] as const,
  notifications: ['notifications'] as const,
}
