import { MapPin, Phone, Clock } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { mapWidgetUrl } from '../../lib/brand'
import type { SiteSettings } from '../../types'

interface MapSectionProps {
  settings: SiteSettings
}

export default function MapSection({ settings }: MapSectionProps) {
  const hours = settings.working_hours[0]
  return (
    <section className="bg-choco py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">контакты</p>
          <h2 className="mt-3 font-serif text-4xl text-ivory md:text-5xl">Как нас найти</h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-5">
            <InfoRow icon={MapPin} title="Адрес" value={settings.address.address_text} />
            <InfoRow icon={Phone} title="Телефон" value={settings.contacts.phone} />
            <InfoRow
              icon={Clock}
              title="Часы работы"
              value={`${hours.day} ${hours.open} — ${hours.close}`}
            />
            <div className="rounded-3xl border border-ivory/10 bg-choco-light p-6">
              <p className="font-script text-3xl text-gold">{settings.texts.hero_subtitle}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-ivory/10 shadow-soft">
              <iframe
                title="Карта — NUVÓ"
                src={mapWidgetUrl(settings)}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof MapPin
  title: string
  value: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ivory/10 bg-choco-light p-5">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-berry/20 text-gold">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-ivory/40">{title}</p>
        <p className="mt-1 text-ivory">{value}</p>
      </div>
    </div>
  )
}
