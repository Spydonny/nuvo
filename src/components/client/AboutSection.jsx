import Reveal from '../ui/Reveal.jsx'
import { Sparkles, Truck, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Ручная работа',
    text: 'Каждый десерт собираем вручную из свежих ингредиентов в день заказа.',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    text: 'Доставляем по городу аккуратно и вовремя — всё приходит в идеальном состоянии.',
  },
  {
    icon: HeartHandshake,
    title: 'Идеальный подарок',
    text: 'Фирменная упаковка, лента и открытка — готовый подарок для близких.',
  },
]

export default function AboutSection() {
  return (
    <section className="bg-choco py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">о нас</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">
            Любовь к деталям и шоколаду
          </h2>
          <p className="mt-5 text-ivory/70">
            NUVÓ — это премиальные десерты ручной работы. Мы создаём эмоции: от первого
            взгляда на упаковку до последнего кусочка.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-ivory/10 bg-choco-light p-8 transition-colors hover:border-gold/40">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-berry/20 text-gold">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ivory">{f.title}</h3>
                <p className="mt-2 text-sm text-ivory/65">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
