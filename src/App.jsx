import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import ClientLayout from './components/layout/ClientLayout.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'

import Home from './pages/client/Home.jsx'
import Catalog from './pages/client/Catalog.jsx'
import Contacts from './pages/client/Contacts.jsx'

import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AiAgent from './pages/admin/AiAgent.jsx'
import Integrations from './pages/admin/Integrations.jsx'
import Orders from './pages/admin/Orders.jsx'
import Products from './pages/admin/Products.jsx'
import Reports from './pages/admin/Reports.jsx'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Клиентская часть */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>

        {/* Админка */}
        <Route path="/admin" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/ai" element={<AiAgent />} />
          <Route path="/admin/integrations" element={<Integrations />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
