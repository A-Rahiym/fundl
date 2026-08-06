import { useQuery } from '@tanstack/react-query'
import { offersApi, type ApiOffer } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useMyOffers() {
  return useQuery({
    queryKey: queryKeys.myOffers,
    queryFn: async (): Promise<ApiOffer[]> => {
      const response = await offersApi.mine()
      return response.data
    },
  })
}
