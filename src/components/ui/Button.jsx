import { useMemo } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-berry text-ivory hover:bg-terracotta shadow-card',
  ghost:
    'bg-transparent text-ivory border border-ivory/30 hover:border-gold hover:text-gold',
  gold: 'bg-gold text-choco-deep hover:brightness-105 shadow-card',
}

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  // Создаём motion-компонент один раз на каждый тип тега (без ремонтов и deprecation-предупреждений)
  const MotionTag = useMemo(
    () => (typeof Tag === 'string' ? motion[Tag] : motion.create(Tag)),
    [Tag],
  )
  return (
    <MotionTag
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
