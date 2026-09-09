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
  flat = false,
  shape = 'tile',
}: {
  src: string
  alt: string
  name: string
  className?: string
  textClassName?: string
  /** Strip rounding/border/shadow (e.g. flush banner inside a clipped card). */
  flat?: boolean
  /** Circle avatar instead of the rounded tile. */
  shape?: 'tile' | 'circle'
}) {
  const [failed, setFailed] = useState(false)
  const initial = (name || '?').trim().charAt(0).toUpperCase() || '?'
  const frame = flat
    ? ''
    : shape === 'circle'
      ? 'rounded-full border-[3px] border-ink shadow-small'
      : 'rounded-2xl border-2 border-ink shadow-small'

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          'flex shrink-0 items-center justify-center overflow-hidden bg-sun font-display text-ink',
          frame,
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
      className={cx('shrink-0 overflow-hidden object-cover', frame, className)}
    />
  )
}
