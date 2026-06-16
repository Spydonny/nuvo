// Моковые данные ИИ-агента («сколько принёс»)
export const aiSummary = {
  revenue: 1842000, // выручка, атрибутированная ИИ-агенту
  revenueShare: 37.9, // % от общей выручки
  dialogs: 1264,
  conversions: 286,
  conversionRate: 22.6,
  avgResponse: '7 сек',
  hoursSaved: 214,
}

export const aiRevenueByWeek = [
  { week: '1 нед', revenue: 180000, dialogs: 210 },
  { week: '2 нед', revenue: 240000, dialogs: 268 },
  { week: '3 нед', revenue: 310000, dialogs: 305 },
  { week: '4 нед', revenue: 420000, dialogs: 341 },
  { week: '5 нед', revenue: 392000, dialogs: 322 },
  { week: '6 нед', revenue: 300000, dialogs: 280 },
]

export const aiDialogs = [
  {
    id: 1,
    client: '+7 707 •••• 12',
    intent: 'Заказ ассорти-бокса',
    result: 'Оформлен заказ',
    amount: 9900,
    time: '12:42',
    status: 'converted',
  },
  {
    id: 2,
    client: '+7 701 •••• 84',
    intent: 'Вопрос по доставке',
    result: 'Консультация',
    amount: 0,
    time: '12:30',
    status: 'info',
  },
  {
    id: 3,
    client: '+7 778 •••• 03',
    intent: 'Подарок на 8 марта',
    result: 'Оформлен заказ',
    amount: 19900,
    time: '11:58',
    status: 'converted',
  },
  {
    id: 4,
    client: '+7 705 •••• 51',
    intent: 'Уточнение состава',
    result: 'Консультация',
    amount: 0,
    time: '11:20',
    status: 'info',
  },
  {
    id: 5,
    client: '+7 700 •••• 77',
    intent: 'Корзина «Премиум»',
    result: 'Оформлен заказ',
    amount: 27900,
    time: '10:47',
    status: 'converted',
  },
]
