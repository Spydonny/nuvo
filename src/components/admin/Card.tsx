import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export default function Card({ title, action, className = '', children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-ivory/10 bg-[#241914] bg-noise p-5 shadow-card ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="font-serif text-xl text-ivory">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
