import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { waLink } from '../../lib/brand'

export default function WhatsAppFab() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Написать в WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <MessageCircle className="relative" />
    </motion.a>
  )
}
