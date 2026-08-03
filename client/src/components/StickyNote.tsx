import { cx } from '../lib/cx'

export interface StickyNoteProps {
  quote: string
  attribution: string
  className?: string
}

/** Pinned testimonial note (§7.7) — Caveat quote under a pushpin. */
export function StickyNote({ quote, attribution, className }: StickyNoteProps) {
  return (
    <div className={cx('note', className)}>
      <span className="note__pin" aria-hidden="true" />
      <p className="note__quote">{quote}</p>
      <p className="note__attr">— {attribution}</p>
    </div>
  )
}
