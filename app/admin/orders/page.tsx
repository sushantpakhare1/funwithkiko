// app/admin/orders/page.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Order {
  id: string
  orderId: string
  paymentId: string
  userId: string
  userEmail: string
  userName: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  shippingAddress: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  totalAmount: number
  currency: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}`, { status })
      fetchOrders() // Refresh orders
      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status })
      }
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(orders, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kiko-orders-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Order Management</h1>
            <p className="text-gray-400">Manage and track all KIKO ROBOT orders</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={exportToJSON}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Export to JSON
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-xl"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold">Recent Orders ({filteredOrders.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr 
                        key={order.orderId}
                        className="border-b border-gray-800 hover:bg-gray-900/30 cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="p-4 font-mono text-sm">{order.orderId.slice(-8)}</td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{order.userName}</div>
                            <div className="text-sm text-gray-400">{order.userEmail}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-cyan-400">
                            ${order.totalAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                            className={`text-sm font-semibold px-3 py-1 rounded-full border ${
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              order.status === 'processing' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                              order.status === 'shipped' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                              order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sticky top-32">
              {selectedOrder ? (
                <>
                  <h2 className="text-xl font-bold mb-6">Order Details</h2>
                  
                  <div className="space-y-6">
                    {/* Order Info */}
                    <div>
                      <h3 className="font-semibold mb-3">Order Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Order ID:</span>
                          <span className="font-mono">{selectedOrder.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment ID:</span>
                          <span className="font-mono">{selectedOrder.paymentId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <h3 className="font-semibold mb-3">Customer</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span>{selectedOrder.userName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email:</span>
                          <span>{selectedOrder.userEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">User ID:</span>
                          <span className="font-mono">{selectedOrder.userId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold mb-3">Shipping Address</h3>
                      <div className="text-sm space-y-1">
                        <p>{selectedOrder.shippingAddress.fullName}</p>
                        <p>{selectedOrder.shippingAddress.address}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                        <p>{selectedOrder.shippingAddress.country} {selectedOrder.shippingAddress.postalCode}</p>
                        <p className="pt-2">📧 {selectedOrder.shippingAddress.email}</p>
                        <p>📱 {selectedOrder.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="font-semibold mb-3">Items</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-semibold">${item.price.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-800">
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-cyan-400">${selectedOrder.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-gray-800">
                      <button
                        onClick={() => {
                          const dataStr = JSON.stringify(selectedOrder, null, 2)
                          const dataBlob = new Blob([dataStr], { type: 'application/json' })
                          const url = URL.createObjectURL(dataBlob)
                          const link = document.createElement('a')
                          link.href = url
                          link.download = `order-${selectedOrder.orderId}.json`
                          link.click()
                        }}
                        className="w-full border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold py-3 rounded-xl transition-colors mb-3"
                      >
                        Export This Order (JSON)
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(selectedOrder.shippingAddress, null, 2))
                          alert('Shipping address copied to clipboard!')
                        }}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        Copy Shipping Details
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">👈</div>
                  <p className="text-gray-400">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}