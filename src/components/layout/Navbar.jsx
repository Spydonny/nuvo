import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { brand, waLink } from '../../data/brand.js'
import Button from '../ui/Button.jsx'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/contacts', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-choco-deep/85 backdrop-blur-md py-3 shadow-card'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Link to="/" className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory">
          NUV<span className="text-gold">Ó</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/admin" className="text-xs text-ivory/40 hover:text-ivory/70">
            Админка
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button as="a" href={waLink()} target="_blank" rel="noreferrer" variant="primary">
            Заказать
          </Button>
        </div>

        <button
          className="text-ivory md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Меню"
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-choco-deep/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory">
                NUV<span className="text-gold">Ó</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-ivory" aria-label="Закрыть">
                <X />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-16">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl text-ivory"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="text-sm text-ivory/50"
              >
                Админка
              </Link>
              <Button
                as="a"
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-4"
              >
                Заказать в WhatsApp
              </Button>
            </nav>
            <p className="absolute bottom-8 inset-x-0 text-center text-xs text-ivory/40">
              {brand.phone}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
