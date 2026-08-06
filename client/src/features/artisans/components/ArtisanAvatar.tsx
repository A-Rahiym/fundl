import { cx } from '@/lib/cx'

/**
 * Initial-letter placeholder avatar — the API has no user photos yet, so
 * the signboard system shows the fundi's first initial on a yellow block.
 */
export function ArtisanAvatar({
  name,
  size = 'md',
  className,
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?'
  const sizes = {
    sm: 'h-9 w-9 text-base',
    md: 'h-14 w-14 text-2xl',
    lg: 'h-24 w-24 text-5xl',
  } as const
  return (
    <span
      aria-hidden="true"
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-[4px] border-[3px] border-ink bg-yellow font-display leading-none text-ink shadow-[2px_2px_0_var(--color-ink)]',
        sizes[size],
        className,
      )}
    >
      {initial}
    </span>
  )
}
