import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { LandingPage } from './features/landing/LandingPage'

/**
 * App shell: the signboard header and mobile bottom tab bar wrap every
 * routed page. Phase 4 wires React Router here and swaps LandingPage for
 * the routed screen.
 */
export default function App() {
  return (
    <div className="min-h-screen pb-24 tablet:pb-12">
      <Header register="street" />
      <LandingPage />
      <BottomNav active="home" />
    </div>
  )
}
