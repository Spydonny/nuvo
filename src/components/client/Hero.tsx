import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import { waLink } from '../../lib/brand'
import type { SiteSettings } from '../../types'

interface HeroProps {
  settings: SiteSettings
}

export default function Hero({ settings }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-terracotta bg-noise">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta via-terracotta-dark to-choco opacity-95" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-berry/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-28 pb-16 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sm uppercase tracking-[0.35em] text-ivory/70"
          >
            кондитерская
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-6xl font-bold leading-[0.95] text-ivory md:text-7xl"
          >
            {settings.texts.hero_title.split('NUV')[0]}
            <br />
            <span className="font-script text-7xl text-gold md:text-8xl">выбирают</span>{' '}
            NUV<span className="text-gold">Ó</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-md text-lg text-ivory/85"
          >
            {settings.texts.hero_subtitle}. Клубника в шоколаде ручной работы, ассорти-боксы и
            подарочные корзины с доставкой.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button as={Link} to="/catalog">
              Смотреть каталог
            </Button>
            <Button as="a" href={waLink()} target="_blank" rel="noreferrer" variant="ghost">
              Заказать в WhatsApp
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto hidden md:block"
        >
          <div className="animate-float">
            <ServingIllustration />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/60"
      >
        <ChevronDown className="animate-bounce" />
      </motion.div>
    </section>
  )
}

function ServingIllustration() {
  return (
    <svg viewBox="0 0 360 360" className="h-[360px] w-[360px]">
      <defs>
        <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E9ECEF" />
          <stop offset="45%" stopColor="#C9CDD2" />
          <stop offset="100%" stopColor="#8C9196" />
        </linearGradient>
        <radialGradient id="berry" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F08A8A" />
          <stop offset="100%" stopColor="#D6332B" />
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="250" rx="150" ry="34" fill="url(#silver)" />
      <ellipse cx="180" cy="244" rx="150" ry="30" fill="#F3EBDD" opacity="0.18" />
      <path d="M180 196 C150 196 150 244 180 244 C210 244 210 196 180 196 Z" fill="url(#berry)" />
      <path d="M172 196 q8 -14 16 0 z" fill="#7DA34F" />
      <path
        d="M70 150 a110 110 0 0 1 220 0 Z"
        fill="url(#silver)"
        transform="translate(0 -8)"
      />
      <circle cx="180" cy="40" r="10" fill="url(#silver)" />
      <rect x="176" y="20" width="8" height="20" rx="4" fill="#8C9196" />
    </svg>
  )
}
