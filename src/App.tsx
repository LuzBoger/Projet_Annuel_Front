import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'
import { AuthProvider } from './contexts/AuthProvider'
import ResetPassword from './pages/reset-password/ResetPassword'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import TwoFactorSettings from './pages/settings/TwoFactorSettings'
import Verify2FA from './pages/verify-2fa/Verify2FA'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import Subscription from './pages/subscription/Subscription'
import Plans from './pages/plans/Plans'
import SubscriptionsManage from './pages/admin/subscriptions/SubscriptionsManage'
import PlansManage from './pages/admin/plans/PlansManage'
import CheckoutCancel from './pages/checkout/CheckoutCancel'
import CheckoutSuccess from './pages/checkout/CheckoutSuccess'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/settings/two-factor" element={<ProtectedRoute><TwoFactorSettings /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/admin/plans" element={<PlansManage />} />
        <Route path="/admin/subscriptions" element={<SubscriptionsManage />} />
        <Route path="/checkout/success" element={<ProtectedRoute><CheckoutSuccess /></ProtectedRoute>} />
        <Route path="/checkout/cancel" element={<ProtectedRoute><CheckoutCancel /></ProtectedRoute>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
