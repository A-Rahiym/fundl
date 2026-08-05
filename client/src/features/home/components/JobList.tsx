import { useTranslation } from 'react-i18next'
import { JobCard } from '@/components/cards/JobCard'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import type { ApiJob } from '@/lib/api'
import { toJobCardProps } from '../jobToCardProps'

export function JobList({
  jobs,
  loading,
  error,
  onRetry,
  language,
}: {
  jobs: ApiJob[]
  loading: boolean
  error: boolean
  onRetry: () => void
  language: string
}) {
  const { t } = useTranslation()

  if (loading) return <LoadingState skeleton />

  if (error) {
    return <ErrorState title="home.loadError" retryLabel="home.retry" onRetry={onRetry} />
  }

  if (jobs.length === 0) return <EmptyState title="home.noJobs" hint="home.noJobsHint" icon="hammer" />

  return (
    <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} {...toJobCardProps(job, language, t)} />
      ))}
    </div>
  )
}
