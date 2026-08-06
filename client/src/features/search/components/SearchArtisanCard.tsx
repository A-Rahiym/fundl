import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Panel } from '@/components/ui/Panel'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Stars } from '@/components/ui/Stars'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { formatNaira } from '@/lib/utils/format'
import { ArtisanAvatar } from '@/features/artisans/components/ArtisanAvatar'
import type { ApiArtisanProfile } from '@/lib/api'

/** Cycle through the tag colors so neighbors never match. */
const TAG_COLORS = ['red', 'blue', 'green', 'yellow', 'red-dark'] as const

/**
 * Artisan search-result card (Workshop register): flat panel,
 * initial-letter avatar, rating, trade tag, bio and rate. Entire card
 * links to the artisan's public profile.
 */
export function SearchArtisanCard({ artisan, index }: { artisan: ApiArtisanProfile; index: number }) {
  const { t } = useTranslation()

  const name = artisan.user?.name ?? t('offer.anonymous')
  const category = t(`categories:${artisan.category?.key ?? 'masonry'}`)
  const rating = Number(artisan.avgRating ?? 0)
  const rate = artisan.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')

  return (
    <Link to={`/artisans/${artisan.id}`} className="block h-full">
      <Panel
        variant="small"
        tilt={index % 2 === 0 ? 'tilt-5' : 'tilt-n5'}
        lift
        className="flex h-full flex-col gap-2.5 p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <ArtisanAvatar name={name} />
          <div className="min-w-0">
            <p className="truncate font-body text-[15px] font-bold leading-tight">{name}</p>
            <span className="mt-1 inline-flex items-center gap-1.5">
              <Stars rating={rating} size={13} />
              <span className="text-xs font-extrabold tabular-nums text-blue">{rating.toFixed(1)}</span>
              <span className="text-xs font-medium text-ink/50">({artisan.reviewCount ?? 0})</span>
            </span>
          </div>
        </div>

        <CategoryTag color={TAG_COLORS[(artisan.categoryId ?? 0) % TAG_COLORS.length]} className="self-start">
          {category}
        </CategoryTag>

        <p className="line-clamp-2 text-sm text-ink/60">{artisan.bio ?? t('artisan.noBio')}</p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-ink/30 pt-2.5">
          <span className="text-sm font-extrabold tabular-nums">{rate}</span>
          <StatusStamp tone={artisan.isAvailable ? 'available' : 'unavailable'} className="shrink-0">
            {t(artisan.isAvailable ? 'badge.available' : 'badge.booked')}
          </StatusStamp>
        </div>

        <span
          className={cx(
            'absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink text-ink',
            artisan.isVerified ? 'bg-yellow' : 'bg-white/0',
          )}
        >
          {artisan.isVerified && <Icon name="check" size={12} />}
        </span>
      </Panel>
    </Link>
  )
}
