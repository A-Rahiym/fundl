/** Formats a nullable naira amount as a plain number string (₦ added by callers). */
export function formatNaira(value: number | null | undefined): string {
  if (value === null || value === undefined) return ''
  return value.toLocaleString('en-NG', { maximumFractionDigits: 0 })
}

/** Short display date from an ISO string, e.g. "12 Aug". */
export function formatDate(iso: string | null | undefined, language = 'en'): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(language, { day: 'numeric', month: 'short' })
}
