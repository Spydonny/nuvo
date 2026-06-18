import { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import Card from '../../components/admin/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../../lib/api'
import { formatKzt } from '../../lib/report'
import type { Product, CreateProductPayload } from '../../types'

const blank: CreateProductPayload = {
  name: '',
  category: 'strawberry',
  price: 0,
  image: 'https://images.unsplash.com/photo-1582176604856-e824b4736522?auto=format&fit=crop&w=900&q=80',
  description: '',
  available: true,
  badges: [],
}

export default function Products() {
  const [items, setItems] = useState<Product[]>([])
  const [editing, setEditing] = useState<CreateProductPayload & { id?: string } | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const categories = useMemo(() => {
    const ids = Array.from(new Set(items.map((product) => product.category)))
    return ['strawberry', 'boxes', 'baskets', 'chocolate', ...ids]
  }, [items])

  const load = () => {
    fetchProducts()
      .then(setItems)
      .catch(() => setError('Не удалось загрузить товары.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const startCreate = () => {
    setEditing({ ...blank })
    setOpen(true)
  }

  const startEdit = (product: Product) => {
    setEditing({
      ...product,
      price: product.price,
      badges: product.badges ?? (product.badge ? [product.badge] : []),
    })
    setOpen(true)
  }

  const remove = (id: string) => {
    deleteProduct(id)
      .then(load)
      .catch(() => setError('Не удалось удалить товар.'))
  }

  const handleImageUpload = async (file: File | undefined) => {
    if (!file || !editing) return
    setUploading(true)
    setError('')
    try {
      const { url } = await uploadProductImage(file)
      setEditing({ ...editing, image: url })
    } catch {
      setError('Не удалось загрузить изображение.')
    } finally {
      setUploading(false)
    }
  }

  const save = () => {
    if (!editing || !editing.name || editing.price <= 0) return
    const payload = {
      ...editing,
      price: Number(editing.price),
      badges: editing.badges?.filter(Boolean),
    }
    const request = editing.id ? updateProduct(editing.id, payload) : createProduct(payload)
    request
      .then(() => {
        setOpen(false)
        setEditing(null)
        load()
      })
      .catch(() => setError('Не удалось сохранить товар.'))
  }

  if (loading) return <PageState text="Загружаем товары..." />
  if (error) return <PageState text={error} />

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
                <th className="pb-3 font-medium">Статус</th>
                <th className="pb-3 text-right font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id} className="border-t border-ivory/8 hover:bg-ivory/5">
                  <td className="py-3 text-ivory">{product.name}</td>
                  <td className="py-3 text-ivory/60">{product.category}</td>
                  <td className="py-3 text-gold">{formatKzt(product.price)}</td>
                  <td className="py-3">
                    <span className={product.available ? 'text-emerald-300' : 'text-ivory/40'}>
                      {product.available ? 'В продаже' : 'Скрыт'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-ivory/10 text-ivory/70 hover:bg-ivory/20"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => remove(product.id)}
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
              <Input label="Название" value={editing.name} onChange={(value) => setEditing({ ...editing, name: value })} />
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">
                  Категория
                </label>
                <select
                  value={editing.category}
                  onChange={(event) => setEditing({ ...editing, category: event.target.value })}
                  className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Цена, ₸"
                type="number"
                value={String(editing.price)}
                onChange={(value) => setEditing({ ...editing, price: Number(value) })}
              />
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">
                  Изображение
                </label>
                <div className="flex items-center gap-4">
                  {editing.image ? (
                    <img
                      src={editing.image}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-ivory/15"
                    />
                  ) : (
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-ivory/5 text-xs text-ivory/40">
                      нет
                    </div>
                  )}
                  <label className="cursor-pointer rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-2.5 text-sm text-ivory hover:border-gold">
                    {uploading ? 'Загрузка…' : 'Загрузить файл'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      disabled={uploading}
                      onChange={(event) => handleImageUpload(event.target.files?.[0])}
                    />
                  </label>
                </div>
                <p className="mt-1.5 text-xs text-ivory/35">JPEG, PNG, WebP или GIF, до 5 МБ.</p>
              </div>
              <Input
                label="Описание"
                value={editing.description}
                onChange={(value) => setEditing({ ...editing, description: value })}
              />
              <label className="flex items-center gap-3 text-sm text-ivory/70">
                <input
                  type="checkbox"
                  checked={editing.available}
                  onChange={(event) => setEditing({ ...editing, available: event.target.checked })}
                  className="rounded border-ivory/20 bg-[#1d1411]"
                />
                Товар доступен на сайте
              </label>
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

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/45">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none focus:border-gold"
      />
    </div>
  )
}

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-ivory/10 bg-[#241914]">
      <p className="text-ivory/60">{text}</p>
    </div>
  )
}
