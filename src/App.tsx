import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import '@/App.css'
import { AuthProvider } from '@/contexts/AuthProvider'
import { ToastProvider } from '@/contexts/ToastProvider'
import { AppRoutes } from '@/components/routes/AppRoutes'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { ChallengeNotification } from '@/components/challenge/ChallengeNotification'

function App() {
  return (
    <BrowserRouter>
      <Helmet defaultTitle="Skaldly" titleTemplate="%s | Skaldly" />
      <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <ChallengeNotification />
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
