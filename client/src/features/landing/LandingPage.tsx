import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/icons'
import { Display } from '@/components/ui/Display'
import { Reveal } from '@/components/ui/Reveal'
import { CategoryTile } from '@/features/landing/components/CategoryTile'
import { ArtisanCard } from '@/features/landing/components/ArtisanCard'
import { JobCard } from '@/components/cards/JobCard'
import { StickyNote } from '@/features/landing/components/StickyNote'
import { SectionHeading } from '@/features/landing/components/SectionHeading'
import { Stat } from '@/features/landing/components/Stat'
import { LANDING_ARTISANS, LANDING_CATEGORIES, LANDING_JOBS, LANDING_JOB_STATUS_TONE, LANDING_NOTES, LANDING_STEPS } from '@/config/landing'

const NOTE_TONES = ['bg-candy', 'bg-mint', 'bg-paper'] as const
const NOTE_TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'] as const

/** Marquee band content — translated labels, duplicated for a seamless loop. */
function MarqueeItems() {
  const { t } = useTranslation()
  const items = [
    t('cta.postJob'),
    t('cta.browseFundis'),
    ...LANDING_CATEGORIES.map((c) => t(`categories:${c.key}`)),
  ]
  return (
    <>
      {[0, 1].map((half) => (
        <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
          {items.map((label) => (
            <span key={`${half}-${label}`} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-display text-sm uppercase tracking-wide text-ink">
                {label}
              </span>
              <Icon name="star" size={14} className="shrink-0 text-red" />
            </span>
          ))}
        </div>
      ))}
    </>
  )
}

