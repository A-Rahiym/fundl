import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Panel } from '@/components/ui/Panel'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { Icon } from '@/components/ui/icons'

/**
 * Route-not-found page (Street register): a lone tilted
 * signboard on the wall with a couple of faint chalked tools behind it,
 * under the "nothing nailed up here" joke.
 */
export function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-wall px-4 py-12">
      {/* faint chalked tools, oversized at low opacity (§9.2) */}
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

      <Logo className="mb-8" />

      <Panel className="relative w-full max-w-[440px] p-6 sm:p-8" tilt="tilt-12">
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-3 rotate-6 rounded-full border-[3px] border-ink bg-red px-3 py-1 font-hand text-base text-white"
        >
          {t('notFound.tag')}
        </span>

        <p className="text-xs font-bold uppercase tracking-wider text-red">
          {t('notFound.kicker')}
        </p>
        <h1 className="mt-2 font-display text-[84px] leading-none text-ink sm:text-[96px]">
          4<span className="text-red">0</span>4
        </h1>
        <p className="mt-2 font-display text-xl text-ink">{t('notFound.heading')}</p>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('notFound.body')}</p>

        <div className="mt-6">
          <Button onClick={() => navigate('/', { replace: true })} className="w-full">
            {t('notFound.backHome')}
          </Button>
        </div>
      </Panel>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-ink/50">
        {t('footer.tagline')}
      </p>
    </div>
  )
}
