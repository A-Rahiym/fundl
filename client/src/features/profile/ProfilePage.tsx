import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Icon } from '@/components/ui/icons'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { clearToken } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { STAMP_LABEL } from '@/config/status'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { useSession } from '@/features/auth/hooks/useAuthQueries'
import { useArtisanMe } from '@/features/artisans/hooks/useArtisansQueries'
import { ArtisanAvatar } from '@/features/artisans/components/ArtisanAvatar'

const TAG_COLORS = ['red', 'blue', 'green', 'yellow', 'red-dark'] as const

/** The signed-in user's own profile (`/profile`): user info + role-specific panel. */
export function ProfilePage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const session = useSession()
  const user = session.data

  const isArtisan = user?.role === 'artisan'
  const artisanQuery = useArtisanMe()

  const handleLogout = () => {
    clearToken()
    queryClient.removeQueries({ queryKey: queryKeys.session })
    navigate('/login', { replace: true })
  }

  if (session.isLoading) return <LoadingState className="pt-10" />

  if (!user) return <ErrorState title="profile.notFound" />

  const artisan = artisanQuery.data
  const rate = artisan?.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-5">
      <div>
        <h1 className="font-display text-3xl text-ink">{t('profile.title')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('profile.subtitle')}</p>
      </div>

      <Panel tilt="tilt-5" className="p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <ArtisanAvatar name={user.name ?? ''} size="lg" className="mx-auto sm:mx-0" />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-2xl text-ink">{user.name}</h2>
            <p className="mt-0.5 text-sm font-medium text-ink/60">
              {user.email}
              {user.phone ? ` · ${user.phone}` : ''}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <StatusStamp tone="neutral">{t(`auth.role${user.role === 'artisan' ? 'Artisan' : 'Client'}`)}</StatusStamp>
              {user.locationText && <span className="text-xs font-medium text-ink/50">{user.locationText}</span>}
              {user.createdAt && (
                <span className="text-xs font-medium text-ink/50">
                  {t('profile.joined')} {formatDate(user.createdAt, i18n.language)}
                </span>
              )}
            </div>
          </div>
        </div>

        {isArtisan && !artisanQuery.isLoading && !artisanQuery.isError && artisan && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-ink/20 pt-4">
            <CategoryTag color={TAG_COLORS[(artisan.categoryId ?? 0) % TAG_COLORS.length]}>
              {t(`categories:${artisan.category?.key ?? 'masonry'}`)}
            </CategoryTag>
            <StatusStamp tone={artisan.isAvailable ? 'available' : 'unavailable'}>
              {t(artisan.isAvailable ? 'badge.available' : 'badge.booked')}
            </StatusStamp>
            <span className="text-sm font-extrabold tabular-nums">{rate}</span>
          </div>
        )}
      </Panel>

      {isArtisan && artisanQuery.isError && !artisan && (
        <Panel className="p-5">
          <div className="flex items-start gap-3">
            <Icon name="wrench" size={20} className="mt-0.5 shrink-0 text-ink/50" aria-hidden="true" />
            <div>
              <h3 className="font-display text-base text-ink">{t('profile.noArtisanProfile')}</h3>
              <p className="mt-1 text-sm text-ink/60">{t('profile.noArtisanProfileHint')}</p>
            </div>
          </div>
        </Panel>
      )}

      {isArtisan && !artisanQuery.isLoading && artisan && artisan.bio && (
        <Panel className="p-5">
          <h3 className="font-display text-lg text-ink">{t('artisan.about')}</h3>
          <p className="mt-1 text-sm text-ink/70">{artisan.bio}</p>
        </Panel>
      )}

      {isArtisan && !artisanQuery.isLoading && artisan && artisan.stamps && artisan.stamps.length > 0 && (
        <Panel className="p-5">
          <h3 className="font-display text-lg text-ink">{t('artisan.stamps')}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {artisan.stamps.map((stamp) => (
              <StatusStamp key={stamp} tone="neutral">
                <Icon name="flame" size={12} />
                {t(STAMP_LABEL[stamp] ?? 'artisan.stampUnknown')}
              </StatusStamp>
            ))}
          </div>
        </Panel>
      )}

      {!isArtisan && (
        <Panel className="p-5">
          <h3 className="font-display text-lg text-ink">{t('profile.quickActions')}</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => navigate('/post')}>
              {t('profile.postJob')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/my-jobs')}>
              {t('profile.myJobs')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              {t('profile.browseJobs')}
            </Button>
          </div>
        </Panel>
      )}

      <Button variant="outline" onClick={handleLogout} className="mt-2 w-full">
        {t('profile.logout')}
      </Button>
    </div>
  )
}
