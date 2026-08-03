import { useTranslation } from 'react-i18next'
import { Icon } from '../../../components/icons'
import { Panel } from '../../../components/Panel'
import { CategoryTag } from '../../../components/CategoryTag'
import type { TagColor } from '../../../components/CategoryTag'
import { StatusStamp } from '../../../components/StatusStamp'
import { Stars } from './Stars'
import { cardTilt } from '../../../lib/theme'
import { cx } from '../../../lib/cx'

export interface ArtisanCardProps {
  index: number
  name: string
  category: string
  categoryColor?: TagColor
  rating: number
  reviews: number
  rate: string
  rateType?: string
  available?: boolean
  photoVariant?: 'red' | 'blue' | 'green'
  /** Workshop-register flattening for dense lists (§7.3) */
  flattened?: boolean
}

/**
 * FUNDI's signature component — the artisan ID card (§7.3).
 * Fixed order: tape → Polaroid photo → brush category tag → name →
 * stars → status stamp → dashed divider → rate + "View →".
 * Alternating ±1.2° tilt; flattens to ±0.3° in dense lists.
 */
export function ArtisanCard({
  index,
  name,
  category,
  categoryColor = 'red',
  rating,
  reviews,
  rate,
  rateType = 'hr',
  available = true,
  photoVariant = 'red',
  flattened = false,
}: ArtisanCardProps) {
  const { t } = useTranslation()
  return (
    <Panel
      tilt={flattened ? (index % 2 === 0 ? 'tilt-5' : 'tilt-n5') : cardTilt(index)}
      lift
      className="flex w-56 flex-col gap-2.5 p-4 text-left"
    >
      <div className="tape" aria-hidden="true" />
      <div
        className={cx(
          'photo-duotone',
          photoVariant === 'blue' && 'photo-duotone--blue',
          photoVariant === 'green' && 'photo-duotone--green',
          'h-36 w-full border-[3px] border-ink',
        )}
        role="img"
        aria-label={`Portrait of ${name}`}
      />
      <div className="flex justify-center">
        <CategoryTag color={categoryColor}>{category}</CategoryTag>
      </div>
      <h4 className="text-center font-display text-[15px] leading-tight">{name}</h4>
      <div className="flex items-center justify-center gap-2">
        <Stars rating={rating} />
        <span className="text-xs font-semibold text-ink/60">({reviews})</span>
      </div>
      <div className="flex justify-center">
        <StatusStamp tone={available ? 'available' : 'unavailable'}>
          {available ? t('badge.availableNow') : t('badge.booked')}
        </StatusStamp>
      </div>
      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-ink/30 pt-2.5">
        <span className="text-sm font-extrabold tabular-nums">
          ₦{rate}
          <span className="text-[11px] font-semibold text-ink/50">/{rateType}</span>
        </span>
        <span className="flex items-center gap-0.5 text-[11px] font-extrabold uppercase tracking-wider text-blue">
          {t('card.view')}
          <Icon name="chevron-right" size={13} />
        </span>
      </div>
    </Panel>
  )
}
