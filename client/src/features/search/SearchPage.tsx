import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { Icon } from '@/components/ui/icons'
import { LoadingState } from '@/components/states/LoadingState'
import { ErrorState } from '@/components/states/ErrorState'
import { EmptyState } from '@/components/states/EmptyState'
import { useCategories } from '@/features/home/hooks/useJobsQueries'
import { useArtisans } from '@/features/artisans/hooks/useArtisansQueries'
import { SearchArtisanCard } from './components/SearchArtisanCard'

const MIN_RATINGS = [
  { value: '', labelKey: 'search.any' },
  { value: '4', labelKey: 'search.min4' },
  { value: '4.5', labelKey: 'search.min45' },
] as const

/** Artisan search/browse page (fills the `/search` route). */
export function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') ?? ''
  const minRating = searchParams.get('minRating') ?? ''
  const locationParam = searchParams.get('location') ?? ''

  const [location, setLocation] = useState(locationParam)
  const [prevLocationParam, setPrevLocationParam] = useState(locationParam)
  if (locationParam !== prevLocationParam) {
    setPrevLocationParam(locationParam)
    setLocation(locationParam)
  }

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (location.trim()) next.set('location', location.trim())
          else next.delete('location')
          return next
        },
        { replace: true },
      )
    }, 350)
    return () => window.clearTimeout(id)
  }, [location, setSearchParams])

  const categories = useCategories().data

  const artisans = useArtisans({
    category: category || undefined,
    minRating: minRating ? Number(minRating) : undefined,
    location: locationParam || undefined,
  })

  const setFilter = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const resultCount = useMemo(() => artisans.data?.length ?? 0, [artisans.data])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-ink">{t('search.title')}</h1>
          <p className="mt-1 text-sm font-medium text-ink/70">{t('search.subtitle')}</p>
        </div>
        {!artisans.isLoading && (
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50">
            {t('search.results', { count: resultCount })}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="field">
          <span className="field__label">{t('search.locationPlaceholder')}</span>
          <div className="relative">
            <Icon
              name="pin"
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45"
            />
            <input
              type="search"
              className="input pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label={t('search.locationPlaceholder')}
            />
          </div>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('category', '')}
            aria-pressed={category === ''}
            className={cx(
              'rounded-full border-[3px] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors',
              category === ''
                ? 'border-ink bg-ink text-white'
                : 'border-ink/40 bg-white text-ink/70 hover:border-ink hover:text-ink',
            )}
          >
            {t('search.allCategories')}
          </button>
          {categories?.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter('category', category === c.key ? '' : (c.key ?? ''))}
              aria-pressed={category === c.key}
              className="rounded-full focus-visible:outline-offset-2"
            >
              <CategoryTag color={category === c.key ? 'blue' : 'red'}>{t(`categories:${c.key}`)}</CategoryTag>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2" role="group" aria-label={t('search.minRating')}>
          <span className="text-xs font-bold uppercase tracking-wider text-ink/50">{t('search.minRating')}</span>
          {MIN_RATINGS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter('minRating', opt.value)}
              aria-pressed={minRating === opt.value}
              className={cx(
                'rounded-full border-2 border-ink/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide transition-colors',
                minRating === opt.value ? 'border-ink bg-yellow text-ink' : 'bg-white text-ink/60 hover:text-ink',
              )}
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {artisans.isLoading && <LoadingState skeleton />}

      {artisans.isError && (
        <ErrorState title="search.loadError" retryLabel="home.retry" onRetry={() => artisans.refetch()} />
      )}

      {!artisans.isLoading && !artisans.isError && artisans.data && resultCount === 0 && (
        <EmptyState title="search.noResults" hint="search.noResultsHint" icon="search" />
      )}

      {!artisans.isLoading && !artisans.isError && resultCount > 0 && (
        <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          {artisans.data?.map((artisan, i) => (
            <SearchArtisanCard key={artisan.id} artisan={artisan} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
