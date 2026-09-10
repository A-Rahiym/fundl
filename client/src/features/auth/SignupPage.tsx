import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isEmail } from '@/lib/utils/validators'
import type { Role } from '@/lib/api'
import { AuthShell } from './components/AuthShell'
import { AuthField } from './components/AuthField'
import { PasswordField } from './components/PasswordField'
import { AuthError } from './components/AuthError'
import { RolePicker } from './components/RolePicker'
import { CategoryPicker } from '@/components/CategoryPicker'
import { NIGERIAN_STATES, lgasOf } from '@/config/nigeria'
import { useCategories } from '@/features/home/hooks/useJobsQueries'
import { useSignup } from './hooks/useAuthMutations'
import { useSession } from './hooks/useAuthQueries'

export function SignupPage() {
  const { t } = useTranslation()
  const session = useSession()
  const signup = useSignup()
  const categories = useCategories()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('client')
  const [state, setState] = useState('')
  const [lga, setLga] = useState('')
  const [categoryKey, setCategoryKey] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    location?: string
    category?: string
  }>({})

  if (session.data) return <Navigate to="/app" replace />

  const lgas = state ? lgasOf(state) : []
  const needsTrade = role === 'artisan' || role === 'both'

  const validate = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'auth.errNameRequired'
    if (!email) next.email = 'auth.errEmailRequired'
    else if (!isEmail(email)) next.email = 'auth.errEmailInvalid'
    if (!password) next.password = 'auth.errPasswordRequired'
    else if (password.length < 8) next.password = 'auth.errPasswordMin'
    if (!state) next.location = 'auth.errLocationRequired'
    if (needsTrade && !categoryKey) next.category = 'postJob.errCategory'
    return next
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    signup.mutate({
      name: name.trim(),
      email,
      password,
      role,
      phone: phone.trim() || undefined,
      locationText: lga ? `${lga}, ${state}` : state,
      categoryKey: needsTrade ? categoryKey! : undefined,
    })
  }

  return (
    <AuthShell title={t('auth.signupTitle')} subtitle={t('auth.signupSubtitle')}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <AuthField
          label={t('auth.name')}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <AuthField
          label={t('auth.email')}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <AuthField
          label={t('auth.phone')}
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <PasswordField
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          error={errors.password}
        />

        <RolePicker value={role} onChange={setRole} disabled={signup.isPending} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="field">
            <span className="field__label">{t('auth.state')}</span>
            <select
              className="input"
              value={state}
              onChange={(e) => {
                setState(e.target.value)
                setLga('')
              }}
              aria-invalid={errors.location ? true : undefined}
            >
              <option value="">{t('auth.selectState')}</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s.state} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
            {errors.location && (
              <span role="alert" className="text-xs font-bold text-red">
                {t(errors.location)}
              </span>
            )}
          </label>

          <label className="field">
            <span className="field__label">
              {t('auth.lga')} <span className="font-medium normal-case text-ink/50">({t('auth.optional')})</span>
            </span>
            <select
              className="input"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              disabled={!state}
            >
              <option value="">{t('auth.selectLga')}</option>
              {lgas.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
        </div>

        {needsTrade && (
          <div className="field">
            <span className="field__label">{t('auth.trade')}</span>
            <CategoryPicker
              categories={categories.data ?? []}
              value={categoryKey}
              onChange={setCategoryKey}
              disabled={signup.isPending}
            />
            {errors.category && (
              <span role="alert" className="text-xs font-bold text-red">
                {t(errors.category)}
              </span>
            )}
          </div>
        )}

        <AuthError error={signup.error} />

        <button
          type="submit"
          disabled={signup.isPending}
          className="w-full rounded-full border-2 border-ink bg-sun px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95 disabled:opacity-60"
        >
          {signup.isPending ? t('auth.creatingAccount') : t('auth.createAccount')}
        </button>
      </form>

      <p className="text-center text-sm font-medium text-ink/60">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="font-extrabold text-ink underline underline-offset-2">
          {t('auth.logInLink')}
        </Link>
      </p>
    </AuthShell>
  )
}
