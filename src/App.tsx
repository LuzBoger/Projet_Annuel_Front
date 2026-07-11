import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import '@/App.css'
import { AuthProvider } from '@/contexts/AuthProvider'
import { ToastProvider } from '@/contexts/ToastProvider'
import { AppRoutes } from '@/components/routes/AppRoutes'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { ChallengeNotification } from '@/components/challenge/ChallengeNotification'
import { AccessibilityControls } from '@/components/ui/accessibility/AccessibilityControls'
import { Scroll } from '@/components/ui/Scroll'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { PushNotificationProvider } from '@/contexts/PushNotificationProvider'

function App() {
  return (
    <BrowserRouter>
      <Scroll />
      <Helmet defaultTitle="Skaldly" titleTemplate="%s | Skaldly" />
      <ThemeProvider>
      <AuthProvider>
        <PushNotificationProvider>
          <ToastProvider>
            <ChallengeNotification />
            <AppRoutes />
            <CookieBanner />
            <AccessibilityControls />
          </ToastProvider>
        </PushNotificationProvider>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
