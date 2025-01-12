import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Mailbox from './pages/Mailbox'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import Security from './pages/Security'
import Enterprise from './pages/Enterprise'
import Documentation from './pages/Documentation'
import ApiDocs from './pages/ApiDocs'
import Status from './pages/Status'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'
import CookiePolicy from './pages/legal/CookiePolicy'
import Gdpr from './pages/legal/Gdpr'
import { useAuth } from './contexts/AuthContext'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    // You could show a loading spinner here
    return null
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}

interface AuthRouteProps {
  children: JSX.Element
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()
  const from = location.state?.from?.pathname || '/'
  
  if (isLoading) {
    // You could show a loading spinner here
    return null
  }
  
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return children
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/mailbox" replace /> : <Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Product Pages */}
      <Route path="/features" element={<Features />} />
      <Route path="/security" element={<Security />} />
      <Route path="/enterprise" element={<Enterprise />} />

      {/* Support Pages */}
      <Route path="/docs" element={<Documentation />} />
      <Route path="/api" element={<ApiDocs />} />
      <Route path="/status" element={<Status />} />
      <Route path="/contact" element={<Contact />} />

      {/* Legal Pages */}
      <Route path="/legal">
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="gdpr" element={<Gdpr />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth">
        <Route path="login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="register" element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />
        <Route path="forgot-password" element={
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        } />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="mailbox" element={<Mailbox />} />
        <Route path="mailbox/:emailId" element={<Mailbox />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes 