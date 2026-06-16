// Моковая продукция NUVÓ. Изображения — Unsplash (плейсхолдеры).
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`

export const categories = [
  { id: 'all', label: 'Всё' },
  { id: 'strawberry', label: 'Клубника в шоколаде' },
  { id: 'boxes', label: 'Ассорти-боксы' },
  { id: 'baskets', label: 'Подарочные корзины' },
  { id: 'chocolate', label: 'Шоколад' },
]

export const products = [
  {
    id: 1,
    name: 'Клубника в молочном шоколаде',
    category: 'strawberry',
    price: 6900,
    image: img('1582176604856-e824b4736522'),
    description:
      'Свежая отборная клубника в нежном бельгийском молочном шоколаде. Идеально для подарка и для себя любимой.',
    badges: ['hit'],
  },
  {
    id: 2,
    name: 'Ассорти-бокс «Классика»',
    category: 'boxes',
    price: 9900,
    image: img('1511381939415-e44015466834'),
    description:
      'Микс клубники в шоколаде, трюфелей и шоколадных конфет ручной работы в фирменной коробке NUVÓ.',
    badges: ['hit', 'new'],
  },
  {
    id: 3,
    name: 'Подарочная корзина «Ассорти»',
    category: 'baskets',
    price: 19900,
    image: img('1549007994-cb92caebd54b'),
    description:
      'Плетёная корзина с ассорти десертов: клубника в трёх видах шоколада, орехи, маршмеллоу. Лента и открытка в подарок.',
    badges: ['hit'],
  },
  {
    id: 4,
    name: 'Шоколадные трюфели ручной работы',
    category: 'chocolate',
    price: 7500,
    image: img('1548741487-18d363dc4469'),
    description:
      'Набор авторских трюфелей: классика, фисташка, малина и солёная карамель. 12 штук.',
    badges: [],
  },
  {
    id: 5,
    name: 'Клубника «Ассорти трио»',
    category: 'strawberry',
    price: 8400,
    image: img('1464195244916-405fa0a82545'),
    description:
      'Клубника в тёмном, молочном и белом шоколаде с декором из дроблёных орехов и фисташки.',
    badges: ['new'],
  },
  {
    id: 6,
    name: 'Бокс «Романтика»',
    category: 'boxes',
    price: 12900,
    image: img('1488477181946-6428a0291777'),
    description:
      'Сердце-коробка с клубникой в шоколаде и розовыми конфетами. Лучший выбор для свидания.',
    badges: ['hit'],
  },
  {
    id: 7,
    name: 'Плитка крафтового шоколада',
    category: 'chocolate',
    price: 3900,
    image: img('1606312619070-d48b4c652a52'),
    description:
      'Тёмный шоколад 70% с карамелизированным фундуком и морской солью. Ремесленное производство.',
    badges: [],
  },
  {
    id: 8,
    name: 'Корзина «Премиум»',
    category: 'baskets',
    price: 27900,
    image: img('1535632787350-4e68ef0ac584'),
    description:
      'Большая подарочная корзина для особого случая: клубника, трюфели, плитки и макаруны.',
    badges: ['new'],
  },
]
