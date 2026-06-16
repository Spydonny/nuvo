import { CheckCircle2, RefreshCw, Database, Users } from 'lucide-react'
import Card from '../../components/admin/Card.jsx'
import { bitrix, oneC } from '../../data/integrations.js'
import { formatKzt } from '../../lib/report.js'

function StatusBadge({ connected }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${
        connected ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-400'}`} />
      {connected ? 'Подключено' : 'Отключено'}
    </span>
  )
}

export default function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Интеграции</h1>
        <p className="text-sm text-ivory/50">Синхронизация с Bitrix24 и 1С</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bitrix */}
        <Card>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2066b3]/20 text-[#4aa3ff]">
                <Users size={22} />
              </span>
              <div>
                <h3 className="font-serif text-xl text-ivory">Bitrix24</h3>
                <p className="text-xs text-ivory/45">{bitrix.portal}</p>
              </div>
            </div>
            <StatusBadge connected={bitrix.connected} />
          </div>

          <p className="flex items-center gap-2 text-xs text-ivory/45">
            <RefreshCw size={12} /> Последняя синхронизация: {bitrix.lastSync}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Лиды" value={bitrix.leads} />
            <Stat label="Сделки" value={bitrix.deals} />
          </div>

          <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-ivory/40">Воронка продаж</p>
          <div className="space-y-2">
            {bitrix.pipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between text-sm">
                <span className="text-ivory/75">{p.stage}</span>
                <span className="text-ivory/50">
                  {p.count} · <span className="text-gold">{formatKzt(p.sum)}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 1С */}
        <Card>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#d6b400]/15 text-[#f5d020]">
                <Database size={22} />
              </span>
              <div>
                <h3 className="font-serif text-xl text-ivory">1С</h3>
                <p className="text-xs text-ivory/45">{oneC.base}</p>
              </div>
            </div>
            <StatusBadge connected={oneC.connected} />
          </div>

          <p className="flex items-center gap-2 text-xs text-ivory/45">
            <RefreshCw size={12} /> Последняя синхронизация: {oneC.lastSync}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Номенклатура" value={oneC.nomenclature} />
            <Stat label="Документов" value={oneC.docs.length} />
          </div>

          <p className="mt-5 mb-2 text-xs uppercase tracking-wider text-ivory/40">Остатки на складе</p>
          <div className="space-y-2">
            {oneC.stock.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-ivory/75">{s.name}</span>
                <span
                  className={`flex items-center gap-1.5 ${
                    s.status === 'low' ? 'text-amber-300' : 'text-ivory/55'
                  }`}
                >
                  {s.status === 'ok' && <CheckCircle2 size={13} className="text-emerald-400" />}
                  {s.qty} {s.unit}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Документы 1С">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ivory/45">
              <th className="pb-3 font-medium">Документ</th>
              <th className="pb-3 font-medium">Тип</th>
              <th className="pb-3 font-medium">Дата</th>
              <th className="pb-3 text-right font-medium">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {oneC.docs.map((d) => (
              <tr key={d.id} className="border-t border-ivory/8">
                <td className="py-3 text-ivory">{d.id}</td>
                <td className="py-3 text-ivory/70">{d.type}</td>
                <td className="py-3 text-ivory/55">{d.date}</td>
                <td className="py-3 text-right text-gold">{formatKzt(d.sum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-ivory/10 bg-[#1d1411] p-4">
      <p className="text-2xl font-bold text-ivory">{value}</p>
      <p className="text-xs text-ivory/45">{label}</p>
    </div>
  )
}
