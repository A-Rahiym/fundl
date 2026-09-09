import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'

/* PLACEHOLDER: typical-rate range and basis stats have no analytics
   endpoint yet — static showcase values. Only the meter needle reacts
   to the user's own budget input. */
const TYPICAL_MIN = 18000
const TYPICAL_MAX = 30000

/** Static price-radar card with a live meter driven by the budget input. */
export function PriceRadar({ budget, categoryKey }: { budget: number | null; categoryKey: string | null }) {
  const { t } = useTranslation()

  const ratio =
    budget === null ? 0.75 : Math.min(1, Math.max(0.05, budget / TYPICAL_MAX))
  const verdict =
    budget === null
      ? null
      : budget < TYPICAL_MIN
        ? t('postJob.radarLow')
        : budget > TYPICAL_MAX
          ? t('postJob.radarHigh')
          : t('postJob.radarFair')

  return (
    <div className="flex -rotate-[0.2deg] flex-col gap-4 rounded-3xl border-2 border-ink bg-sky p-6 shadow-standard">
      <div className="flex items-center justify-between border-b-2 border-ink pb-3">
        <div className="flex items-center gap-2">
          <Icon name="bolt" size={24} className="text-red" />
          <span className="font-display text-lg text-ink">{t('postJob.radarTitle')}</span>
        </div>
        <span className="rounded-full border-2 border-ink bg-white px-2 py-0.5 text-[11px] font-bold uppercase">
          {t('postJob.radarLive')}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
          {t('postJob.radarTypical', {
            category: categoryKey ? t(`categories:${categoryKey}`) : t('postJob.radarAnyTrade'),
          })}
        </span>
        <span className="font-display text-xl text-ink">
          ₦{TYPICAL_MIN.toLocaleString()} – ₦{TYPICAL_MAX.toLocaleString()}
        </span>
        <p className="text-xs font-medium text-ink/60">{t('postJob.radarBasis')}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[11px] font-bold text-ink">
          <span>
            {t('postJob.radarBudget')}: {budget !== null ? `₦${budget.toLocaleString()}` : '–'}
          </span>
          {verdict && <span className="text-red">{verdict}</span>}
        </div>
        <div className="h-4 overflow-hidden rounded-full border-2 border-ink bg-white p-0.5">
          <div className="h-full rounded-full bg-red" style={{ width: `${Math.round(ratio * 100)}%` }} />
        </div>
      </div>
    </div>
  )
}
