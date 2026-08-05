import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import type { IconName } from '@/components/ui/icons'

/** Tilted signboard panel for an empty list. */
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
    <div className={cx('panel tilt-9 mx-auto mt-8 max-w-[420px] p-6 text-center', className)}>
      {icon && <Icon name={icon} size={34} className="mx-auto text-ink/40" aria-hidden="true" />}
      <p className="font-display text-lg text-ink">{t(title)}</p>
      {hint && <p className="mt-1 text-sm font-medium text-ink/70">{t(hint)}</p>}
    </div>
  )
}
