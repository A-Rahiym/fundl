import type { CSSProperties, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Icon } from '@/components/ui/icons'
import { categoryIcon } from '@/lib/categoryIcons'
import { FALLBACK_CATEGORIES } from '@/config/categories'

export interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Two-pane auth frame: form card + visual side panel on desktop,
 * compact banner stacked above the form on mobile.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blush via-lilac to-banner px-4 py-12">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-8 flex flex-col items-center gap-1 lg:hidden">
        <Logo />
        <span className="-rotate-3 font-hand text-xl leading-none text-yellow-dark">
          {t('header.tagline')}
        </span>
      </div>

      <div className="grid w-full max-w-105 gap-0 lg:max-w-4xl lg:grid-cols-2">
        <div className="rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-window sm:p-8 lg:rounded-r-none lg:border-r-0">
          <h1 className="font-display text-2xl uppercase tracking-tight text-ink">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm font-medium text-ink/60">{subtitle}</p>
          )}

          <div className={cx('mt-6 flex flex-col gap-4')}>{children}</div>
        </div>

        <div className="relative hidden flex-col justify-between gap-6 overflow-hidden rounded-r-3xl border-[2.5px] border-ink bg-gradient-to-br from-banner via-candy to-sky p-8 shadow-window lg:flex">
          <div>
            <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-tight text-ink">
              {t('auth.sideTitle')}
            </h2>
            <p className="mt-2 max-w-xs text-sm font-medium text-ink/70">{t('auth.sideBody')}</p>
          </div>
          <div
            className="relative mx-auto aspect-square w-full max-w-[300px]"
            role="presentation"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </span>
            {FALLBACK_CATEGORIES.map((c, i) => (
              <span
                key={c.key}
                className="animate-orbit absolute inset-0"
                style={
                  {
                    '--orbit-from': `${i * 60}deg`,
                    animationDelay: `${-(i * 4)}s`,
                  } as CSSProperties
                }
              >
                <span className="absolute left-1/2 top-0 -translate-x-1/2">
                  <span
                    className="animate-orbit-reverse inline-flex items-center gap-1 whitespace-nowrap rounded-full border-2 border-ink bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-small"
                    style={
                      {
                        '--orbit-from': `${i * 60}deg`,
                        animationDelay: `${-(i * 4)}s`,
                      } as CSSProperties
                    }
                  >
                    <Icon name={categoryIcon(c.key)} size={13} />
                    {t(`categories:${c.key}`)}
                  </span>
                </span>
              </span>
            ))}
          </div>
          <span className="-rotate-2 font-hand text-2xl leading-none text-ink/70">
            {t('header.tagline')}
          </span>
        </div>
      </div>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-ink/60">
        {t('footer.tagline')}
      </p>
    </div>
  )
}
