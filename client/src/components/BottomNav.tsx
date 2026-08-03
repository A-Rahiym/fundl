import { cx } from '../lib/cx'
import { Icon } from './icons'
import type { IconName } from './icons'

export type BottomNavItem = 'home' | 'search' | 'post' | 'notifications' | 'profile'

const ITEMS: Array<{ key: BottomNavItem; label: string; icon: IconName }> = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'search', label: 'Search', icon: 'search' },
  { key: 'post', label: 'Post', icon: 'plus' },
  { key: 'notifications', label: 'Alerts', icon: 'bell' },
  { key: 'profile', label: 'Profile', icon: 'user' },
]

/**
 * Mobile bottom tab bar styled as a signboard strip (§7.9): ink
 * background, yellow active icon. Hidden from tablet up.
 */
export function BottomNav({ active = 'home' }: { active?: BottomNavItem }) {
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
          {item.label}
        </a>
      ))}
    </nav>
  )
}
