import { useTranslation } from 'react-i18next'
import { Stars } from '@/components/ui/Stars'
import { formatDate } from '@/lib/utils/format'
import type { ApiReview } from '@/lib/api'

/** A single review on an artisan's public profile. */
export function ReviewItem({ review, language }: { review: ApiReview; language: string }) {
  const { t } = useTranslation()
  return (
    <li className="flex flex-col gap-1.5 border-t-2 border-dashed border-ink/20 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-ink">{review.reviewer?.name ?? t('offer.anonymous')}</span>
        <span className="text-xs font-medium text-ink/50">{formatDate(review.createdAt, language)}</span>
      </div>
      <Stars rating={review.rating} size={13} />
      {review.comment && <p className="text-sm text-ink/70">{review.comment}</p>}
    </li>
  )
}

export function ReviewList({
  reviews,
  loading,
  error,
  onRetry,
  language,
}: {
  reviews: ApiReview[]
  loading: boolean
  error: boolean
  onRetry: () => void
  language: string
}) {
  const { t } = useTranslation()

  if (loading) return <p className="text-sm font-medium text-ink/50">{t('artisan.reviewsLoading')}</p>
  if (error)
    return (
      <button
        type="button"
        onClick={onRetry}
        className="text-xs font-extrabold uppercase tracking-wider text-blue underline underline-offset-2"
      >
        {t('artisan.reviewsError')}
      </button>
    )
  if (reviews.length === 0) return <p className="text-sm font-medium text-ink/50">{t('artisan.noReviews')}</p>

  return (
    <ul className="divide-y-2 divide-ink/10">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} language={language} />
      ))}
    </ul>
  )
}
