import { Navigate, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/features/auth/LoginPage'
import { SignupPage } from '@/features/auth/SignupPage'
import { AuthGate } from '@/features/auth/components/AuthGate'
import { SignedInHome } from '@/features/home/SignedInHome'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/',
    element: (
      <AuthGate>
        <SignedInHome />
      </AuthGate>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
