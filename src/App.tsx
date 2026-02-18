import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'
import { AuthProvider } from './contexts/AuthProvider'
import ResetPassword from './pages/reset-password/ResetPassword'
import ForgotPassword from './pages/forgot-password/ForgotPassword'

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
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
