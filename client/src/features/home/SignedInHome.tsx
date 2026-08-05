import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { Panel } from '@/components/Panel'
import { useLogout } from '@/features/auth/hooks/useAuthMutations'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/** Minimal signed-in placeholder until the real dashboard screens are built. */
export function SignedInHome() {
  const { t } = useTranslation()
  const session = useSession()
  const logout = useLogout()
  const user = session.data

  if (!user) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-wall px-4">
      <Panel className="w-full max-w-[420px] p-6 sm:p-8" tilt="tilt-12">
        <p className="text-xs font-bold uppercase tracking-wider text-blue">
          {t('auth.signedInAs')}
        </p>
        <h1 className="mt-1 font-display text-2xl text-ink">{user.name}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{user.email}</p>
        <div className="mt-6">
          <Button variant="red" onClick={() => logout.mutate()} disabled={logout.isPending}>
            {logout.isPending ? t('auth.loggingOut') : t('auth.logOut')}
          </Button>
        </div>
      </Panel>
    </div>
  )
}
