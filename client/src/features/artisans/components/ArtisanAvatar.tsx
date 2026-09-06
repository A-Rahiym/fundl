import { cx } from '@/lib/cx'

/**
 * Initial-letter placeholder avatar — the API has no user photos yet, so
 * the signboard system shows the fundi's first initial on a yellow block.
 */
export function ArtisanAvatar({
  name,
  size = 'md',
  className,
  photoUrl,
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  photoUrl?: string | null
}) {
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?'
  const sizes = {
    sm: 'h-9 w-9 text-base',
    md: 'h-14 w-14 text-2xl',
    lg: 'h-24 w-24 text-5xl',
  } as const

  if (photoUrl) {
    return (
      <span
        className={cx(
          'relative inline-flex shrink-0 overflow-hidden rounded-[4px] border-[3px] border-ink bg-yellow shadow-[2px_2px_0_var(--color-ink)]',
          sizes[size],
          className,
        )}
      >
        <img
          src={photoUrl}
          alt={`${name} profile photo`}
          className="h-full w-full object-cover"
          onError={(event) => {
            const parent = event.currentTarget.parentElement
            if (!parent) return
            event.currentTarget.style.display = 'none'
            const fallback = parent.querySelector('[data-avatar-fallback]') as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <span
          data-avatar-fallback
          aria-hidden="true"
          className="hidden h-full w-full items-center justify-center bg-yellow font-display leading-none text-ink"
        >
          {initial}
        </span>
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-sm border-[3px] border-ink bg-yellow font-display leading-none text-ink shadow-[2px_2px_0_var(--color-ink)]',
        sizes[size],
        className,
      )}
    >
      {initial}
    </span>
  )
}
