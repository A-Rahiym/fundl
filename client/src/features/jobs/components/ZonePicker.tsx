import { cx } from '@/lib/cx'
import { LAGOS_ZONES } from '@/config/zones'

/**
 * Zone shortcuts. UI-only: tapping a zone fills the free-text
 * `locationText` field — only that string is sent to the endpoint.
 */
export function ZonePicker({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (zone: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {LAGOS_ZONES.map((zone) => {
        const active = value.trim() === zone
        return (
          <button
            key={zone}
            type="button"
            disabled={disabled}
            onClick={() => onChange(zone)}
            aria-pressed={active}
            className={cx(
              'rounded-full border-2 border-ink px-4 py-2 text-[11px] font-extrabold uppercase shadow-small transition',
              active ? 'bg-sky text-ink' : 'bg-white text-ink hover:bg-mint',
              disabled && 'cursor-not-allowed opacity-70',
            )}
          >
            {zone}
          </button>
        )
      })}
    </div>
  )
}
