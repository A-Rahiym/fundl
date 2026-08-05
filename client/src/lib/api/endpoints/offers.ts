import { http } from '../client'
import { unwrap } from '../errors'
import type { ApiEnvelope, ApiResponse } from '../types'
import type { components } from '../generated'

export type ApiOffer = components['schemas']['OfferDetail']

export type CreateOfferInput = components['schemas']['CreateOfferInput']

export const offersApi = {
  async create(jobId: string, input: CreateOfferInput): Promise<ApiResponse<ApiOffer>> {
    const res = await http.post<ApiEnvelope<ApiOffer>>(`/jobs/${jobId}/offers`, input)
    return unwrap(res)
  },
  async listForJob(jobId: string): Promise<ApiResponse<ApiOffer[]>> {
    const res = await http.get<ApiEnvelope<ApiOffer[]>>(`/jobs/${jobId}/offers`)
    return unwrap(res)
  },
  async mine(): Promise<ApiResponse<ApiOffer[]>> {
    const res = await http.get<ApiEnvelope<ApiOffer[]>>('/offers/mine')
    return unwrap(res)
  },
  async accept(offerId: string): Promise<ApiResponse<ApiOffer>> {
    const res = await http.put<ApiEnvelope<ApiOffer>>(`/offers/${offerId}/accept`)
    return unwrap(res)
  },
  async decline(offerId: string): Promise<ApiResponse<ApiOffer>> {
    const res = await http.put<ApiEnvelope<ApiOffer>>(`/offers/${offerId}/decline`)
    return unwrap(res)
  },
}
