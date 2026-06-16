import { FileBarChart, ShoppingBag, Bot, Boxes, Download } from 'lucide-react'
import Card from '../../components/admin/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { downloadCSV } from '../../lib/report.js'
import { revenueByMonth, topProducts } from '../../data/analytics.js'
import { orders, orderStatuses } from '../../data/orders.js'
import { aiDialogs } from '../../data/aiAgent.js'
import { oneC } from '../../data/integrations.js'

export default function Reports() {
  const reports = [
    {
      icon: FileBarChart,
      title: 'Выручка по месяцам',
      desc: 'Помесячная выручка и количество заказов',
      file: 'nuvo-vyruchka.csv',
      build: () =>
        revenueByMonth.map((r) => ({ Месяц: r.month, Выручка: r.revenue, Заказы: r.orders })),
    },
    {
      icon: ShoppingBag,
      title: 'Заказы',
      desc: 'Полный список заказов со статусами',
      file: 'nuvo-zakazy.csv',
      build: () =>
        orders.map((o) => ({
          Номер: o.id,
          Клиент: o.customer,
          Состав: o.items,
          Сумма: o.total,
          Статус: orderStatuses[o.status].label,
          Канал: o.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт',
          Дата: o.date,
        })),
    },
    {
      icon: Bot,
      title: 'Диалоги ИИ-агента',
      desc: 'Эффективность ИИ-ассистента',
      file: 'nuvo-ii-agent.csv',
      build: () =>
        aiDialogs.map((d) => ({
          Время: d.time,
          Клиент: d.client,
          Запрос: d.intent,
          Результат: d.result,
          Сумма: d.amount,
        })),
    },
    {
      icon: Boxes,
      title: 'Остатки 1С',
      desc: 'Складские остатки по номенклатуре',
      file: 'nuvo-ostatki.csv',
      build: () =>
        oneC.stock.map((s) => ({
          Позиция: s.name,
          Количество: s.qty,
          Ед: s.unit,
          Статус: s.status === 'low' ? 'Заканчивается' : 'В наличии',
        })),
    },
    {
      icon: FileBarChart,
      title: 'Топ-товары',
      desc: 'Самые продаваемые позиции',
      file: 'nuvo-top-tovary.csv',
      build: () =>
        topProducts.map((p) => ({ Товар: p.name, Продано: p.sold, Выручка: p.revenue })),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Отчёты</h1>
        <p className="text-sm text-ivory/50">Выгрузка данных в CSV (открывается в Excel)</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.title}>
            <div className="flex h-full flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-berry/20 text-gold">
                <r.icon size={22} />
              </span>
              <h3 className="mt-4 font-serif text-xl text-ivory">{r.title}</h3>
              <p className="mt-1 flex-1 text-sm text-ivory/55">{r.desc}</p>
              <Button
                onClick={() => downloadCSV(r.file, r.build())}
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
