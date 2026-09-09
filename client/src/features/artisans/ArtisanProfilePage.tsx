import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Stars } from '@/components/ui/Stars'
import { Icon } from '@/components/ui/icons'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { STAMP_LABEL } from '@/config/status'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { fundiPhoto } from '@/lib/placeholders'
import { useArtisan, useArtisanReviews } from './hooks/useArtisansQueries'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'
import type { ApiReview } from '@/lib/api'

const REVIEW_TONES = ['bg-candy', 'bg-mint', 'bg-paper'] as const
const REVIEW_TILTS = ['-rotate-[0.3deg]', 'rotate-[0.2deg]', '-rotate-[0.2deg]'] as const

function ReviewBento({ review, index, language }: { review: ApiReview; index: number; language: string }) {
  const { t } = useTranslation()
  const name = review.reviewer?.name ?? t('offer.anonymous')
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?'

  return (
    <div
      className={`flex flex-col justify-between gap-3 rounded-2xl border-2 border-ink p-5 shadow-standard ${REVIEW_TONES[index % REVIEW_TONES.length]} ${REVIEW_TILTS[index % REVIEW_TILTS.length]}`}
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-white font-display text-base shadow-small"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <span className="block truncate text-sm font-extrabold leading-tight">{name}</span>
          <Stars rating={review.rating} size={13} />
        </div>
      </div>
      {review.comment && <p className="text-sm italic text-ink/80">“{review.comment}”</p>}
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
        {formatDate(review.createdAt, language)}
      </div>
    </div>
  )
}

