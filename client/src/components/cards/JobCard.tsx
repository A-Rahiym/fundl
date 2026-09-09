import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { cx } from '@/lib/cx'
import { jobPhoto } from '@/lib/placeholders'
import type { StampTone } from '@/components/ui/StatusStamp'

const STATUS_KEY: Record<StampTone, string> = {
  open: 'status.open',
  'in-progress': 'status.inProgress',
  completed: 'status.completed',
  cancelled: 'status.cancelled',
  available: 'badge.availableNow',
  unavailable: 'badge.booked',
  neutral: 'status.open',
}

const STATUS_BG: Record<StampTone, string> = {
  open: 'bg-rose',
  'in-progress': 'bg-sky',
  completed: 'bg-mint',
  cancelled: 'bg-white',
  available: 'bg-mint',
  unavailable: 'bg-white',
  neutral: 'bg-white',
}

export interface JobCardProps {
  title: string
  category: string
  categoryColor?: string
  location: string
  time: string
  budget: string
  statusTone: StampTone
  offers?: number
  /** Photo URL — falls back to a deterministic placeholder, then initials. */
  photoUrl?: string | null
  /** Seed for the placeholder photo (e.g. job id or title). */
  photoSeed?: string
  /** When set, the card renders as a router link to this path. */
  to?: string
}

/**
 * Job card in the dashboard design language: photo tile, pastel status
 * stamp, category chip, location/time meta, bold budget bar with offer
 * count. Props-compatible with the old Workshop card — no caller changes.
 */
export function JobCard({
  title,
  category,
  location,
  time,
  budget,
  statusTone,
  offers = 0,
  photoUrl,
  photoSeed,
  to,
}: JobCardProps) {
  const { t } = useTranslation()

  const body = (
    <div
      className={cx(
        'flex h-full flex-col gap-3 rounded-3xl border-[2.5px] border-ink bg-white p-4 text-left shadow-standard transition',
        to && 'hover:-translate-y-0.5',
      )}
    >
      <PhotoTile
        src={photoUrl ?? jobPhoto(photoSeed)}
        alt={title}
        name={title}
        className="h-36 w-full"
      />
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-body text-[15px] font-extrabold leading-snug text-ink">{title}</h4>
        <span
          className={cx(
            'mt-0.5 shrink-0 rounded-full border-2 border-ink px-2.5 py-1 text-[10px] font-extrabold uppercase shadow-small',
            STATUS_BG[statusTone],
          )}
        >
          {t(STATUS_KEY[statusTone])}
        </span>
      </div>
      <span className="self-start rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold text-ink">
        {category}
      </span>
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
      <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-ink/10 pt-2.5">
        <span className="text-base font-extrabold tabular-nums text-ink">₦{budget}</span>
        <span className="flex items-center gap-0.5 text-[11px] font-extrabold uppercase tracking-wider text-ink">
          {t('card.offers', { count: offers })}
          <Icon name="chevron-right" size={13} />
        </span>
      </div>
    </div>
  )

  if (!to) return body

  return (
    <Link to={to} className="block h-full">
      {body}
    </Link>
  )
}
