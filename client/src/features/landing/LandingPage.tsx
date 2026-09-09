import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Icon } from '@/components/ui/icons'
import { Display } from '@/components/ui/Display'
import { Reveal } from '@/components/ui/Reveal'
import { Ticker } from '@/features/landing/components/Ticker'
import { PriceRadarStatic, VerificationGrid, Billboard } from '@/features/landing/components/TrustSections'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { LANDING_CATEGORIES, LANDING_NOTES, LANDING_STEPS } from '@/config/landing'
import { FALLBACK_CATEGORIES } from '@/config/categories'
const HERO_ZONES = [
  { label: 'Lagos — Island & Mainland', value: 'Lagos' },
  { label: 'Abuja FCT', value: 'Abuja' },
  { label: 'Port Harcourt', value: 'Port Harcourt' },
  { label: 'Kano State', value: 'Kano' },
] as const

/** Curated trade-action shots (Pexels License, verified loadable). */
const HERO_PHOTOS = [
  'https://images.pexels.com/photos/21812146/pexels-photo-21812146.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/7480718/pexels-photo-7480718.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/37409122/pexels-photo-37409122.jpeg?auto=compress&cs=tinysrgb&w=400',
]

/** Reviewer portraits matching the testimonial subjects. */
const TESTI_PHOTOS = [
  'https://images.pexels.com/photos/15200454/pexels-photo-15200454.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/18746550/pexels-photo-18746550.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/16552855/pexels-photo-16552855.jpeg?auto=compress&cs=tinysrgb&w=400',
]

const TRADE_ALIASES: Record<string, string> = {
  plumber: 'plumbing',
  electrician: 'electrical',
  electricals: 'electrical',
  carpenter: 'carpentry',
  tailor: 'tailoring',
  painter: 'painting',
  mason: 'masonry',
}

function matchCategoryKey(input: string): string | undefined {
  const q = input.trim().toLowerCase()
  if (!q) return undefined
  const keys = FALLBACK_CATEGORIES.map((c) => c.key ?? '')
  const direct = keys.find((k) => k && (q.includes(k) || k.includes(q)))
  if (direct) return direct
  const alias = Object.entries(TRADE_ALIASES).find(([word]) => q.includes(word))
  return alias?.[1]
}

