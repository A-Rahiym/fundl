import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../hooks/useAuthQueries'

/** Blocks children until a session exists; unauthenticated users go to /login. */
export function AuthGate({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useSession()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wall" role="status">
        <span className="font-display text-sm uppercase tracking-wider text-ink/60">fundi…</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
