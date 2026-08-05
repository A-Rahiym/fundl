import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'

/**
 * Authenticated app shell (Workshop register §1.2): header signboard on
 * top, routed content below, signboard bottom nav on mobile (§7.9).
 */
export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-wall">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-24 pt-6 tablet:px-8 tablet:pb-12">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
