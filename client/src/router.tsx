import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/LoginPage'
import { SignupPage } from '@/features/auth/SignupPage'
import { AuthGate } from '@/features/auth/components/AuthGate'
import { RoleGate } from '@/features/auth/components/RoleGate'
import { AppShell } from '@/features/app/AppShell'
import { ComingSoonPage } from '@/features/app/ComingSoonPage'
import { HomePage } from '@/features/home/HomePage'
import { PostJobPage } from '@/features/jobs/PostJobPage'
import { JobDetailPage } from '@/features/jobs/JobDetailPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { SearchPage } from '@/features/search/SearchPage'
import { ArtisanProfilePage } from '@/features/artisans/ArtisanProfilePage'
import { MyOffersPage } from '@/features/offers/MyOffersPage'
import { ProfilePage } from '@/features/profile/ProfilePage'
import { NotFoundPage } from '@/features/errors/NotFoundPage'
import { LandingPage } from '@/features/landing/LandingPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/app',
    element: (
      <AuthGate>
        <AppShell />
      </AuthGate>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'post', element: <RoleGate role="client"><PostJobPage /></RoleGate> },
      { path: 'jobs/:id', element: <JobDetailPage /> },
      { path: 'my-jobs', element: <RoleGate role="client"><DashboardPage /></RoleGate> },
      { path: 'search', element: <SearchPage /> },
      { path: 'artisans/:id', element: <ArtisanProfilePage /> },
      { path: 'offers/mine', element: <RoleGate role="artisan"><MyOffersPage /></RoleGate> },
      { path: 'notifications', element: <ComingSoonPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])