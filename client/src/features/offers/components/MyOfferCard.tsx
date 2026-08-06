import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Panel } from '@/components/ui/Panel'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Icon } from '@/components/ui/icons'
import { OFFER_STATUS_TONE } from '@/config/status'
import { formatDate, formatNaira } from '@/lib/utils/format'
import type { ApiOffer } from '@/lib/api'

/** One of the artisan's own sent offers (§7.5): job, price, status, note. */
export function MyOfferCard({ offer, language }: { offer: ApiOffer; language: string }) {
  const { t } = useTranslation()
  const job = offer.job

  return (
    <Link to={`/jobs/${offer.jobId}`} className="block h-full">
      <Panel variant="small" tilt="tilt-n5" lift className="flex h-full flex-col gap-2 p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-body text-[15px] font-bold leading-snug">{job?.title ?? t('jobs.untitled')}</p>
            <p className="mt-0.5 text-xs font-medium text-ink/60">
              {formatDate(offer.createdAt, language)} · {t(`categories:${job?.category?.key ?? 'masonry'}`)}
            </p>
          </div>
          <StatusStamp tone={OFFER_STATUS_TONE[offer.status ?? 'pending']} className="mt-0.5 shrink-0">
            {t(`offer.status.${offer.status ?? 'pending'}`)}
          </StatusStamp>
        </div>

        {offer.message && <p className="line-clamp-2 text-sm text-ink/70">{offer.message}</p>}

        <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-ink/30 pt-2.5">
          <span className="text-base font-extrabold tabular-nums">₦{formatNaira(offer.price)}</span>
          <span className="flex items-center gap-0.5 text-[11px] font-extrabold uppercase tracking-wider text-blue">
            {t('card.view')}
            <Icon name="chevron-right" size={13} />
          </span>
        </div>
      </Panel>
    </Link>
  )
}
