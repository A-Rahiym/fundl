import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { useCreateOffer } from '../hooks/useOffersMutations'

/** Artisan "make an offer" form: price + optional message (spec §7.8). */
export function OfferForm({ jobId }: { jobId: string }) {
  const { t } = useTranslation()
  const createOffer = useCreateOffer(jobId)
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | undefined>()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const parsed = Number(price)
    if (!price || Number.isNaN(parsed) || parsed <= 0) {
      setError('offer.errPrice')
      return
    }
    setError(undefined)
    createOffer.mutate(
      { price: parsed, message: message.trim() || undefined },
      {
        onSuccess: () => {
          setPrice('')
          setMessage('')
        },
      },
    )
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
      <label className="field">
        <span className="field__label">{t('offer.price')}</span>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg text-red">
            ₦
          </span>
          <input
            type="number"
            min={0}
            className={cx('input pl-10', error && 'border-red')}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
        </div>
        {error && (
          <span role="alert" className="text-xs font-bold text-red">
            {t(error)}
          </span>
        )}
      </label>
      <label className="field">
        <span className="field__label">{t('offer.message')}</span>
        <textarea
          className="textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={createOffer.isPending}
        className="self-start rounded-full border-2 border-ink bg-sun px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95 disabled:opacity-60"
      >
        {createOffer.isPending ? t('offer.submitting') : t('offer.submit')}
      </button>
    </form>
  )
}
