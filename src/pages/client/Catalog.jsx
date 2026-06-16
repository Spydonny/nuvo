import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../../components/client/ProductCard.jsx'
import ProductModal from '../../components/client/ProductModal.jsx'
import { products, categories } from '../../data/products.js'

export default function Catalog() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(null)

  const list = useMemo(
    () => (cat === 'all' ? products : products.filter((p) => p.category === cat)),
    [cat],
  )

  return (
    <div className="bg-choco pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-24">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">каталог</p>
          <h1 className="mt-3 font-serif text-5xl text-ivory md:text-6xl">Продукция онлайн</h1>
          <p className="mx-auto mt-4 max-w-xl text-ivory/70">
            Выберите десерт и оформите заказ в WhatsApp в один клик.
          </p>
        </header>

        {/* фильтр категорий */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                cat === c.id
                  ? 'bg-berry text-ivory'
                  : 'border border-ivory/20 text-ivory/70 hover:border-gold hover:text-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setActive} />
          ))}
        </motion.div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-ivory/50">В этой категории пока пусто.</p>
        )}
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </div>
  )
}
