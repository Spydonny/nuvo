// Моковые статусы интеграций
export const bitrix = {
  connected: true,
  lastSync: '17.06.2026, 13:24',
  portal: 'nuvo.bitrix24.kz',
  leads: 84,
  deals: 41,
  pipeline: [
    { stage: 'Новые', count: 18, sum: 162000 },
    { stage: 'В работе', count: 12, sum: 248000 },
    { stage: 'Счёт выставлен', count: 7, sum: 196000 },
    { stage: 'Успешно', count: 41, sum: 1240000 },
  ],
}

export const oneC = {
  connected: true,
  lastSync: '17.06.2026, 13:20',
  base: '1С:Управление торговлей 11',
  nomenclature: 86,
  stock: [
    { name: 'Клубника (кг)', qty: 42, unit: 'кг', status: 'ok' },
    { name: 'Шоколад молочный (кг)', qty: 18, unit: 'кг', status: 'ok' },
    { name: 'Шоколад тёмный (кг)', qty: 6, unit: 'кг', status: 'low' },
    { name: 'Коробки ассорти (шт)', qty: 120, unit: 'шт', status: 'ok' },
    { name: 'Корзины плетёные (шт)', qty: 9, unit: 'шт', status: 'low' },
  ],
  docs: [
    { id: 'ПН-0451', type: 'Поступление товаров', date: '16.06.2026', sum: 380000 },
    { id: 'РН-1042', type: 'Реализация', date: '17.06.2026', sum: 9900 },
    { id: 'РН-1041', type: 'Реализация', date: '17.06.2026', sum: 27900 },
  ],
}
