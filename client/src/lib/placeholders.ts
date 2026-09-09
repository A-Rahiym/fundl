/**
 * Curated free-stock photos (Pexels License — free for commercial use).
 * Every URL below was HEAD-verified (200 + image/*) at wiring time.
 * Photo pages (attribution): pexels.com photo IDs listed per pool —
 * e.g. electrician-in-helmet-working-with-cables-21812146,
 * carpenter-working-in-the-workshop-7480718,
 * tailor-using-sewing-machine-in-workshop-37409122,
 * man-painting-a-wall-5493655,
 * close-up-of-bricklayer-s-hand-laying-a-brick-32913797,
 * portrait-of-construction-worker-15200454, and siblings.
 *
 * Jobs use `photoUrl` when the client uploaded one; everything else falls
 * back here (the API has no user/device photo uploads yet).
 */
const px = (id: number): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`

const TRADE_PHOTOS: Record<string, number[]> = {
  carpentry: [7480718, 6790972, 37358114],
  plumbing: [8486972],
  electrical: [21812146, 27928762, 17842834],
  tailoring: [37409122],
  painting: [5493655, 6474471],
  masonry: [32913797, 19688828],
}

const FACE_PHOTOS: number[] = [
  15200454, 15200451, 16552855, 3772616, 8486972, 18746550, 8487732,
]

const GENERIC_JOBS: number[] = [7480718, 21812146, 5493655, 32913797, 37409122]

/** Deterministic pool pick so each seed keeps a stable photo. */
function pick(pool: number[], seed: string | null | undefined): number {
  const s = seed ?? 'fundi'
  let hash = 0
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 31 + s.charCodeAt(i)) >>> 0
  }
  return pool[hash % pool.length] ?? pool[0]!
}

export function jobPhoto(
  seed: string | null | undefined,
  categoryKey?: string | null,
): string {
  const pool =
    (categoryKey && TRADE_PHOTOS[categoryKey]) || GENERIC_JOBS
  return px(pick(pool, seed))
}

export function fundiPhoto(seed: string | null | undefined): string {
  return px(pick(FACE_PHOTOS, seed))
}
