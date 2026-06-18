import { useEffect, useMemo, useState } from 'react'
import { MessageSquare, Search, Send, ToggleLeft, ToggleRight } from 'lucide-react'
import Card from '../../components/admin/Card'
import Button from '../../components/ui/Button'
import { fetchChats, fetchChat, sendMessage, toggleChatBot } from '../../lib/api'
import type { Chat, ChatDetail, ChatStatus, MessageRole } from '../../types'

const statuses: Array<{ id: ChatStatus | 'all'; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'open', label: 'Открытые' },
  { id: 'handoff', label: 'Оператор' },
  { id: 'done', label: 'Завершённые' },
]

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selected, setSelected] = useState<ChatDetail | null>(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ChatStatus | 'all'>('all')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadChats = () => {
    fetchChats(query)
      .then(setChats)
      .catch(() => setError('Не удалось загрузить чаты.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadChats()
  }, [query])

  const filtered = useMemo(() => {
    return chats.filter((chat) => status === 'all' || chat.status === status)
  }, [chats, status])

  const selectChat = (chat: Chat) => {
    fetchChat(chat.id)
      .then(setSelected)
      .catch(() => setError('Не удалось открыть чат.'))
  }

  const submitReply = () => {
    if (!selected || !reply.trim()) return
    sendMessage(selected.id, reply.trim())
      .then((message) => {
        setSelected((current) =>
          current
            ? {
                ...current,
                messages: [...current.messages, message],
                preview: reply.trim(),
              }
            : null,
        )
        setReply('')
      })
      .catch(() => setError('Не удалось отправить ответ в outbox.'))
  }

  const toggleBot = (chat: Chat | ChatDetail) => {
    toggleChatBot(chat.id, !chat.bot_enabled)
      .then((updated) => {
        setChats((items) =>
          items.map((item) =>
            item.id === chat.id ? { ...item, bot_enabled: updated.bot_enabled } : item,
          ),
        )
        setSelected((current) =>
          current && current.id === chat.id
            ? { ...current, bot_enabled: updated.bot_enabled }
            : current,
        )
      })
      .catch(() => setError('Не удалось переключить бота.'))
  }

  if (loading) return <PageState text="Загружаем чаты..." />
  if (error) return <PageState text={error} />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ivory">Чаты с ботом</h1>
        <p className="text-sm text-ivory/50">Коллекции chats и messages из MongoDB</p>
      </div>

      <Card>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-ivory/15 bg-[#1d1411] px-4 py-2.5">
            <Search size={16} className="text-ivory/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по клиенту или телефону…"
              className="w-64 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/35"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item.id}
                onClick={() => setStatus(item.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  status === item.id
                    ? 'bg-berry text-ivory'
                    : 'border border-ivory/15 text-ivory/65 hover:text-ivory'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="h-[calc(100vh-16rem)] min-h-[24rem] overflow-hidden p-0">
          <div className="h-full space-y-1 overflow-y-auto p-3">
            {filtered.map((chat) => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  selected?.id === chat.id
                    ? 'border-gold/60 bg-wine/25'
                    : 'border-ivory/10 bg-[#1d1411] hover:bg-ivory/5'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ivory">{chat.client_name}</p>
                    <p className="text-xs text-ivory/45">{chat.phone}</p>
                  </div>
                  {chat.bot_enabled ? (
                    <ToggleRight size={22} className="text-gold" />
                  ) : (
                    <ToggleLeft size={22} className="text-ivory/35" />
                  )}
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-ivory/65">{chat.preview}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-ivory/40">
                  <span>{formatStage(chat.stage)}</span>
                  <span>{chat.total ? `${chat.total} ₸` : 'без заказа'}</span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-sm text-ivory/40">Чаты не найдены</p>
            )}
          </div>
        </Card>

        <Card className="h-[calc(100vh-16rem)] min-h-[24rem] overflow-hidden p-0">
          {!selected ? (
            <div className="grid h-full place-items-center text-ivory/40">
              <div className="text-center">
                <MessageSquare className="mx-auto mb-3" size={36} />
                Выберите чат для просмотра полной переписки
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <div className="border-b border-ivory/10 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-ivory">{selected.client_name}</h2>
                    <p className="text-sm text-ivory/45">{selected.phone} · {formatStatus(selected.status)}</p>
                  </div>
                  <button
                    onClick={() => toggleBot(selected)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selected.bot_enabled ? 'bg-gold/15 text-gold' : 'bg-ivory/10 text-ivory/50'
                    }`}
                  >
                    {selected.bot_enabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    {selected.bot_enabled ? 'Бот включён' : 'Бот выключен'}
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {selected.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      message.role === 'user'
                        ? 'ml-auto bg-wine/30 text-ivory'
                        : 'mr-auto bg-ivory/10 text-ivory/80'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-ivory/35">
                      {message.role}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-ivory/10 p-4">
                <div className="flex gap-3">
                  <input
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Ответ оператора попадёт в outbox и Message role=bot"
                    className="min-w-0 flex-1 rounded-full border border-ivory/15 bg-[#1d1411] px-4 py-3 text-sm text-ivory outline-none placeholder:text-ivory/35"
                  />
                  <Button onClick={submitReply} disabled={!reply.trim()}>
                    <Send size={16} /> Отправить
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function formatStatus(status: ChatStatus) {
  const labels: Record<ChatStatus, string> = {
    open: 'открыт',
    handoff: 'оператор',
    done: 'завершён',
    archived: 'архив',
  }
  return labels[status]
}

function formatStage(stage: string) {
  const labels: Record<string, string> = {
    greeting: 'приветствие',
    catalog: 'каталог',
    item: 'товар',
    contacts: 'контакты',
    confirm: 'подтверждение',
    done: 'завершён',
    operator: 'оператор',
  }
  return labels[stage] ?? stage
}

function PageState({ text }: { text: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-ivory/10 bg-[#241914]">
      <p className="text-ivory/60">{text}</p>
    </div>
  )
}
