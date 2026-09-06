import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { getBottomNavItems } from '@/config/nav'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/**
 * In-app header signboard (§7.9): flat (no tilt — Workshop register),
 * ink fill, white wordmark. Shows the signed-in user and the Post-a-job
 * action instead of the landing's login CTA.
 */
export function AppHeader() {
  const { t } = useTranslation()
  const session = useSession()
  const user = session.data
  const firstName = (user?.name ?? '').split(' ')[0]
  const navItems = getBottomNavItems(user?.role).filter((item) => item.key !== 'post')
  const canPostJob = user?.role === 'client'

  return (
    <header className="sticky top-0 z-20 px-4 tablet:px-8">
      <div className="header-sign mx-auto flex w-full max-w-295 items-center justify-between gap-3 px-5 py-3">
        <Link to="/app" aria-label="FUNDI home" className="shrink-0">
          <Logo onDark />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 tablet:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.key === 'home'}
              aria-label={t(item.labelKey)}
              className={({ isActive }) =>
                cx(
                  'inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white desktop:px-3',
                  isActive && 'bg-white/15 text-white',
                )
              }
            >
              <Icon name={item.icon} size={18} />
              <span className="hidden desktop:inline">{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {canPostJob && (
            <Link
              to="/app/post"
              className="btn btn--primary btn--sm inline-flex items-center gap-1.5"
              aria-label={t('app.postJob')}
            >
              <Icon name="plus" size={18} />
              <span className="hidden desktop:inline">{t('app.postJob')}</span>
            </Link>
          )}
          <span className="hidden max-w-45 truncate text-sm font-semibold text-white/70 desktop:block">
            {t('app.welcomeBack', { name: firstName })}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
