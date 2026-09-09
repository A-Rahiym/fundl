import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@/components/ui/icons'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { fundiPhoto } from '@/lib/placeholders'
import { notificationsApi } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/**
 * Floating app header (spec: rounded-3xl bar with brand block, search,
 * POST WORK, bell and profile island). Styling maps onto existing app
 * tokens — no new token system. Dead spec pixels adapted: no mic button,
 * bell dot only on real unread, real user name in the island.
 */
export function AppHeader() {
  const { t } = useTranslation()
  const session = useSession()
  const user = session.data

  const home = user?.role === 'client' ? '/app/my-jobs' : '/app'
  const canPostJob = user?.role === 'client'
  const name = user?.name ?? ''

  const notifications = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => (await notificationsApi.list({ pageSize: 10 })).data,
    retry: false,
    staleTime: 60_000,
  })
  const hasUnread = notifications.data?.some((n) => !n.isRead) ?? false

  return (
    <header className="sticky top-3 z-50 mx-3 mt-3 tablet:mx-6">
      <div className="flex h-20 w-full items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-white px-4 shadow-window">
        <div className="flex items-center gap-2">
          <Link
            to={home}
            aria-label={t('nav.home')}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink transition hover:bg-paper"
          >
            <Icon name="menu" size={22} />
          </Link>
          <Link to={home} className="flex select-none items-center gap-2" aria-label="FUNDI home">
            <Logo />
            <span className="flex flex-col">
              <span className="-rotate-6 font-hand text-lg leading-none text-yellow-dark">
                {t('header.tagline')}
              </span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-ink/60 sm:inline">
                {t('header.sub')}
              </span>
            </span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {canPostJob && (
            <Link
              to="/app/post"
              aria-label={t('header.postWork')}
              className="hidden items-center gap-1.5 rounded-full border-2 border-ink bg-banner px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95 lg:flex"
            >
              <Icon name="plus" size={18} />
              {t('header.postWork')}
            </Link>
          )}
          <Link
            to="/app/notifications"
            aria-label={t('nav.alerts')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-candy shadow-small transition hover:brightness-95"
          >
            <Icon name="bell" size={20} />
            {hasUnread && (
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border border-ink bg-red" />
            )}
          </Link>
          <Link
            to="/app/profile"
            aria-label={t('nav.profile')}
            className="flex items-center gap-2 rounded-full border-2 border-ink bg-paper py-1 pl-2 pr-3 shadow-small transition hover:brightness-95"
          >
            <span className="hidden text-right sm:flex sm:flex-col sm:pr-1">
              <span className="max-w-30 truncate text-xs font-extrabold leading-tight text-ink">
                {name}
              </span>
              <span className="font-hand text-sm leading-none text-red">{t('header.carryGo')}</span>
            </span>
            <PhotoTile
              src={fundiPhoto(user?.id)}
              alt={name}
              name={name}
              shape="circle"
              className="h-9 w-9"
              textClassName="text-sm"
            />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
