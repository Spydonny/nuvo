import { Star } from 'lucide-react'
import Reveal from '../ui/Reveal'
import type { Review } from '../../types'

interface ReviewsProps {
  reviews: Review[]
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill={i < n ? '#C9A86A' : 'none'} strokeWidth={1.5} />
      ))}
    </div>
  )
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="bg-choco-deep bg-noise py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">отзывы</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">
            Спасибо каждому за отзыв
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08}>
              <article className="h-full rounded-2xl bg-[#2b2b2b] p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-terracotta to-wine font-serif font-bold text-ivory">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-white/40">{review.count ?? 0} отзывов</p>
                  </div>
                  <span className="rounded-md px-2 py-1 text-xs text-emerald-400">
                    Подписаться
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Stars n={review.rating} />
                  <span className="text-xs text-white/40">{review.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{review.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
