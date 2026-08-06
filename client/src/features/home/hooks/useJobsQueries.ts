import { useQuery } from '@tanstack/react-query'
import { categoriesApi, jobsApi, type ApiCategory, type ApiJob, type JobStatus } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async (): Promise<ApiCategory[]> => {
      const response = await categoriesApi.list()
      return response.data
    },
    staleTime: 5 * 60_000,
  })
}

export function useJobs(filters?: { status?: JobStatus; category?: string }) {
  return useQuery({
    queryKey: queryKeys.jobs(filters),
    queryFn: async (): Promise<ApiJob[]> => {
      const response = await jobsApi.list(filters)
      return response.data
    },
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
