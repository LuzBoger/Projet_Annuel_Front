import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './App.css'
import { AuthProvider } from '@/contexts/AuthProvider'
import { ToastProvider } from '@/contexts/ToastProvider'
import { AppRoutes } from '@/components/routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <Helmet defaultTitle="Skaldly" titleTemplate="%s | Skaldly" />
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
