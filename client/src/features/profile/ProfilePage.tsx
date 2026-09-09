import { Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { STAMP_LABEL } from '@/config/status'
import { formatDate, formatNaira } from '@/lib/utils/format'
import { fundiPhoto } from '@/lib/placeholders'
import { useSession } from '@/features/auth/hooks/useAuthQueries'
import { useArtisanMe } from '@/features/artisans/hooks/useArtisansQueries'
import { useMyJobs } from '@/features/home/hooks/useJobsQueries'
import { DashboardShell } from '@/features/dashboard/components/DashboardShell'

/** The signed-in user's own profile (`/profile`) in the dashboard design language. */
export function ProfilePage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const session = useSession()
  const user = session.data

  const isArtisan = user?.role === 'artisan'
  const artisanQuery = useArtisanMe()
  const jobsQuery = useMyJobs(!isArtisan)

  const artisan = artisanQuery.data
  const rate = artisan?.rateAmount
    ? `₦${formatNaira(artisan.rateAmount)}/${t(`rateType.${artisan.rateType ?? 'negotiable'}`)}`
    : t('rateType.negotiable')

  const jobs = jobsQuery.data ?? []
  const statPosted = jobs.length
  const statActive = jobs.filter((j) => j.status === 'open' || j.status === 'in_progress').length
  const statDone = jobs.filter((j) => j.status === 'completed').length

  // Go-To Fundis: unique artisans from accepted offers (actually hired).
  const goTo = useMemo(() => {
    const seen = new Map<string, { id: string; name: string; jobTitle: string; jobId: string }>()
    for (const job of jobsQuery.data ?? []) {
      const hired = job.offers?.find((o) => o.id === job.acceptedOfferId)?.artisan
      if (hired?.id && !seen.has(hired.id)) {
        seen.set(hired.id, {
          id: hired.id,
          name: hired.name ?? t('offer.anonymous'),
          jobTitle: job.title ?? t('jobs.untitled'),
          jobId: job.id ?? '',
        })
      }
    }
    return [...seen.values()]
  }, [jobsQuery.data, t])

  if (session.isLoading) {
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <LoadingState className="pt-10" />
        </div>
      </DashboardShell>
    )
  }

  if (!user) {
    return (
      <DashboardShell>
        <div className="bg-paper p-4 md:p-6">
          <ErrorState title="profile.notFound" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <main className="mx-auto w-full max-w-[760px] space-y-5 bg-paper p-4 md:p-6">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-ink">{t('profile.title')}</h1>
          <p className="mt-1 text-sm font-medium text-ink/60">{t('profile.subtitle')}</p>
        </div>

        <section className="relative rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard sm:p-8">
          <div className="absolute -top-4 right-6 rotate-2 rounded-full border-2 border-ink bg-red px-4 py-1.5 text-[11px] font-extrabold uppercase text-white shadow-small sm:right-10">
            {t(`auth.role${user.role === 'artisan' ? 'Artisan' : 'Client'}`)}
            {isArtisan && artisan?.isVerified ? ` • ${t('artisan.verified')}` : ''}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <PhotoTile
              src={fundiPhoto(user.id)}
              alt={user.name ?? ''}
              name={user.name ?? ''}
              className="mx-auto h-24 w-24 !rounded-full sm:mx-0"
            />

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h2 className="font-display text-2xl uppercase text-ink">{user.name}</h2>
              <p className="mt-0.5 truncate text-sm font-medium text-ink/60">
                {user.email}
                {user.phone ? ` · ${user.phone}` : ''}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {user.locationText && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink/50">
                    <Icon name="pin" size={14} className="text-red" />
                    {user.locationText}
                  </span>
                )}
                {user.createdAt && (
                  <span className="text-xs font-medium text-ink/50">
                    {t('profile.joined')} {formatDate(user.createdAt, i18n.language)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {isArtisan && !artisanQuery.isLoading && !artisanQuery.isError && artisan && (
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t-2 border-ink/10 pt-4">
              <span className="rounded-full border border-ink bg-paper px-2.5 py-1 text-[10px] font-bold">
                {t(`categories:${artisan.category?.key ?? 'masonry'}`)}
              </span>
              <span
                className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase shadow-small ${artisan.isAvailable ? 'bg-mint' : 'bg-white'}`}
              >
                {t(artisan.isAvailable ? 'badge.available' : 'badge.booked')}
              </span>
              <span className="text-sm font-extrabold tabular-nums">{rate}</span>
            </div>
          )}

          {/* Stat row: clients count jobs, artisans show rating/reviews/rate — all real data. */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t-2 border-ink/10 pt-4">
            {!isArtisan ? (
              <>
                <div className="rounded-2xl border-2 border-ink bg-sky p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statPosted')}</span>
                  <span className="mt-0.5 block font-display text-xl text-ink">{statPosted}</span>
                </div>
                <div className="rounded-2xl border-2 border-ink bg-paper p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statActive')}</span>
                  <span className="mt-0.5 block font-display text-xl text-ink">{statActive}</span>
                </div>
                <div className="rounded-2xl border-2 border-ink bg-mint p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statDone')}</span>
                  <span className="mt-0.5 block font-display text-xl text-ink">{statDone}</span>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border-2 border-ink bg-sun p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statRating')}</span>
                  <span className="mt-0.5 block font-display text-xl text-ink">
                    {Number(artisan?.avgRating ?? 0).toFixed(1)}
                  </span>
                </div>
                <div className="rounded-2xl border-2 border-ink bg-paper p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statReviews')}</span>
                  <span className="mt-0.5 block font-display text-xl text-ink">{artisan?.reviewCount ?? 0}</span>
                </div>
                <div className="rounded-2xl border-2 border-ink bg-sky p-3 text-center shadow-small">
                  <span className="block text-[10px] font-bold uppercase text-ink/60">{t('profile.statRate')}</span>
                  <span className="mt-0.5 block truncate font-display text-lg text-ink">{rate}</span>
                </div>
              </>
            )}
          </div>
        </section>

        {isArtisan && artisanQuery.isError && !artisan && (
          <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
            <div className="flex items-start gap-3">
              <Icon name="wrench" size={20} className="mt-0.5 shrink-0 text-ink/50" aria-hidden="true" />
              <div>
                <h3 className="font-display text-base text-ink">{t('profile.noArtisanProfile')}</h3>
                <p className="mt-1 text-sm text-ink/60">{t('profile.noArtisanProfileHint')}</p>
              </div>
            </div>
          </section>
        )}

        {isArtisan && !artisanQuery.isLoading && artisan && artisan.bio && (
          <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
            <h3 className="font-display text-lg text-ink">{t('artisan.about')}</h3>
            <p className="mt-1 text-sm text-ink/70">{artisan.bio}</p>
          </section>
        )}

        {isArtisan && !artisanQuery.isLoading && artisan && artisan.stamps && artisan.stamps.length > 0 && (
          <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
            <h3 className="font-display text-lg text-ink">{t('artisan.stamps')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {artisan.stamps.map((stamp) => (
                <span
                  key={stamp}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-sun px-3 py-1 text-xs font-bold"
                >
                  <Icon name="flame" size={12} />
                  {t(STAMP_LABEL[stamp] ?? 'artisan.stampUnknown')}
                </span>
              ))}
            </div>
          </section>
        )}

        {!isArtisan && (
          <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
            <h3 className="font-display text-lg text-ink">{t('profile.quickActions')}</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/app/post')}
                className="rounded-full border-2 border-ink bg-sun px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95"
              >
                {t('profile.postJob')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/app/my-jobs')}
                className="rounded-full border-2 border-ink bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:bg-paper"
              >
                {t('profile.myJobs')}
              </button>
            </div>
          </section>
        )}

        {!isArtisan && !jobsQuery.isLoading && !jobsQuery.isError && (
          <section className="space-y-4">
            <div>
              <h3 className="font-display text-xl uppercase tracking-tight text-ink">
                {t('profile.goToTitle')}{' '}
                <span className="font-hand text-lg normal-case text-ink/60">{t('profile.goToSub')}</span>
              </h3>
            </div>
            {goTo.length === 0 ? (
              <p className="text-sm font-medium text-ink/50">{t('profile.goToEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {goTo.map((g) => (
                  <div
                    key={g.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border-2 border-ink bg-white p-4 shadow-standard"
                  >
                    <div className="flex items-center gap-3">
                      <PhotoTile
                        src={fundiPhoto(g.id)}
                        alt={g.name}
                        name={g.name}
                        className="h-16 w-16 !rounded-xl"
                      />
                      <div className="min-w-0">
                        <h4 className="truncate text-base font-extrabold text-ink">{g.name}</h4>
                        <p className="truncate text-xs font-medium text-ink/50">
                          {t('profile.goToHiredFor')} {g.jobTitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-t border-ink/10 pt-3">
                      <button
                        type="button"
                        onClick={() => navigate('/app/post')}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-sun px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider shadow-small transition hover:brightness-95"
                      >
                        <Icon name="bolt" size={14} />
                        {t('dashboard.hireNow')}
                      </button>
                      <Link
                        to={`/app/artisans/${g.id}`}
                        aria-label={g.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper shadow-small transition hover:bg-white"
                      >
                        <Icon name="user" size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="flex items-center justify-between rounded-3xl border-[2.5px] border-ink bg-white px-5 py-3 shadow-standard">
          <span className="text-sm font-bold text-ink">{t('profile.language')}</span>
          <LanguageSwitcher />
        </div>

        <p className="pb-2 text-center text-xs font-medium text-ink/40">
          <Link to="/app/my-jobs" className="underline underline-offset-2 hover:text-ink">
            {t('jobDetail.backHome')}
          </Link>
        </p>
      </main>
    </DashboardShell>
  )
}
