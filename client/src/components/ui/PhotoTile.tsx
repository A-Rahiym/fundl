import { useState } from 'react'
import { cx } from '@/lib/cx'

/**
 * Rounded photo tile with an initials fallback — external placeholder
 * images can fail, so the tile degrades to a colored initial block
 * instead of a broken image.
 */
export function PhotoTile({
  src,
  alt,
  name,
  className,
  textClassName = 'text-2xl',
}: {
  src: string
  alt: string
  name: string
  className?: string
  textClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?'

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-ink bg-sun font-display text-ink shadow-small',
          textClassName,
          className,
        )}
      >
        {initial}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cx(
        'shrink-0 overflow-hidden rounded-2xl border-2 border-ink object-cover shadow-small',
        className,
      )}
    />
  )
}
