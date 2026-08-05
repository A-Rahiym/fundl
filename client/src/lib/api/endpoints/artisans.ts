import { http } from '../client'
import { unwrap } from '../errors'
import { buildQuery } from '@/lib/utils/buildQuery'
import type { ApiEnvelope, ApiResponse } from '../types'
import type { components } from '../generated'

export type ApiPortfolioImage = components['schemas']['PortfolioImage']

export interface ApiStamp {
  id: string
  artisanProfileId: string
  stampKey: string
  earnedAt: string
}

export type ApiArtisanProfile = components['schemas']['ArtisanProfileDetail']

export interface ArtisanSearchParams {
  category?: string
  location?: string
  minRating?: number
  maxPrice?: number
  page?: number
  pageSize?: number
}

export type UpdateArtisanProfileInput = components['schemas']['UpdateArtisanProfileInput']

export type AddPortfolioInput = components['schemas']['AddPortfolioImageInput']

export const artisansApi = {
  async search(params?: ArtisanSearchParams): Promise<ApiResponse<ApiArtisanProfile[]>> {
    const res = await http.get<ApiEnvelope<ApiArtisanProfile[]>>(`/artisans${buildQuery(params)}`)
    return unwrap(res)
  },
  async byId(id: string): Promise<ApiResponse<ApiArtisanProfile>> {
    const res = await http.get<ApiEnvelope<ApiArtisanProfile>>(`/artisans/${id}`)
    return unwrap(res)
  },
  async me(): Promise<ApiResponse<ApiArtisanProfile>> {
    const res = await http.get<ApiEnvelope<ApiArtisanProfile>>('/artisans/me')
    return unwrap(res)
  },
  async updateMe(input: UpdateArtisanProfileInput): Promise<ApiResponse<ApiArtisanProfile>> {
    const res = await http.put<ApiEnvelope<ApiArtisanProfile>>('/artisans/me', input)
    return unwrap(res)
  },
  async addPortfolio(input: AddPortfolioInput): Promise<ApiResponse<ApiPortfolioImage>> {
    const res = await http.post<ApiEnvelope<ApiPortfolioImage>>('/artisans/me/portfolio', input)
    return unwrap(res)
  },
  async removePortfolio(imageId: string): Promise<ApiResponse<{ id: string }>> {
    const res = await http.delete<ApiEnvelope<{ id: string }>>(`/artisans/me/portfolio/${imageId}`)
    return unwrap(res)
  },
  async stamps(id: string): Promise<ApiResponse<string[]>> {
    const res = await http.get<ApiEnvelope<string[]>>(`/artisans/${id}/stamps`)
    return unwrap(res)
  },
}
