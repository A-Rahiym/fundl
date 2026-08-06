import { useQuery } from '@tanstack/react-query'
import { artisansApi, reviewsApi } from '@/lib/api'
import type { ApiArtisanProfile, ApiReview, ArtisanSearchParams } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useArtisans(params?: ArtisanSearchParams) {
  return useQuery({
    queryKey: queryKeys.artisans(params),
    queryFn: async (): Promise<ApiArtisanProfile[]> => {
      const response = await artisansApi.search(params)
      console.log('useArtisans response:', response) // Debugging line
      return response.data
    },
  })
}

export function useArtisan(id?: string) {
  return useQuery({
    queryKey: queryKeys.artisan(id ?? ''),
    enabled: !!id,
    queryFn: async (): Promise<ApiArtisanProfile> => {
      const response = await artisansApi.byId(id!)
      return response.data
    },
  })
}

/** The signed-in artisan's own profile (404s for clients / no profile). */
export function useArtisanMe() {
  return useQuery({
    queryKey: queryKeys.artisanMe,
    queryFn: async (): Promise<ApiArtisanProfile> => {
      const response = await artisansApi.me()
      return response.data
    },
    retry: false,
  })
}

export function useArtisanReviews(id?: string) {
  return useQuery({
    queryKey: queryKeys.artisanReviews(id ?? ''),
    enabled: !!id,
    queryFn: async (): Promise<ApiReview[]> => {
      const response = await reviewsApi.forArtisan(id!)
      return response.data
    },
  })
}
