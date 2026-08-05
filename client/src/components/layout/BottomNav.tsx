import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import type { IconName } from '@/components/ui/icons'

export type BottomNavItem = 'home' | 'search' | 'post' | 'notifications' | 'profile'

const ITEMS: Array<{ key: BottomNavItem; labelKey: string; icon: IconName; to: string }> = [
  { key: 'home', labelKey: 'nav.home', icon: 'home', to: '/' },
  { key: 'search', labelKey: 'nav.search', icon: 'search', to: '/search' },
  { key: 'post', labelKey: 'nav.post', icon: 'plus', to: '/post' },
  { key: 'notifications', labelKey: 'nav.alerts', icon: 'bell', to: '/notifications' },
  { key: 'profile', labelKey: 'nav.profile', icon: 'user', to: '/profile' },
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
        <NavLink
          key={item.key}
          to={item.to}
          end={item.key === 'home'}
          aria-current={active === item.key ? 'page' : undefined}
          className={({ isActive }) =>
            cx(
              'bottom-nav__item',
              (isActive || active === item.key) && 'bottom-nav__item--active',
            )
          }
        >
          <Icon name={item.icon} size={22} />
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}
