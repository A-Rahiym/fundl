import { AxiosError, type AxiosResponse } from 'axios'
import type { ApiEnvelope, ApiResponse } from './types'

/** Normalized API failure with a stable `code` + HTTP `status`. */
export class ApiError extends Error {
  code: string
  status: number

  constructor(code: string, message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

/** Converts any axios rejection into an ApiError (backend envelope or network). */
export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err

  if (err instanceof AxiosError) {
    const body = err.response?.data as ApiEnvelope | undefined
    if (body?.error) {
      return new ApiError(body.error.code, body.error.message, err.response?.status ?? 0)
    }
    if (err.response) {
      return new ApiError('HTTP_ERROR', 'api.errHttp', err.response.status)
    }
    return new ApiError('NETWORK_ERROR', 'api.errNetwork', 0)
  }

  return new ApiError('UNKNOWN_ERROR', 'api.errUnknown', 0)
}

/** Unwraps a success envelope → `{ data, meta }`; rejects on `success: false`. */
export function unwrap<T>(response: AxiosResponse<ApiEnvelope<T>>): ApiResponse<T> {
  const body = response.data
  if (!body?.success) {
    throw new ApiError(body?.error?.code ?? 'HTTP_ERROR', body?.error?.message ?? 'Request failed', response.status)
  }
  return { data: body.data as T, meta: body.meta }
}
