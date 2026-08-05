import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
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
        <input
          type="number"
          min={0}
          className={cx('input', error && 'border-red')}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
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
      <Button type="submit" disabled={createOffer.isPending} className="self-start">
        {createOffer.isPending ? t('offer.submitting') : t('offer.submit')}
      </Button>
    </form>
  )
}
