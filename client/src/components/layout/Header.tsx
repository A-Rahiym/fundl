import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

/**
 * Public landing header per new spec: floating white pill, brand +
 * sticker, anchor nav, Sign In link, red Post pill. Language pill kept.
 */
export function Header({ onPostJob, onLogin }: { onPostJob?: () => void; onLogin?: () => void }) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-7xl px-4 tablet:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-white px-4 py-3 shadow-window">
        <div className="flex items-center gap-3">
          <a href="#top" aria-label="FUNDI home" className="flex shrink-0 select-none items-center gap-2">
            <Logo />
            <span className="hidden -rotate-1 rounded-full border-2 border-ink bg-banner px-3 py-0.5 text-xs font-black uppercase md:inline-block">
              {t('landing:header.sticker')}
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-xs font-extrabold uppercase tracking-wide lg:flex" aria-label="Main">
            {(
              [
                ['#how-it-works', t('nav.howItWorks')],
                ['#trades', t('nav.trades')],
                ['#pricing', t('landing:header.navPricing')],
                ['#trust', t('landing:header.navTrust')],
              ] as const
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 text-ink/70 transition hover:bg-paper hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onLogin}
            className="hidden rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-ink transition hover:underline sm:inline-block"
          >
            {t('landing:header.signIn')}
          </button>
          <button
            type="button"
            onClick={onPostJob}
            className="rounded-full border-2 border-ink bg-red px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-small transition hover:brightness-110"
          >
            {t('landing:header.postJob')}
          </button>
        </div>
      </div>
    </header>
  )
}
