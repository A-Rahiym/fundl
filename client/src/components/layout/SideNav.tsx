import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { getBottomNavItems } from '@/config/nav'
import { useSession } from '@/features/auth/hooks/useAuthQueries'
import { useLogout } from '@/features/auth/hooks/useAuthMutations'

/**
 * Desktop shell sidebar — floating card pinned to the viewport (spec).
 * Same role-aware destinations as the mobile tab bar, minus Post (which
 * lives in the header and tab bar). Only real routes, no invented items.
 * Hidden below lg; the content column clears it with a left offset.
 */
export function SideNav() {
  const { t } = useTranslation()
  const user = useSession().data
  const logout = useLogout()
  const items = getBottomNavItems(user?.role).filter((item) => item.key !== 'post')

  return (
    <aside className="sticky top-3 z-40 hidden max-h-[calc(100vh-120px)] w-72 shrink-0 flex-col overflow-y-auto rounded-3xl border-2 border-ink bg-white p-4 shadow-window lg:flex">
      <div className="mb-3">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-widest text-ink/50">
          {t('dashboard.menu')}
        </span>
        <nav className="flex flex-col gap-2" aria-label="Primary">
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end={item.key === 'home'}
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm transition',
                  isActive
                    ? 'bg-sun font-extrabold text-ink shadow-small'
                    : 'font-semibold text-ink/60 hover:bg-paper hover:text-ink',
                )
              }
            >
              <Icon name={item.icon} size={20} />
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          type="button"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-red px-4 py-2 text-sm font-extrabold uppercase tracking-wider text-white shadow-small transition hover:brightness-110 disabled:opacity-60"
        >
          <Icon name="logout" size={16} />
          {logout.isPending ? t('auth.loggingOut') : t('auth.logOut')}
        </button>
      </div>
    </aside>
  )
}
