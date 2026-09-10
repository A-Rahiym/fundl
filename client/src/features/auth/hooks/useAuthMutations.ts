import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi, type ApiUser, type Role } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import type { LocaleCode } from '@/lib/i18n'

interface SignupInput {
  name: string
  email: string
  password: string
  role: Role
  locale?: LocaleCode
  phone?: string
  locationText?: string
  categoryKey?: string
}

/** Log in: the server sets the HttpOnly cookie; seed the session cache, then navigate home. */
export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: { email: string; password: string }) => authApi.login(input),
    onSuccess: ({ data }) => {
      queryClient.setQueryData<ApiUser>(queryKeys.session, data.user)
      navigate('/app', { replace: true })
    },
  })
}

/** Sign up: same shape as login — the backend sets the cookie on signup too. */
export function useSignup() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (input: SignupInput) => authApi.signup(input),
    onSuccess: ({ data }) => {
      queryClient.setQueryData<ApiUser>(queryKeys.session, data.user)
      navigate('/app', { replace: true })
    },
  })
}

/** Sign out: clear the server cookie and evict the session from the cache. */
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      queryClient.setQueryData(queryKeys.session, null)
      navigate('/login', { replace: true })
    },
  })
}
