import { useEffect, useMemo, useState } from 'react'
import { Search, Download, MessageCircle, Globe } from 'lucide-react'
import Card from '../../components/admin/Card'
import Button from '../../components/ui/Button'
import { fetchOrders, updateOrderStatus } from '../../lib/api'
import { downloadCSV, formatKzt } from '../../lib/report'
import type { Order, OrderStatus } from '../../types'

const filters: Array<{ id: OrderStatus | 'all'; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'new', label: 'Новые' },
  { id: 'processing', label: 'В работе' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'done', label: 'Выполнены' },
]

const orderStatuses: Record<OrderStatus, { label: string; tone: string }> = {
  new: { label: 'Новый', tone: 'text-gold bg-gold/15' },
  processing: { label: 'В работе', tone: 'text-platinum bg-platinum/15' },
  delivery: { label: 'Доставка', tone: 'text-terracotta-soft bg-terracotta/15' },
  done: { label: 'Выполнен', tone: 'text-emerald-300 bg-emerald-500/15' },
  cancelled: { label: 'Отменён', tone: 'text-red-300 bg-red-500/15' },
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setError('Не удалось загрузить заказы.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const list = useMemo(() => {
    return orders.filter((order) => {
      const byStatus = status === 'all' || order.status === status
      const items = typeof order.items === 'string' ? order.items : order.items.map((item) => item.name).join(' ')
      const byQuery =
        !query ||
        order.customer.toLowerCase().includes(query.toLowerCase()) ||
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        items.toLowerCase().includes(query.toLowerCase())
      return byStatus && byQuery
    })
  }, [status, query, orders])

  const exportOrders = () =>
    downloadCSV(
      'nuvo-zakazy.csv',
      list.map((order) => ({
        Номер: order.id,
        Клиент: order.customer,
        Сумма: order.total,
        Статус: orderStatuses[order.status].label,
        Канал: order.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт',
        Дата: order.date,
      })),
    )

  const patchStatus = (order: Order, nextStatus: OrderStatus) => {
    updateOrderStatus(order.id, nextStatus)
      .then((updated) => setOrders((items) => items.map((item) => (item.id === updated.id ? updated : item))))
      .catch(() => setError('Не удалось обновить статус.'))
  }

  if (loading) return <PageState text="Загружаем заказы..." />
  if (error) return <PageState text={error} />

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
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по клиенту, номеру, товару…"
            className="w-64 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/35"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatus(filter.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                status === filter.id
                  ? 'bg-berry text-ivory'
                  : 'border border-ivory/15 text-ivory/65 hover:text-ivory'
              }`}
            >
              {filter.label}
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
                <th className="pb-3 text-right font-medium">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {list.map((order) => (
                <tr key={order.id} className="border-t border-ivory/8 hover:bg-ivory/5">
                  <td className="py-3 font-medium text-ivory">{order.id}</td>
                  <td className="py-3 text-ivory/80">{order.customer}</td>
                  <td className="py-3 text-ivory/65">{typeof order.items === 'string' ? order.items : order.items.map((item) => `${item.name} ×${item.quantity}`).join(', ')}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-ivory/55">
                      {order.channel === 'whatsapp' ? (
                        <MessageCircle size={13} className="text-[#25D366]" />
                      ) : (
                        <Globe size={13} className="text-platinum" />
                      )}
                      {order.channel === 'whatsapp' ? 'WhatsApp' : 'Сайт'}
                    </span>
                  </td>
                  <td className="py-3">
                    <select
                      value={order.status}
                      onChange={(event) => patchStatus(order, event.target.value as OrderStatus)}
                      className={`rounded-full px-2.5 py-1 text-xs ${orderStatuses[order.status].tone} bg-transparent`}
                    >
                      {filters
                        .filter((filter) => filter.id !== 'all')
                        .map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.label}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="py-3 text-right font-semibold text-gold">{formatKzt(order.total)}</td>
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

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-ivory/10 bg-[#241914]">
      <p className="text-ivory/60">{text}</p>
    </div>
  )
}
