import type { StampTone } from '@/components/ui/StatusStamp'
import type { ApiJob, JobStatus } from '@/lib/api'
import { formatDate, formatNaira } from '@/lib/utils/format'

const JOB_TONE: Record<JobStatus, StampTone> = {
  open: 'open',
  in_progress: 'in-progress',
  completed: 'completed',
  cancelled: 'cancelled',
}

/** Cycle through the category-tile colors so neighbors never match (§2.2). */
const TAG_COLORS = ['red', 'blue', 'green', 'yellow', 'red-dark'] as const

export function toJobCardProps(job: ApiJob, language: string, t: (key: string) => string) {
  const min = formatNaira(job.budgetMin)
  const max = formatNaira(job.budgetMax)
  return {
    title: job.title ?? t('jobs.untitled'),
    category: t(`categories:${job.category?.key ?? 'masonry'}`),
    categoryColor: TAG_COLORS[(job.category?.id ?? 0) % TAG_COLORS.length],
    location: job.locationText || t('jobs.noLocation'),
    time: formatDate(job.createdAt, language),
    budget: min && max ? `${min}–${max}` : max || min || '—',
    statusTone: JOB_TONE[job.status ?? 'open'],
    offers: job.offers?.length ?? 0,
    to: `/jobs/${job.id}`,
  }
}
