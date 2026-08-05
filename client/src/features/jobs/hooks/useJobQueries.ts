import { useQuery } from '@tanstack/react-query'
import { jobsApi, type ApiJob } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.job(id ?? ''),
    queryFn: async (): Promise<ApiJob> => (await jobsApi.byId(id!)).data,
    enabled: !!id,
  })
}
