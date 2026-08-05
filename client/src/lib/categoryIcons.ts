import type { IconName } from '@/components/ui/icons'

/** Category key → signboard line icon (design §4). */
export const CATEGORY_ICONS: Record<string, IconName> = {
  carpentry: 'hammer',
  plumbing: 'wrench',
  electrical: 'bolt',
  tailoring: 'needle',
  painting: 'roller',
  masonry: 'trowel',
}

export function categoryIcon(key: string | null | undefined): IconName {
  return CATEGORY_ICONS[key ?? ''] ?? 'hammer'
}
