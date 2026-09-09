import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import type { IconName } from '@/components/ui/icons'

/** Spec empty-list card: white rounded frame, pastel icon medallion, title + hint. */
export function EmptyState({
  title,
  hint,
  icon,
  className,
}: {
  title: string
  hint?: string
  icon?: IconName
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <div
      className={cx(
        'mx-auto mt-8 w-full max-w-[420px] rounded-3xl border-[2.5px] border-ink bg-white p-6 text-center shadow-standard sm:p-8',
        className,
      )}
    >
      {icon && (
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-sun shadow-small">
          <Icon name={icon} size={26} aria-hidden="true" />
        </span>
      )}
      <p className="font-display text-lg uppercase tracking-tight text-ink">{t(title)}</p>
      {hint && <p className="mt-1 text-sm font-medium text-ink/60">{t(hint)}</p>}
    </div>
  )
}
