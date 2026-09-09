import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import { useMyJobs } from '@/features/home/hooks/useJobsQueries'
import { useArtisans } from '@/features/artisans/hooks/useArtisansQueries'
import { DashboardShell } from './components/DashboardShell'
import { CategoryPills } from './components/CategoryPills'
import { BannerCta } from './components/BannerCta'
import { ActiveJobCard, JobRow } from './components/ActiveJobCard'
import { ArtisanCard } from '@/components/cards/ArtisanCard'
import { EscrowBanner } from './components/EscrowBanner'

const HIRE_TONES = ['sky', 'sun', 'mint'] as const

/**
 * Client dashboard (guide/screen/dashboard.html) — replaces the old
 * My Jobs list at `/app/my-jobs`. Active jobs, top fundis, and the full
 * job list all live on this one page, fed only by existing endpoints.
 */
export function DashboardPage() {
  const { t } = useTranslation()
  const jobs = useMyJobs()
  const artisans = useArtisans()

  const all = jobs.data ?? []
  const active = all.filter((j) => j.status === 'open' || j.status === 'in_progress').slice(0, 2)
  const activeCount = all.filter((j) => j.status === 'open' || j.status === 'in_progress').length
  const top = [...(artisans.data ?? [])]
    .sort((a, b) => Number(b.avgRating ?? 0) - Number(a.avgRating ?? 0))
    .slice(0, 3)

  return (
    <DashboardShell>
      <CategoryPills />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 space-y-7 overflow-y-auto bg-paper p-4 md:p-6 lg:p-7">
          <BannerCta />

          <section id="dashboard-active" className="scroll-mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg uppercase tracking-tight text-ink md:text-xl">
                  {t('dashboard.activeTitle')}
                </h3>
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-black text-white">
                  {t('dashboard.activeCount', { count: activeCount })}
                </span>
              </div>
              <a
                href="#dashboard-all-jobs"
                className="text-xs font-bold uppercase tracking-wider text-ink underline decoration-2 hover:text-ink/60"
              >
                {t('dashboard.viewAll')}
              </a>
            </div>

            {jobs.isLoading && <LoadingState skeleton />}
            {jobs.isError && (
              <ErrorState title="myJobs.loadError" retryLabel="home.retry" onRetry={() => jobs.refetch()} />
            )}
            {!jobs.isLoading && !jobs.isError && active.length === 0 && (
              <EmptyState title="myJobs.noJobs" hint="myJobs.noJobsHint" icon="check" />
            )}
            {!jobs.isLoading && !jobs.isError && active.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {active.map((job) => (
                  <ActiveJobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg uppercase tracking-tight text-ink md:text-xl">
                  {t('dashboard.topTitle')}
                </h3>
                <p className="text-xs font-medium text-ink/60">{t('dashboard.topSubtitle')}</p>
              </div>
              <Link
                to="/app/search"
                className="shrink-0 text-xs font-bold uppercase tracking-wider text-ink underline decoration-2 hover:text-ink/60"
              >
                {t('dashboard.viewAll')}
              </Link>
            </div>

            {artisans.isLoading && <LoadingState skeleton />}
            {!artisans.isLoading && !artisans.isError && top.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {top.map((artisan, i) => (
                  <ArtisanCard
                    key={artisan.id}
                    artisan={artisan}
                    action={{
                      labelKey: 'dashboard.hireNow',
                      tone: HIRE_TONES[i % HIRE_TONES.length],
                      from: 'dashboard',
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          {!jobs.isLoading && !jobs.isError && all.length > 0 && (
            <section id="dashboard-all-jobs" className="scroll-mt-4 space-y-3">
              <h3 className="font-display text-lg uppercase tracking-tight text-ink md:text-xl">
                {t('dashboard.allJobs')}
              </h3>
              {all.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </section>
          )}

          <EscrowBanner />
        </main>
      </div>
    </DashboardShell>
  )
}
