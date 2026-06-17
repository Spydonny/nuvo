import type {
  AdminUser,
  AiAnalytics,
  AnalyticsSummary,
  Chat,
  ChatDetail,
  CreateOrderPayload,
  CreateProductPayload,
  CreateReviewPayload,
  Message,
  Order,
  Product,
  Review,
  SiteSettings,
} from '../types'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'nuvo_admin_token'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  token?: string
  headers?: Record<string, string>
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = options.token ?? getToken()
  const headers: Record<string, string> = {
    ...(options.body && options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    let message = `HTTP ${response.status}`
    try {
      const payload = await response.json()
      message = payload.detail ?? payload.message ?? message
    } catch {
      message = await response.text() || message
    }
    throw new ApiError(response.status, message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(getToken())
}

export function login(email: string, password: string) {
  return request<{ access_token: string; token_type: 'bearer'; user: AdminUser }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export function getMe() {
  return request<AdminUser>('/auth/me')
}

export function fetchProducts() {
  return request<Product[]>('/products')
}

export function createProduct(product: CreateProductPayload) {
  return request<Product>('/products', { method: 'POST', body: product })
}

export function updateProduct(id: string, product: Partial<CreateProductPayload>) {
  return request<Product>(`/products/${encodeURIComponent(id)}`, { method: 'PUT', body: product })
}

export function deleteProduct(id: string) {
  return request<void>(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export function fetchOrders() {
  return request<Order[]>('/orders')
}

export function updateOrderStatus(id: string, status: Order['status']) {
  return request<Order>(`/orders/${encodeURIComponent(id)}`, { method: 'PATCH', body: { status } })
}

export function createOrder(order: CreateOrderPayload) {
  return request<Order>('/orders', { method: 'POST', body: order })
}

export function fetchReviews() {
  return request<Review[]>('/reviews')
}

export function createReview(review: CreateReviewPayload) {
  return request<Review>('/reviews', { method: 'POST', body: review })
}

export function fetchSettings() {
  return request<SiteSettings>('/settings')
}

export function updateSettings(settings: SiteSettings) {
  return request<SiteSettings>('/settings', { method: 'PUT', body: settings })
}

export function fetchAnalyticsSummary() {
  return request<AnalyticsSummary>('/analytics/summary')
}

export function fetchAiAnalytics() {
  return request<AiAnalytics>('/ai/analytics')
}

export function fetchChats(query = '') {
  const suffix = query ? `?q=${encodeURIComponent(query)}` : ''
  return request<Chat[]>(`/chats${suffix}`)
}

export function fetchChat(id: string) {
  return request<ChatDetail>(`/chats/${encodeURIComponent(id)}`)
}

export function sendMessage(chatId: string, content: string) {
  return request<Message>(`/chats/${encodeURIComponent(chatId)}/messages`, {
    method: 'POST',
    body: { content },
  })
}
