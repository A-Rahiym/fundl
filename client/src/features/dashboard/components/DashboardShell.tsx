import type { ReactNode } from 'react'

/**
 * Framed app window for the client dashboard (guide/screen/dashboard.html):
 * pastel gradient backdrop with a white rounded frame. Full-bleed inside
 * the shell — same gutters as the header on every screen size.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-gradient-to-br from-blush via-lilac to-banner">
      <div className="flex min-h-[92vh] w-full flex-col overflow-hidden rounded-[32px] border-[2.5px] border-ink bg-white shadow-window">
        {children}
      </div>
    </div>
  )
}
