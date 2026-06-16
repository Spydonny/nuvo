import MapSection from '../../components/client/MapSection.jsx'
import Button from '../../components/ui/Button.jsx'
import { waLink, brand } from '../../data/brand.js'
import { MessageCircle } from 'lucide-react'

export default function Contacts() {
  return (
    <div className="bg-choco pt-28">
      <header className="mx-auto max-w-3xl px-5 pb-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">связаться</p>
        <h1 className="mt-3 font-serif text-5xl text-ivory md:text-6xl">Контакты NUVÓ</h1>
        <p className="mx-auto mt-4 max-w-xl text-ivory/70">
          Принимаем заказы ежедневно. Самый быстрый способ — написать в WhatsApp.
        </p>
        <Button as="a" href={waLink()} target="_blank" rel="noreferrer" className="mt-7">
          <MessageCircle size={18} /> Написать в WhatsApp
        </Button>
      </header>

      <MapSection />
    </div>
  )
}
