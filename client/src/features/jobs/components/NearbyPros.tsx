import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { LoadingState } from '@/components/states/LoadingState'
import { fundiPhoto } from '@/lib/placeholders'
import { useArtisans } from '@/features/artisans/hooks/useArtisansQueries'

/**
 * Live "nearby pros" rail for the selected trade (`GET /artisans`).
 * Only real fields render: name, rating, location, verified chip,
 * placeholder photo. Distances and jobs-done counts don't exist.
 */
export function NearbyPros({ categoryKey }: { categoryKey: string | null }) {
  const { t } = useTranslation()
  const pros = useArtisans(categoryKey ? { category: categoryKey, pageSize: 20 } : { pageSize: 20 })

  const list = [...(pros.data ?? [])]
    .sort((a, b) => Number(b.avgRating ?? 0) - Number(a.avgRating ?? 0))
    .slice(0, 3)
  const activeCount = (pros.data ?? []).filter((a) => a.isAvailable).length

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-2 border-ink bg-white p-6 shadow-standard">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="pin" size={24} className="text-yellow-dark" />
          <span className="font-display text-lg text-ink">{t('postJob.nearbyTitle')}</span>
        </div>
        {!pros.isLoading && !pros.isError && (
          <span className="rounded-full border-2 border-ink bg-mint px-2 py-0.5 text-[11px] font-bold">
            {t('postJob.nearbyActive', { count: activeCount })}
          </span>
        )}
      </div>

      {pros.isLoading && <LoadingState className="py-2" />}

      {!pros.isLoading && !pros.isError && list.length === 0 && (
        <p className="text-sm font-medium text-ink/50">{t('postJob.nearbyEmpty')}</p>
      )}

      {!pros.isLoading &&
        !pros.isError &&
        list.map((artisan) => {
          const name = artisan.user?.name ?? t('offer.anonymous')
          const rating = Number(artisan.avgRating ?? 0)
          return (
            <Link
              key={artisan.id}
              to={`/app/artisans/${artisan.userId ?? artisan.id}`}
              className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-3 shadow-small transition hover:bg-white"
            >
              <PhotoTile
                src={fundiPhoto(artisan.userId ?? artisan.id)}
                alt={name}
                name={name}
                className="h-12 w-12"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-extrabold text-ink">{name}</span>
                  <span className="shrink-0 text-xs font-extrabold text-red">★ {rating.toFixed(1)}</span>
                </div>
                <span className="block truncate text-xs font-medium text-ink/50">
                  {artisan.user?.locationText ?? t(`categories:${artisan.category?.key ?? 'masonry'}`)}
                </span>
                {artisan.isVerified && (
                  <span className="text-[11px] font-bold text-green">✓ {t('artisan.verified')}</span>
                )}
              </div>
            </Link>
          )
        })}

      <p className="text-center font-hand text-lg text-red">{t('postJob.nearbyNote')}</p>
    </div>
  )
}
