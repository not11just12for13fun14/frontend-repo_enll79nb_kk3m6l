import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Package, Truck, Boxes, Settings, User, Layers3, ClipboardList, Home, Sun, Moon } from 'lucide-react'
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
    isActive ? 'bg-[#1E88E5] text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
  }`

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dark, setDark] = useState(false)

  // Initialize theme from localStorage / system
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ? stored === 'dark' : prefersDark
    setDark(initial)
  }, [])

  // Apply theme class to html
  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
              <Menu size={20} />
            </button>
            <Link to="/" className="font-semibold tracking-tight text-[#0D47A1] dark:text-[#66a1ff]">StockMaster</Link>
          </div>

          <div className="hidden md:block w-[40%] h-10">
            <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">My Profile</Link>
          </div>
        </div>
      </header>

      {/* Drawer and backdrop */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-3 shadow-xl animate-slide-in">
            <nav>
              <ul className="space-y-1">
                {nav.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <NavLink to={to} className={activeClass} end={to === '/'} onClick={() => setDrawerOpen(false)}>
                      <Icon size={18} />
                      <span className="text-sm font-medium">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
