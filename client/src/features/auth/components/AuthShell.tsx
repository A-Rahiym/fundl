import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Panel } from '@/components/Panel'
import { Logo } from '@/components/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Street-lite single-column shell for sign up / log in (design §9.2):
 * centered signboard panel, brand wordmark, flag-less language pill.
 */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-wall px-4 py-12">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <Logo className="mb-8" />

      <Panel className="w-full max-w-[420px] p-6 sm:p-8" tilt="tilt-12">
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm font-medium text-ink/70">{subtitle}</p>
        )}

        <div className={cx('mt-6 flex flex-col gap-4')}>{children}</div>
      </Panel>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-ink/50">
        {t('footer.tagline')}
      </p>
    </div>
  )
}
