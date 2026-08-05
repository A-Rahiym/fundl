import type { Role } from '@/lib/api'

/** Signup role toggle options. */
export const ROLES: Array<{ value: Role; labelKey: string }> = [
  { value: 'client', labelKey: 'auth.roleClient' },
  { value: 'artisan', labelKey: 'auth.roleArtisan' },
]
