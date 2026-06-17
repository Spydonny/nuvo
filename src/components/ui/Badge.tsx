interface BadgeProps {
  tone?: 'hit' | 'new'
  children: string
}

export default function Badge({ tone = 'new', children }: BadgeProps) {
  const tones = {
    hit: 'bg-gold text-choco-deep',
    new: 'bg-berry text-ivory',
  }

  return <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${tones[tone]}`}>{children}</span>
}
