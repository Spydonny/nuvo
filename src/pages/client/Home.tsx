import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../components/client/Hero'
import PromoStrip from '../../components/client/PromoStrip'
import ProductCard from '../../components/client/ProductCard'
import ProductModal from '../../components/client/ProductModal'
import AboutSection from '../../components/client/AboutSection'
import Reviews from '../../components/client/Reviews'
import MapSection from '../../components/client/MapSection'
import Button from '../../components/ui/Button'
import Reveal from '../../components/ui/Reveal'
import { fetchProducts, fetchReviews, fetchSettings } from '../../lib/api'
import { defaultSettings } from '../../lib/brand'
import type { Product, Review, SiteSettings } from '../../types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [active, setActive] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    Promise.all([fetchProducts(), fetchReviews(), fetchSettings()])
      .then(([productList, reviewList, siteSettings]) => {
        if (!mounted) return
        setProducts(productList)
        setReviews(reviewList)
        setSettings(siteSettings)
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setError('Не удалось загрузить витрину.')
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const featured = useMemo(() => products.filter((product) => product.available).slice(0, 4), [products])

  if (loading) {
    return <PageState text="Загружаем витрину..." />
  }

  if (error) {
    return <PageState text={error} />
  }

  return (
    <>
      <Hero settings={settings} />
      <PromoStrip settings={settings} />

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
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={setActive} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button as={Link} to="/catalog" variant="ghost">
              Весь каталог
            </Button>
          </div>
        </div>
      </section>

      <AboutSection settings={settings} />
      <Reviews reviews={reviews} />
      <MapSection settings={settings} />

      <ProductModal product={active} onClose={() => setActive(null)} />
    </>
  )
}

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-choco px-5 text-center">
      <p className="font-serif text-3xl text-ivory">{text}</p>
    </div>
  )
}
