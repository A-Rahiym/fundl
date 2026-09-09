import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { SideNav } from '@/components/layout/SideNav'
import { BottomNav } from '@/components/layout/BottomNav'

/**
 * Authenticated app shell: header, sidebar and content in one flex
 * column — the header reserves its own height, so content can never
 * slide underneath it. The shell is locked (no page scroll); only the
 * content pane scrolls.
 */
export function AppShell() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-blush via-lilac to-banner">
      <AppHeader />
      <div className="flex min-h-0 flex-1 gap-3 pl-3 pt-3 tablet:gap-6 tablet:pl-6 tablet:pt-3">
        <SideNav />
        <main className="w-full min-w-0 flex-1 overflow-y-auto px-3 pb-24 tablet:px-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
