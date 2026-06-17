import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../../components/client/ProductCard'
import ProductModal from '../../components/client/ProductModal'
import { fetchProducts } from '../../lib/api'
import type { Product } from '../../types'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('all')
  const [active, setActive] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
      .then((list) => {
        setProducts(list)
        setLoading(false)
      })
      .catch(() => setError('Не удалось загрузить каталог.'))
  }, [])

  const categories = useMemo(() => {
    const ids = Array.from(new Set(products.map((product) => product.category)))
    return [{ id: 'all', label: 'Всё' }, ...ids.map((id) => ({ id, label: id }))]
  }, [products])

  const list = useMemo(
    () =>
      category === 'all'
        ? products.filter((product) => product.available)
        : products.filter((product) => product.category === category && product.available),
    [category, products],
  )

  if (loading) {
    return <PageState text="Загружаем каталог..." />
  }

  if (error) {
    return <PageState text={error} />
  }

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

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                category === item.id
                  ? 'bg-berry text-ivory'
                  : 'border border-ivory/20 text-ivory/70 hover:border-gold hover:text-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={setActive} />
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

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-choco px-5 text-center">
      <p className="font-serif text-3xl text-ivory">{text}</p>
    </div>
  )
}
