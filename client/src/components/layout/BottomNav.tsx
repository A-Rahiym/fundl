import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/icons'
import { getBottomNavItems } from '@/config/nav'
import type { BottomNavItem } from '@/config/nav'
import { useSession } from '@/features/auth/hooks/useAuthQueries'

/**
 * Mobile bottom tab bar (neo-brutalist dashboard spec): white bar, ink
 * top border, ink active icon with a sun dot, raised sun Post button.
 * Hidden from tablet up.
 */
export function BottomNav({ active = 'home' }: { active?: BottomNavItem }) {
  const { t } = useTranslation()
  const user = useSession().data
  const items = getBottomNavItems(user?.role)
  return (
    <nav className="bottom-nav tablet:hidden" aria-label="Primary">
      {items.map((item) => {
        const isPost = item.key === 'post'
        return (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.key === 'home'}
            aria-current={active === item.key ? 'page' : undefined}
            aria-label={t(item.labelKey)}
            className={({ isActive }) =>
              cx(
                'bottom-nav__item',
                (isActive || active === item.key) && 'bottom-nav__item--active',
                isPost && 'bottom-nav__item--post',
              )
            }
          >
            {isPost ? (
              <span className="bottom-nav__pill">
                <Icon name={item.icon} size={22} />
              </span>
            ) : (
              <>
                <Icon name={item.icon} size={22} />
                {t(item.labelKey)}
                <span className="bottom-nav__dot" aria-hidden="true" />
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
