import axios from 'axios'
import { toApiError } from './errors'

/**
 * Shared axios instance for the FUNDI API. The base URL is swappable via
 * `VITE_API_BASE_URL` (defaults to `/api/v1`, which the Vite dev server
 * proxies to the backend). Auth uses an HttpOnly cookie set by the server,
 * so requests must include credentials. All failures are normalized to
 * `ApiError`.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
)
