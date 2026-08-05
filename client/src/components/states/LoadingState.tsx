import { cx } from '@/lib/cx'

/** Centered signboard loading state (skeleton or "fundi…" text). */
export function LoadingState({
  label,
  skeleton = false,
  className,
}: {
  label?: string
  skeleton?: boolean
  className?: string
}) {
  if (skeleton) {
    return (
      <div className={cx('grid gap-4 text-center tablet:grid-cols-2 desktop:grid-cols-3', className)}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="panel min-h-[180px] animate-pulse p-4">
            <div className="h-4 w-2/3 rounded bg-ink/10" />
            <div className="mt-4 h-4 w-1/3 rounded bg-ink/10" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cx('flex items-center justify-center py-10', className)} role="status">
      <span className="font-display text-sm uppercase tracking-wider text-ink/60">
        {label || 'fundi…'}
      </span>
    </div>
  )
}
