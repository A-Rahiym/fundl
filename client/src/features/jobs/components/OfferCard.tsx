import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import type { ApiOffer } from '@/lib/api'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { OFFER_STATUS_TONE } from '@/config/status'
import type { StampTone } from '@/components/ui/StatusStamp'

export interface OfferCardProps {
  offer: ApiOffer
  isOwner: boolean
  jobOpen: boolean
  onAccept: (offerId: string) => void
  onDecline: (offerId: string) => void
  language: string
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

/** A single offer on a job in the dashboard design language. */
export function OfferCard({ offer, isOwner, jobOpen, onAccept, onDecline, language }: OfferCardProps) {
  const { t } = useTranslation()
  const tone = OFFER_STATUS_TONE[offer.status ?? 'pending']

  return (
    <li className="flex flex-col gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-standard">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-ink">
            {offer.artisan?.name ?? t('offer.anonymous')}
          </p>
          <p className="text-xs font-medium text-ink/50">{formatDate(offer.createdAt, language)}</p>
        </div>
        <span className="shrink-0 font-display text-lg tabular-nums text-ink">
          ₦{formatNaira(offer.price)}
        </span>
      </div>

      {offer.message && <p className="text-sm text-ink/70">{offer.message}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink/10 pt-2.5">
        <span
          className={cx(
            'rounded-full border-2 border-ink px-2.5 py-1 text-[10px] font-extrabold uppercase shadow-small',
            STATUS_BG[tone],
          )}
        >
          {t(`offer.status.${offer.status ?? 'pending'}`)}
        </span>

        {isOwner && jobOpen && offer.status === 'pending' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAccept(offer.id!)}
              className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-sun px-4 py-1.5 text-xs font-extrabold uppercase shadow-small transition hover:brightness-95"
            >
              <Icon name="check" size={13} />
              {t('offer.accept')}
            </button>
            <button
              type="button"
              onClick={() => onDecline(offer.id!)}
              className="rounded-full border-2 border-ink bg-white px-4 py-1.5 text-xs font-extrabold uppercase shadow-small transition hover:bg-paper"
            >
              {t('offer.decline')}
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
