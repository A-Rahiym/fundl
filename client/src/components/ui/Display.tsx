import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import { hasDiacritics } from '@/lib/diacritics'

export interface DisplayProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'
  children: ReactNode
  className?: string
}

/**
 * Display/headline text (Alfa Slab One or Caveat).
 * Strings containing Yoruba/Igbo subdot diacritics render in the Work
 * Sans/Noto Sans fallback stack instead of a narrow-glyph display face
 * (guide §2.4). Use this wherever display faces are applied to copy.
 */
export function Display({ as: Tag = 'span', children, className }: DisplayProps) {
  const text = typeof children === 'string' ? children : ''
  return (
    <Tag className={cx(className, hasDiacritics(text) && 'needs-diacritic-fallback')}>
      {children}
    </Tag>
  )
}
