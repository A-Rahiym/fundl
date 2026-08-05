import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { isEmail } from '@/lib/utils/validators'
import type { Role } from '@/lib/api'
import { AuthShell } from './components/AuthShell'
import { AuthField } from './components/AuthField'
import { PasswordField } from './components/PasswordField'
import { AuthError } from './components/AuthError'
import { RolePicker } from './components/RolePicker'
import { useSignup } from './hooks/useAuthMutations'
import { useSession } from './hooks/useAuthQueries'

export function SignupPage() {
  const { t } = useTranslation()
  const session = useSession()
  const signup = useSignup()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('client')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})

  if (session.data) return <Navigate to="/" replace />

  const validate = () => {
    const next: { name?: string; email?: string; password?: string } = {}
    if (!name.trim()) next.name = 'auth.errNameRequired'
    if (!email) next.email = 'auth.errEmailRequired'
    else if (!isEmail(email)) next.email = 'auth.errEmailInvalid'
    if (!password) next.password = 'auth.errPasswordRequired'
    else if (password.length < 8) next.password = 'auth.errPasswordMin'
    return next
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    signup.mutate({ name: name.trim(), email, password, role })
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
        <PasswordField
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          error={errors.password}
        />

        <RolePicker value={role} onChange={setRole} disabled={signup.isPending} />

        <AuthError error={signup.error} />

        <Button type="submit" disabled={signup.isPending} className="w-full">
          {signup.isPending ? t('auth.creatingAccount') : t('auth.createAccount')}
        </Button>
      </form>

      <p className="text-center text-sm font-medium text-ink/70">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="font-bold text-blue underline underline-offset-2">
          {t('auth.logInLink')}
        </Link>
      </p>
    </AuthShell>
  )
}
