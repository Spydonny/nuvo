import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { Bot, MessageSquare, CheckCircle2, Clock, Sparkles } from 'lucide-react'
import KpiCard from '../../components/admin/KpiCard.jsx'
import Card from '../../components/admin/Card.jsx'
import { aiSummary, aiRevenueByWeek, aiDialogs } from '../../data/aiAgent.js'
import { formatKzt } from '../../lib/report.js'

const tooltipStyle = {
  background: '#1d1411',
  border: '1px solid rgba(243,235,221,0.15)',
  borderRadius: 12,
  color: '#F3EBDD',
}

export default function AiAgent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold text-choco-deep">
          <Bot size={22} />
        </span>
        <div>
          <h1 className="font-serif text-3xl text-ivory">ИИ-агент</h1>
          <p className="text-sm text-ivory/50">Сколько принёс ИИ-ассистент в WhatsApp</p>
        </div>
      </div>

      {/* Главный показатель — выручка от ИИ */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-wine/50 via-[#241914] to-[#241914] p-8 shadow-soft">
        <Sparkles className="absolute right-6 top-6 text-gold/40" size={48} />
        <p className="text-sm uppercase tracking-[0.3em] text-gold">принёс ИИ-агент</p>
        <p className="mt-3 break-words font-serif text-4xl font-bold leading-tight text-ivory sm:text-5xl md:text-6xl">
          {formatKzt(aiSummary.revenue)}
        </p>
        <p className="mt-2 text-ivory/60">
          Это <span className="text-gold">{aiSummary.revenueShare}%</span> от общей выручки за период
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Диалогов" value={aiSummary.dialogs} icon={MessageSquare} index={0} />
        <KpiCard label="Заказов из диалогов" value={aiSummary.conversions} icon={CheckCircle2} index={1} />
        <KpiCard label="Конверсия в заказ" value={`${aiSummary.conversionRate}%`} icon={Sparkles} index={2} />
        <KpiCard label="Сэкономлено часов" value={aiSummary.hoursSaved} icon={Clock} index={3} />
      </div>

      <Card title="Динамика: выручка и диалоги">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={aiRevenueByWeek}>
            <defs>
              <linearGradient id="airev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A86A" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#C9A86A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" />
            <XAxis dataKey="week" stroke="#9c8a82" fontSize={12} />
            <YAxis yAxisId="l" stroke="#9c8a82" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
            <YAxis yAxisId="r" orientation="right" stroke="#9c8a82" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => (n === 'revenue' ? formatKzt(v) : v)} />
            <Area yAxisId="l" type="monotone" dataKey="revenue" name="Выручка" stroke="#C9A86A" strokeWidth={2} fill="url(#airev)" />
            <Line yAxisId="r" type="monotone" dataKey="dialogs" name="Диалоги" stroke="#D6332B" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Последние диалоги">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ivory/45">
                <th className="pb-3 font-medium">Время</th>
                <th className="pb-3 font-medium">Клиент</th>
                <th className="pb-3 font-medium">Запрос</th>
                <th className="pb-3 font-medium">Результат</th>
                <th className="pb-3 text-right font-medium">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {aiDialogs.map((d) => (
                <tr key={d.id} className="border-t border-ivory/8">
                  <td className="py-3 text-ivory/60">{d.time}</td>
                  <td className="py-3 text-ivory">{d.client}</td>
                  <td className="py-3 text-ivory/80">{d.intent}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        d.status === 'converted'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-ivory/10 text-ivory/60'
                      }`}
                    >
                      {d.result}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gold">
                    {d.amount ? formatKzt(d.amount) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
