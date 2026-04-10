import { AuthContext } from "@/contexts/AuthContext";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import ResetPassword from "@/pages/reset-password/ResetPassword";
import Verify2FA from "@/pages/verify-2fa/Verify2FA";
import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Subscription from "@/pages/subscription/Subscription";
import Plans from "@/pages/plans/Plans";
import { LanguageCatalog } from "@/pages/catalog-languages/LanguageCatalog";
import { LanguageDetailPage } from "@/pages/languages/LanguageDetailPage";
import { Profile } from "@/pages/profile/Profile";
import { SettingsLayout } from "@/layout/SettingsLayout";
import AdminLogin from "@/pages/admin/login/AdminLogin";
import { AdminLayout } from "@/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import PlansManage from "@/pages/admin/plans/PlansManage";
import SubscriptionsManage from "@/pages/admin/subscriptions/SubscriptionsManage";
import LanguageList from "@/pages/admin/languages/LanguageList";
import TopicList from "@/pages/admin/topics/TopicList";
import LessonList from "@/pages/admin/lessons/LessonList";
import LessonForm from "@/pages/admin/lessons/LessonForm";
import { CheckoutLayout } from "@/layout/CheckoutLayout";
import CheckoutSuccess from "@/pages/checkout/CheckoutSuccess";
import CheckoutCancel from "@/pages/checkout/CheckoutCancel";
import LanguageTopics from "@/pages/topics/LanguageTopics";
import TopicLessons from "@/pages/topics/TopicLessons";
import TopicExam from "@/pages/topics/TopicExam";
import LessonPlayer from "@/pages/lessons/LessonPlayer";
import LessonSuccess from "@/pages/lessons/LessonSuccess";
import { OnBoardingModal } from "../onBoarding/OnBoardingModal";
import { Header } from "@/components/layout/Header";
import { RoleEnum } from "@/types/enum/roles";
import { AUTH_PATH } from "@/constants/global";
import Dashboard from "@/pages/user/Dashboard";

export function AppRoutes() {
  const { user, isAuthenticated, fetchUser } = useContext(AuthContext)!;
  const location = useLocation();
  
  const showOnBoarding = isAuthenticated && !!user && !user.hasCompletedOnboarding && user.role !== RoleEnum.ADMIN && !AUTH_PATH.includes(location.pathname);

  return (
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
          <Route path="/languages/:languageId" element={<LanguageDetailPage />} />
          <Route path="/dashboard" element={<ProtectedRoute userOnly><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/language/:languageId/topics" element={<ProtectedRoute><LanguageTopics /></ProtectedRoute>} />
          <Route path="/topics/:topicId" element={<ProtectedRoute><TopicLessons /></ProtectedRoute>} />
          <Route path="/topics/:topicId/exam" element={<ProtectedRoute><TopicExam /></ProtectedRoute>} />
          <Route path="/lessons/:lessonId/play" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
          <Route path="/lessons/:lessonId/success" element={<ProtectedRoute><LessonSuccess /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsLayout /></ProtectedRoute>} />
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
      {showOnBoarding && <OnBoardingModal onClose={fetchUser} />}
    </div>
  );
}
