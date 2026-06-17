import { motion } from 'framer-motion'
import type { Product } from '../../types'
import Badge from '../ui/Badge'
import { formatPrice } from '../../lib/brand'

interface ProductCardProps {
  product: Product
  onOpen: (product: Product) => void
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <motion.button
      onClick={() => onOpen(product)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="group text-left"
    >
      <div className="relative overflow-hidden rounded-3xl bg-choco-light shadow-card">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
              event.currentTarget.parentElement!.style.background =
                'linear-gradient(135deg,#C0492F,#3A2620)'
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          {product.badges?.includes('hit') && <Badge tone="hit">Хит</Badge>}
          {product.badges?.includes('new') && <Badge tone="new">Новинка</Badge>}
        </div>

        <span className="absolute bottom-3 right-3 rounded-full bg-berry px-3 py-1 text-sm font-semibold text-ivory shadow-card">
          {formatPrice(product.price)}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-xl text-ivory transition-colors group-hover:text-gold">
        {product.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-ivory/60">{product.description}</p>
    </motion.button>
  )
}
