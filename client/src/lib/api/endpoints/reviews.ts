import { http } from '../client'
import { unwrap } from '../errors'
import { buildQuery } from '@/lib/utils/buildQuery'
import type { ApiEnvelope, ApiResponse, ApiUser } from '../types'
import type { ApiJob } from './jobs'

export interface ApiReview {
  id: string
  jobId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string | null
  createdAt: string
  reviewer?: Pick<ApiUser, 'id' | 'name'>
  job?: Pick<ApiJob, 'id' | 'title'>
}

export interface CreateReviewInput {
  rating: number
  comment?: string
}

export const reviewsApi = {
  async create(jobId: string, input: CreateReviewInput): Promise<ApiResponse<ApiReview>> {
    const res = await http.post<ApiEnvelope<ApiReview>>(`/jobs/${jobId}/review`, input)
    return unwrap(res)
  },
  async forArtisan(artisanId: string, params?: { page?: number; pageSize?: number }): Promise<ApiResponse<ApiReview[]>> {
    const res = await http.get<ApiEnvelope<ApiReview[]>>(`/artisans/${artisanId}/reviews${buildQuery(params)}`)
    return unwrap(res)
  },
}
