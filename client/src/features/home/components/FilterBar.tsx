import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { NIGERIAN_STATES } from '@/config/nigeria'
import type { ApiCategory } from '@/lib/api'

export interface FilterBarProps {
  categories: ApiCategory[]
  selected: string | null
  onSelect: (key: string | null) => void
  query: string
  onQuery: (value: string) => void
  stateFilter: string
  onStateFilter: (value: string) => void
}

/** Search field + category chips + state filter that drive the job feed. */
export function FilterBar({ categories, selected, onSelect, query, onQuery, stateFilter, onStateFilter }: FilterBarProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <label className="field">
          <span className="field__label">{t('home.searchPlaceholder')}</span>
          <div className="relative">
            <Icon
              name="search"
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/45"
            />
            <input
              type="search"
              className="input pl-10"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              aria-label={t('home.searchPlaceholder')}
            />
          </div>
        </label>
        <label className="field sm:min-w-44">
          <span className="field__label">{t('home.state')}</span>
          <select
            className="input"
            value={stateFilter}
            onChange={(e) => onStateFilter(e.target.value)}
            aria-label={t('home.state')}
          >
            <option value="">{t('home.allStates')}</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={selected === null}
          className={cx(
            'rounded-full border-[3px] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors',
            selected === null
              ? 'border-ink bg-ink text-white'
              : 'border-ink/40 bg-white text-ink/70 hover:border-ink hover:text-ink',
          )}
        >
          {t('home.allTrades')}
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onSelect(selected === c.key ? null : (c.key ?? null))}
            aria-pressed={selected === c.key}
            className="rounded-full focus-visible:outline-offset-2"
          >
            <CategoryTag
              color={selected === c.key ? 'blue' : 'red'}
              className={cx(
                'transition-transform',
                selected === c.key ? 'scale-110' : 'hover:scale-105',
              )}
            >
              {t(`categories:${c.key}`)}
            </CategoryTag>
          </button>
        ))}
      </div>
    </div>
  )
}
