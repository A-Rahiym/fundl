/**
 * Procedural assignment helpers (design spec §8.4, §2.2).
 * Panels/tiles pick from the fixed tilt scale by index so the
 * effect reads as "naturally varied" rather than random.
 */

export const TILT_SCALE = [
  'tilt-n2',
  'tilt-n14',
  'tilt-n8',
  'tilt-n5',
  'tilt-5',
  'tilt-9',
  'tilt-12',
  'tilt-16',
] as const

export type TiltClass = (typeof TILT_SCALE)[number]

export function tiltFor(index: number): TiltClass {
  return TILT_SCALE[((index % TILT_SCALE.length) + TILT_SCALE.length) % TILT_SCALE.length]
}

/** ID-card alternation: ±1.2° so cards look pinned to a board (§7.3). */
export function cardTilt(index: number): 'tilt-12' | 'tilt-n12' {
  return index % 2 === 0 ? 'tilt-12' : 'tilt-n12'
}

/**
 * Category cycle (spec §2.2) — red → blue → green → yellow →
 * blue-dark → red-dark, so neighboring tiles never repeat.
 * Values are Tailwind bg-* utilities backed by theme tokens.
 */
export const CATEGORY_COLORS = [
  'bg-red',
  'bg-blue',
  'bg-green',
  'bg-yellow',
  'bg-blue-dark',
  'bg-red-dark',
] as const

export type CategoryColor = (typeof CATEGORY_COLORS)[number]

export function categoryColorFor(index: number): CategoryColor {
  return CATEGORY_COLORS[((index % CATEGORY_COLORS.length) + CATEGORY_COLORS.length) % CATEGORY_COLORS.length]
}

/** Dark panels get the inset dashed "painted border" + white text. */
export function textOn(c: CategoryColor): string {
  return c === 'bg-yellow' ? 'text-ink' : 'text-white'
}
