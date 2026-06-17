import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Phone, MapPin, Clock } from 'lucide-react'
import { defaultSettings } from '../../lib/brand'
import { fetchSettings } from '../../lib/api'
import type { SiteSettings } from '../../types'

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => undefined)
  }, [])

  const hours = settings.working_hours[0]
  return (
    <footer className="border-t border-ivory/10 bg-choco-deep bg-noise">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl font-bold tracking-[0.2em] text-ivory">
            NUV<span className="text-gold">Ó</span>
          </p>
          <p className="mt-4 max-w-xs font-script text-2xl text-gold">{settings.texts.footer_text}</p>
        </div>

        <div className="space-y-3 text-sm text-ivory/75">
          <p className="flex items-center gap-3">
            <Phone size={16} className="text-gold" /> {settings.contacts.phone}
          </p>
          <p className="flex items-center gap-3">
            <MapPin size={16} className="text-gold" /> {settings.address.address_text}
          </p>
          <p className="flex items-center gap-3">
            <Clock size={16} className="text-gold" /> {hours.day} {hours.open} — {hours.close}
          </p>
          <a
            href={settings.contacts.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-ivory"
          >
            <Instagram size={16} className="text-gold" /> Instagram
          </a>
        </div>

        <div className="space-y-3 text-sm text-ivory/75">
          <Link to="/" className="block hover:text-ivory">Главная</Link>
          <Link to="/catalog" className="block hover:text-ivory">Каталог</Link>
          <Link to="/contacts" className="block hover:text-ivory">Контакты</Link>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} NUVÓ. Все права защищены.
      </div>
    </footer>
  )
}
