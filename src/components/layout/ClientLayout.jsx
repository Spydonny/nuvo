import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFab from '../client/WhatsAppFab.jsx'
import { pageTransition } from '../ui/Reveal.jsx'

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
