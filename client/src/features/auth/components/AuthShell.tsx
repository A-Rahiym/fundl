import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Centered framed card for sign up / log in: gradient backdrop, white
 * rounded frame, brand wordmark, flag-less language pill.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blush via-lilac to-banner px-4 py-12">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-8 flex flex-col items-center gap-1">
        <Logo />
        <span className="-rotate-3 font-hand text-xl leading-none text-yellow-dark">
          {t('header.tagline')}
        </span>
      </div>

      <div className="w-full max-w-105 rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-window sm:p-8">
        <h1 className="font-display text-2xl uppercase tracking-tight text-ink">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm font-medium text-ink/60">{subtitle}</p>
        )}

        <div className={cx('mt-6 flex flex-col gap-4')}>{children}</div>
      </div>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-ink/60">
        {t('footer.tagline')}
      </p>
    </div>
  )
}
