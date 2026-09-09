import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, reviewsApi } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'

/** Owner review form for a completed job (one review per job, enforced server-side). */
export function ReviewForm({ jobId }: { jobId: string }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | undefined>()

  const createReview = useMutation({
    mutationFn: () =>
      reviewsApi.create(jobId, { rating, comment: comment.trim() || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.job(jobId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.myJobs })
    },
    onError: (err) => setError(err instanceof ApiError ? err.message : 'api.errUnknown'),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rating < 1 || rating > 5) {
      setError('offer.errRating')
      return
    }
    setError(undefined)
    createReview.mutate()
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label={t('offer.rating')}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => setRating(star)}
            className={cx(
              'rounded-full border-2 p-1.5 transition',
              star <= rating
                ? 'border-ink bg-sun shadow-small'
                : 'border-ink/30 bg-white hover:border-ink',
            )}
          >
            <Icon
              name="star"
              size={18}
              className={star <= rating ? 'fill-current text-ink' : 'text-ink/40'}
            />
          </button>
        ))}
      </div>
      <label className="field">
        <span className="field__label">{t('offer.message')}</span>
        <textarea
          className="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
      </label>
      {error && (
        <span role="alert" className="text-xs font-bold text-red">
          {t(error)}
        </span>
      )}
      <button
        type="submit"
        disabled={createReview.isPending}
        className="self-start rounded-full border-2 border-ink bg-sun px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95 disabled:opacity-60"
      >
        {createReview.isPending ? t('offer.submitting') : t('offer.submitReview')}
      </button>
    </form>
  )
}
