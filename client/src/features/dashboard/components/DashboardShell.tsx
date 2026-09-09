import type { ReactNode } from 'react'

/**
 * Framed app window for the client dashboard (guide/screen/dashboard.html):
 * white rounded frame on the app-wide gradient. Full-bleed inside the
 * shell — same gutters as the header on every screen size.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="flex min-h-[92vh] w-full flex-col overflow-hidden rounded-[32px] border-[2.5px] border-ink bg-white shadow-window">
        {children}
      </div>
    </div>
  )
}
