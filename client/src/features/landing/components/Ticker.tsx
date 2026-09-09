import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'

/** Dark credibility strip above the header (spec, static copy). */
export function Ticker() {
  const { t } = useTranslation()

  return (
    <aside className="overflow-hidden border-b-2 border-ink bg-ink px-4 py-2 text-xs font-bold text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 shrink-0 animate-ping rounded-full bg-green" aria-hidden="true" />
          <span className="truncate tracking-wide">{t('landing:ticker.live')}</span>
        </p>
        <div className="hidden shrink-0 items-center gap-6 text-[11px] uppercase tracking-wider md:flex">
          <span className="flex items-center gap-1.5">
            <Icon name="check" size={14} className="text-green" />
            {t('landing:ticker.cbn')}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="shield-check" size={14} className="text-sun" />
            {t('landing:ticker.vetted')}
          </span>
        </div>
      </div>
    </aside>
  )
}
