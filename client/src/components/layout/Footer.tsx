import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui/Logo'
import { Icon } from '@/components/ui/icons'

/**
 * Signboard-wall footer (§9.1): a contained, rounded ink card — brand +
 * tagline, link columns and a newsletter signup, matching the design mockup
 * but not bleeding to the viewport edges.
 */
export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="px-4 pt-20 tablet:px-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border-t-8 border-red bg-ink text-white shadow-standard">
        <div className="grid gap-10 px-6 py-12 tablet:grid-cols-2 tablet:px-10 desktop:grid-cols-4">
          <div className="space-y-4">
            <Logo onDark className="-rotate-2" />
            <p className="max-w-xs text-sm text-white/70">{t('footer.tagline')}</p>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-yellow">
              {t('footer.platform')}
            </h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="transition-colors hover:text-yellow">
                  {t('footer.findPro')}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-yellow">
                  {t('footer.categories')}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-yellow">
                  {t('footer.pricing')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-yellow">
              {t('footer.company')}
            </h5>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="transition-colors hover:text-yellow">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-yellow">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-yellow">
              {t('footer.newsletter')}
            </h5>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                aria-label={t('footer.emailPlaceholder')}
                className="w-full min-w-0 rounded-l-md border-2 border-r-0 border-red bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label={t('footer.subscribe')}
                className="flex shrink-0 items-center justify-center rounded-r-md border-2 border-red bg-red px-3 text-white transition-colors hover:bg-red-dark"
              >
                <Icon name="send" size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
