export type OrderStatus = 'new' | 'processing' | 'delivery' | 'done' | 'cancelled'
export type ChatStatus = 'open' | 'handoff' | 'done' | 'archived'
export type MessageRole = 'user' | 'bot' | 'operator'
export type Channel = 'whatsapp' | 'site' | 'bot'
export type Intent =
  | 'greeting'
  | 'catalog'
  | 'order'
  | 'delivery'
  | 'payment'
  | 'address'
  | 'operator'
  | 'other'
export type BotStage =
  | 'greeting'
  | 'catalog'
  | 'item'
  | 'contacts'
  | 'confirm'
  | 'done'
  | 'operator'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: string
  badges?: string[]
  available: boolean
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  product_id?: string
  name: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  customer: string
  phone?: string
  items: OrderItem[] | string
  total: number
  status: OrderStatus
  date: string
  channel: Channel
  created_at?: string
  updated_at?: string
}

export interface Review {
  id: string
  name: string
  rating: number
  date: string
  text: string
  count?: number
}

export interface SiteSettings {
  contacts: {
    phone: string
    whatsapp: string
    email: string
    instagram: string
    telegram?: string
  }
  address: {
    address_text: string
    city: string
    map_lat: number
    map_lng: number
    map_link: string
  }
  working_hours: Array<{
    day: string
    open: string
    close: string
    is_day_off: boolean
  }>
  texts: {
    hero_title: string
    hero_subtitle: string
    about_text: string
    footer_text: string
  }
  commerce: {
    delivery_info: string
    payment_info: string
    // Режим, в котором WhatsApp-бот завершает заказ:
    // 'auto' — бот сам принимает заказ в работу; 'manual' — ждёт подтверждения менеджера.
    order_approval: 'auto' | 'manual'
  }
  bot_enabled: boolean
}

export interface AnalyticsSummary {
  revenue: number
  revenueDelta: number
  orders: number
  ordersDelta: number
  avgCheck: number
  avgCheckDelta: number
  conversion: number
  conversionDelta: number
  revenueByMonth: Array<{ month: string; revenue: number; orders: number }>
  salesByCategory: Array<{ name: string; value: number; color: string }>
  topProducts: Array<{ name: string; sold: number; revenue: number }>
}

export interface AiAnalytics {
  revenue: number
  revenueShare: number
  dialogs: number
  conversions: number
  conversionRate: number
  avgResponse: string
  hoursSaved: number
  revenueByWeek: Array<{ week: string; revenue: number; dialogs: number }>
  dialogsList: Array<{
    id: string
    client: string
    intent: string
    result: string
    amount: number
    time: string
    status: 'converted' | 'info'
  }>
  funnel: Array<{ stage: BotStage; count: number }>
  intentDistribution: Array<{ intent: Intent; count: number }>
  topProducts: Array<{ name: string; value: number }>
  avgResponseTime: number
  handoffRate: number
  botOperatorRatio: string
  revenueSeries: Array<{ date: string; revenue: number }>
  dialogSeries: Array<{ date: string; dialogs: number }>
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin'
}

export interface Chat {
  id: string
  client_name: string
  phone: string
  status: ChatStatus
  stage: BotStage
  total: number
  created_at: string
  updated_at: string
  preview: string
  bot_enabled: boolean
  unread_count?: number
}

export interface ChatDetail extends Chat {
  messages: Message[]
}

export interface Message {
  id: string
  chat_id: string
  role: MessageRole
  content: string
  created_at: string
  intent?: Intent
  stage?: BotStage
}

export interface LoginResponse {
  access_token: string
  token_type: 'bearer'
  user: AdminUser
}

export interface CreateOrderPayload {
  customer: string
  phone: string
  items: Array<{
    product_id?: string
    name: string
    quantity: number
    price: number
    total: number
  }>
  channel?: Channel
}

export interface CreateProductPayload {
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: string
  badges?: string[]
  available: boolean
}

export interface CreateReviewPayload {
  name: string
  rating: number
  text: string
}
