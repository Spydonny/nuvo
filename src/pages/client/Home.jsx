import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../components/client/Hero.jsx'
import PromoStrip from '../../components/client/PromoStrip.jsx'
import AboutSection from '../../components/client/AboutSection.jsx'
import Reviews from '../../components/client/Reviews.jsx'
import MapSection from '../../components/client/MapSection.jsx'
import ProductCard from '../../components/client/ProductCard.jsx'
import ProductModal from '../../components/client/ProductModal.jsx'
import Reveal from '../../components/ui/Reveal.jsx'
import Button from '../../components/ui/Button.jsx'
import { products } from '../../data/products.js'

export default function Home() {
  const [active, setActive] = useState(null)
  const featured = products.slice(0, 4)

  return (
    <>
      <Hero />
      <PromoStrip />

      {/* Избранное из каталога */}
      <section className="bg-choco py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold">витрина</p>
              <h2 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">Хиты продаж</h2>
            </div>
            <Button as={Link} to="/catalog" variant="ghost" className="hidden md:inline-flex">
              Весь каталог
            </Button>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setActive} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button as={Link} to="/catalog" variant="ghost">
              Весь каталог
            </Button>
          </div>
        </div>
      </section>

      <AboutSection />
      <Reviews />
      <MapSection />

      <ProductModal product={active} onClose={() => setActive(null)} />
    </>
  )
}
