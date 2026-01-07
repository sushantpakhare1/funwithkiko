// lib/db/orders.ts
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface Order {
  id: string
  orderId: string
  paymentId: string
  userId: string
  userEmail: string
  userName: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  totalAmount: number
  currency: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read orders from JSON file
export async function getOrders(): Promise<Order[]> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save orders to JSON file
export async function saveOrders(orders: Order[]) {
  await ensureDataDir()
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
}

// Create new order
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  const orders = await getOrders()
  const order: Order = {
    ...orderData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  orders.push(order)
  await saveOrders(orders)
  return order
}

// Get orders by user ID
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const orders = await getOrders()
  return orders.filter(order => order.userId === userId)
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const orders = await getOrders()
  const orderIndex = orders.findIndex(o => o.orderId === orderId)
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status
    orders[orderIndex].updatedAt = new Date().toISOString()
    await saveOrders(orders)
  }
}

// Get order by payment ID
export async function getOrderByPaymentId(paymentId: string): Promise<Order | null> {
  const orders = await getOrders()
  return orders.find(order => order.paymentId === paymentId) || null
}