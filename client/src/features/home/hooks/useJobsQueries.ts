import { useQuery } from '@tanstack/react-query'
import { categoriesApi, jobsApi, type ApiCategory, type ApiJob, type JobStatus } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { FALLBACK_CATEGORIES } from '@/config/categories'

/**
 * Trade categories. Renders instantly from the static fallback and refreshes
 * from the API in the background (`initialDataUpdatedAt: 0` marks the
 * fallback as stale so the refetch always fires). If the request fails,
 * the fallback stays on screen instead of collapsing to empty.
 */
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async (): Promise<ApiCategory[]> => {
      const response = await categoriesApi.list()
      return response.data
    },
    initialData: FALLBACK_CATEGORIES,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
    retry: 1,
  })
}

export function useJobs(filters?: { status?: JobStatus; category?: string }, enabled = true) {
  return useQuery({
    queryKey: queryKeys.jobs(filters),
    queryFn: async (): Promise<ApiJob[]> => {
      const response = await jobsApi.list(filters)
      return response.data
    },
    enabled,
  })
}

/** Jobs the signed-in client has posted (`GET /jobs/mine`, client-only). */
export function useMyJobs() {
  return useQuery({
    queryKey: queryKeys.myJobs,
    queryFn: async (): Promise<ApiJob[]> => {
      const response = await jobsApi.mine()
      return response.data
    },
  })
}
