import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { LoadingState } from '@/components/states/LoadingState'
import { useSession } from '../hooks/useAuthQueries'

/** Blocks children until a session exists; unauthenticated users go to /login. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useSession()

  if (isLoading) {
    return <LoadingState className="min-h-screen bg-wall" />
  }

  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
