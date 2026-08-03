import { cx } from '../lib/cx'

const STAR_PATH =
  'm12 3.2 2.7 5.6 6.2.9-4.5 4.3 1.1 6.1L12 17.2 6.5 20.1l1.1-6.1L3 9.7l6.2-.9z'

/** Yellow filled stars (§2.1 `--yellow`), drawn as solid paths. */
export function Stars({
  rating,
  size = 15,
  className,
}: {
  rating: number
  size?: number
  className?: string
}) {
  const filled = Math.round(rating)
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cx('inline-flex items-center gap-0.5', className)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={n <= filled ? 'fill-yellow-dark' : 'fill-ink/20'}
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}
