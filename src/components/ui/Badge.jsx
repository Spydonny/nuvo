const tones = {
  hit: 'bg-berry text-ivory',
  new: 'bg-gold text-choco-deep',
  soft: 'bg-ivory/15 text-ivory',
}

export default function Badge({ tone = 'soft', children, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
