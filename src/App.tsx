import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ClientLayout from './components/layout/ClientLayout'
import AdminLayout from './components/layout/AdminLayout'
import Home from './pages/client/Home'
import Catalog from './pages/client/Catalog'
import Contacts from './pages/client/Contacts'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AiAgent from './pages/admin/AiAgent'
import Chats from './pages/admin/Chats'
import Orders from './pages/admin/Orders'
import Products from './pages/admin/Products'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'
import { isAuthenticated } from './lib/api'

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/admin" replace />
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>

        <Route path="/admin" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/ai" element={<AiAgent />} />
          <Route path="/admin/chats" element={<Chats />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
