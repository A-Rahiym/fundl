import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/icons'

/** Yellow call-to-action banner (guide/screen/dashboard.html). */
export function BannerCta() {
  const { t } = useTranslation()

  return (
    <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-banner p-6 shadow-standard md:flex-row md:items-center md:p-8">
      <div className="z-10 max-w-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 shadow-small">
          <Icon name="bolt" size={14} />
          <span className="text-[11px] font-extrabold uppercase tracking-wider">
            {t('dashboard.bannerTag')}
          </span>
        </div>
        <h2 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
          {t('dashboard.bannerTitle')}
        </h2>
        <p className="text-sm font-semibold text-ink/80 md:text-base">{t('dashboard.bannerBody')}</p>
      </div>
      <div className="z-10 flex flex-wrap items-center gap-3">
        <Link
          to="/app/post"
          className="rounded-full border-2 border-ink bg-candy px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-ink shadow-standard transition hover:brightness-95 active:scale-95"
        >
          {t('dashboard.requestNow')}
        </Link>
        <a
          href="#dashboard-active"
          className="rounded-full border-2 border-ink bg-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-standard transition hover:bg-paper"
        >
          {t('dashboard.seeEstimates')}
        </a>
      </div>
    </div>
  )
}
