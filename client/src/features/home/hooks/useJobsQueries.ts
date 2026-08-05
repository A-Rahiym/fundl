import { useQuery } from '@tanstack/react-query'
import { categoriesApi, jobsApi, type ApiCategory, type ApiJob, type JobStatus } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: async (): Promise<ApiCategory[]> => {
      const response = await categoriesApi.list()
      console.log('useCategories() response:', response) // Debugging log
      return response.data
    },
    staleTime: 5 * 60_000,
  })
}

export function useJobs(filters?: { status?: JobStatus; category?: string }) {
  return useQuery({
    queryKey: queryKeys.jobs(filters),
    queryFn: async (): Promise<ApiJob[]> =>{ console.log('useJobs() response:', (await jobsApi.list(filters)).data); return (await jobsApi.list(filters)).data},
  })
}
