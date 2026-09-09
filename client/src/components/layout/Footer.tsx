import { useTranslation } from 'react-i18next'

/**
 * Landing footer per new spec: brand + guarantee, services, security,
 * trade hubs columns and a legal stripe. All links are placeholders.
 */
export function Footer() {
  const { t } = useTranslation()
  const services = ['s1', 's2', 's3', 's4', 's5'] as const
  const security = ['e1', 'e2', 'e3', 'e4', 'e5'] as const
  const hubs = ['h1', 'h2', 'h3', 'h4', 'h5'] as const

  return (
    <footer className="overflow-x-clip border-t-2 border-ink bg-paper px-4 pb-8 pt-12 tablet:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink bg-ink font-display text-lg text-sun">
                F
              </span>
              <span className="font-display text-2xl tracking-tight">FUNDI</span>
            </div>
            <p className="mb-4 text-xs font-medium leading-relaxed text-ink/60">
              {t('landing:foot.blurb')}
            </p>
            <span className="inline-block rounded-md border-2 border-ink bg-banner px-3 py-1 text-[11px] font-black uppercase">
              {t('landing:foot.guarantee')}
            </span>
          </div>
          <div>
            <h4 className="mb-3 font-display text-xs uppercase tracking-wider">
              {t('landing:foot.services')}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-ink/70">
              {services.map((k) => (
                <li key={k}>
                  <a className="transition hover:underline" href="#">
                    {t(`landing:foot.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-xs uppercase tracking-wider">
              {t('landing:foot.security')}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-ink/70">
              {security.map((k) => (
                <li key={k}>
                  <a className="transition hover:underline" href="#">
                    {t(`landing:foot.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-xs uppercase tracking-wider">
              {t('landing:foot.hubs')}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-ink/70">
              {hubs.map((k) => (
                <li key={k}>{t(`landing:foot.${k}`)}</li>
              ))}
              <li className="pt-2 text-[11px] text-red">{t('landing:foot.hot')}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink/15 pt-6 text-xs font-extrabold text-ink/60">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-ink">FUNDI</span>
            <span>— {t('landing:foot.blurb')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{t('landing:foot.cities')}</span>
            <span>•</span>
            <span>{t('landing:foot.copy')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
