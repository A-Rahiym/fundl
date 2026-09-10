import { http } from '../client'
import { unwrap } from '../errors'
import type { ApiEnvelope, ApiResponse, ApiUser, LocaleCode } from '../types'

export interface UpdateProfileInput {
  name?: string
  phone?: string
  state?: string
  lga?: string
}

export const usersApi = {
  async me(): Promise<ApiResponse<ApiUser>> {
    const res = await http.get<ApiEnvelope<ApiUser>>('/users/me')
    return unwrap(res)
  },
  async updateLocale(locale: LocaleCode): Promise<ApiResponse<ApiUser>> {
    const res = await http.put<ApiEnvelope<ApiUser>>('/users/me/locale', { locale })
    return unwrap(res)
  },
  async updateMe(input: UpdateProfileInput): Promise<ApiResponse<ApiUser>> {
    const res = await http.put<ApiEnvelope<ApiUser>>('/users/me', input)
    return unwrap(res)
  },
}
