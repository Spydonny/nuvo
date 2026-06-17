import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFab from '../client/WhatsAppFab'
import { pageTransition } from '../ui/Reveal'

export default function ClientLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-choco text-ivory">
      <Navbar />
      <motion.main {...pageTransition}>
        <Outlet />
      </motion.main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
