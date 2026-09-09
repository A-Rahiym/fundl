import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'

export type Urgency = 'emergency' | 'today' | 'schedule'

const OPTIONS: Array<{ value: Urgency; icon: 'flame' | 'bolt' | 'calendar'; bg: string }> = [
  { value: 'emergency', icon: 'flame', bg: 'bg-candy' },
  { value: 'today', icon: 'bolt', bg: 'bg-mint' },
  { value: 'schedule', icon: 'calendar', bg: 'bg-white' },
]

/**
 * Urgency selector. UI-only: the choice writes `preferredDate` on the
 * parent form (emergency/today = today, schedule = manual date input).
 * Nothing extra is sent to the endpoint.
 */
export function UrgencyPicker({
  value,
  onChange,
  disabled,
}: {
  value: Urgency | null
  onChange: (u: Urgency) => void
  disabled?: boolean
}) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {OPTIONS.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={cx(
              'flex items-center gap-2 rounded-2xl border-2 border-ink p-3 text-left shadow-small transition',
              active ? `${opt.bg} shadow-standard` : `${opt.bg} hover:brightness-95`,
              active && 'ring-2 ring-ink ring-offset-2',
              disabled && 'cursor-not-allowed opacity-70',
            )}
          >
            <Icon name={opt.icon} size={24} className="shrink-0" />
            <span className="flex flex-col">
              <span className="text-xs font-extrabold uppercase">
                {t(`postJob.urgency${opt.value[0]!.toUpperCase()}${opt.value.slice(1)}`)}
              </span>
              <span className="text-[11px] font-medium text-ink/60">
                {t(`postJob.urgency${opt.value[0]!.toUpperCase()}${opt.value.slice(1)}Sub`)}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