/** The FUNDI landing page — pastel wall, motion, fully responsive. */
export function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-blush via-lilac to-banner">
      <Header onLogin={() => navigate('/login')} onPostJob={() => navigate('/signup')} />
      <main id="top" className="mx-auto w-full max-w-[1280px] px-4 tablet:px-8">
        {/* ---- Hero ---- */}
        <section className="mt-8 grid gap-8 tablet:mt-12 desktop:grid-cols-2 desktop:items-center">
          <div className="animate-pop-in text-left">
            <Display as="p" className="font-hand text-[22px] leading-none text-ink/70">
              {t('landing:hero.tagline')}
            </Display>
            <h1 className="mt-3 font-display text-[34px] leading-[1.14] tablet:text-[44px] desktop:text-[56px]">
              <Display as="span" className="block text-ink">
                {t('landing:hero.title')}
              </Display>
              <Display as="span" className="mt-1 inline-block -rotate-1 bg-sun px-3 py-1 text-red shadow-small">
                {t('landing:hero.titleAccent')}
              </Display>
            </h1>
            <p className="mt-4 max-w-md text-[15px] font-medium text-ink/70">{t('landing:hero.sub')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="rounded-full border-2 border-ink bg-ink px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-standard transition hover:brightness-125 active:scale-95"
              >
                {t('cta.postJob')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="rounded-full border-2 border-ink bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:bg-paper active:scale-95"
              >
                {t('cta.browseFundis')}
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <Panel tilt="tilt-9" inset className="animate-pop-in relative bg-red p-8 text-left text-white" >
              <span className="absolute -top-2.5 left-10 h-4 w-4 rounded-full border-2 border-ink bg-sun shadow-[1px_1px_0_var(--color-ink)]" aria-hidden="true" />
              <Display as="p" className="font-hand text-[22px] text-white/90">
                {t('landing:sign.tagline')}
              </Display>
              <Display as="p" className="mt-4 font-display text-5xl leading-none">
                {t('landing:sign.ready')}
              </Display>
              <Display as="p" className="mt-2 font-display text-5xl leading-none text-sun">
                {t('landing:sign.carry')}
              </Display>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-mint px-3 py-1 text-[11px] font-extrabold uppercase text-ink shadow-small">
                  <Icon name="check" size={12} />
                  {t('badge.availableNow')}
                </span>
                <span className="inline-flex items-center rounded-full border-2 border-ink bg-white px-3 py-1 text-[11px] font-extrabold uppercase text-ink shadow-small">
                  {t('landing:badge.openToday')}
                </span>
              </div>
            </Panel>
            <span className="animate-float absolute -left-3 top-6 hidden rounded-full border-2 border-ink bg-sky px-3 py-1 text-[11px] font-extrabold uppercase shadow-small sm:inline-block" style={{ ['--float-tilt' as string]: '-6deg' }}>
              {t('badge.topPro')}
            </span>
            <span className="animate-float-slow absolute -right-2 bottom-8 hidden rounded-full border-2 border-ink bg-candy px-3 py-1 text-[11px] font-extrabold uppercase shadow-small sm:inline-block" style={{ ['--float-tilt' as string]: '5deg' }}>
              {t('landing:badge.openToday')}
            </span>
          </div>
        </section>
      </main>

      {/* ---- Marquee band ---- */}
      <div className="mt-12 overflow-hidden border-y-[2.5px] border-ink bg-white py-3" aria-hidden="true">
        <div className="animate-marquee flex w-max">
          <MarqueeItems />
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1280px] px-4 tablet:px-8">
        {/* ---- Stats ---- */}
        <section className="mt-10">
          <Reveal>
            <div className="rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-window tablet:p-8">
              <div className="grid grid-cols-1 divide-y-2 divide-ink/10 tablet:grid-cols-3 tablet:divide-x-2 tablet:divide-y-0">
                <Stat value="1,200+" label={t('landing:stats.jobsDone')} color="text-red" />
                <Stat value="480" label={t('landing:stats.fundis')} color="text-blue" />
                <Stat value="4.9" label={t('landing:stats.avgRating')} color="text-green" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---- Category wall ---- */}
        <section id="trades" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading kicker={t('landing:categories.kicker')} title={t('landing:categories.title')} />
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 tablet:grid-cols-3 desktop:grid-cols-6">
            {LANDING_CATEGORIES.map((c, i) => (
              <Reveal key={c.key} delay={(i % 6) * 70}>
                <CategoryTile index={i} icon={c.icon} name={t(`categories:${c.key}`)} count={c.count} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Artisan cards ---- */}
        <section id="fundis" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading kicker={t('landing:artisans.kicker')} title={t('landing:artisans.title')} />
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {LANDING_ARTISANS.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 80}>
                <ArtisanCard index={i} {...a} category={t(`categories:${a.categoryKey}`)} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section id="how-it-works" className="mt-16 scroll-mt-24">
          <Reveal>
            <SectionHeading kicker={t('landing:how.kicker')} title={t('landing:how.title')} />
          </Reveal>
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-x-9 top-[16px] hidden border-t-2 border-dashed border-ink/30 desktop:block" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-4 left-[15px] top-4 border-l-2 border-dashed border-ink/30 tablet:hidden" aria-hidden="true" />
            <div className="grid gap-4 desktop:grid-cols-4 desktop:gap-6">
              {LANDING_STEPS.map((s, i) => (
                <Reveal key={s.titleKey} delay={i * 90}>
                  <div className="relative flex h-full items-start gap-3 rounded-3xl border-2 border-ink bg-white p-5 text-left shadow-standard desktop:flex-col desktop:items-center desktop:text-center">
                    <span className="checkpoint__stamp relative z-10 shrink-0">{i + 1}</span>
                    <div className="desktop:mt-2">
                      <h3 className="font-display text-base">{t(s.titleKey)}</h3>
                      <p className="mt-1 text-sm text-ink/60">{t(s.descKey)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Job feed ---- */}
        <section className="mt-16">
          <Reveal>
            <SectionHeading kicker={t('landing:jobs.kicker')} title={t('landing:jobs.title')} />
          </Reveal>
          <div className="mt-6 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {LANDING_JOBS.map((j, i) => (
              <Reveal key={j.title} delay={(i % 3) * 80}>
                <JobCard
                  {...j}
                  category={t(`categories:${j.categoryKey}`)}
                  statusTone={LANDING_JOB_STATUS_TONE[j.statusKey]}
                  photoSeed={j.title}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Testimonials ---- */}
        <section className="mt-16">
          <Reveal>
            <SectionHeading kicker={t('landing:notes.kicker')} title={t('landing:notes.title')} />
          </Reveal>
          <div className="mt-8 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {LANDING_NOTES.map((n, i) => (
              <Reveal key={n.attribution} delay={(i % 3) * 80}>
                <StickyNote
                  {...n}
                  className={`${NOTE_TONES[i % NOTE_TONES.length]} ${NOTE_TILTS[i % NOTE_TILTS.length]}`}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
