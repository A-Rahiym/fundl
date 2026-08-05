import { useQuery } from '@tanstack/react-query'
import { authApi, getToken } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

/**
 * Current signed-in user. `data` is `undefined` while loading or when logged
 * out (the `/auth/me` call 401s without a token), so callers distinguish the
 * two via `isLoading`.
 */
export function useSession() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: async () => (await authApi.me()).data,
    staleTime: 5 * 60_000,
    retry: false,
    enabled: getToken() !== null,
  })
}
