import { useState, useMemo } from 'react'
import { Search, Download, MessageCircle, Globe } from 'lucide-react'
import Card from '../../components/admin/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { orders, orderStatuses } from '../../data/orders.js'
import { downloadCSV, formatKzt } from '../../lib/report.js'

const filters = [
  { id: 'all', label: 'Все' },
  { id: 'new', label: 'Новые' },
  { id: 'processing', label: 'В работе' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'done', label: 'Выполнены' },
]

export default function Orders() {
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    return orders.filter((o) => {
      const byStatus = status === 'all' || o.status === status
      const byQuery =
        !query ||
        o.customer.toLowerCase().includes(query.toLowerCase()) ||
        o.id.includes(query) ||
        o.items.toLowerCase().includes(query.toLowerCase())
      return byStatus && byQuery
    })
  }, [status, query])

  const exportOrders = () =>
    downloadCSV(
      'nuvo-zakazy.csv',
      list.map((o) => ({
        Номер: o.id,
        Клиент: o.customer,
        Состав: o.items,
        Сумма: o.total,
        Статус: orderStatuses[o.status].label,
        Канал: o.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт',
        Дата: o.date,
      })),
    )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ivory">Заказы</h1>
          <p className="text-sm text-ivory/50">Всего: {orders.length}</p>
        </div>
        <Button onClick={exportOrders} variant="gold">
          <Download size={16} /> Скачать CSV
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-ivory/15 bg-[#241914] px-4 py-2.5">
          <Search size={16} className="text-ivory/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по клиенту, номеру, товару…"
            className="w-64 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/35"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setStatus(f.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                status === f.id
                  ? 'bg-berry text-ivory'
                  : 'border border-ivory/15 text-ivory/65 hover:text-ivory'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ivory/45">
                <th className="pb-3 font-medium">Заказ</th>
                <th className="pb-3 font-medium">Клиент</th>
                <th className="pb-3 font-medium">Состав</th>
                <th className="pb-3 font-medium">Канал</th>
                <th className="pb-3 font-medium">Статус</th>
                <th className="pb-3 font-medium">Дата</th>
                <th className="pb-3 text-right font-medium">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-t border-ivory/8 hover:bg-ivory/5">
                  <td className="py-3 font-medium text-ivory">{o.id}</td>
                  <td className="py-3 text-ivory/80">{o.customer}</td>
                  <td className="py-3 text-ivory/65">{o.items}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-ivory/55">
                      {o.channel === 'whatsapp' ? (
                        <MessageCircle size={13} className="text-[#25D366]" />
                      ) : (
                        <Globe size={13} className="text-platinum" />
                      )}
                      {o.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${orderStatuses[o.status].tone}`}>
                      {orderStatuses[o.status].label}
                    </span>
                  </td>
                  <td className="py-3 text-ivory/55">{o.date}</td>
                  <td className="py-3 text-right font-semibold text-gold">{formatKzt(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <p className="py-10 text-center text-ivory/50">Ничего не найдено</p>
          )}
        </div>
      </Card>
    </div>
  )
}
