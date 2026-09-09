import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { artisansApi, type AddPortfolioInput, type UpdateArtisanProfileInput } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

function useInvalidateArtisan() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.artisanMe })
    queryClient.invalidateQueries({ queryKey: ['artisans'] })
  }
}

/** Save the artisan's own profile (creates it on first save). */
export function useUpdateArtisanProfile() {
  const navigate = useNavigate()
  const invalidate = useInvalidateArtisan()

  return useMutation({
    mutationFn: (input: UpdateArtisanProfileInput) => artisansApi.updateMe(input),
    onSuccess: ({ data }) => {
      invalidate()
      if (data.id) navigate(`/app/artisans/${data.userId ?? data.id}`, { replace: true })
    },
  })
}

/** Add a portfolio image by URL to the artisan's own profile. */
export function useAddPortfolio() {
  const invalidate = useInvalidateArtisan()

  return useMutation({
    mutationFn: (input: AddPortfolioInput) => artisansApi.addPortfolio(input),
    onSuccess: () => {
      invalidate()
    },
  })
}

/** Remove a portfolio image from the artisan's own profile. */
export function useRemovePortfolio() {
  const invalidate = useInvalidateArtisan()

  return useMutation({
    mutationFn: (imageId: string) => artisansApi.removePortfolio(imageId),
    onSuccess: () => {
      invalidate()
    },
  })
}
