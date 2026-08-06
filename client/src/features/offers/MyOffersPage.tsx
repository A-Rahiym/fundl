import { useTranslation } from 'react-i18next'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import { useMyOffers } from './hooks/useMyOffers'
import { MyOfferCard } from './components/MyOfferCard'

/** The artisan's sent offers (`/offers/mine`). */
export function MyOffersPage() {
  const { t, i18n } = useTranslation()
  const offers = useMyOffers()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-3xl text-ink">{t('offers.title')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('offers.subtitle')}</p>
      </div>

      {offers.isLoading && <LoadingState skeleton />}

      {offers.isError && (
        <ErrorState title="offers.loadError" retryLabel="home.retry" onRetry={() => offers.refetch()} />
      )}

      {!offers.isLoading && !offers.isError && offers.data && offers.data.length === 0 && (
        <EmptyState title="offers.noOffers" hint="offers.noOffersHint" icon="chat" />
      )}

      {!offers.isLoading && !offers.isError && offers.data && offers.data.length > 0 && (
        <div className="grid gap-4 tablet:grid-cols-2">
          {offers.data.map((offer) => (
            <MyOfferCard key={offer.id} offer={offer} language={i18n.language} />
          ))}
        </div>
      )}
    </div>
  )
}
