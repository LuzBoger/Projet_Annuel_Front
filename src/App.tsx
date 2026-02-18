import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'
import { AuthProvider } from './contexts/AuthProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
