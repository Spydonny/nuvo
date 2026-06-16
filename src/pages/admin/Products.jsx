import { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import Card from '../../components/admin/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import Modal from '../../components/ui/Modal.jsx'
import { products as seed, categories } from '../../data/products.js'
import { formatKzt } from '../../lib/report.js'

const blank = { name: '', category: 'strawberry', price: '', description: '' }

export default function Products() {
  const [items, setItems] = useState(seed)
  const [editing, setEditing] = useState(null) // объект товара или null
  const [open, setOpen] = useState(false)

  const catLabel = (id) => categories.find((c) => c.id === id)?.label ?? id

  const startCreate = () => {
    setEditing({ ...blank })
    setOpen(true)
  }
  const startEdit = (p) => {
    setEditing({ ...p })
    setOpen(true)
  }
  const remove = (id) => setItems((arr) => arr.filter((p) => p.id !== id))

  const save = () => {
    if (!editing.name || !editing.price) return
    if (editing.id) {
      setItems((arr) => arr.map((p) => (p.id === editing.id ? { ...editing, price: +editing.price } : p)))
    } else {
      setItems((arr) => [
        { ...editing, id: Date.now(), price: +editing.price, badges: ['new'] },
        ...arr,
      ])
    }
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ivory">Товары</h1>
          <p className="text-sm text-ivory/50">Управление каталогом · {items.length} позиций</p>
        </div>
        <Button onClick={startCreate}>
          <Plus size={16} /> Добавить
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ivory/45">
                <th className="pb-3 font-medium">Название</th>
                <th className="pb-3 font-medium">Категория</th>
                <th className="pb-3 font-medium">Цена</th>
                <th className="pb-3 text-right font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-ivory/8 hover:bg-ivory/5">
                  <td className="py-3 text-ivory">{p.name}</td>
                  <td className="py-3 text-ivory/60">{catLabel(p.category)}</td>
                  <td className="py-3 text-gold">{formatKzt(p.price)}</td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-ivory/10 text-ivory/70 hover:bg-ivory/20"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        {editing && (
          <div className="p-8">
            <h2 className="font-serif text-2xl text-ivory">
              {editing.id ? 'Редактировать товар' : 'Новый товар'}
            </h2>
            <div className="mt-6 space-y-4">
              <Input label="Название" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">
                  Категория
                </label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
                >
                  {categories
                    .filter((c) => c.id !== 'all')
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
              <Input
                label="Цена, ₸"
                type="number"
                value={editing.price}
                onChange={(v) => setEditing({ ...editing, price: v })}
              />
              <Input
                label="Описание"
                value={editing.description}
                onChange={(v) => setEditing({ ...editing, description: v })}
              />
            </div>
            <div className="mt-8 flex gap-3">
              <Button onClick={save} className="flex-1">
                Сохранить
              </Button>
              <Button onClick={() => setOpen(false)} variant="ghost">
                <X size={16} /> Отмена
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
      />
    </div>
  )
}
