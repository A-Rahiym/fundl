import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { PhotoTile } from '@/components/ui/PhotoTile'

const RADAR_KEYS = ['r1', 'r2', 'r3', 'r4'] as const

/** Static market-rate showcase (no analytics endpoint yet). */
export function PriceRadarStatic() {
  const { t } = useTranslation()

  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 tablet:px-8">
      <Reveal>
        <div className="rounded-[2.5rem] border-[2.5px] border-ink bg-paper p-6 shadow-window sm:p-9">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-banner px-3 py-0.5 text-xs font-black uppercase">
                <span className="h-2 w-2 rounded-full bg-red" aria-hidden="true" />
                {t('landing:radar.eyebrow')}
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
                {t('landing:radar.title')}
              </h2>
              <p className="mt-1 text-xs font-medium text-ink/60 sm:text-sm">{t('landing:radar.sub')}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-xl border-2 border-ink bg-ink px-4 py-2 text-xs font-black uppercase text-white shadow-small">
              <span className="h-2 w-2 animate-ping rounded-full bg-green" aria-hidden="true" />
              {t('landing:radar.live')}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {RADAR_KEYS.map((k, i) => (
              <Reveal key={k} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-ink bg-white p-4 shadow-standard">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-ink/50">
                      {t(`landing:radar.${k}cat`)}
                    </div>
                    <div className="mt-1 font-display text-lg leading-tight">
                      {t(`landing:radar.${k}t`)}
                    </div>
                    <p className="mt-1 text-xs text-ink/60">{t(`landing:radar.${k}d`)}</p>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink/10 pt-3">
                    <span className="font-display text-xl text-red">{t(`landing:radar.${k}p`)}</span>
                    <span className="text-[10px] font-extrabold text-ink/50">{t(`landing:radar.${k}q`)}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/** Static vetting showcase (no verification endpoint yet). */
export function VerificationGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const checks = [t('landing:verify.c1'), t('landing:verify.c2'), t('landing:verify.c3')]

  return (
    <section id="trust" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 tablet:px-8">
      <Reveal>
        <div className="rounded-[2rem] border-[2.5px] border-ink bg-white p-6 shadow-standard sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="mb-3 inline-block rounded-full border-2 border-ink bg-banner px-3.5 py-0.5 text-xs font-black uppercase tracking-wider">
                {t('landing:verify.sticker')}
              </span>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
                {t('landing:verify.title')}
              </h2>
              <p className="mb-6 mt-2 text-xs font-medium leading-relaxed text-ink/60 sm:text-sm">
                {t('landing:verify.sub')}
              </p>
              <div className="space-y-3">
                {checks.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-mint text-xs font-black text-ink">
                      ✓
                    </span>
                    <span className="text-xs font-bold text-ink/80 sm:text-sm">{c}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="mt-6 rounded-full border-2 border-ink bg-ink px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-standard transition hover:brightness-125 active:scale-95"
              >
                {t('landing:verify.cta')}
              </button>
            </div>
            <div className="lg:col-span-6">
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-ink bg-paper p-6 text-center sm:p-8">
                <PhotoTile
                  src="https://images.pexels.com/photos/15200451/pexels-photo-15200451.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt={t('landing:verify.quoteBy')}
                  name="Musa"
                  shape="circle"
                  className="h-20 w-20"
                  textClassName="text-2xl"
                />
                <div className="rounded-xl border-2 border-ink bg-banner p-4 shadow-small">
                  <p className="font-hand text-xl leading-snug">“{t('landing:verify.quote')}”</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink/60">
                    — {t('landing:verify.quoteBy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/** Bottom black billboard CTA (static). */
export function Billboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 tablet:px-8">
      <Reveal>
        <div className="rounded-[2rem] border-[2.5px] border-ink bg-ink p-8 text-center shadow-window sm:p-12">
          <div className="mx-auto max-w-2xl">
            <span className="mb-4 inline-block -rotate-1 rounded-full border-2 border-ink bg-banner px-3.5 py-0.5 text-xs font-black uppercase tracking-wider text-ink">
              {t('landing:bill.pill')}
            </span>
            <h2 className="text-balance font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {t('landing:bill.title')}
            </h2>
            <p className="mx-auto mb-8 mt-3 max-w-lg text-xs font-medium text-white/70 sm:text-sm">
              {t('landing:bill.sub')}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="animate-cta-pulse w-full rounded-xl border-2 border-ink bg-red px-8 py-3.5 font-display text-sm uppercase tracking-wider text-white shadow-standard transition hover:brightness-110 active:scale-95 sm:w-auto sm:text-base"
              >
                {t('landing:bill.ctaPost')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full rounded-xl border-2 border-ink bg-banner px-8 py-3.5 font-display text-sm uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95 sm:w-auto sm:text-base"
              >
                {t('landing:bill.ctaJoin')}
              </button>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-bold text-white/50">
              <span>{t('landing:bill.locations')}</span>
              <span>{t('landing:bill.helpline')}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
