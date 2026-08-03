import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '../lib/cx'
import { setLocale } from '../lib/i18n'
import type { LocaleCode } from '../lib/i18n'
import { Icon } from './icons'

const LOCALES: Array<{ code: LocaleCode; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'ha', label: 'HA' },
  { code: 'yo', label: 'YO' },
  { code: 'ig', label: 'IG' },
]

/**
 * Flag-less language pill (guide §3): EN · HA · YO · IG — text only,
 * since the languages don't map to national flags. Persists to
 * localStorage now; DB-backed `users.locale` comes with the API.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const current = (i18n.resolvedLanguage ?? 'en').slice(0, 2).toUpperCase()

  return (
    <div className={cx('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="stamp stamp--neutral cursor-pointer"
      >
        <Icon name="menu" size={13} />
        {current}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="panel absolute right-0 top-[calc(100%+8px)] z-40 flex min-w-[120px] flex-col overflow-hidden py-1"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={current === l.label}
              onClick={() => {
                setLocale(l.code)
                setOpen(false)
              }}
              className={cx(
                'px-4 py-2 text-left text-xs font-extrabold uppercase tracking-wider hover:bg-wall',
                current === l.label && 'bg-wall text-blue',
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
