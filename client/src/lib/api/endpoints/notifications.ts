import { http } from '../client'
import { unwrap } from '../errors'
import { buildQuery } from '@/lib/utils/buildQuery'
import type { ApiEnvelope, ApiResponse } from '../types'

export interface ApiNotification {
  id: string
  userId: string
  type: string
  payload: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

export const notificationsApi = {
  async list(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<ApiNotification[]>> {
    const res = await http.get<ApiEnvelope<ApiNotification[]>>(`/notifications${buildQuery(params)}`)
    return unwrap(res)
  },
  async markRead(id: string): Promise<ApiResponse<ApiNotification>> {
    const res = await http.put<ApiEnvelope<ApiNotification>>(`/notifications/${id}/read`)
    return unwrap(res)
  },
}
