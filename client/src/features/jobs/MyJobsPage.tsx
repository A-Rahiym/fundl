import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import { JOB_STATUS_TONE } from '@/config/status'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { useMyJobs } from '@/features/home/hooks/useJobsQueries'
import { useCompleteJob } from './hooks/useJobsMutations'
import { JobCard } from '@/components/cards/JobCard'

/** The client's posted jobs (`/my-jobs`), with offers count and complete action. */
export function MyJobsPage() {
  const { t, i18n } = useTranslation()
  const jobs = useMyJobs()
  const completeJob = useCompleteJob()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-3xl text-ink">{t('myJobs.title')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('myJobs.subtitle')}</p>
      </div>

      {jobs.isLoading && <LoadingState skeleton />}

      {jobs.isError && (
        <ErrorState title="myJobs.loadError" retryLabel="home.retry" onRetry={() => jobs.refetch()} />
      )}

      {!jobs.isLoading && !jobs.isError && jobs.data && jobs.data.length === 0 && (
        <EmptyState title="myJobs.noJobs" hint="myJobs.noJobsHint" icon="check" />
      )}

      {!jobs.isLoading && !jobs.isError && jobs.data && jobs.data.length > 0 && (
        <div className="grid gap-4 tablet:grid-cols-2">
          {jobs.data.map((job) => {
            const budget =
              job.budgetMin && job.budgetMax
                ? `${formatNaira(job.budgetMin)}–${formatNaira(job.budgetMax)}`
                : formatNaira(job.budgetMin ?? job.budgetMax ?? '')
            return (
              <div key={job.id} className="flex flex-col gap-3">
                <JobCard
                  title={job.title ?? ''}
                  category={t(`categories:${job.category?.key ?? 'masonry'}`)}
                  categoryColor="red"
                  location={job.locationText ?? ''}
                  time={formatDate(job.createdAt, i18n.language)}
                  budget={budget}
                  statusTone={JOB_STATUS_TONE[job.status ?? 'open']}
                  offers={job.offers?.length ?? 0}
                  to={`/jobs/${job.id}`}
                />
                {job.status === 'in_progress' && job.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start"
                    disabled={completeJob.isPending}
                    onClick={() => completeJob.mutate(job.id!)}
                  >
                    {completeJob.isPending ? t('myJobs.completing') : t('myJobs.complete')}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
