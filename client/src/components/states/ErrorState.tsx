import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'

/** Tilted signboard panel for a failed load, with optional retry/action. */
export function ErrorState({
  title,
  hint,
  retryLabel,
  onRetry,
  action,
  className,
}: {
  title: string
  hint?: string
  retryLabel?: string
  onRetry?: () => void
  action?: ReactNode
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <div className={cx('panel tilt-9 mx-auto mt-8 max-w-[420px] p-6 text-center', className)} role="alert">
      <p className="text-sm font-bold text-ink/70">{t(title)}</p>
      {hint && <p className="mt-1 text-xs font-medium text-ink/60">{t(hint)}</p>}
      {onRetry && retryLabel && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
        >
          {t(retryLabel)}
        </button>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
