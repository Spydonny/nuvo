// Брендовые константы NUVÓ (плейсхолдеры для прототипа)
export const brand = {
  name: 'NUVÓ',
  tagline: 'Всё, что нужно — любовь и шоколад',
  description:
    'Кондитерская NUVÓ — клубника в шоколаде ручной работы, ассорти-боксы и подарочные корзины.',
  phone: '+7 (700) 000-00-00',
  whatsapp: '77000000000', // формат для wa.me
  address: 'г. Алматы, ул. Достык, 1',
  hours: 'Ежедневно 09:00 — 22:00',
  instagram: 'https://instagram.com',
  // Виджет-ссылка карты 2ГИС (плейсхолдер по центру Алматы)
  map2gis:
    'https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A43.238949%2C%22lon%22%3A76.889709%2C%22zoom%22%3A15%7D%2C%22opt%22%3A%7B%22city%22%3A%22almaty%22%7D%7D',
  currency: 'kzt',
}

// Готовый текст для WhatsApp-заказа
export const waLink = (text = 'Здравствуйте! Хочу оформить заказ в NUVÓ.') =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`

// Формат цены: 9900 -> "9 900 kzt"
export const formatPrice = (value) =>
  `${value.toLocaleString('ru-RU').replace(/,/g, ' ')} ${brand.currency}`
