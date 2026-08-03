import { useTranslation } from 'react-i18next'
import { Icon } from '../../../components/icons'
import { Panel } from '../../../components/Panel'
import { CategoryTag } from '../../../components/CategoryTag'
import type { TagColor } from '../../../components/CategoryTag'
import { StatusStamp } from '../../../components/StatusStamp'
import type { StampTone } from '../../../components/StatusStamp'

const STATUS_KEY: Record<StampTone, string> = {
  open: 'status.open',
  'in-progress': 'status.inProgress',
  completed: 'status.completed',
  cancelled: 'status.cancelled',
  available: 'badge.availableNow',
  unavailable: 'badge.booked',
  neutral: 'status.open',
}

export interface JobCardProps {
  title: string
  category: string
  categoryColor?: TagColor
  location: string
  time: string
  budget: string
  statusTone: StampTone
  offers?: number
}

/**
 * Job card (§7.5) — Workshop register: flattened tilt, white fill,
 * data-dense and scannable. Title 700 → hand tag → location/time →
 * bold tabular budget → status stamp → offer count/CTA.
 */
export function JobCard({
  title,
  category,
  categoryColor = 'blue',
  location,
  time,
  budget,
  statusTone,
  offers = 0,
}: JobCardProps) {
  const { t } = useTranslation()
  return (
    <Panel variant="small" tilt="tilt-5" className="flex flex-col gap-2 p-4 text-left">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-body text-[15px] font-bold leading-snug">{title}</h4>
        <StatusStamp tone={statusTone} className="mt-0.5 shrink-0">
          {t(STATUS_KEY[statusTone])}
        </StatusStamp>
      </div>
      <CategoryTag color={categoryColor} className="self-start">
        {category}
      </CategoryTag>
      <div className="flex items-center gap-3 text-xs font-medium text-ink/60">
        <span className="inline-flex items-center gap-1">
          <Icon name="pin" size={13} />
          {location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Icon name="clock" size={13} />
          {time}
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-ink/30 pt-2.5">
        <span className="text-base font-extrabold tabular-nums">₦{budget}</span>
        <span className="flex items-center gap-0.5 text-[11px] font-extrabold uppercase tracking-wider text-blue">
          {t('card.offers', { count: offers })}
          <Icon name="chevron-right" size={13} />
        </span>
      </div>
    </Panel>
  )
}
