import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi, clearToken, setToken, type ApiUser, type Role } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import type { LocaleCode } from '@/lib/i18n'

interface SignupInput {
  name: string
  email: string
  password: string
  role: Role
  locale?: LocaleCode
  phone?: string
}

/** Log in: store the JWT, seed the session cache, then navigate home. */
export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: { email: string; password: string }) => authApi.login(input),
    onSuccess: ({ data }) => {
      setToken(data.token)
      queryClient.setQueryData<ApiUser>(queryKeys.session, data.user)
      navigate('/', { replace: true })
    },
  })
}

/** Sign up: same shape as login — the backend returns a token on signup too. */
export function useSignup() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: SignupInput) => authApi.signup(input),
    onSuccess: ({ data }) => {
      setToken(data.token)
      queryClient.setQueryData<ApiUser>(queryKeys.session, data.user)
      navigate('/', { replace: true })
    },
  })
}

/** Sign out: drop the token and evict the session from the cache. */
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      clearToken()
      queryClient.setQueryData(queryKeys.session, null)
    },
    onSuccess: () => navigate('/login', { replace: true }),
  })
}
