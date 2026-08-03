import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

export type StampTone =
  | 'open'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'available'
  | 'unavailable'
  | 'neutral'

/**
 * Ink status stamp (§7.6). Always pairs a fill color with a text label —
 * never color or icon alone (spec §10).
 */
export function StatusStamp({
  tone,
  children,
  icon,
  className,
}: {
  tone: StampTone
  children: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <span className={cx('stamp', `stamp--${tone}`, className)}>
      {icon}
      {children}
    </span>
  )
}
