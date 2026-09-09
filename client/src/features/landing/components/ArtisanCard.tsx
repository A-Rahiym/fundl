import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { Display } from '@/components/ui/Display'
import { cx } from '@/lib/cx'
import type { TagColor } from '@/components/ui/CategoryTag'

export interface ArtisanCardProps {
  index: number
  name: string
  category: string
  categoryColor?: TagColor
  rating: number
  bio: string
  photo: string
  available?: boolean
  topPro?: boolean
  /** Workshop-register flattening for dense lists (§7.3) */
  flattened?: boolean
}

/**
 * Landing artisan card in the dashboard design language: rounded photo,
 * pastel badge chips, rating, bio and a full-width sun CTA.
 */
export function ArtisanCard({
  index,
  name,
  category,
  rating,
  bio,
  photo,
  available = true,
  topPro = false,
  flattened = false,
}: ArtisanCardProps) {
  const { t } = useTranslation()
  void index
  void flattened

  return (
    <div className="flex h-full flex-col gap-3 rounded-3xl border-[2.5px] border-ink bg-white p-4 text-left shadow-standard transition hover:-translate-y-1">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-ink bg-paper">
        <img
          src={photo}
          alt={`Portrait of ${name}`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
            const fallback = event.currentTarget.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <span
          className={cx(
            'absolute right-2 top-2 rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-small',
            topPro ? 'bg-sun text-ink' : available ? 'bg-mint text-ink' : 'bg-white text-ink',
          )}
        >
          {topPro ? t('badge.topPro') : available ? t('badge.available') : t('badge.booked')}
        </span>
        <span
          aria-hidden="true"
          className="hidden h-full w-full items-center justify-center bg-sun font-display text-5xl text-ink"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <Display as="h5" className="font-display text-base leading-tight text-ink">
          {name}
        </Display>
        <span className="mt-0.5 flex shrink-0 items-center gap-1">
          <Icon name="star" size={14} className="fill-current text-yellow-dark" />
          <span className="text-sm font-extrabold tabular-nums">{rating.toFixed(1)}</span>
        </span>
      </div>

      <span className="self-start rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold">
        {category}
      </span>

      <p className="line-clamp-2 text-sm text-ink/60">{bio}</p>

      <span className="mt-auto block w-full rounded-full border-2 border-ink bg-sun py-2.5 text-center text-xs font-extrabold uppercase tracking-wider shadow-small">
        {t('card.bookNow')}
      </span>
    </div>
  )
}
