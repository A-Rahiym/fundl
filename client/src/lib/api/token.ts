/**
 * @deprecated Auth now travels in the HttpOnly `fundi_token` cookie set by
 * the server — the browser attaches it automatically and JS never reads it.
 * This module is kept only so old imports don't break; all functions are
 * no-ops and will be deleted once Postman/mobile have migrated.
 */
export function getToken(): string | null {
  return null
}

export function setToken(_token: string) {
  // no-op: cookie is set via Set-Cookie response header
}

export function clearToken() {
  // no-op: clear via POST /auth/logout
}
