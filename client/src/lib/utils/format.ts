/**
 * Formats a nullable naira amount as a plain number string (₦ added by
 * callers). Coerces Decimal-as-string values the API returns (e.g.
 * "8000") so they get proper thousand separators.
 */
export function formatNaira(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return ''
  const n = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(n)) return ''
  return n.toLocaleString('en-NG', { maximumFractionDigits: 0 })
}

/** Short display date from an ISO string, e.g. "12 Aug". */
export function formatDate(iso: string | null | undefined, language = 'en'): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(language, { day: 'numeric', month: 'short' })
}
