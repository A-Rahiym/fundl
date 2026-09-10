import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import { LoadingState } from '@/components/states/LoadingState'
import { categoryIcon } from '@/lib/categoryIcons'
import type { ApiCategory } from '@/lib/api'

export interface CategoryPickerProps {
  categories: ApiCategory[]
  value: string | null
  onChange: (key: string) => void
  disabled?: boolean
  /** grid: compact tiles (post-job). rail: horizontal snap-scroll strip with full labels (signup). */
  layout?: 'grid' | 'rail'
}

/** Tappable trade picker (spec: icon + label). */
export function CategoryPicker({ categories, value, onChange, disabled, layout = 'grid' }: CategoryPickerProps) {
  const { t } = useTranslation()

  if (categories.length === 0) {
    return <LoadingState label="postJob.loadingCategories" className="py-2" />
  }

  if (layout === 'rail') {
    return (
      <div className="-mx-1 overflow-x-auto px-1 pb-2">
        <div className="flex snap-x snap-mandatory gap-2.5" role="radiogroup" aria-label={t('auth.trade')}>
          {categories.map((c) => {
            const active = value === c.key
            return (
              <button
                key={c.key}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={disabled}
                onClick={() => c.key && onChange(c.key)}
                className={cx(
                  'flex w-[104px] shrink-0 snap-start flex-col items-center gap-1.5 rounded-2xl border-2 border-ink px-2 py-3 text-center shadow-small transition',
                  active ? 'bg-sun text-ink shadow-standard' : 'bg-white text-ink hover:bg-mint',
                  disabled && 'cursor-not-allowed opacity-70',
                )}
              >
                <span
                  className={cx(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink',
                    active ? 'bg-white' : 'bg-paper',
                  )}
                >
                  <Icon name={categoryIcon(c.key)} size={20} />
                </span>
                <span className="text-[11px] font-extrabold uppercase leading-tight tracking-wide">
                  {t(`categories:${c.key}`)}
                </span>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-ink text-white">
                    <Icon name="check" size={11} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {categories.map((c) => {
        const active = value === c.key
        return (
          <button
            key={c.key}
            type="button"
            disabled={disabled}
            onClick={() => c.key && onChange(c.key)}
            aria-pressed={active}
            className={cx(
              'flex items-center gap-2 rounded-2xl border-2 border-ink p-2 text-left text-xs font-extrabold shadow-small transition',
              active ? 'bg-sky text-ink shadow-standard' : 'bg-white text-ink hover:bg-mint',
              disabled && 'cursor-not-allowed opacity-70',
            )}
          >
            <Icon name={categoryIcon(c.key)} size={20} className="shrink-0" />
            <span className="truncate">{t(`categories:${c.key}`)}</span>
          </button>
        )
      })}
    </div>
  )
}
