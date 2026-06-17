import { useEffect, useState } from 'react'
import { FileBarChart, ShoppingBag, Bot, Boxes, Download } from 'lucide-react'
import Card from '../../components/admin/Card'
import Button from '../../components/ui/Button'
import { fetchAnalyticsSummary, fetchOrders, fetchProducts } from '../../lib/api'
import { downloadCSV } from '../../lib/report'
import type { AnalyticsSummary, Order, Product } from '../../types'

export default function Reports() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAnalyticsSummary(), fetchOrders(), fetchProducts()])
      .then(([summary, orderList, productList]) => {
        setAnalytics(summary)
        setOrders(orderList)
        setProducts(productList)
        setLoading(false)
      })
      .catch(() => setError('Не удалось загрузить данные для отчётов.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageState text="Загружаем отчёты..." />
  if (error) return <PageState text={error} />
  if (!analytics) return <PageState text="Отчёты недоступны" />

  const reports = [
    {
      icon: FileBarChart,
      title: 'Выручка по месяцам',
      desc: 'Помесячная выручка и количество заказов',
      file: 'nuvo-vyruchka.csv',
      build: () =>
        analytics.revenueByMonth.map((row) => ({ Месяц: row.month, Выручка: row.revenue, Заказы: row.orders })),
    },
    {
      icon: ShoppingBag,
      title: 'Заказы',
      desc: 'Полный список заказов со статусами',
      file: 'nuvo-zakazy.csv',
      build: () =>
        orders.map((order) => ({
          Номер: order.id,
          Клиент: order.customer,
          Сумма: order.total,
          Статус: order.status,
          Канал: order.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт',
          Дата: order.date,
        })),
    },
    {
      icon: Bot,
      title: 'Топ-товары',
      desc: 'Самые продаваемые позиции',
      file: 'nuvo-top-tovary.csv',
      build: () =>
        analytics.topProducts.map((product) => ({ Товар: product.name, Продано: product.sold, Выручка: product.revenue })),
    },
    {
      icon: Boxes,
      title: 'Каталог',
      desc: 'Текущие товары и цены',
      file: 'nuvo-katalog.csv',
      build: () =>
        products.map((product) => ({
          Товар: product.name,
          Категория: product.category,
          Цена: product.price,
          Доступен: product.available ? 'да' : 'нет',
        })),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Отчёты</h1>
        <p className="text-sm text-ivory/50">Выгрузка данных в CSV (открывается в Excel)</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title}>
            <div className="flex h-full flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-berry/20 text-gold">
                <report.icon size={22} />
              </span>
              <h3 className="mt-4 font-serif text-xl text-ivory">{report.title}</h3>
              <p className="mt-1 flex-1 text-sm text-ivory/55">{report.desc}</p>
              <Button
                onClick={() => downloadCSV(report.file, report.build())}
                variant="ghost"
                className="mt-5 w-full"
              >
                <Download size={16} /> Скачать отчёт
              </Button>
            </div>
          </Card>
        ))}
      </div>
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
