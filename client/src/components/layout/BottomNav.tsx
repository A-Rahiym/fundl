import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import { BOTTOM_NAV_ITEMS } from '@/config/nav'
import type { BottomNavItem } from '@/config/nav'

/**
 * Mobile bottom tab bar styled as a signboard strip (§7.9): ink
 * background, yellow active icon. Hidden from tablet up.
 */
export function BottomNav({ active = 'home' }: { active?: BottomNavItem }) {
  const { t } = useTranslation()
  return (
    <nav className="bottom-nav tablet:hidden" aria-label="Primary">
      {BOTTOM_NAV_ITEMS.map((item) => (
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
