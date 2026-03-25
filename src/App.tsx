import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import './App.css'
import { AuthProvider } from '@/contexts/AuthProvider'
import { ToastProvider } from '@/contexts/ToastProvider'
import ResetPassword from '@/pages/reset-password/ResetPassword'
import ForgotPassword from '@/pages/forgot-password/ForgotPassword'
import Verify2FA from '@/pages/verify-2fa/Verify2FA'
import { ProtectedRoute } from '@/components/routes/ProtectedRoute'
import Subscription from '@/pages/subscription/Subscription'
import Plans from '@/pages/plans/Plans'
import SubscriptionsManage from '@/pages/admin/subscriptions/SubscriptionsManage'
import PlansManage from '@/pages/admin/plans/PlansManage'
import CheckoutCancel from '@/pages/checkout/CheckoutCancel'
import CheckoutSuccess from '@/pages/checkout/CheckoutSuccess'
import { SettingsLayout } from '@/layout/SettingsLayout'
import { AdminLayout } from '@/layout/AdminLayout'
import { CheckoutLayout } from '@/layout/CheckoutLayout'
import AdminLogin from '@/pages/admin/login/AdminLogin'
import LanguageList from '@/pages/admin/languages/LanguageList'
import TopicList from '@/pages/admin/topics/TopicList'
import AdminDashboard from '@/pages/admin/dashboard/AdminDashboard'
import LessonList from '@/pages/admin/lessons/LessonList'
import LessonForm from '@/pages/admin/lessons/LessonForm'
import { Header } from '@/components/layout/Header'
import { Profile } from './pages/profile/Profile'
import { LanguageCatalog } from './pages/catalog-languages/LanguageCatalog'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
                <Route path="/plans" element={<Plans />} />
                  <Route path="/catalog-languages" element={<LanguageCatalog />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<ProtectedRoute><SettingsLayout /></ProtectedRoute>} >
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute isAdmin><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="plans" element={<PlansManage />} />
                  <Route path="subscriptions" element={<SubscriptionsManage />} />
                  <Route path="languages" element={<LanguageList />} />
                  <Route path="topics" element={<TopicList />} />
                  <Route path="topics/:topicId/lessons" element={<LessonList />} />
                  <Route path="topics/:topicId/lessons/new" element={<LessonForm />} />
                  <Route path="topics/:topicId/lessons/:lessonId/edit" element={<LessonForm />} />
                </Route>


                <Route path="/checkout" element={<ProtectedRoute><CheckoutLayout /></ProtectedRoute>}>
                  <Route path="success" element={<CheckoutSuccess />} />
                  <Route path="cancel" element={<CheckoutCancel />} />
                </Route>
              </Routes>
            </main>
          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
