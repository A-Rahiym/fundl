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
  {
    name: 'Adaeze Okafor',
    categoryKey: 'tailoring',
    categoryColor: 'red',
    rating: 4.8,
    bio: 'Custom bridal and traditional wear specialist.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    available: true,
    topPro: true,
  },
  {
    name: 'Musa Ibrahim',
    categoryKey: 'carpentry',
    categoryColor: 'green',
    rating: 4.9,
    bio: 'Built-in wardrobes, doors and kitchen fittings. 12 years on the tools.',
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    available: true,
    topPro: false,
  },
  {
    name: 'Kemi Adeyemi',
    categoryKey: 'electrical',
    categoryColor: 'yellow',
    rating: 4.7,
    bio: 'Commercial and domestic wiring, fault tracing and repairs.',
    photo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    available: false,
    topPro: false,
  },
  {
    name: 'Chinedu Nwosu',
    categoryKey: 'masonry',
    categoryColor: 'blue',
    rating: 4.6,
    bio: 'Blockwork, tiling and structural repairs. On-site quotes are free.',
    photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    available: true,
    topPro: false,
  },
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

export const LANDING_NOTES: Array<{ quoteKey: string; nameKey: string; roleKey: string }> = [
  { quoteKey: 'landing:testi.q1', nameKey: 'landing:testi.n1', roleKey: 'landing:testi.r1' },
  { quoteKey: 'landing:testi.q2', nameKey: 'landing:testi.n2', roleKey: 'landing:testi.r2' },
  { quoteKey: 'landing:testi.q3', nameKey: 'landing:testi.n3', roleKey: 'landing:testi.r3' },
]

export const LANDING_STEPS: Array<{
  icon: 'send' | 'shield-check' | 'check'
  titleKey: string
  descKey: string
  footAKey: string
  footBKey: string
  pillTone: 'bg-ink text-white' | 'bg-red text-white' | 'bg-green text-white'
}> = [
  {
    icon: 'send',
    titleKey: 'landing:steps.s1t',
    descKey: 'landing:steps.s1d',
    footAKey: 'landing:steps.s1fa',
    footBKey: 'landing:steps.s1fb',
    pillTone: 'bg-ink text-white',
  },
  {
    icon: 'shield-check',
    titleKey: 'landing:steps.s2t',
    descKey: 'landing:steps.s2d',
    footAKey: 'landing:steps.s2fa',
    footBKey: 'landing:steps.s2fb',
    pillTone: 'bg-red text-white',
  },
  {
    icon: 'check',
    titleKey: 'landing:steps.s3t',
    descKey: 'landing:steps.s3d',
    footAKey: 'landing:steps.s3fa',
    footBKey: 'landing:steps.s3fb',
    pillTone: 'bg-green text-white',
  },
]

export const LANDING_JOB_STATUS_TONE: Record<'open' | 'inProgress' | 'completed', StampTone> = {
  open: 'open',
  inProgress: 'in-progress',
  completed: 'completed',
}
