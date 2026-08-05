import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/**
 * In-app header signboard (§7.9): flat (no tilt — Workshop register),
 * ink fill, white wordmark. Shows the signed-in user and the Post-a-job
 * action instead of the landing's login CTA.
 */
export function AppHeader() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()
  const user = session.data
  const firstName = (user?.name ?? '').split(' ')[0]

  return (
    <header className="sticky top-0 z-20 px-4 tablet:px-8">
      <div className="header-sign mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-5 py-3">
        <Link to="/" aria-label="FUNDI home" className="shrink-0">
          <Logo onDark />
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden max-w-[180px] truncate text-sm font-semibold text-white/70 sm:block">
            {t('app.welcomeBack', { name: firstName })}
          </span>
          <LanguageSwitcher />
          <Button size="sm" onClick={() => navigate('/post')} className="hidden sm:inline-flex">
            {t('app.postJob')}
          </Button>
        </div>
      </div>
    </header>
  )
}