/** Landing page per new spec: ticker, centered hero, guilds, steps, radar, verification, testimonials, billboard. */
export function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [trade, setTrade] = useState('')
  const [zone, setZone] = useState<string>(HERO_ZONES[0].value)

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    const category = matchCategoryKey(trade)
    if (category) params.set('category', category)
    if (zone) params.set('location', zone)
    navigate(`/app/search?${params.toString()}`)
  }

  return (
    <div className="overflow-x-clip bg-gradient-to-br from-blush via-lilac to-banner">
      <Ticker />
      <Header onLogin={() => navigate('/login')} onPostJob={() => navigate('/signup')} />

      <main id="top" className="mx-auto w-full max-w-7xl px-4 tablet:px-8">
        {/* ---- Hero ---- */}
        <div className="animate-pop-in mx-auto max-w-4xl pb-10 pt-8 text-center sm:pb-14 sm:pt-12">
          <span className="mb-6 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-ink bg-banner px-4 py-1 text-xs font-black uppercase tracking-wider shadow-small">
            <span className="h-2 w-2 animate-ping rounded-full bg-green" aria-hidden="true" />
            {t('landing:hero.badge')}
          </span>
          <h1 className="mb-4 text-balance font-display text-4xl uppercase leading-[1.02] tracking-tight sm:text-6xl">
            <Display as="span" className="block">
              {t('landing:hero.title')}
            </Display>
            <Display as="span" className="block text-red">
              {t('landing:hero.accent')}
            </Display>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-ink/70 sm:text-lg">
            {t('landing:hero.sub')}
          </p>

          <form
            onSubmit={onSearch}
            className="mx-auto mb-6 flex max-w-3xl flex-col items-center gap-2 rounded-2xl border-[2.5px] border-ink bg-white p-2.5 shadow-window sm:flex-row sm:rounded-full"
          >
            <div className="flex w-full items-center gap-2 border-b-2 border-ink/10 px-3 pb-2 sm:w-1/2 sm:border-b-0 sm:border-r-2 sm:pb-0">
              <Icon name="search" size={18} className="shrink-0 text-ink/40" />
              <input
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                placeholder={t('landing:hero.tradePh')}
                aria-label={t('landing:hero.tradePh')}
                className="w-full bg-transparent text-xs font-bold text-ink outline-none placeholder:text-ink/40 sm:text-sm"
                type="text"
              />
            </div>
            <div className="flex w-full items-center gap-2 border-b-2 border-ink/10 px-3 pb-2 sm:w-1/3 sm:border-b-0 sm:pb-0">
              <Icon name="pin" size={16} className="shrink-0 text-ink/40" />
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                aria-label={t('landing:hero.tradePh')}
                className="w-full cursor-pointer bg-transparent text-xs font-bold text-ink/70 outline-none sm:text-sm"
              >
                {HERO_ZONES.map((z) => (
                  <option key={z.value} value={z.value}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="animate-cta-pulse w-full rounded-xl border-2 border-ink bg-red px-7 py-3 font-display text-sm uppercase tracking-wider text-white shadow-small transition hover:brightness-110 active:scale-95 sm:w-auto sm:rounded-full sm:text-base"
            >
              {t('landing:hero.find')}
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[t('landing:hero.trust1'), t('landing:hero.trust2'), t('landing:hero.trust3')].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-[11px] font-extrabold shadow-small"
              >
                <Icon name="check" size={14} className="text-green" />
                {label}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
            {HERO_PHOTOS.map((src, i) => (
              <Reveal key={src} delay={i * 100}>
                <PhotoTile
                  src={src}
                  alt={t('landing:photoAlt')}
                  name={t('landing:photoAlt')}
                  className={`h-28 w-full sm:h-44 ${i === 0 ? '-rotate-1' : i === 1 ? 'rotate-1' : '-rotate-[0.5deg]'}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      {/* ---- Guilds ribbon ---- */}
      <section id="trades" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 tablet:px-8">
        <Reveal>
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-red" aria-hidden="true" />
              <h2 className="font-display text-2xl uppercase tracking-tight">
                {t('landing:guilds.title')}
              </h2>
            </div>
            <span className="text-xs font-bold text-ink/60">{t('landing:guilds.stat')}</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {LANDING_CATEGORIES.map((c, i) => (
            <Reveal key={c.key} delay={(i % 6) * 60}>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="group flex w-full flex-col items-center justify-center rounded-2xl border-[2.5px] border-ink bg-white p-4 text-center shadow-small transition hover:-translate-y-1 hover:bg-banner"
              >
                <span className="mb-2 transition group-hover:scale-110">
                  <Icon name={c.icon} size={30} />
                </span>
                <span className="font-display text-sm uppercase">{t(`categories:${c.key}`)}</span>
                <span className="mt-0.5 text-[10px] font-bold text-ink/50">{c.count}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Steps ---- */}
      <section id="how-it-works" className="mx-auto my-14 w-full max-w-7xl scroll-mt-24 px-4 tablet:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="mb-2 inline-block -rotate-1 rounded-full border-2 border-ink bg-banner px-3.5 py-0.5 text-xs font-black uppercase tracking-wider">
              {t('landing:steps.eyebrow')}
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
              {t('landing:steps.title')}
            </h2>
            <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{t('landing:steps.sub')}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {LANDING_STEPS.map((s, i) => (
            <Reveal key={s.titleKey} delay={i * 90}>
              <div className="relative flex h-full flex-col justify-between rounded-2xl border-[2.5px] border-ink bg-white p-6 shadow-standard transition hover:-translate-y-1">
                <div className="absolute -top-3 left-6 rounded-full border-2 border-ink bg-ink px-3 py-0.5 text-xs font-black text-sun">
                  STEP 0{i + 1}
                </div>
                <div className="pt-2">
                  <Icon name={s.icon} size={30} className="mb-3 text-red" />
                  <h3 className="mb-2 font-display text-lg uppercase">{t(s.titleKey)}</h3>
                  <p className="text-xs font-medium leading-relaxed text-ink/70">{t(s.descKey)}</p>
                </div>
                <div className="mt-4 flex justify-between border-t-2 border-ink/10 pt-3 text-xs font-extrabold text-ink/50">
                  <span>{t(s.footAKey)}</span>
                  <span className="text-green">{t(s.footBKey)}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="my-14">
        <PriceRadarStatic />
      </div>
      <div className="my-14">
        <VerificationGrid />
      </div>

      {/* ---- Testimonials ---- */}
      <section className="mx-auto w-full max-w-7xl px-4 tablet:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
              {t('landing:testi.title')}
            </h2>
            <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{t('landing:testi.sub')}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {LANDING_NOTES.map((n, i) => {
            const name = t(n.nameKey)
            return (
              <Reveal key={n.quoteKey} delay={i * 90}>
                <div className="flex h-full flex-col justify-between rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-standard transition hover:-translate-y-1">
                  <div>
                    <div className="mb-3 flex items-center gap-1 text-red" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Icon key={s} name="star" size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-ink/80 sm:text-sm">
                      “{t(n.quoteKey)}”
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t-2 border-ink/10 pt-4">
                    <PhotoTile
                      src={TESTI_PHOTOS[i % TESTI_PHOTOS.length]!}
                      alt={name}
                      name={name}
                      shape="circle"
                      className="h-9 w-9"
                      textClassName="text-xs"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-xs font-extrabold">{name}</div>
                      <div className="truncate text-[10px] font-medium text-ink/50">{t(n.roleKey)}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <div className="my-16">
        <Billboard />
      </div>

      <Footer />
    </div>
  )
}
