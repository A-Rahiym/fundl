import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export interface HeaderProps {
  onPostJob?: () => void
  onLogin?: () => void
}

/**
 * Public landing header: floating white rounded bar with brand, anchor
 * nav, language pill, log-in ghost and sun post-job pill.
 */
export function Header({ onPostJob, onLogin }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-7xl px-4 tablet:px-8">
      <div className="flex items-center justify-between gap-3 rounded-3xl border-2 border-ink bg-white px-4 py-2.5 shadow-window">
        <a href="#top" aria-label="FUNDI home" className="flex shrink-0 select-none items-center gap-2">
          <Logo />
          <span className="hidden -rotate-3 font-hand text-lg leading-none text-yellow-dark sm:inline">
            {t('header.tagline')}
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-bold tablet:flex" aria-label="Main">
          {(
            [
              ['#how-it-works', t('nav.howItWorks')],
              ['#trades', t('nav.trades')],
              ['#fundis', t('nav.meetFundis')],
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

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onLogin}
            className="hidden rounded-full border-2 border-ink bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-small transition hover:bg-paper tablet:inline-flex"
          >
            {t('cta.logIn')}
          </button>
          <button
            type="button"
            onClick={onPostJob}
            className="inline-flex rounded-full border-2 border-ink bg-sun px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-small transition hover:brightness-95"
          >
            {t('cta.postJob')}
          </button>
        </div>
      </div>
    </header>
  )
}
