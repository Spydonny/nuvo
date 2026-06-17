import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { Wallet, ShoppingBag, Receipt, Percent } from 'lucide-react'
import KpiCard from '../../components/admin/KpiCard'
import Card from '../../components/admin/Card'
import { fetchAnalyticsSummary } from '../../lib/api'
import { formatKzt } from '../../lib/report'
import type { AnalyticsSummary } from '../../types'

const tooltipStyle = {
  background: '#1d1411',
  border: '1px solid rgba(243,235,221,0.15)',
  borderRadius: 12,
  color: '#F3EBDD',
}

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAnalyticsSummary()
      .then(setData)
      .catch(() => setError('Не удалось загрузить аналитику.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageState text="Загружаем аналитику..." />
  if (error || !data) return <PageState text={error || 'Аналитика недоступна'} />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Аналитика</h1>
        <p className="text-sm text-ivory/50">Обзор продаж за последние 8 месяцев</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Выручка" value={formatKzt(data.revenue)} delta={data.revenueDelta} icon={Wallet} index={0} />
        <KpiCard label="Заказы" value={data.orders} delta={data.ordersDelta} icon={ShoppingBag} index={1} />
        <KpiCard label="Средний чек" value={formatKzt(data.avgCheck)} delta={data.avgCheckDelta} icon={Receipt} index={2} />
        <KpiCard label="Конверсия" value={`${data.conversion}%`} delta={data.conversionDelta} icon={Percent} index={3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Выручка по месяцам" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.revenueByMonth}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D6332B" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#D6332B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" />
              <XAxis dataKey="month" stroke="#9c8a82" fontSize={12} />
              <YAxis stroke="#9c8a82" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatKzt(Number(value))} />
              <Area type="monotone" dataKey="revenue" stroke="#D6332B" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Продажи по категориям">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.salesByCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.salesByCategory.map((item) => (
                  <Cell key={item.name} fill={item.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {data.salesByCategory.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs text-ivory/70">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Топ-товары">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.topProducts} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" horizontal={false} />
            <XAxis type="number" stroke="#9c8a82" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="#9c8a82" fontSize={11} width={170} />
            <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => (name === 'revenue' ? formatKzt(Number(value)) : value)} />
            <Bar dataKey="sold" fill="#C9A86A" radius={[0, 6, 6, 0]} name="Продано" />
          </BarChart>
        </ResponsiveContainer>
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
