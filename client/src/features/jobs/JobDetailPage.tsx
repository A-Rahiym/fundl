import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import { Icon } from '@/components/ui/icons'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { cx } from '@/lib/cx'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { jobPhoto } from '@/lib/placeholders'
import { JOB_STATUS_LABEL } from '@/config/status'
import type { JobStatus } from '@/lib/api'
import { useSession } from '@/features/auth/hooks/useAuthQueries'
import { useJob } from './hooks/useJobQueries'
import { useAcceptOffer, useDeclineOffer } from './hooks/useOffersMutations'
import { OfferCard } from './components/OfferCard'
import { OfferForm } from './components/OfferForm'
import { ReviewForm } from './components/ReviewForm'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'

const STATUS_BG: Record<JobStatus, string> = {
  open: 'bg-rose',
  in_progress: 'bg-sky',
  completed: 'bg-mint',
  cancelled: 'bg-white',
}

function StatCell({ icon, label, children }: { icon: 'pin' | 'clock' | 'calendar' | 'wallet'; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-3 shadow-small">
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/50">
        <Icon name={icon} size={14} className="text-red" />
        {label}
      </span>
      <span className="mt-1 block truncate text-sm font-extrabold text-ink">{children}</span>
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
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <LoadingState className="pt-10" />
        </div>
      </DashboardShell>
    )
  }

  if (jobQuery.isError || !job) {
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <ErrorState
            title="jobDetail.notFound"
            action={
              <Link
                to="/app"
                className="text-xs font-extrabold uppercase tracking-wider text-ink underline underline-offset-2"
              >
                {t('jobDetail.backHome')}
              </Link>
            }
          />
        </div>
      </DashboardShell>
    )
  }

  const isOwner = user?.id === job.clientId
  const jobOpen = job.status === 'open'
  const offers = job.offers ?? []
  // Server includes `{ id }` once the owner reviews a completed job.
  const existingReview = (
    job as unknown as { review?: { id: string } | null }
  ).review
  const canReview = isOwner && job.status === 'completed' && !existingReview
  const budgetMin = formatNaira(job.budgetMin)
  const budgetMax = formatNaira(job.budgetMax)
  const status = job.status ?? 'open'

  return (
    <DashboardShell>
      <main className="mx-auto w-full max-w-[760px] space-y-5 bg-paper p-4 md:p-6">
        <Breadcrumbs
          trail={[
            isOwner
              ? { label: t('nav.myJobs'), to: '/app/my-jobs' }
              : { label: t('nav.jobs'), to: '/app' },
            { label: job.title ?? t('jobs.untitled') },
          ]}
        />

        <section className="overflow-hidden rounded-3xl border-[2.5px] border-ink bg-white shadow-window">
          <PhotoTile
            src={job.photoUrl ?? jobPhoto(job.id, job.category?.key)}
            alt={job.title ?? ''}
            name={job.title ?? ''}
            flat
            className="h-48 w-full border-b-2 border-ink sm:h-56"
          />
          <div className="space-y-4 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold">
                {t(`categories:${job.category?.key ?? ''}`)}
              </span>
              <span
                className={cx(
                  'rounded-full border-2 border-ink px-3 py-1 text-[11px] font-extrabold uppercase shadow-small',
                  STATUS_BG[status],
                )}
              >
                {t(JOB_STATUS_LABEL[status])}
              </span>
            </div>

            <h1 className="font-display text-3xl tracking-tight text-ink">{job.title}</h1>

            {job.description && (
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink/80">
                {job.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <StatCell icon="pin" label={t('jobDetail.location')}>
                {job.locationText || t('jobs.noLocation')}
              </StatCell>
              <StatCell icon="clock" label={t('jobDetail.posted')}>
                {formatDate(job.createdAt, i18n.language)}
              </StatCell>
              {job.preferredDate && (
                <StatCell icon="calendar" label={t('jobDetail.date')}>
                  {formatDate(job.preferredDate, i18n.language)}
                </StatCell>
              )}
              <StatCell icon="wallet" label={t('jobDetail.budget')}>
                ₦{budgetMin && budgetMax ? `${budgetMin}–${budgetMax}` : budgetMax || budgetMin || '—'}
              </StatCell>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl uppercase tracking-tight text-ink">
              {t('jobDetail.offersTitle')}
            </h2>
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-black text-white">
              {offers.length}
            </span>
          </div>

          {isOwner ? (
            offers.length === 0 ? (
              <EmptyState title="jobDetail.noOffers" icon="chat" />
            ) : (
              <ul className="flex flex-col gap-3">
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
          ) : user?.role === 'artisan' && jobOpen ? (
            <div className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard sm:p-6">
              <OfferForm jobId={job.id!} />
            </div>
          ) : (
            <div className="rounded-3xl border-[2.5px] border-ink bg-white p-5 text-center text-sm font-medium text-ink/60 shadow-standard">
              {t('jobDetail.closed')}
            </div>
          )}
        </section>

        {canReview && job.id && (
          <section className="space-y-4">
            <h2 className="font-display text-xl uppercase tracking-tight text-ink">
              {t('jobDetail.reviewTitle')}
            </h2>
            <div className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard sm:p-6">
              <ReviewForm jobId={job.id} />
            </div>
          </section>
        )}
      </main>
    </DashboardShell>
  )
}
