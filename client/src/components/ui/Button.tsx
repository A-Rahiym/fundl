import type { ButtonHTMLAttributes } from 'react'
import { cx } from '@/lib/cx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'blue' | 'green' | 'red' | 'outline' | 'on-dark' | 'ghost'
  size?: 'sm' | 'md'
}

/**
 * Signboard button (§7.2). Primary = yellow/ink, press state slides the
 * button into its own shadow. Min touch target 44px.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        'btn',
        variant !== 'outline' && `btn--${variant}`,
        size === 'sm' && 'btn--sm',
        className,
      )}
      {...rest}
    />
  )
}
