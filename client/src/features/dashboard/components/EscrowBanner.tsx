import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'

/** Static escrow reassurance banner — no escrow endpoint exists yet. */
export function EscrowBanner() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-sky p-5 shadow-standard sm:flex-row">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-white shadow-small">
          <Icon name="shield-check" size={24} />
        </div>
        <div>
          <h5 className="text-sm font-extrabold uppercase text-ink">{t('dashboard.escrowTitle')}</h5>
          <p className="text-xs font-medium text-ink/70">{t('dashboard.escrowBody')}</p>
        </div>
      </div>
      <Link
        to="/app/notifications"
        className="shrink-0 rounded-full border-2 border-ink bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-ink shadow-small transition hover:bg-paper"
      >
        {t('dashboard.escrowCta')}
      </Link>
    </div>
  )
}
