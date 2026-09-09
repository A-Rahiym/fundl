import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { formatNaira } from '@/lib/utils/format'
import { useCompleteJob } from '@/features/jobs/hooks/useJobsMutations'
import type { ApiJob } from '@/lib/api'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { DashStamp } from './CategoryPills'
import { jobPhoto } from '@/lib/placeholders'

function statusTone(status?: string | null): 'rose' | 'sky' | 'mint' {
  if (status === 'in_progress') return 'sky'
  if (status === 'completed') return 'mint'
  return 'rose'
}

/**
 * Active job card (guide/screen/dashboard.html "Work Wey Dey Go On").
 * Photo tile, pastel status stamp, artisan/offer line, budget bar with
 * Chat / Track Work actions, plus the existing Complete action.
 */
export function ActiveJobCard({ job }: { job: ApiJob }) {
  const { t } = useTranslation()
  const completeJob = useCompleteJob()

  const budget =
    job.budgetMin && job.budgetMax
      ? `${formatNaira(job.budgetMin)}–${formatNaira(job.budgetMax)}`
      : formatNaira(job.budgetMin ?? job.budgetMax ?? '')

  const acceptedArtisan = job.offers?.find((o) => o.id === job.acceptedOfferId)?.artisan?.name
  const offerCount = job.offers?.length ?? 0
  const artisanLine = acceptedArtisan
    ? `${t('dashboard.artisan')}: ${acceptedArtisan}`
    : t('card.offers_other', { count: offerCount })

  return (
    <div className="flex flex-col justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard transition hover:-translate-y-0.5">
      <div className="flex gap-4">
        <PhotoTile
          src={job.photoUrl ?? jobPhoto(job.id)}
          alt={job.title ?? ''}
          name={job.title ?? ''}
          className="h-24 w-24 sm:h-28 sm:w-28"
        />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-body text-base font-black leading-snug text-ink">
              {job.title ?? t('jobs.untitled')}
            </h4>
            <DashStamp tone={statusTone(job.status)}>
              {t(`status.${job.status === 'in_progress' ? 'inProgress' : (job.status ?? 'open')}`)}
            </DashStamp>
          </div>
          <p className="line-clamp-2 text-xs font-medium text-ink/60">{job.description}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-ink/70">
            <span className="inline-block h-2 w-2 rounded-full border border-ink bg-green" />
            <span className="truncate">{artisanLine}</span>
            {job.locationText && (
              <>
                <span className="text-ink/30">•</span>
                <span className="truncate font-medium text-ink/50">{job.locationText}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink/10 pt-3">
        <div className="text-[11px] font-bold text-ink/50">
          <span>{t('dashboard.budget')}: </span>
          <span className="font-extrabold text-ink">₦{budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/app/notifications"
            title={t('app.comingSoon')}
            className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-small transition hover:bg-paper"
          >
            {t('dashboard.chat')}
          </Link>
          <Link
            to={`/app/jobs/${job.id}`}
            className="rounded-full border-2 border-ink bg-sun px-4 py-1.5 text-xs font-extrabold text-ink shadow-small transition hover:brightness-95"
          >
            {t('dashboard.trackWork')}
          </Link>
          {job.status === 'in_progress' && job.id && (
            <button
              type="button"
              disabled={completeJob.isPending}
              onClick={() => completeJob.mutate(job.id!)}
              className="rounded-full border-2 border-ink bg-mint px-4 py-1.5 text-xs font-extrabold text-ink shadow-small transition hover:brightness-95 disabled:opacity-60"
            >
              {completeJob.isPending ? t('myJobs.completing') : t('myJobs.complete')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/** Compact row for the "all jobs" list below the active section. */
export function JobRow({ job }: { job: ApiJob }) {
  const { t } = useTranslation()
  const budget =
    job.budgetMin && job.budgetMax
      ? `${formatNaira(job.budgetMin)}–${formatNaira(job.budgetMax)}`
      : formatNaira(job.budgetMin ?? job.budgetMax ?? '')

  return (
    <Link
      to={`/app/jobs/${job.id}`}
      className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white px-4 py-3 shadow-small transition hover:bg-paper"
    >
      <PhotoTile
        src={job.photoUrl ?? jobPhoto(job.id)}
        alt={job.title ?? ''}
        name={job.title ?? ''}
        className="h-12 w-12 !rounded-xl"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-extrabold text-ink">
          {job.title ?? t('jobs.untitled')}
        </span>
        <span className="block text-xs font-semibold text-ink/50">
          {t(`status.${job.status === 'in_progress' ? 'inProgress' : (job.status ?? 'open')}`)} • ₦
          {budget}
        </span>
      </span>
      <Icon name="chevron-right" size={18} className="shrink-0 text-ink/50" />
    </Link>
  )
}
