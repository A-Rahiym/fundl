import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { Role } from '@/lib/api'
import { LoadingState } from '@/components/states/LoadingState'
import { useSession } from '../hooks/useAuthQueries'

/** Keeps role-specific workspaces out of reach even when a URL is entered directly. */
export function RoleGate({ role, children }: { role: Role; children: ReactNode }) {
  const { data: user, isLoading } = useSession()

  if (isLoading) return <LoadingState className="pt-10" />
  if (user?.role !== role) return <Navigate to={user?.role === 'client' ? '/app/my-jobs' : '/app'} replace />

  return <>{children}</>
}
