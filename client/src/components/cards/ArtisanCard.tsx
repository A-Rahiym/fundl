import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Stars } from '@/components/ui/Stars'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { cx } from '@/lib/cx'
import { formatNaira } from '@/lib/utils/format'
import { fundiPhoto } from '@/lib/placeholders'
import type { ApiArtisanProfile } from '@/lib/api'

export interface ArtisanCardAction {
  /** Locale key for the full-width button (e.g. dashboard.hireNow, card.view). */
  labelKey: string
  tone: 'sky' | 'sun' | 'mint' | 'white'
  /** Where the tap came from — the profile screen builds its breadcrumb from this. */
  from: 'dashboard' | 'search'
}

const TONE_BG = {
  sky: 'bg-sky',
  sun: 'bg-sun',
  mint: 'bg-mint',
  white: 'bg-white',
} as const

/**
 * Shared artisan card (dashboard trio + search grid): photo tile, badge
 * chips, rating, bio, rate chips and a full-width CTA into the public
 * profile. `index` cycles nothing by itself — callers pick the tone.
 */
export function ArtisanCard({
  artisan,
  action,
}: {
  artisan: ApiArtisanProfile
  action: ArtisanCardAction
}) {
  const { t } = useTranslation()

  const name = artisan.user?.name ?? t('offer.anonymous')
  const rating = Number(artisan.avgRating ?? 0)
  const rate = artisan.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')

  return (
    <div className="relative flex flex-col justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard transition hover:-translate-y-1">
      <div className="space-y-3">
        <div className="flex items-start gap-3.5">
          <PhotoTile
            src={fundiPhoto(artisan.userId ?? artisan.id)}
            alt={name}
            name={name}
            className="h-20 w-20"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {rating >= 4.5 && (
                <span className="rounded-full border border-ink bg-sun px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
                  {t('dashboard.topRated')}
                </span>
              )}
              {artisan.isVerified ? (
                <span className="rounded-full border border-ink bg-mint px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
                  {t('artisan.verified')} ✓
                </span>
              ) : (
                (artisan.reviewCount ?? 0) >= 100 && (
                  <span className="rounded-full border border-ink bg-candy px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
                    {t('dashboard.master')}
                  </span>
                )
              )}
            </div>
            <h4 className="truncate text-base font-extrabold leading-tight text-ink">{name}</h4>
            <p className="truncate text-xs font-semibold text-ink/50">
              {artisan.user?.locationText ?? t(`categories:${artisan.category?.key ?? 'masonry'}`)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Stars rating={rating} size={16} />
          <span className="ml-1 text-xs font-black text-ink">
            {rating.toFixed(1)} {t('artisan.reviewsCount_other', { count: artisan.reviewCount ?? 0 })}
          </span>
          <span
            className={cx(
              'ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold',
              artisan.isAvailable ? 'text-green' : 'text-ink/50',
            )}
          >
            <span
              className={cx(
                'inline-block h-2 w-2 rounded-full border border-ink',
                artisan.isAvailable ? 'bg-green' : 'bg-ink/20',
              )}
            />
            {t(artisan.isAvailable ? 'badge.available' : 'badge.booked')}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-ink/60">{artisan.bio ?? t('artisan.noBio')}</p>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold text-ink">
            {t(`categories:${artisan.category?.key ?? 'masonry'}`)}
          </span>
          <span className="rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold text-ink">
            {rate}
          </span>
        </div>
      </div>

      <Link
        to={`/app/artisans/${artisan.id}`}
        state={{ from: action.from }}
        className={cx(
          'w-full rounded-full border-2 border-ink py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95',
          TONE_BG[action.tone],
        )}
      >
        {t(action.labelKey)}
      </Link>
    </div>
  )
}
