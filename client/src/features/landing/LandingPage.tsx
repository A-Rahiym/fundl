import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { StatusStamp } from '@/components/ui/StatusStamp'
import { Icon } from '@/components/ui/icons'
import { Display } from '@/components/ui/Display'
import { CategoryTile } from '@/features/landing/components/CategoryTile'
import { ArtisanCard } from '@/features/landing/components/ArtisanCard'
import { JobCard } from '@/components/cards/JobCard'
import { StickyNote } from '@/features/landing/components/StickyNote'
import { SectionHeading } from '@/features/landing/components/SectionHeading'
import { Stat } from '@/features/landing/components/Stat'
import { LANDING_ARTISANS, LANDING_CATEGORIES, LANDING_JOBS, LANDING_JOB_STATUS_TONE, LANDING_NOTES, LANDING_STEPS } from '@/config/landing'

/** The FUNDI landing page (Street register) — spec §9.1. */
export function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Header onLogin={() => navigate('/login')} onPostJob={() => navigate('/signup')} />
      <main id="top" className="mx-auto w-full max-w-[1280px] px-4 tablet:px-8">
        {/* ---- Hero (Street) ---- */}
        <section className="mt-10 grid gap-8 desktop:grid-cols-2 desktop:items-center">
          <div className="text-left">
            <Display as="p" className="font-hand text-[22px] leading-none text-ink/70">
              {t('landing:hero.tagline')}
            </Display>
            <h1 className="mt-3 font-display text-[34px] leading-[1.14] tablet:text-[44px] desktop:text-[56px]">
              <Display as="span" className="block">
                {t('landing:hero.title')}
              </Display>
              <Display as="span" className="block text-red">
                {t('landing:hero.titleAccent')}
              </Display>
            </h1>
            <p className="mt-4 max-w-md text-[15px] text-ink/70">{t('landing:hero.sub')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => navigate('/signup')}>{t('cta.postJob')}</Button>
              <Button variant="outline" onClick={() => navigate('/signup')}>{t('cta.browseFundis')}</Button>
            </div>
          </div>

          <div className="hidden justify-center desktop:flex">
            <Panel tilt="tilt-9" inset className="relative max-w-[420px] bg-red p-8 text-left text-white">
              <span className="absolute -top-2.5 left-10 h-4 w-4 rounded-full border-2 border-ink bg-yellow shadow-[1px_1px_0_var(--color-ink)]" aria-hidden="true" />
              <Display as="p" className="font-hand text-[22px] text-white/90">
                {t('landing:sign.tagline')}
              </Display>
              <Display as="p" className="mt-4 font-display text-5xl leading-none">
                {t('landing:sign.ready')}
              </Display>
              <Display as="p" className="mt-2 font-display text-5xl leading-none text-yellow">
                {t('landing:sign.carry')}
              </Display>
              <div className="mt-6 flex flex-wrap gap-2">
                <StatusStamp tone="available" icon={<Icon name="check" size={12} />}>
                  {t('badge.availableNow')}
                </StatusStamp>
                <StatusStamp tone="neutral">{t('landing:badge.openToday')}</StatusStamp>
              </div>
            </Panel>
          </div>
        </section>

        {/* ---- Stats plank (mockup §9) ---- */}
        <section className="mt-12">
          <Panel className="relative overflow-hidden bg-ink p-6 text-white tablet:p-8">
            <div className="pointer-events-none absolute inset-2 rounded-[6px] border-2 border-dashed border-white/25" aria-hidden="true" />
            <div className="grid grid-cols-1 divide-y-2 divide-white/15 tablet:grid-cols-3 tablet:divide-x-2 tablet:divide-y-0">
              <Stat value="1,200+" label={t('landing:stats.jobsDone')} />
              <Stat value="480" label={t('landing:stats.fundis')} />
              <Stat value="4.9" label={t('landing:stats.avgRating')} />
            </div>
          </Panel>
        </section>

        {/* ---- Category wall (Street) ---- */}
        <section id="trades" className="mt-20 scroll-mt-6">
          <SectionHeading kicker={t('landing:categories.kicker')} title={t('landing:categories.title')} />
          <div className="mt-6 grid grid-cols-2 gap-5 tablet:grid-cols-3 desktop:grid-cols-6">
            {LANDING_CATEGORIES.map((c, i) => (
              <CategoryTile key={c.key} index={i} icon={c.icon} name={t(`categories:${c.key}`)} count={c.count} />
            ))}
          </div>
        </section>

        {/* ---- Artisan cards (Street) ---- */}
        <section id="fundis" className="mt-20 scroll-mt-6">
          <SectionHeading kicker={t('landing:artisans.kicker')} title={t('landing:artisans.title')} />
          <div className="mt-6 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
            {LANDING_ARTISANS.map((a, i) => (
              <ArtisanCard key={a.name} index={i} {...a} category={t(`categories:${a.categoryKey}`)} />
            ))}
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" className="mt-20 scroll-mt-6">
          <SectionHeading kicker={t('landing:how.kicker')} title={t('landing:how.title')} />
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-x-9 top-[16px] hidden border-t-2 border-dashed border-ink/30 desktop:block" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-4 left-[15px] top-4 border-l-2 border-dashed border-ink/30 tablet:hidden" aria-hidden="true" />
            <div className="grid gap-10 desktop:grid-cols-4">
              {LANDING_STEPS.map((s, i) => (
                <div key={s.titleKey} className="relative flex items-start gap-3 text-left desktop:flex-col desktop:items-center desktop:text-center">
                  <span className="checkpoint__stamp relative z-10">{i + 1}</span>
                  <div className="desktop:mt-3">
                    <h3 className="font-display text-base">{t(s.titleKey)}</h3>
                    <p className="mt-1 text-sm text-ink/60">{t(s.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Job feed (Workshop register, shown on the landing) ---- */}
        <section className="mt-20">
          <SectionHeading kicker={t('landing:jobs.kicker')} title={t('landing:jobs.title')} />
          <div className="mt-6 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {LANDING_JOBS.map((j) => (
              <JobCard
                key={j.title}
                {...j}
                category={t(`categories:${j.categoryKey}`)}
                statusTone={LANDING_JOB_STATUS_TONE[j.statusKey]}
              />
            ))}
          </div>
        </section>

        {/* ---- Testimonials ---- */}
        <section className="mt-20">
          <SectionHeading kicker={t('landing:notes.kicker')} title={t('landing:notes.title')} />
          <div className="mt-8 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {LANDING_NOTES.map((n) => (
              <StickyNote key={n.attribution} {...n} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
