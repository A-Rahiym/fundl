import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { jobsApi, type PostJobInput } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

/** Creates a job, refreshes the feeds, then lands on the new job's detail. */
export function usePostJob() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: PostJobInput) => jobsApi.post(input),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.myJobs })
      navigate(`/jobs/${data.id}`, { replace: true })
    },
  })
}
