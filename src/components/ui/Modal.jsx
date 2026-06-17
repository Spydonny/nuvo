import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-choco-deep/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-choco-light shadow-soft"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-choco-deep/60 text-ivory transition hover:bg-berry"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
