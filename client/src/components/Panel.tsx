import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface PanelProps {
  children?: ReactNode
  /** Tilt class from the fixed scale (§8.4), e.g. "tilt-12" */
  tilt?: string
  /** Shadow/border size (§8.5) */
  variant?: 'small' | 'standard' | 'large'
  /** Show the inset dashed "painted border" — for dark/colored panels (§7.1) */
  inset?: boolean
  /** Hover lift: snap rotation to 0°, grow shadow, translate (§8.5) */
  lift?: boolean
  className?: string
  id?: string
}

export function Panel({
  children,
  tilt,
  variant,
  inset,
  lift,
  className,
  id,
}: PanelProps) {
  return (
    <div
      id={id}
      className={cx(
        'panel',
        variant === 'small' && 'panel--small',
        variant === 'large' && 'panel--large',
        inset && 'panel--inset',
        lift && 'panel--lift',
        tilt,
        className,
      )}
    >
      {children}
    </div>
  )
}
