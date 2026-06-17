import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import Card from '../../components/admin/Card'
import Button from '../../components/ui/Button'
import { fetchSettings, updateSettings } from '../../lib/api'
import { defaultSettings } from '../../lib/brand'
import type { SiteSettings } from '../../types'

export default function Settings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setError('Не удалось загрузить CMS.'))
      .finally(() => setLoading(false))
  }, [])

  const updateContacts = (key: keyof SiteSettings['contacts'], value: string) => {
    setSettings((current) => ({ ...current, contacts: { ...current.contacts, [key]: value } }))
  }

  const updateAddress = (key: keyof SiteSettings['address'], value: string) => {
    setSettings((current) => ({ ...current, address: { ...current.address, [key]: value } }))
  }

  const updateTexts = (key: keyof SiteSettings['texts'], value: string) => {
    setSettings((current) => ({ ...current, texts: { ...current.texts, [key]: value } }))
  }

  const updateCommerce = (key: keyof SiteSettings['commerce'], value: string) => {
    setSettings((current) => ({ ...current, commerce: { ...current.commerce, [key]: value } }))
  }

  const save = () => {
    updateSettings(settings)
      .then(() => setSaved(true))
      .catch(() => setError('Не удалось сохранить CMS.'))
      .finally(() => setTimeout(() => setSaved(false), 2000))
  }

  if (loading) return <PageState text="Загружаем CMS..." />
  if (error) return <PageState text={error} />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ivory">CMS</h1>
          <p className="text-sm text-ivory/50">Коллекция site_settings</p>
        </div>
        <Button onClick={save}>
          <Save size={16} /> Сохранить
        </Button>
      </div>

      {saved && <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">Настройки сохранены</p>}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Контакты">
          <div className="space-y-4">
            <Input label="Телефон" value={settings.contacts.phone} onChange={(value) => updateContacts('phone', value)} />
            <Input label="WhatsApp" value={settings.contacts.whatsapp} onChange={(value) => updateContacts('whatsapp', value)} />
            <Input label="E-mail" value={settings.contacts.email} onChange={(value) => updateContacts('email', value)} />
            <Input label="Instagram" value={settings.contacts.instagram} onChange={(value) => updateContacts('instagram', value)} />
          </div>
        </Card>

        <Card title="Адрес">
          <div className="space-y-4">
            <Input label="Адрес" value={settings.address.address_text} onChange={(value) => updateAddress('address_text', value)} />
            <Input label="Город" value={settings.address.city} onChange={(value) => updateAddress('city', value)} />
            <Input label="Ссылка на карту" value={settings.address.map_link} onChange={(value) => updateAddress('map_link', value)} />
          </div>
        </Card>

        <Card title="Тексты">
          <div className="space-y-4">
            <Input label="Заголовок героя" value={settings.texts.hero_title} onChange={(value) => updateTexts('hero_title', value)} />
            <Input label="Подзаголовок" value={settings.texts.hero_subtitle} onChange={(value) => updateTexts('hero_subtitle', value)} />
            <TextArea label="О нас" value={settings.texts.about_text} onChange={(value) => updateTexts('about_text', value)} />
            <Input label="Подвал" value={settings.texts.footer_text} onChange={(value) => updateTexts('footer_text', value)} />
          </div>
        </Card>

        <Card title="Коммерция">
          <div className="space-y-4">
            <TextArea label="Доставка" value={settings.commerce.delivery_info} onChange={(value) => updateCommerce('delivery_info', value)} />
            <TextArea label="Оплата" value={settings.commerce.payment_info} onChange={(value) => updateCommerce('payment_info', value)} />
            <label className="flex items-center gap-3 text-sm text-ivory/70">
              <input
                type="checkbox"
                checked={settings.bot_enabled}
                onChange={(event) => setSettings({ ...settings, bot_enabled: event.target.checked })}
                className="rounded border-ivory/20 bg-[#1d1411]"
              />
              WhatsApp-бот включён
            </label>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
      />
    </div>
  )
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
      />
    </div>
  )
}

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-ivory/10 bg-[#241914]">
      <p className="text-ivory/60">{text}</p>
    </div>
  )
}
