import { cx } from '@/lib/cx'

function NailGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      aria-hidden="true"
      className={cx('absolute -top-[3px] right-[1px] -rotate-12', className)}
    >
      <path d="M12 4.5v16" />
      <circle cx="12" cy="4.5" r="2.2" />
    </svg>
  )
}

export interface LogoProps {
  /** On ink/dark panels → white wordmark + yellow nail (spec §5) */
  onDark?: boolean
  className?: string
}

/**
 * `fundi` wordmark in Alfa Slab One with a nail glyph standing in for the
 * dot of the "i" (spec §5). The nail is a placeholder glyph to commission
 * before production.
 */
export function Logo({ onDark = false, className }: LogoProps) {
  return (
    <span className={cx('relative inline-block leading-none', className)}>
      <span
        className={cx(
          'font-display text-[26px] leading-none tracking-tight',
          onDark ? 'text-white' : 'text-ink',
        )}
      >
        fundi
      </span>
      <NailGlyph className={onDark ? 'text-yellow' : 'text-red'} />
    </span>
  )
}

/** Logo inside a mini signboard panel — for badges/app-icon lockups (§5). */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-md border-[3px] border-ink bg-ink px-3 py-2 shadow-standard',
        className,
      )}
    >
      <span className="font-display text-xl leading-none text-white">fundi</span>
      <NailGlyph className="text-yellow" />
    </span>
  )
}
