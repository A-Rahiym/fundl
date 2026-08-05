import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import type { Role } from '@/lib/api'
import { ROLES } from '@/config/roles'

export interface RolePickerProps {
  value: Role
  onChange: (role: Role) => void
  disabled?: boolean
}

/** Two-button role toggle — the only real choice on signup. */
export function RolePicker({ value, onChange, disabled }: RolePickerProps) {
  const { t } = useTranslation()

  return (
    <div role="group" aria-label={t('auth.roleLabel')} className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const active = value === role.value
        return (
          <button
            key={role.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(role.value)}
            className={cx(
              'rounded-md border-3 border-ink px-4 py-3 text-sm font-extrabold uppercase tracking-wide transition-colors',
              active ? 'bg-yellow text-ink shadow-standard' : 'bg-white text-ink/70 hover:bg-wall',
            )}
          >
            {t(role.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
