import { ApiError } from './errors'
import type { components } from './generated'

/* ------------------------------------------------------------------ */
/* Re-exported from the OpenAPI spec (see `pnpm generate:api`)        */
/* ------------------------------------------------------------------ */

export type Role = components['schemas']['Role']
export type LocaleCode = components['schemas']['Locale']
export type RateType = components['schemas']['RateType']
export type JobStatus = components['schemas']['JobStatus']
export type OfferStatus = components['schemas']['OfferStatus']
export type ApiCategory = components['schemas']['Category']
export type ApiUser = components['schemas']['User']
export type ApiMeta = components['schemas']['PaginationMeta']

/* ------------------------------------------------------------------ */
/* Client-side contract (not part of the backend's schema)            */
/* ------------------------------------------------------------------ */

/** Error shape the backend returns inside every envelope. */
export interface ApiEnvelope<T = unknown> {
  success: boolean
  data?: T
  meta?: ApiMeta
  error?: { code: string; message: string }
}

/** The client surface returned by every endpoint: unwrapped data + optional pagination meta. */
export interface ApiResponse<T> {
  data: T
  meta?: ApiMeta
}

export type { ApiError }
