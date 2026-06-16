import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'

// Акцентный блок «Ассорти-боксы» (аналог промо-секции)
export default function PromoStrip() {
  return (
    <section className="relative overflow-hidden bg-mauve bg-noise py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-choco/60 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">от 9 900 kzt</p>
          <h2 className="mt-3 font-script text-6xl text-ivory md:text-7xl">Ассорти-боксы</h2>
          <p className="mt-5 max-w-md text-ivory/80">
            Соберите идеальный подарок: клубника в трёх видах шоколада, трюфели и
            конфеты ручной работы в фирменной упаковке NUVÓ.
          </p>
          <Button as={Link} to="/catalog" variant="gold" className="mt-8">
            Собрать бокс
          </Button>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[2rem] shadow-soft"
        >
          <img
            src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1000&q=80"
            alt="Ассорти-бокс NUVÓ"
            onError={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg,#C0492F,#3A2620)'
              e.currentTarget.style.minHeight = '320px'
            }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
