import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/icons'

/** Holds a tab until its real screen is built (Search, Alerts, Profile). */
export function ComingSoonPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Panel className="w-full max-w-[420px] p-6 text-center sm:p-8" tilt="tilt-9">
        <Icon name="hammer" size={40} className="mx-auto text-ink/40" />
        <h1 className="mt-4 font-display text-2xl text-ink">{t('app.comingSoon')}</h1>
        <p className="mt-1 text-sm font-medium text-ink/70">{t('app.comingSoonHint')}</p>
        <div className="mt-6">
          <Button onClick={() => navigate('/', { replace: true })} className="w-full">
            {t('app.backHome')}
          </Button>
        </div>
      </Panel>
    </div>
  )
}
