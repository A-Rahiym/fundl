import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

/**
 * Current signed-in user. Auth travels in the HttpOnly `fundi_token`
 * cookie, so this query is always enabled — a 401 simply means logged
 * out (`data` stays `undefined`). Callers distinguish loading vs logged
 * out via `isLoading`.
 */
export function useSession() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: async () => (await authApi.me()).data,
    staleTime: 5 * 60_000,
    retry: false,
  })
}
