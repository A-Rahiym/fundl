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

const COLORS = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow', 'bg-red-dark', 'bg-blue-dark'] as const

/** Tappable painted tiles for choosing a trade (spec §7.4/§9.2). */
export function CategoryPicker({ categories, value, onChange, disabled }: CategoryPickerProps) {
  const { t } = useTranslation()

  if (categories.length === 0) {
    return <LoadingState label="postJob.loadingCategories" className="py-2" />
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {categories.map((c) => {
        const color = COLORS[(c.id ?? 0) % COLORS.length]
        const active = value === c.key
        return (
          <button
            key={c.key}
            type="button"
            disabled={disabled}
            onClick={() => c.key && onChange(c.key)}
            aria-pressed={active}
            className={cx(
              'flex flex-col items-center gap-1 rounded-lg border-4 border-ink px-3 py-4 text-white shadow-standard transition-transform',
              color,
              active ? '-translate-y-0.5 scale-105' : 'hover:-translate-y-0.5',
              disabled && 'cursor-not-allowed opacity-70',
            )}
          >
            <Icon name={categoryIcon(c.key)} size={26} className="text-white" aria-hidden="true" />
            <span className="text-center font-display text-sm leading-tight">
              {t(`categories:${c.key}`)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
