import { useTranslation } from 'react-i18next'
import { ApiError } from '@/lib/api'

/** Signboard-style inline error for a failed login/signup attempt. */
export function AuthError({ error }: { error: Error | null }) {
  const { t } = useTranslation()

  if (!error) return null

  let message: string
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'HTTP_ERROR':
        message = t('api.errHttp', { status: error.status })
        break
      case 'NETWORK_ERROR':
        message = t('api.errNetwork')
        break
      case 'UNKNOWN_ERROR':
        message = t('api.errUnknown')
        break
      default:
        message = t(error.message)
    }
  } else {
    message = t(error.message)
  }

  return (
    <div
      role="alert"
      className="rounded-md border-3 border-red bg-red/10 px-4 py-3 text-sm font-bold text-red-dark"
    >
      {message}
    </div>
  )
}
