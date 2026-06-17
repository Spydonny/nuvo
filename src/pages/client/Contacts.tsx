import { useEffect, useState } from 'react'
import MapSection from '../../components/client/MapSection'
import Button from '../../components/ui/Button'
import { fetchSettings } from '../../lib/api'
import { MessageCircle } from 'lucide-react'
import { defaultSettings, waLink } from '../../lib/brand'
import type { SiteSettings } from '../../types'

export default function Contacts() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setError('Не удалось загрузить контакты.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <PageState text="Загружаем контакты..." />
  }

  if (error) {
    return <PageState text={error} />
  }

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

      <MapSection settings={settings} />
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
