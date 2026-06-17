import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: ReactNode
  delta?: number
  icon?: ComponentType<{ size?: number }> | LucideIcon
  index?: number
}

export default function KpiCard({ label, value, delta, icon: Icon, index = 0 }: KpiCardProps) {
  const up = delta === undefined || delta >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl border border-ivory/10 bg-gradient-to-br from-[#2a1c16] to-[#241914] p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-ivory/55">{label}</span>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-berry/20 text-gold">
            <Icon size={16} />
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-ivory">{value}</p>
      {delta !== undefined && (
        <p
          className={`mt-2 flex items-center gap-1 text-xs ${
            up ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {up ? '+' : ''}
          {delta}% к прошлому периоду
        </p>
      )}
    </motion.div>
  )
}
