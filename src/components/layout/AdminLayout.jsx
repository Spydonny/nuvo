import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Bot,
  Plug,
  ShoppingBag,
  Package,
  FileBarChart,
  LogOut,
  Menu,
  ExternalLink,
} from 'lucide-react'
import { pageTransition } from '../ui/Reveal.jsx'

const nav = [
  { to: '/admin/dashboard', label: 'Аналитика', icon: LayoutDashboard },
  { to: '/admin/ai', label: 'ИИ-агент', icon: Bot },
  { to: '/admin/integrations', label: 'Интеграции', icon: Plug },
  { to: '/admin/orders', label: 'Заказы', icon: ShoppingBag },
  { to: '/admin/products', label: 'Товары', icon: Package },
  { to: '/admin/reports', label: 'Отчёты', icon: FileBarChart },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1d1411] text-ivory">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ivory/10 bg-[#241914] bg-noise transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/admin/dashboard" className="font-serif text-2xl font-bold tracking-[0.2em]">
            NUV<span className="text-gold">Ó</span>
          </Link>
          <span className="rounded-full bg-wine/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
            admin
          </span>
        </div>

        <nav className="mt-2 space-y-1 px-3">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-wine/40 text-ivory'
                    : 'text-ivory/65 hover:bg-ivory/5 hover:text-ivory'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-3 bottom-6 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ivory/65 hover:bg-ivory/5 hover:text-ivory"
          >
            <ExternalLink size={18} /> На сайт
          </a>
          <button
            onClick={() => navigate('/admin')}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-ivory/65 hover:bg-ivory/5 hover:text-ivory"
          >
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ivory/10 bg-[#1d1411]/90 px-5 py-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Меню">
            <Menu />
          </button>
          <div className="hidden text-sm text-ivory/50 lg:block">
            Панель управления — демо на моковых данных
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">Администратор</p>
              <p className="text-xs text-ivory/50">NUVÓ Almaty</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold font-serif font-bold text-choco-deep">
              N
            </div>
          </div>
        </header>

        <motion.main {...pageTransition} className="overflow-x-hidden p-5 lg:p-8">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
