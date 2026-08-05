import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Icon } from '@/components/ui/icons'
import type { ApiOffer } from '@/lib/api'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { OFFER_STATUS_TONE } from '@/config/status'

export interface OfferCardProps {
  offer: ApiOffer
  isOwner: boolean
  jobOpen: boolean
  onAccept: (offerId: string) => void
  onDecline: (offerId: string) => void
  language: string
}

/** A single offer on a job (§7.5): artisan, price, message, status + owner actions. */
export function OfferCard({ offer, isOwner, jobOpen, onAccept, onDecline, language }: OfferCardProps) {
  const { t } = useTranslation()

  return (
    <li className="panel flex flex-col gap-2 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-body text-sm font-bold text-ink">{offer.artisan?.name ?? t('offer.anonymous')}</p>
          <p className="text-xs font-medium text-ink/60">{formatDate(offer.createdAt, language)}</p>
        </div>
        <span className="text-base font-extrabold tabular-nums">₦{formatNaira(offer.price)}</span>
      </div>

      {offer.message && <p className="text-sm text-ink/80">{offer.message}</p>}

      <div className="flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-2">
        <StatusStamp tone={OFFER_STATUS_TONE[offer.status ?? 'pending']}>
          {t(`offer.status.${offer.status ?? 'pending'}`)}
        </StatusStamp>

        {isOwner && jobOpen && offer.status === 'pending' && (
          <div className="flex items-center gap-2">
            <Button variant="green" size="sm" onClick={() => onAccept(offer.id!)}>
              <Icon name="check" size={13} />
              {t('offer.accept')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDecline(offer.id!)}>
              {t('offer.decline')}
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}
