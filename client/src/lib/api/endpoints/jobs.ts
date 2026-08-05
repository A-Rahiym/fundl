import { http } from '../client'
import { unwrap } from '../errors'
import { buildQuery } from '@/lib/utils/buildQuery'
import type { ApiEnvelope, ApiResponse, JobStatus } from '../types'
import type { components } from '../generated'

export type ApiJob = components['schemas']['JobDetail']

export type PostJobInput = components['schemas']['CreateJobInput']

export type UpdateJobInput = components['schemas']['UpdateJobInput']

export interface ListJobsParams {
  status?: JobStatus
  category?: string
  page?: number
  pageSize?: number
}

export const jobsApi = {
  async post(input: PostJobInput): Promise<ApiResponse<ApiJob>> {
    const res = await http.post<ApiEnvelope<ApiJob>>('/jobs', input)
    return unwrap(res)
  },
  async list(params?: ListJobsParams): Promise<ApiResponse<ApiJob[]>> {
    const res = await http.get<ApiEnvelope<ApiJob[]>>(`/jobs${buildQuery(params)}`)
    return unwrap(res)
  },
  async mine(): Promise<ApiResponse<ApiJob[]>> {
    const res = await http.get<ApiEnvelope<ApiJob[]>>('/jobs/mine')
    return unwrap(res)
  },
  async byId(id: string): Promise<ApiResponse<ApiJob>> {
    const res = await http.get<ApiEnvelope<ApiJob>>(`/jobs/${id}`)
    return unwrap(res)
  },
  async update(id: string, input: UpdateJobInput): Promise<ApiResponse<ApiJob>> {
    const res = await http.put<ApiEnvelope<ApiJob>>(`/jobs/${id}`, input)
    return unwrap(res)
  },
  async complete(id: string): Promise<ApiResponse<ApiJob>> {
    const res = await http.put<ApiEnvelope<ApiJob>>(`/jobs/${id}/complete`)
    return unwrap(res)
  },
}
