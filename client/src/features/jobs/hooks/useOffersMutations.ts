import { useMutation, useQueryClient } from '@tanstack/react-query'
import { offersApi, type CreateOfferInput } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useCreateOffer(jobId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateOfferInput) => offersApi.create(jobId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.job(jobId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.myOffers })
    },
  })
}

export function useAcceptOffer(jobId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (offerId: string) => offersApi.accept(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.job(jobId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.myJobs })
    },
  })
}

export function useDeclineOffer(jobId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (offerId: string) => offersApi.decline(offerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.job(jobId) }),
  })
}
