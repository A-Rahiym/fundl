import { http } from '../client'
import { unwrap } from '../errors'
import type { ApiEnvelope, ApiResponse, ApiUser } from '../types'
import type { components } from '../generated'

/** The backend always returns token + user together on signup/login. */
export type AuthData = {
  token: string
  user: ApiUser
}

export type LoginInput = components['schemas']['LoginInput']

/** Form payload for creating an account (locale is optional from the UI). */
export interface SignupInput {
  name: string
  email: string
  password: string
  role: components['schemas']['Role']
  locale?: components['schemas']['Locale']
}

export const authApi = {
  async signup(input: SignupInput): Promise<ApiResponse<AuthData>> {
    const res = await http.post<ApiEnvelope<AuthData>>('/auth/signup', input)
    return unwrap(res)
  },
  async login(input: LoginInput): Promise<ApiResponse<AuthData>> {
    const res = await http.post<ApiEnvelope<AuthData>>('/auth/login', input)
    return unwrap(res)
  },
  async me(): Promise<ApiResponse<ApiUser>> {
    const res = await http.get<ApiEnvelope<ApiUser>>('/auth/me')
    return unwrap(res)
  },
}