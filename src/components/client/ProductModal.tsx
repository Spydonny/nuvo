import type { Product } from '../../types'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { MessageCircle } from 'lucide-react'
import { waLink, formatPrice } from '../../lib/brand'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null
  const order = waLink(
    `Здравствуйте! Хочу заказать «${product.name}» (${formatPrice(product.price)}).`,
  )

  return (
    <Modal open={!!product} onClose={onClose}>
      <div className="grid md:grid-cols-2">
        <div className="aspect-square overflow-hidden md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.style.background = 'linear-gradient(135deg,#C0492F,#3A2620)'
            }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="flex gap-2">
            {product.badges?.includes('hit') && <Badge tone="hit">Хит</Badge>}
            {product.badges?.includes('new') && <Badge tone="new">Новинка</Badge>}
          </div>
          <h2 className="mt-4 font-serif text-3xl text-ivory">{product.name}</h2>
          <p className="mt-4 text-ivory/70">{product.description}</p>
          <p className="mt-6 text-3xl font-bold text-gold">{formatPrice(product.price)}</p>

          <Button
            as="a"
            href={order}
            target="_blank"
            rel="noreferrer"
            className="mt-8 w-full"
          >
            <MessageCircle size={18} /> Заказать в WhatsApp
          </Button>
          <p className="mt-4 text-center text-xs text-ivory/40">
            Доставка по городу · оплата при получении
          </p>
        </div>
      </div>
    </Modal>
  )
}
