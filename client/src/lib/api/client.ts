import axios from 'axios'
import { getToken } from './token'
import { toApiError } from './errors'

/**
 * Shared axios instance for the FUNDI API. The base URL is swappable via
 * `VITE_API_BASE_URL` (defaults to `/api/v1`, which the Vite dev server
 * proxies to the backend). All failures are normalized to `ApiError`.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
)
