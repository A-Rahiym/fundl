import { http } from '../client'
import { unwrap } from '../errors'
import type { ApiCategory, ApiEnvelope, ApiResponse } from '../types'

export const categoriesApi = {
  async list(): Promise<ApiResponse<ApiCategory[]>> {
    const res = await http.get<ApiEnvelope<ApiCategory[]>>('/categories')
    return unwrap(res)
  },
}
