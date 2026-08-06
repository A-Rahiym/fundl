import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Panel } from '@/components/ui/Panel'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Stars } from '@/components/ui/Stars'
import { Icon } from '@/components/ui/icons'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { STAMP_LABEL } from '@/config/status'
import { formatNaira } from '@/lib/utils/format'
import { useArtisan, useArtisanReviews } from './hooks/useArtisansQueries'
import { ArtisanAvatar } from './components/ArtisanAvatar'
import { ReviewList } from './components/ReviewList'

const TAG_COLORS = ['red', 'blue', 'green', 'yellow', 'red-dark'] as const

/** Public artisan profile (§7.3 detail): bio, rate, stamps, portfolio, reviews. */
export function ArtisanProfilePage() {
  const { t, i18n } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const artisanQuery = useArtisan(id)
  const reviewsQuery = useArtisanReviews(id)

  if (artisanQuery.isLoading) return <LoadingState className="pt-10" />

  if (artisanQuery.isError || !artisanQuery.data) {
    return <ErrorState title="artisan.notFound" retryLabel="home.retry" onRetry={() => artisanQuery.refetch()} />
  }

  const artisan = artisanQuery.data
  const name = artisan.user?.name ?? t('offer.anonymous')
  const category = t(`categories:${artisan.category?.key ?? 'masonry'}`)
  const rating = Number(artisan.avgRating ?? 0)
  const rate = artisan.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')

  return (
    <div className="mx-auto flex max-w-190 flex-col gap-5">
      <Link
        to="/search"
        className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
      >
        {t('artisan.backToSearch')}
      </Link>

      <Panel tilt="tilt-5" className="p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <ArtisanAvatar name={name} size="lg" className="mx-auto sm:mx-0" />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="font-display text-3xl text-ink">{name}</h1>
              {artisan.isVerified && (
                <StatusStamp tone="neutral">
                  <Icon name="check" size={12} />
                  {t('artisan.verified')}
                </StatusStamp>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
              <CategoryTag color={TAG_COLORS[(artisan.categoryId ?? 0) % TAG_COLORS.length]}>{category}</CategoryTag>
              <span className="inline-flex items-center gap-1.5">
                <Stars rating={rating} size={14} />
                <span className="text-sm font-extrabold tabular-nums text-blue">{rating.toFixed(1)}</span>
                <span className="text-xs font-medium text-ink/50">
                  {t('artisan.reviewsCount', { count: artisan.reviewCount ?? 0 })}
                </span>
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <StatusStamp tone={artisan.isAvailable ? 'available' : 'unavailable'}>
                {t(artisan.isAvailable ? 'badge.available' : 'badge.booked')}
              </StatusStamp>
              <span className="text-base font-extrabold tabular-nums">{rate}</span>
            </div>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-display text-lg text-ink">{t('artisan.about')}</h2>
        <p className="mt-1 text-sm text-ink/70">{artisan.bio ?? t('artisan.noBio')}</p>
      </Panel>

      {artisan.stamps && artisan.stamps.length > 0 && (
        <Panel className="p-5">
          <h2 className="font-display text-lg text-ink">{t('artisan.stamps')}</h2>
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

      {artisan.portfolio && artisan.portfolio.length > 0 && (
        <Panel className="p-5">
          <h2 className="font-display text-lg text-ink">{t('artisan.portfolio')}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {artisan.portfolio.map((image) => (
              <figure key={image.id} className="overflow-hidden rounded-sm border-[3px] border-ink">
                <img src={image.imageUrl} alt={image.caption ?? ''} loading="lazy" className="aspect-square w-full object-cover" />
                {image.caption && <figcaption className="px-2 py-1 text-xs font-medium text-ink/70">{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Panel>
      )}

      <Panel className="p-5">
        <h2 className="font-display text-lg text-ink">{t('artisan.reviews')}</h2>
        <ReviewList
          reviews={reviewsQuery.data ?? []}
          loading={reviewsQuery.isLoading}
          error={reviewsQuery.isError}
          onRetry={() => reviewsQuery.refetch()}
          language={i18n.language}
        />
      </Panel>
    </div>
  )
}
