import type { IconName } from '@/components/ui/icons'

export type BottomNavItem = 'home' | 'search' | 'post' | 'notifications' | 'profile'

/** Bottom tab bar entries (mobile app chrome, §7.9). */
export const BOTTOM_NAV_ITEMS: Array<{ key: BottomNavItem; labelKey: string; icon: IconName; to: string }> = [
  { key: 'home', labelKey: 'nav.home', icon: 'home', to: '/' },
  { key: 'search', labelKey: 'nav.search', icon: 'search', to: '/search' },
  { key: 'post', labelKey: 'nav.post', icon: 'plus', to: '/post' },
  { key: 'notifications', labelKey: 'nav.alerts', icon: 'bell', to: '/notifications' },
  { key: 'profile', labelKey: 'nav.profile', icon: 'user', to: '/profile' },
]
