import { Fragment } from 'react'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'

export interface FieldProps {
  label: string
  hint?: string
  htmlFor?: string
  children: ReactNode
  className?: string
}

/** Field wrapper (§7.8): label always visible above, hint below. */
export function Field({ label, hint, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cx('field', className)}>
      <label className="field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-ink/50">{hint}</p> : null}
    </div>
  )
}

/** 3px ink-bordered input with yellow focus glow (§7.8). */
export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx('input', props.className)} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx('textarea', props.className)} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx('select', props.className)} />
}

export interface CheckpointRowProps {
  steps: string[]
  /** Index of the step currently in progress (0-based). */
  current: number
}

/**
 * Checkpoint-stamp progress row (§7.8) — completed stamps fill green,
 * the current stamp turns yellow.
 */
export function CheckpointRow({ steps, current }: CheckpointRowProps) {
  return (
    <div className="checkpoint" role="group" aria-label="Progress">
      {steps.map((step, i) => (
        <Fragment key={step}>
          {i > 0 && <span className="checkpoint__line" aria-hidden="true" />}
          <span
            className={cx(
              'checkpoint__stamp',
              i < current && 'checkpoint__stamp--done',
              i === current && 'checkpoint__stamp--current',
            )}
            title={step}
          >
            {i < current ? <Icon name="check" size={15} strokeWidth={2.4} /> : i + 1}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
