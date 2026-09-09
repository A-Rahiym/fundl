import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'

/** Centered signboard loading state (skeleton or the fundi-at-work loader). */
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
    <div className={cx('flex flex-col items-center justify-center gap-3 py-10', className)} role="status">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-[3px] border-ink bg-white shadow-standard">
        <span className="animate-hammer inline-flex">
          <Icon name="hammer" size={34} />
        </span>
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
          <span className="animate-stamp inline-block whitespace-nowrap rounded-full border-2 border-ink bg-red px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-small">
            Loading
          </span>
        </span>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {['bg-red', 'bg-sun', 'bg-blue'].map((bg, i) => (
          <span
            key={bg}
            className={cx('animate-dot-bounce inline-block h-2.5 w-2.5 rounded-full border border-ink', bg)}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="font-hand text-xl leading-none text-ink/70">
        {label || 'Sharp sharp…'}
      </span>
    </div>
  )
}
