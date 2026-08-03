import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

export type TagColor = 'red' | 'blue' | 'green' | 'yellow' | 'red-dark'

/** Hand-brush category tag (§7.3) — Caveat face inside a painted pill. */
export function CategoryTag({
  color = 'red',
  children,
  className,
}: {
  color?: TagColor
  children: ReactNode
  className?: string
}) {
  return <span className={cx('tag', `tag--${color}`, className)}>{children}</span>
}
