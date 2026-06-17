import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import { waLink } from '../../lib/brand'

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
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
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
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
            className="fixed inset-0 z-50 flex flex-col bg-choco-deep md:hidden"
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
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-serif text-3xl transition-colors ${
                      isActive ? 'text-gold' : 'text-ivory'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
