import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isEmail } from '@/lib/utils/validators'
import { AuthShell } from './components/AuthShell'
import { AuthField } from './components/AuthField'
import { PasswordField } from './components/PasswordField'
import { AuthError } from './components/AuthError'
import { useLogin } from './hooks/useAuthMutations'
import { useSession } from './hooks/useAuthQueries'

export function LoginPage() {
  const { t } = useTranslation()
  const session = useSession()
  const login = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  if (session.data) return <Navigate to="/app" replace />

  const validate = () => {
    const next: { email?: string; password?: string } = {}
    if (!email) next.email = 'auth.errEmailRequired'
    else if (!isEmail(email)) next.email = 'auth.errEmailInvalid'
    if (!password) next.password = 'auth.errPasswordRequired'
    return next
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    login.mutate({ email, password })
  }

  return (
    <AuthShell title={t('auth.loginTitle')} subtitle={t('auth.loginSubtitle')}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <AuthField
          label={t('auth.email')}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <PasswordField
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          error={errors.password}
        />

        <AuthError error={login.error} />

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full rounded-full border-2 border-ink bg-sun px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95 disabled:opacity-60"
        >
          {login.isPending ? t('auth.loggingIn') : t('auth.logIn')}
        </button>
      </form>

      <p className="text-center text-sm font-medium text-ink/60">
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="font-extrabold text-ink underline underline-offset-2">
          {t('auth.signUpLink')}
        </Link>
      </p>
    </AuthShell>
  )
}
