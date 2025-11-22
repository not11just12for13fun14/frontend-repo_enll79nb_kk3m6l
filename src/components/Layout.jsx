import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Package, Truck, Boxes, Settings, User, Layers3, ClipboardList, Home, Warehouse } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const nav = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/receipts', label: 'Receipts', icon: ClipboardList },
  { to: '/deliveries', label: 'Deliveries', icon: Truck },
  { to: '/transfers', label: 'Transfers', icon: Layers3 },
  { to: '/adjustments', label: 'Adjustments', icon: Boxes },
  { to: '/settings/warehouses', label: 'Warehouses', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
]

const activeClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    isActive ? 'bg-[#1E88E5] text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

export default function Layout() {
  const [open, setOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-100 md:hidden" onClick={() => setOpen(!open)}>
              <Menu size={20} />
            </button>
            <Link to="/" className="font-semibold tracking-tight text-[#0D47A1]">StockMaster</Link>
          </div>

          <div className="hidden md:block w-[40%] h-10">
            <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900">My Profile</Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <aside className={`${open ? 'block' : 'hidden'} md:block`}>
          <nav className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm sticky top-[84px]">
            <ul className="space-y-1">
              {nav.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink to={to} className={activeClass} end={to === '/'}>
                    <Icon size={18} />
                    <span className="text-sm font-medium">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
