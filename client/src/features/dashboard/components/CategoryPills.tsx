import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'
import { cx } from '@/lib/cx'
import { useCategories } from '@/features/home/hooks/useJobsQueries'

/**
 * Horizontal scrollable trade chips (guide/screen/dashboard.html).
 * Always renders thanks to the static category fallback.
 */
export function CategoryPills() {
  const { t } = useTranslation()
  const categories = useCategories().data ?? []

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto border-b-[2.5px] border-ink bg-white px-5 py-3">
      <Link
        to="/app/search"
        className="shrink-0 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-white shadow-small"
      >
        {t('dashboard.allCategories')}
      </Link>
      {categories.map((c) => (
        <Link
          key={c.key}
          to={`/app/search?category=${encodeURIComponent(c.key ?? '')}`}
          className="shrink-0 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-xs font-bold text-ink shadow-small transition hover:bg-paper"
        >
          {t(`categories:${c.key}`)}
        </Link>
      ))}
      <span className="ml-auto shrink-0 pl-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white shadow-small">
          <Icon name="chevron-right" size={18} />
        </span>
      </span>
    </div>
  )
}

/** Pastel status pill for job cards (open / in-progress / completed). */
export function DashStamp({ tone, children }: { tone: 'rose' | 'sky' | 'mint'; children: React.ReactNode }) {
  return (
    <span
      className={cx(
        'shrink-0 rounded-full border-2 border-ink px-2.5 py-1 text-[10px] font-extrabold uppercase shadow-small',
        tone === 'rose' && 'bg-rose text-ink',
        tone === 'sky' && 'bg-sky text-ink',
        tone === 'mint' && 'bg-mint text-ink',
      )}
    >
      {children}
    </span>
  )
}
