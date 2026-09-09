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
}

/** Tappable trade pills for choosing a category (spec: icon + label grid). */
export function CategoryPicker({ categories, value, onChange, disabled }: CategoryPickerProps) {
  const { t } = useTranslation()

  if (categories.length === 0) {
    return <LoadingState label="postJob.loadingCategories" className="py-2" />
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
