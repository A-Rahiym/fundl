import type { InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'

export interface AuthFieldProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'tel'
  autoComplete?: string
  error?: string
}

type Props = AuthFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'label'>

/** Labeled signboard input (§7.8) with an inline validation message. */
export function AuthField({ label, type = 'text', error, className, ...rest }: Props) {
  const { t } = useTranslation()

  return (
    <label className={cx('field')}>
      <span className="field__label">{label}</span>
      <input
        type={type}
        className={cx('input', error && 'border-red', className)}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && (
        <span role="alert" className="text-xs font-bold text-red">
          {t(error)}
        </span>
      )}
    </label>
  )
}
