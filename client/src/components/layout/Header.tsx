import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export interface HeaderProps {
  /** Street register tilts the signboard; Workshop keeps it flat (§1.2). */
  register?: 'street' | 'workshop'
  onPostJob?: () => void
  onLogin?: () => void
}

/**
 * Header signboard panel (§7.9): ink fill, white wordmark, yellow shadow.
 * Slight rotation in Street contexts; flattened inside the app shell.
 */
export function Header({ register = 'street', onPostJob, onLogin }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="mx-auto w-full max-w-7xl px-4 tablet:px-8">
      <div
        className={cx(
          'header-sign flex items-center justify-between gap-4 px-5 py-3',
          register === 'street' && 'tilt-n5',
        )}
      >
        <a href="#" aria-label="FUNDI home" className="shrink-0">
          <Logo onDark />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold tablet:flex" aria-label="Main">
          <a href="#" className="transition-colors hover:text-yellow">
            {t('nav.howItWorks')}
          </a>
          <a href="#" className="transition-colors hover:text-yellow">
            {t('nav.trades')}
          </a>
          <a href="#" className="transition-colors hover:text-yellow">
            {t('nav.meetFundis')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="on-dark" size="sm" onClick={onLogin} className="hidden tablet:inline-flex">
            {t('cta.logIn')}
          </Button>
          <Button size="sm" onClick={onPostJob}>
            {t('cta.postJob')}
          </Button>
        </div>
      </div>
    </header>
  )
}
