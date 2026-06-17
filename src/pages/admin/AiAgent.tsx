import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts'
import { Bot, MessageSquare, CheckCircle2, Clock, Sparkles, Users, ArrowRightLeft, Percent } from 'lucide-react'
import KpiCard from '../../components/admin/KpiCard'
import Card from '../../components/admin/Card'
import { fetchAiAnalytics } from '../../lib/api'
import { formatKzt } from '../../lib/report'
import type { AiAnalytics } from '../../types'

const tooltipStyle = {
  background: '#1d1411',
  border: '1px solid rgba(243,235,221,0.15)',
  borderRadius: 12,
  color: '#F3EBDD',
}

export default function AiAgent() {
  const [analytics, setAnalytics] = useState<AiAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAiAnalytics()
      .then(setAnalytics)
      .catch(() => setError('Не удалось загрузить ИИ-аналитику.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <PageState text="Загружаем ИИ-аналитику..." />
  if (error || !analytics) return <PageState text={error || 'ИИ-аналитика недоступна'} />

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

      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-wine/50 via-[#241914] to-[#241914] p-8 shadow-soft">
        <Sparkles className="absolute right-6 top-6 text-gold/40" size={48} />
        <p className="text-sm uppercase tracking-[0.3em] text-gold">принёс ИИ-агент</p>
        <p className="mt-3 break-words font-serif text-4xl font-bold leading-tight text-ivory sm:text-5xl md:text-6xl">
          {formatKzt(analytics.revenue)}
        </p>
        <p className="mt-2 text-ivory/60">
          Это <span className="text-gold">{analytics.revenueShare}%</span> от общей выручки за период
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Диалогов" value={analytics.dialogs} icon={MessageSquare} index={0} />
        <KpiCard label="Заказов из диалогов" value={analytics.conversions} icon={CheckCircle2} index={1} />
        <KpiCard label="Конверсия в заказ" value={`${analytics.conversionRate}%`} icon={Sparkles} index={2} />
        <KpiCard label="Средний ответ" value={analytics.avgResponse} icon={Clock} index={3} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Уникальные клиенты" value={analytics.revenueByWeek.length * 12} icon={Users} />
        <KpiCard label="Выручка WhatsApp" value={formatKzt(analytics.revenue)} icon={WalletIcon} />
        <KpiCard label="Handoff rate" value={`${analytics.handoffRate}%`} icon={ArrowRightLeft} />
        <KpiCard label="Bot/operator" value={analytics.botOperatorRatio} icon={Percent} />
      </div>

      <Card title="Динамика: выручка и диалоги">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={analytics.revenueByWeek}>
            <defs>
              <linearGradient id="airev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A86A" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#C9A86A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" />
            <XAxis dataKey="week" stroke="#9c8a82" fontSize={12} />
            <YAxis yAxisId="l" stroke="#9c8a82" fontSize={12} tickFormatter={(value) => `${Number(value) / 1000}k`} />
            <YAxis yAxisId="r" orientation="right" stroke="#9c8a82" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => (name === 'revenue' ? formatKzt(Number(value)) : value)} />
            <Area yAxisId="l" type="monotone" dataKey="revenue" name="Выручка" stroke="#C9A86A" strokeWidth={2} fill="url(#airev)" />
            <Line yAxisId="r" type="monotone" dataKey="dialogs" name="Диалоги" stroke="#D6332B" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Воронка бота">
          <div className="space-y-3">
            {analytics.funnel.map((item) => (
              <div key={item.stage} className="flex items-center justify-between text-sm">
                <span className="text-ivory/70">{item.stage}</span>
                <span className="text-gold">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Intent distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.intentDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,235,221,0.08)" horizontal={false} />
              <XAxis dataKey="intent" stroke="#9c8a82" fontSize={11} />
              <YAxis stroke="#9c8a82" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#D6332B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

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
              {analytics.dialogsList.map((dialog) => (
                <tr key={dialog.id} className="border-t border-ivory/8">
                  <td className="py-3 text-ivory/60">{dialog.time}</td>
                  <td className="py-3 text-ivory">{dialog.client}</td>
                  <td className="py-3 text-ivory/80">{dialog.intent}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        dialog.status === 'converted'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-ivory/10 text-ivory/60'
                      }`}
                    >
                      {dialog.result}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gold">
                    {dialog.amount ? formatKzt(dialog.amount) : '—'}
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

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-ivory/10 bg-[#241914]">
      <p className="text-ivory/60">{text}</p>
    </div>
  )
}

function WalletIcon({ size = 16 }: { size?: number }) {
  return <span className="text-gold">₸</span>
}
