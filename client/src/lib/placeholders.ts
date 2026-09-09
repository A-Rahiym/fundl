/**
 * Deterministic external placeholder photos. Jobs use `photoUrl` when the
 * client uploaded one; everything else falls back here (the API has no
 * user/device photo uploads yet).
 */
export function jobPhoto(seed: string | null | undefined): string {
  return `https://picsum.photos/seed/fundi-job-${seed ?? 'new'}/400/400`
}

export function fundiPhoto(seed: string | null | undefined): string {
  return `https://picsum.photos/seed/fundi-face-${seed ?? 'anon'}/400/400`
}
