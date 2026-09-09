import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Icon } from '@/components/ui/icons'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/**
 * Route-not-found page in the dashboard design language: gradient wall
 * with faint chalked tools, brand wordmark, and a white rounded frame
 * holding the giant 404, tag sticker and home action.
 */
export function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blush via-lilac to-banner px-4 py-12">
      {/* faint chalked tools, oversized at low opacity */}
      <Icon
        name="hammer"
        size={280}
        className="pointer-events-none absolute -left-20 -top-12 -rotate-12 text-ink opacity-[0.05]"
      />
      <Icon
        name="wrench"
        size={260}
        className="pointer-events-none absolute -bottom-14 -right-16 rotate-12 text-ink opacity-[0.05]"
      />

      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-8 flex flex-col items-center gap-1">
        <Logo />
        <span className="-rotate-3 font-hand text-xl leading-none text-yellow-dark">
          {t('header.tagline')}
        </span>
      </div>

      <div className="relative w-full max-w-[440px] rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-window sm:p-8">
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-3 rotate-6 rounded-full border-2 border-ink bg-red px-3 py-1 font-hand text-base text-white shadow-small"
        >
          {t('notFound.tag')}
        </span>

        <p className="text-xs font-extrabold uppercase tracking-wider text-red">
          {t('notFound.kicker')}
        </p>
        <h1 className="mt-2 font-display text-[84px] leading-none text-ink sm:text-[96px]">
          4<span className="text-red">0</span>4
        </h1>
        <p className="mt-2 font-display text-xl uppercase tracking-tight text-ink">{t('notFound.heading')}</p>
        <p className="mt-1 text-sm font-medium text-ink/60">{t('notFound.body')}</p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate(session.data ? '/app' : '/', { replace: true })}
            className="w-full rounded-full border-2 border-ink bg-sun px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95"
          >
            {t('notFound.backHome')}
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-ink/60">
        {t('footer.tagline')}
      </p>
    </div>
  )
}
