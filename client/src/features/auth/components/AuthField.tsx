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
        className={cx(
          'w-full rounded-2xl border-2 border-ink bg-paper px-4 py-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/40 focus:bg-white focus:shadow-small',
          error && 'border-red',
          className,
        )}
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
