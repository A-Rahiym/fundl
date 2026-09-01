import type { IconName } from '@/components/ui/icons'
import type { TagColor } from '@/components/ui/CategoryTag'
import type { StampTone } from '@/components/ui/StatusStamp'

export const LANDING_CATEGORIES: Array<{ key: string; icon: IconName; count: string }> = [
  { key: 'carpentry', icon: 'hammer', count: '480 fundis' },
  { key: 'plumbing', icon: 'wrench', count: '312 fundis' },
  { key: 'electrical', icon: 'bolt', count: '265 fundis' },
  { key: 'tailoring', icon: 'needle', count: '540 fundis' },
  { key: 'painting', icon: 'roller', count: '198 fundis' },
  { key: 'masonry', icon: 'trowel', count: '176 fundis' },
]

export const LANDING_ARTISANS: Array<{
  name: string
  categoryKey: string
  categoryColor: TagColor
  rating: number
  bio: string
  photo: string
  available: boolean
  topPro: boolean
}> = [
  { name: 'Adaeze Okafor', categoryKey: 'tailoring', categoryColor: 'red', rating: 4.8, bio: 'Custom bridal and traditional wear specialist.', photo: 'https://picsum.photos/seed/adaeze/600/600', available: true, topPro: true },
  { name: 'Musa Ibrahim', categoryKey: 'carpentry', categoryColor: 'green', rating: 4.9, bio: 'Built-in wardrobes, doors and kitchen fittings. 12 years on the tools.', photo: 'https://picsum.photos/seed/musa/600/600', available: true, topPro: false },
  { name: 'Kemi Adeyemi', categoryKey: 'electrical', categoryColor: 'yellow', rating: 4.7, bio: 'Commercial and domestic wiring, fault tracing and repairs.', photo: 'https://picsum.photos/seed/kemi/600/600', available: false, topPro: false },
  { name: 'Chinedu Nwosu', categoryKey: 'masonry', categoryColor: 'blue', rating: 4.6, bio: 'Blockwork, tiling and structural repairs. On-site quotes are free.', photo: 'https://picsum.photos/seed/chinedu/600/600', available: true, topPro: false },
]

export const LANDING_JOBS: Array<{
  title: string
  categoryKey: string
  categoryColor: TagColor
  location: string
  time: string
  budget: string
  statusKey: 'open' | 'inProgress' | 'completed'
  offers: number
}> = [
  { title: 'Fix leaking kitchen tap', categoryKey: 'plumbing', categoryColor: 'blue', location: 'Lekki', time: '2 hr ago', budget: '8,000', statusKey: 'open', offers: 4 },
  { title: 'Repair bedroom ceiling fan', categoryKey: 'electrical', categoryColor: 'yellow', location: 'Surulere', time: 'Yesterday', budget: '12,000', statusKey: 'inProgress', offers: 2 },
  { title: 'Tailor 3 corporate shirts', categoryKey: 'tailoring', categoryColor: 'red', location: 'Ikeja', time: '3 days ago', budget: '9,500', statusKey: 'completed', offers: 5 },
]

export const LANDING_NOTES: Array<{ quote: string; attribution: string }> = [
  { quote: 'She fixed my generator wiring in one hour and charged exactly what she quoted.', attribution: 'Tunde, Lekki' },
  { quote: 'The carpenter showed up when he said he would. A miracle in this city.', attribution: 'Amara, Surulere' },
  { quote: 'Finally found a tailor who understands "simple but sharp".', attribution: 'Yusuf, Ikeja' },
]

export const LANDING_STEPS: Array<{ titleKey: string; descKey: string }> = [
  { titleKey: 'landing:how.step1.title', descKey: 'landing:how.step1.desc' },
  { titleKey: 'landing:how.step2.title', descKey: 'landing:how.step2.desc' },
  { titleKey: 'landing:how.step3.title', descKey: 'landing:how.step3.desc' },
  { titleKey: 'landing:how.step4.title', descKey: 'landing:how.step4.desc' },
]

export const LANDING_JOB_STATUS_TONE: Record<'open' | 'inProgress' | 'completed', StampTone> = {
  open: 'open',
  inProgress: 'in-progress',
  completed: 'completed',
}
