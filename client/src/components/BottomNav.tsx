import { useTranslation } from 'react-i18next'
import { cx } from '../lib/cx'
import { Icon } from './icons'
import type { IconName } from './icons'

export type BottomNavItem = 'home' | 'search' | 'post' | 'notifications' | 'profile'

const ITEMS: Array<{ key: BottomNavItem; labelKey: string; icon: IconName }> = [
  { key: 'home', labelKey: 'nav.home', icon: 'home' },
  { key: 'search', labelKey: 'nav.search', icon: 'search' },
  { key: 'post', labelKey: 'nav.post', icon: 'plus' },
  { key: 'notifications', labelKey: 'nav.alerts', icon: 'bell' },
  { key: 'profile', labelKey: 'nav.profile', icon: 'user' },
]

/**
 * Mobile bottom tab bar styled as a signboard strip (§7.9): ink
 * background, yellow active icon. Hidden from tablet up.
 */
export function BottomNav({ active = 'home' }: { active?: BottomNavItem }) {
  const { t } = useTranslation()
  return (
    <nav className="bottom-nav tablet:hidden" aria-label="Primary">
      {ITEMS.map((item) => (
        <a
          key={item.key}
          href="#"
          aria-current={active === item.key ? 'page' : undefined}
          className={cx(
            'bottom-nav__item',
            active === item.key && 'bottom-nav__item--active',
          )}
        >
          <Icon name={item.icon} size={22} />
          {t(item.labelKey)}
        </a>
      ))}
    </nav>
  )
}
