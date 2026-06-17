import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User } from 'lucide-react'
import Button from '../../components/ui/Button'
import { login, setToken } from '../../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@nuvo.kz')
  const [password, setPassword] = useState('nuvo-admin-2026')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await login(email, password)
      setToken(response.access_token)
      navigate('/admin/dashboard', { replace: true })
    } catch {
      setError('Неверный e-mail или пароль.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#1d1411] bg-noise p-5 text-ivory">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-ivory/10 bg-[#241914] p-8 shadow-soft"
      >
        <div className="text-center">
          <p className="font-serif text-3xl font-bold tracking-[0.2em]">
            NUV<span className="text-gold">Ó</span>
          </p>
          <p className="mt-2 text-sm text-ivory/50">Панель управления</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field icon={User} value={email} onChange={setEmail} placeholder="E-mail" type="email" />
          <Field
            icon={Lock}
            value={password}
            onChange={setPassword}
            placeholder="Пароль"
            type="password"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ivory/40">
          Используйте ADMIN_EMAIL и ADMIN_PASSWORD из server/.env.
        </p>
      </motion.div>
    </div>
  )
}

function Field({
  icon: Icon,
  value,
  onChange,
  ...props
}: {
  icon: typeof User
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 focus-within:border-gold">
      <Icon size={18} className="text-ivory/40" />
      <input
        {...props}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/35"
      />
    </div>
  )
}
