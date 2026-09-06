import type { IconName } from '@/components/ui/icons'
import type { Role } from '@/lib/api'

export type BottomNavItem = 'home' | 'search' | 'post' | 'offers' | 'notifications' | 'profile'

export interface BottomNavEntry {
  key: BottomNavItem
  labelKey: string
  icon: IconName
  to: string
}

const CLIENT_NAV_ITEMS: BottomNavEntry[] = [
  { key: 'home', labelKey: 'nav.myJobs', icon: 'home', to: '/app/my-jobs' },
  { key: 'search', labelKey: 'nav.hire', icon: 'search', to: '/app/search' },
  { key: 'post', labelKey: 'nav.post', icon: 'plus', to: '/app/post' },
  { key: 'notifications', labelKey: 'nav.alerts', icon: 'bell', to: '/app/notifications' },
  { key: 'profile', labelKey: 'nav.profile', icon: 'user', to: '/app/profile' },
]

const ARTISAN_NAV_ITEMS: BottomNavEntry[] = [
  { key: 'home', labelKey: 'nav.jobs', icon: 'home', to: '/app' },
  { key: 'offers', labelKey: 'nav.offers', icon: 'chat', to: '/app/offers/mine' },
  { key: 'notifications', labelKey: 'nav.alerts', icon: 'bell', to: '/app/notifications' },
  { key: 'profile', labelKey: 'nav.profile', icon: 'user', to: '/app/profile' },
]

/** Role-specific mobile navigation keeps each workspace focused on its workflow. */
export function getBottomNavItems(role: Role | undefined): BottomNavEntry[] {
  return role === 'client' ? CLIENT_NAV_ITEMS : ARTISAN_NAV_ITEMS
}
