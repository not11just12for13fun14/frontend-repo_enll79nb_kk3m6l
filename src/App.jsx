import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Receipts from './pages/Receipts'
import Deliveries from './pages/Deliveries'
import Transfers from './pages/Transfers'
import Adjustments from './pages/Adjustments'
import SettingsWarehouses from './pages/SettingsWarehouses'
import Profile from './pages/Profile'
import { LoginPage, SignupPage } from './pages/Auth'

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="adjustments" element={<Adjustments />} />
        <Route path="settings/warehouses" element={<SettingsWarehouses />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
