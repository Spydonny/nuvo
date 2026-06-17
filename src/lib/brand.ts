import type { SiteSettings } from '../types'

export const defaultSettings: SiteSettings = {
  contacts: {
    phone: '+77775838849',
    whatsapp: '77775838849',
    email: 'hello@nuvo.kz',
    instagram: 'https://instagram.com',
  },
  address: {
    address_text: 'г. Алматы, ул. Достык, 1',
    city: 'Алматы',
    map_lat: 43.238949,
    map_lng: 76.889709,
    map_link: 'https://2gis.kz/almaty',
  },
  working_hours: [
    { day: 'Ежедневно', open: '09:00', close: '22:00', is_day_off: false },
  ],
  texts: {
    hero_title: 'Почему выбирают NUVÓ',
    hero_subtitle: 'Всё, что нужно — любовь и шоколад',
    about_text:
      'NUVÓ — это премиальные десерты ручной работы. Мы создаём эмоции: от первого взгляда на упаковку до последнего кусочка.',
    footer_text: 'Клубника в шоколаде ручной работы, ассорти-боксы и подарочные корзины.',
  },
  commerce: {
    delivery_info: 'Доставка по Алматы в день заказа или в удобное для вас время.',
    payment_info: 'Оплата наличными, картой или переводом при получении.',
  },
  bot_enabled: true,
}

export const waLink = (text = 'Здравствуйте! Хочу оформить заказ в NUVÓ.') =>
  `https://wa.me/${defaultSettings.contacts.whatsapp}?text=${encodeURIComponent(text)}`

export const formatPrice = (value: number) =>
  `${Number(value).toLocaleString('ru-RU').replace(/,/g, ' ')} ₸`

export const mapWidgetUrl = (settings: SiteSettings) =>
  `https://www.google.com/maps?q=${settings.address.map_lat},${settings.address.map_lng}&z=15&output=embed`
