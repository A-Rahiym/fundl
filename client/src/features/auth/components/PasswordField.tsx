import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/icons'

export interface PasswordFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  error?: string
  disabled?: boolean
}

/** Password input with an eye toggle inside the box (design §7.8). */
export function PasswordField({
  label,
  value,
  onChange,
  autoComplete = 'current-password',
  error,
  disabled,
}: PasswordFieldProps) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          className={cx('input pr-12', error && 'border-red')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
        />
        <button
          type="button"
          aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md text-ink/60 transition-colors hover:bg-wall hover:text-ink"
        >
          <Icon name={visible ? 'eye-off' : 'eye'} size={19} />
        </button>
      </div>
      {error && (
        <span role="alert" className="text-xs font-bold text-red">
          {t(error)}
        </span>
      )}
    </label>
  )
}
