// Моковые заказы
export const orderStatuses = {
  new: { label: 'Новый', tone: 'text-gold bg-gold/15' },
  processing: { label: 'В работе', tone: 'text-platinum bg-platinum/15' },
  delivery: { label: 'Доставка', tone: 'text-terracotta-soft bg-terracotta/15' },
  done: { label: 'Выполнен', tone: 'text-emerald-300 bg-emerald-500/15' },
  cancelled: { label: 'Отменён', tone: 'text-red-300 bg-red-500/15' },
}

export const orders = [
  { id: '#1042', customer: 'Айгуль С.', items: 'Ассорти-бокс «Классика»', total: 9900, status: 'new', date: '17.06.2026', channel: 'whatsapp' },
  { id: '#1041', customer: 'Дмитрий К.', items: 'Корзина «Премиум»', total: 27900, status: 'processing', date: '17.06.2026', channel: 'site' },
  { id: '#1040', customer: 'Мария В.', items: 'Клубника в молочном шоколаде ×2', total: 13800, status: 'delivery', date: '16.06.2026', channel: 'whatsapp' },
  { id: '#1039', customer: 'Нурлан Б.', items: 'Бокс «Романтика»', total: 12900, status: 'done', date: '16.06.2026', channel: 'site' },
  { id: '#1038', customer: 'Алия Т.', items: 'Трюфели ручной работы', total: 7500, status: 'done', date: '15.06.2026', channel: 'whatsapp' },
  { id: '#1037', customer: 'Сергей П.', items: 'Подарочная корзина «Ассорти»', total: 19900, status: 'cancelled', date: '15.06.2026', channel: 'site' },
  { id: '#1036', customer: 'Жанна М.', items: 'Клубника «Ассорти трио»', total: 8400, status: 'done', date: '14.06.2026', channel: 'whatsapp' },
  { id: '#1035', customer: 'Олег Н.', items: 'Плитка крафтового шоколада ×3', total: 11700, status: 'done', date: '14.06.2026', channel: 'site' },
]
