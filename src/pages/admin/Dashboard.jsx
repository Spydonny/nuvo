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
import KpiCard from '../../components/admin/KpiCard.jsx'
import Card from '../../components/admin/Card.jsx'
import { kpis, revenueByMonth, salesByCategory, topProducts } from '../../data/analytics.js'
import { formatKzt } from '../../lib/report.js'

const tooltipStyle = {
  background: '#1d1411',
  border: '1px solid rgba(243,235,221,0.15)',
  borderRadius: 12,
  color: '#F3EBDD',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Аналитика</h1>
        <p className="text-sm text-ivory/50">Обзор продаж за последние 8 месяцев</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Выручка" value={formatKzt(kpis.revenue)} delta={kpis.revenueDelta} icon={Wallet} index={0} />
        <KpiCard label="Заказы" value={kpis.orders} delta={kpis.ordersDelta} icon={ShoppingBag} index={1} />
        <KpiCard label="Средний чек" value={formatKzt(kpis.avgCheck)} delta={kpis.avgCheckDelta} icon={Receipt} index={2} />
        <KpiCard label="Конверсия" value={`${kpis.conversion}%`} delta={kpis.conversionDelta} icon={Percent} index={3} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Выручка по месяцам" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueByMonth}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D6332B" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#D6332B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" />
              <XAxis dataKey="month" stroke="#9c8a82" fontSize={12} />
              <YAxis stroke="#9c8a82" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatKzt(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#D6332B" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Продажи по категориям">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={salesByCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {salesByCategory.map((s) => (
                  <Cell key={s.name} fill={s.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {salesByCategory.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs text-ivory/70">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span>{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Топ-товары">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" horizontal={false} />
            <XAxis type="number" stroke="#9c8a82" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="#9c8a82" fontSize={11} width={170} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => (n === 'revenue' ? formatKzt(v) : v)} />
            <Bar dataKey="sold" fill="#C9A86A" radius={[0, 6, 6, 0]} name="Продано" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