/** Public artisan profile (guide/screen/artisian_profile.html) — spec styling, only real data. */
export function ArtisanProfilePage() {
  const { t, i18n } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const artisanQuery = useArtisan(id)
  const reviewsQuery = useArtisanReviews(id)

  const fromDashboard = (location.state as { from?: string } | null)?.from === 'dashboard'
  const origin = fromDashboard
    ? { label: t('nav.hire'), to: '/app/my-jobs' }
    : { label: t('search.title'), to: '/app/search' }

  if (artisanQuery.isLoading) {
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <LoadingState className="pt-10" />
        </div>
      </DashboardShell>
    )
  }

  if (artisanQuery.isError || !artisanQuery.data) {
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <ErrorState title="artisan.notFound" retryLabel="home.retry" onRetry={() => artisanQuery.refetch()} />
        </div>
      </DashboardShell>
    )
  }

  const artisan = artisanQuery.data
  const name = artisan.user?.name ?? t('offer.anonymous')
  const rating = Number(artisan.avgRating ?? 0)
  const reviewCount = artisan.reviewCount ?? 0
  const rate = artisan.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')
  const showTopMaster = artisan.isVerified && rating >= 4.5
  const reviews = reviewsQuery.data ?? []

  return (
    <DashboardShell>
      <main className="space-y-7 bg-paper p-4 md:p-6">
        <Breadcrumbs trail={[origin, { label: name }]} />

        {/* Hero banner */}
        <section className="relative overflow-hidden rounded-3xl border-[2.5px] border-ink bg-banner p-6 shadow-window md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {artisan.isVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-rose px-3 py-1 text-[11px] font-extrabold uppercase text-red shadow-small">
                  <Icon name="check" size={14} />
                  {t('artisan.profile.verified')}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-white px-3 py-1 text-[11px] font-extrabold uppercase shadow-small">
                <Icon name="star" size={14} />
                {rating.toFixed(1)} ★ ({t('artisan.reviewsCount_other', { count: reviewCount })})
              </span>
            </div>
            {showTopMaster && (
              <div className="flex rotate-1 items-center gap-1 rounded-2xl border-2 border-ink bg-red px-4 py-1.5 text-white shadow-small">
                <Icon name="shield-check" size={18} />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">
                  {t('artisan.profile.topMaster')}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="flex justify-center lg:col-span-4 lg:justify-start">
              <div className="group relative">
                <div className="rotate-[-1deg] rounded-3xl border-2 border-ink bg-white p-2 shadow-standard transition-transform group-hover:rotate-0">
                  <PhotoTile
                    src={fundiPhoto(artisan.userId ?? artisan.id)}
                    alt={name}
                    name={name}
                    className="h-48 w-48 !rounded-2xl !border-2 !shadow-none md:h-56 md:w-56"
                  />
                </div>
                <div
                  className={`absolute -bottom-2 -right-3 flex rotate-3 items-center gap-1 rounded-full border-2 border-ink px-3 py-1 text-[11px] font-extrabold uppercase shadow-small ${artisan.isAvailable ? 'bg-mint' : 'bg-white'}`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full border border-ink ${artisan.isAvailable ? 'bg-green' : 'bg-ink/30'}`}
                  />
                  {t(artisan.isAvailable ? 'badge.availableNow' : 'badge.booked')}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-8">
              <div>
                <h1 className="font-display text-3xl tracking-tight text-ink md:text-4xl">{name}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink/70">
                  <Icon name="pin" size={18} className="shrink-0 text-red" />
                  {t(`categories:${artisan.category?.key ?? 'masonry'}`)}
                  {artisan.user?.locationText ? ` • ${artisan.user.locationText}` : ''}
                </p>
                {artisan.bio && <p className="mt-2 max-w-2xl text-sm text-ink/80">{artisan.bio}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border-2 border-ink bg-white p-3 text-center shadow-small">
                  <span className="block text-[11px] font-bold uppercase text-ink/50">
                    {t('artisan.profile.dailyRate')}
                  </span>
                  <span className="mt-0.5 block font-display text-lg text-red">{rate}</span>
                  <span className="block text-[11px] font-medium text-ink/50">
                    {t(`rateType.${artisan.rateType ?? 'negotiable'}`)}
                  </span>
                </div>
                <div className="rounded-2xl border-2 border-ink bg-white p-3 text-center shadow-small">
                  <span className="block text-[11px] font-bold uppercase text-ink/50">
                    {t('artisan.profile.reviewsLabel')}
                  </span>
                  <span className="mt-0.5 block font-display text-lg text-ink">{reviewCount}</span>
                  <span className="block text-[11px] font-medium text-ink/50">
                    {t('artisan.profile.total')}
                  </span>
                </div>
                {/* PLACEHOLDER: completed-jobs count has no endpoint yet — static showcase value. */}
                <div className="rounded-2xl border-2 border-ink bg-white p-3 text-center shadow-small">
                  <span className="block text-[11px] font-bold uppercase text-ink/50">
                    {t('artisan.profile.completedJobs')}
                  </span>
                  <span className="mt-0.5 block font-display text-lg text-ink">
                    {t('artisan.profile.completedPlaceholder')}
                  </span>
                  <span className="block text-[11px] font-medium text-ink/50">
                    {t('artisan.profile.counting')}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/app/post"
                  className="flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95"
                >
                  <Icon name="hammer" size={20} />
                  {t('dashboard.hireNow')}
                </Link>
                <Link
                  to="/app/notifications"
                  title={t('app.comingSoon')}
                  className="flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-standard transition hover:bg-paper"
                >
                  <Icon name="chat" size={20} />
                  {t('dashboard.chat')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stamps */}
        {artisan.stamps && artisan.stamps.length > 0 && (
          <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
            <h2 className="font-display text-lg text-ink">{t('artisan.stamps')}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {artisan.stamps.map((stamp) => (
                <span
                  key={stamp}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-sun px-3 py-1 text-xs font-bold"
                >
                  <Icon name="flame" size={12} />
                  {t(STAMP_LABEL[stamp] ?? 'artisan.stampUnknown')}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Portfolio */}
        {artisan.portfolio && artisan.portfolio.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl tracking-tight text-ink">
                {t('artisan.profile.worksTitle')}{' '}
                <span className="font-hand text-lg text-ink/60">{t('artisan.profile.worksAccent')}</span>
              </h2>
              <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-[11px] font-extrabold uppercase shadow-small">
                {t('artisan.profile.worksAll', { count: artisan.portfolio.length })}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artisan.portfolio.map((image, i) => (
                <article
                  key={image.id}
                  className="flex flex-col gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-standard"
                >
                  <div className="h-52 overflow-hidden rounded-xl border-2 border-ink">
                    <img
                      src={image.imageUrl}
                      alt={image.caption ?? t('artisan.profile.worksPiece', { count: i + 1 })}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="line-clamp-2 text-sm font-bold text-ink">
                    {image.caption ?? t('artisan.profile.worksPiece', { count: i + 1 })}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Reviews bento */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl tracking-tight text-ink">
              {t('artisan.profile.reviewsTitle')}{' '}
              <span className="font-hand text-lg text-red">{t('artisan.profile.reviewsAccent')}</span>
            </h2>
            <span className="inline-flex items-center gap-1 text-sm font-extrabold">
              <Icon name="star" size={18} />
              {rating.toFixed(1)} {t('artisan.reviewsCount_other', { count: reviewCount })}
            </span>
          </div>

          {reviewsQuery.isLoading && <p className="text-sm font-medium text-ink/50">{t('artisan.reviewsLoading')}</p>}
          {reviewsQuery.isError && (
            <button
              type="button"
              onClick={() => reviewsQuery.refetch()}
              className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
            >
              {t('artisan.reviewsError')}
            </button>
          )}
          {!reviewsQuery.isLoading && !reviewsQuery.isError && reviews.length === 0 && (
            <p className="text-sm font-medium text-ink/50">{t('artisan.noReviews')}</p>
          )}
          {!reviewsQuery.isLoading && !reviewsQuery.isError && reviews.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {reviews.map((review, i) => (
                <ReviewBento key={review.id} review={review} index={i} language={i18n.language} />
              ))}
            </div>
          )}
        </section>

        {/* Escrow banner */}
        <section className="flex flex-col items-center justify-between gap-6 rounded-3xl border-[2.5px] border-ink bg-sky p-6 shadow-standard md:flex-row md:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-white shadow-small">
              <Icon name="shield-check" size={28} />
            </div>
            <div>
              <h3 className="font-display text-lg text-ink">
                {t('dashboard.escrowTitle')}{' '}
                <span className="font-hand text-lg text-red">{t('header.carryGo')}</span>
              </h3>
              <p className="mt-1 max-w-xl text-sm text-ink/70">{t('dashboard.escrowBody')}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/app/notifications"
              className="rounded-full border-2 border-ink bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider shadow-small transition hover:bg-paper"
            >
              {t('dashboard.escrowCta')}
            </Link>
            <Link
              to="/app/post"
              className="rounded-full border-2 border-ink bg-red px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-small transition hover:brightness-110"
            >
              {t('dashboard.hireNow')}
            </Link>
          </div>
        </section>
      </main>
    </DashboardShell>
  )
}
