import type { JobStatus, OfferStatus } from '@/lib/api'
import type { StampTone } from '@/components/ui/StatusStamp'

/** Job status → stamp tone (signboard colour, design §4). */
export const JOB_STATUS_TONE: Record<JobStatus, StampTone> = {
  open: 'open',
  in_progress: 'in-progress',
  completed: 'completed',
  cancelled: 'cancelled',
}

/** Job status → i18n label key. */
export const JOB_STATUS_LABEL: Record<JobStatus, string> = {
  open: 'status.open',
  in_progress: 'status.inProgress',
  completed: 'status.completed',
  cancelled: 'status.cancelled',
}

/** Offer status → stamp tone. */
export const OFFER_STATUS_TONE: Record<OfferStatus, StampTone> = {
  pending: 'open',
  accepted: 'completed',
  declined: 'cancelled',
  withdrawn: 'neutral',
}

/** Reputation stamp key → i18n label (server: src/config/constants.ts). */
export const STAMP_LABEL: Record<string, string> = {
  first_job: 'stamp.firstJob',
  on_a_roll: 'stamp.onARoll',
  five_star_streak: 'stamp.fiveStarStreak',
}
