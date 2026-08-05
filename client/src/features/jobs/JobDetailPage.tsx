import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Panel } from '@/components/ui/Panel'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { Icon } from '@/components/ui/icons'
import type { IconName } from '@/components/ui/icons'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { JOB_STATUS_TONE, JOB_STATUS_LABEL } from '@/config/status'
import { useSession } from '@/features/auth/hooks/useAuthQueries'
import { useJob } from './hooks/useJobQueries'
import { useAcceptOffer, useDeclineOffer } from './hooks/useOffersMutations'
import { OfferCard } from './components/OfferCard'
import { OfferForm } from './components/OfferForm'

function Detail({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-ink/80">
      <Icon name={icon} size={15} className="text-ink/50" aria-hidden="true" />
      <span>{label}</span>
      <span className="font-bold text-ink">{children}</span>
    </div>
  )
}

export function JobDetailPage() {
  const { t, i18n } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const session = useSession()
  const user = session.data
  const jobQuery = useJob(id)
  const job = jobQuery.data

  const accept = useAcceptOffer(id!)
  const decline = useDeclineOffer(id!)

  if (jobQuery.isLoading) {
    return <LoadingState className="pt-10" />
  }

  if (jobQuery.isError || !job) {
    return (
      <ErrorState
        title="jobDetail.notFound"
        action={
          <Link
            to="/"
            className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
          >
            {t('jobDetail.backHome')}
          </Link>
        }
      />
    )
  }

  const isOwner = user?.id === job.clientId
  const jobOpen = job.status === 'open'
  const offers = job.offers ?? []
  const budgetMin = formatNaira(job.budgetMin)
  const budgetMax = formatNaira(job.budgetMax)

  return (
    <div className="mx-auto max-w-[720px]">
      <Link
        to="/"
        className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
      >
        {t('jobDetail.backHome')}
      </Link>

      <Panel className="mt-3 p-5 sm:p-8" tilt="tilt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CategoryTag color="red">{t(`categories:${job.category?.key ?? ''}`)}</CategoryTag>
              <StatusStamp tone={JOB_STATUS_TONE[job.status ?? 'open']}>
                {t(JOB_STATUS_LABEL[job.status ?? 'open'])}
              </StatusStamp>
            </div>
            <h1 className="mt-3 font-display text-3xl text-ink">{job.title}</h1>
          </div>
        </div>

        {job.description && (
          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink/85">{job.description}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-dashed border-ink/20 pt-4">
          <Detail icon="pin" label={t('jobDetail.location')}>
            {job.locationText || t('jobs.noLocation')}
          </Detail>
          <Detail icon="clock" label={t('jobDetail.posted')}>
            {formatDate(job.createdAt, i18n.language)}
          </Detail>
          {job.preferredDate && (
            <Detail icon="calendar" label={t('jobDetail.date')}>
              {formatDate(job.preferredDate, i18n.language)}
            </Detail>
          )}
          <Detail icon="wallet" label={t('jobDetail.budget')}>
            {budgetMin && budgetMax ? `${budgetMin}–${budgetMax}` : budgetMax || budgetMin || '—'}
          </Detail>
        </div>
      </Panel>

      <section className="mt-6">
        <h2 className="font-display text-xl text-ink">{t('jobDetail.offersTitle')}</h2>

        {isOwner ? (
          offers.length === 0 ? (
            <Panel className="mt-3 p-5 text-center text-sm font-medium text-ink/70" tilt="tilt-9">
              {t('jobDetail.noOffers')}
            </Panel>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  isOwner
                  jobOpen={jobOpen}
                  onAccept={(oid) => accept.mutate(oid)}
                  onDecline={(oid) => decline.mutate(oid)}
                  language={i18n.language}
                />
              ))}
            </ul>
          )
        ) : jobOpen ? (
          <Panel className="mt-3 p-5" tilt="tilt-5">
            <OfferForm jobId={job.id!} />
          </Panel>
        ) : (
          <Panel className="mt-3 p-5 text-center text-sm font-medium text-ink/70" tilt="tilt-9">
            {t('jobDetail.closed')}
          </Panel>
        )}
      </section>
    </div>
  )
}
