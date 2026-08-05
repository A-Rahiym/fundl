import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { CategoryTag } from '@/components/ui/CategoryTag'
import type { TagColor } from '@/components/ui/CategoryTag'
import { Display } from '@/components/ui/Display'
import { cardTilt } from '@/lib/theme'
import { cx } from '@/lib/cx'

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
 * FUNDI's signature component — the artisan ID card (§7.3, mockup §9).
 * Fixed order: square photo with rotated reputation chip → name + rating →
 * brush category tag → bio → "Book now" button. Alternating ±1.2° tilt.
 */
export function ArtisanCard({
  index,
  name,
  category,
  categoryColor = 'red',
  rating,
  bio,
  photo,
  available = true,
  topPro = false,
  flattened = false,
}: ArtisanCardProps) {
  const { t } = useTranslation()

  const chipLabel = topPro ? t('badge.topPro') : available ? t('badge.available') : t('badge.booked')

  return (
    <Panel
      tilt={flattened ? (index % 2 === 0 ? 'tilt-5' : 'tilt-n5') : cardTilt(index)}
      lift
      className="flex h-full flex-col gap-2.5 p-4 text-left"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[4px] border-[3px] border-ink">
        <img
          src={photo}
          alt={`Portrait of ${name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span
          className={cx(
            'absolute right-2 top-2 rounded-[4px] border-2 border-ink px-2 py-1 text-[10px] font-bold uppercase tracking-wider -rotate-12',
            topPro ? 'bg-red text-white' : 'bg-ink text-yellow',
          )}
        >
          {chipLabel}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <Display as="h5" className="font-display text-base leading-tight">
          {name}
        </Display>
        <span className="mt-0.5 flex shrink-0 items-center gap-1 text-blue">
          <Icon name="star" size={14} className="fill-current" />
          <span className="text-sm font-extrabold tabular-nums">{rating.toFixed(1)}</span>
        </span>
      </div>

      <CategoryTag color={categoryColor}>{category}</CategoryTag>

      <p className="text-sm text-ink/60">{bio}</p>

      <Button variant="blue" className="mt-auto w-full uppercase">
        {t('card.bookNow')}
      </Button>
    </Panel>
  )
}
