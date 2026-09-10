import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, type ApiUser } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { NIGERIAN_STATES, lgasOf } from '@/config/nigeria'
import { Icon } from '@/components/ui/icons'

/** Own location editor: state (required) + LGA (optional) → PUT /users/me. */
export function LocationEditor({ user }: { user: ApiUser }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [state, setState] = useState(user.state ?? '')
  const [lga, setLga] = useState(user.lga ?? '')
  const [error, setError] = useState<string | undefined>()

  const lgas = state ? lgasOf(state) : []
  const dirty = state !== (user.state ?? '') || lga !== (user.lga ?? '')

  const save = useMutation({
    mutationFn: () =>
      usersApi.updateMe({
        state,
        ...(lga ? { lga } : {}),
      }),
    onSuccess: ({ data }) => {
      queryClient.setQueryData<ApiUser>(queryKeys.session, data)
      setError(undefined)
    },
    onError: () => setError('profile.locationError'),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!state) {
      setError('auth.errLocationRequired')
      return
    }
    setError(undefined)
    save.mutate()
  }

  return (
    <section className="rounded-3xl border-[2.5px] border-ink bg-white p-5 shadow-standard">
      <h3 className="flex items-center gap-2 font-display text-lg text-ink">
        <Icon name="pin" size={18} className="text-red" />
        {t('profile.location')}
      </h3>
      {user.locationText && !dirty && (
        <p className="mt-1 text-sm font-medium text-ink/60">{user.locationText}</p>
      )}
      <form onSubmit={onSubmit} noValidate className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="field">
          <span className="field__label">{t('auth.state')}</span>
          <select
            className="input"
            value={state}
            onChange={(e) => {
              setState(e.target.value)
              setLga('')
            }}
          >
            <option value="">{t('auth.selectState')}</option>
            {NIGERIAN_STATES.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field__label">
            {t('auth.lga')} <span className="font-medium normal-case text-ink/50">({t('auth.optional')})</span>
          </span>
          <select className="input" value={lga} onChange={(e) => setLga(e.target.value)} disabled={!state}>
            <option value="">{t('auth.selectLga')}</option>
            {lgas.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <div className="sm:col-span-2">
          {error && (
            <p role="alert" className="mb-2 text-xs font-bold text-red">
              {t(error)}
            </p>
          )}
          <button
            type="submit"
            disabled={save.isPending || !dirty}
            className="rounded-full border-2 border-ink bg-sun px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:brightness-95 disabled:opacity-60"
          >
            {save.isPending ? t('profile.saving') : t('profile.saveLocation')}
          </button>
        </div>
      </form>
    </section>
  )
}
