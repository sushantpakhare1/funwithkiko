// app/profile/page.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { Package, Calendar, Download, Eye, ChevronRight, Filter, RefreshCw, FileText, ExternalLink, Printer, Share2, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

// Types
interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  orderId: string
  paymentId: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  currency: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusText: string
  createdAt: string
  updatedAt: string
  shippingAddress?: {
    fullName: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null)

  // Fetch real orders from your database
  const fetchOrders = async () => {
    if (!isLoaded || !user) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/orders/user-orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      } else {
        // Fallback to localStorage if API fails
        const savedOrders = localStorage.getItem('kiko_orders')
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders))
        }
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      // Try localStorage as backup
      const savedOrders = localStorage.getItem('kiko_orders')
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [isLoaded, user])

  // Listen for new orders (real-time updates)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kiko_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue))
      }
    }

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    
    window.addEventListener('storage', handleStorageChange)
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Generate and download actual invoice
  const downloadInvoice = async (order: Order) => {
    setDownloadingInvoice(order.orderId)
    
    try {
      // Create invoice content
      const invoiceContent = `
KIKO ROBOT - OFFICIAL INVOICE
================================

INVOICE #: INV-${order.orderId.slice(-8).toUpperCase()}
ORDER ID: ${order.orderId}
PAYMENT ID: ${order.paymentId}
DATE: ${new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

CUSTOMER INFORMATION:
---------------------
Name: ${user?.fullName || 'KIKO Customer'}
Email: ${user?.primaryEmailAddress?.emailAddress || ''}
User ID: ${order.userId}

${order.shippingAddress ? `
SHIPPING ADDRESS:
-----------------
${order.shippingAddress.fullName}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state}
${order.shippingAddress.country} ${order.shippingAddress.postalCode}
` : ''}

ORDER DETAILS:
--------------
${order.items.map(item => 
  `${item.name} x${item.quantity} @ $${item.price.toLocaleString()}`
).join('\n')}

SUMMARY:
--------
Subtotal: $${order.totalAmount.toLocaleString()}
Shipping: $0.00 (Free Worldwide Shipping)
Tax: $0.00

TOTAL: $${order.totalAmount.toLocaleString()}

PAYMENT STATUS:
---------------
✅ Payment Completed
Status: ${order.statusText}
Paid: $${order.totalAmount.toLocaleString()}

ORDER STATUS:
-------------
${getStatusEmoji(order.status)} ${order.statusText}
Last Updated: ${new Date(order.updatedAt).toLocaleDateString()}

THANK YOU FOR YOUR PURCHASE!
============================
This is your official invoice for KIKO ROBOT Founder Edition.
Please retain this document for your records.

Contact: support@kiko.ai
Website: https://kiko.ai
      `

      // Create and download file
      const blob = new Blob([invoiceContent], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `KIKO-Invoice-${order.orderId}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      // Also save to localStorage for backup
      const invoices = JSON.parse(localStorage.getItem('kiko_invoices') || '[]')
      invoices.push({
        orderId: order.orderId,
        content: invoiceContent,
        downloadedAt: new Date().toISOString()
      })
      localStorage.setItem('kiko_invoices', JSON.stringify(invoices))

    } catch (error) {
      console.error('Failed to download invoice:', error)
      alert('Failed to download invoice. Please try again.')
    } finally {
      setDownloadingInvoice(null)
    }
  }

  // Print invoice
  const printInvoice = (order: Order) => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>KIKO Invoice - ${order.orderId}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .invoice { max-width: 800px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #06b6d4; color: white; }
              .total { font-size: 1.2em; font-weight: bold; }
              .footer { margin-top: 40px; text-align: center; color: #666; }
              @media print {
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="invoice">
              <div class="header">
                <h1>KIKO ROBOT - INVOICE</h1>
                <p>Order ID: ${order.orderId}</p>
              </div>
              
              <div class="section">
                <h3>Order Details</h3>
                <table>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                  ${order.items.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.price.toLocaleString()}</td>
                      <td>$${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
              
              <div class="section total">
                <p>Total Amount: $${order.totalAmount.toLocaleString()}</p>
                <p>Status: ${order.statusText}</p>
                <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div class="footer">
                <p>Thank you for choosing KIKO ROBOT</p>
                <p>support@kiko.ai | https://kiko.ai</p>
              </div>
              
              <button onclick="window.print()" style="padding: 10px 20px; margin-top: 20px;">
                Print Invoice
              </button>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // Share order
  const shareOrder = async (order: Order) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My KIKO Order - ${order.orderId}`,
          text: `Check out my KIKO ROBOT order! Status: ${order.statusText}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Sharing cancelled')
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`KIKO Order: ${order.orderId}\nStatus: ${order.statusText}\nTotal: $${order.totalAmount}`)
      alert('Order details copied to clipboard!')
    }
  }

  // Get status emoji
  const getStatusEmoji = (status: string) => {
    switch(status) {
      case 'pending': return '⏳'
      case 'processing': return '⚙️'
      case 'shipped': return '🚚'
      case 'delivered': return '✅'
      case 'cancelled': return '❌'
      default: return '📦'
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Filter orders
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

  const displayedOrders = showAll ? filteredOrders : filteredOrders.slice(0, 5)

  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isLoaded) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
              <p className="text-gray-400">
                View and manage all your KIKO purchases in real-time
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg"
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
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your orders...</p>
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
            <p className="text-gray-400 mb-6">
              {statusFilter !== 'all' 
                ? `No ${statusFilter} orders found` 
                : "You haven't placed any orders yet"}
            </p>
            <a
              href="/product"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Shop KIKO
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <>
            {/* Orders Grid */}
            <div className="grid gap-6">
              {displayedOrders.map((order) => (
                <div 
                  key={order.orderId} 
                  className={`bg-gray-900/50 border rounded-2xl p-6 hover:border-gray-700 transition-colors ${
                    selectedOrder?.orderId === order.orderId 
                      ? 'border-cyan-500/50' 
                      : 'border-gray-800'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <Package className="w-5 h-5 text-cyan-400" />
                        <div>
                          <h3 className="font-semibold text-lg">Order {order.orderId}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {getStatusEmoji(order.status)} {order.statusText}
                            </span>
                            <span className="text-sm text-gray-400">
                              {formatDateTime(order.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pl-9">
                        <div className="text-gray-300">
                          {order.items.map((item, index) => (
                            <div key={index} className="mb-1">
                              {item.name} × {item.quantity}
                            </div>
                          ))}
                        </div>
                        <div className="text-cyan-400 font-bold text-lg mt-2">
                          ${order.totalAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(
                          selectedOrder?.orderId === order.orderId ? null : order
                        )}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        {selectedOrder?.orderId === order.orderId ? 'Hide' : 'View'} Details
                      </button>
                      
                      <button
                        onClick={() => downloadInvoice(order)}
                        disabled={downloadingInvoice === order.orderId}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {downloadingInvoice === order.orderId ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        Invoice
                      </button>
                    </div>
                  </div>

                  {/* Order Details (Expanded) */}
                  {selectedOrder?.orderId === order.orderId && (
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Order Details */}
                        <div>
                          <h4 className="font-semibold mb-4">Order Information</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Order ID:</span>
                              <span className="font-mono">{order.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Payment ID:</span>
                              <span className="font-mono">{order.paymentId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Placed:</span>
                              <span>{formatDateTime(order.createdAt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Last Updated:</span>
                              <span>{formatDateTime(order.updatedAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Additional Actions */}
                        <div>
                          <h4 className="font-semibold mb-4">Actions</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => printInvoice(order)}
                              className="flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Printer className="w-4 h-4" />
                              Print
                            </button>
                            <button
                              onClick={() => shareOrder(order)}
                              className="flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                            <button
                              onClick={() => window.location.href = '/contact'}
                              className="flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg col-span-2"
                            >
                              <Mail className="w-4 h-4" />
                              Contact Support
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Items Table */}
                      <div className="mt-8">
                        <h4 className="font-semibold mb-4">Items</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="text-left py-3 text-gray-400 font-semibold">Product</th>
                                <th className="text-left py-3 text-gray-400 font-semibold">Quantity</th>
                                <th className="text-left py-3 text-gray-400 font-semibold">Price</th>
                                <th className="text-left py-3 text-gray-400 font-semibold">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-800/50">
                                  <td className="py-3">{item.name}</td>
                                  <td className="py-3">{item.quantity}</td>
                                  <td className="py-3">${item.price.toLocaleString()}</td>
                                  <td className="py-3 font-semibold">
                                    ${(item.price * item.quantity).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan={3} className="py-3 text-right font-semibold">Total:</td>
                                <td className="py-3 font-bold text-cyan-400">
                                  ${order.totalAmount.toLocaleString()}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View All / Show Less */}
            {filteredOrders.length > 5 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                >
                  {showAll ? 'Show Less' : `View All Orders (${filteredOrders.length})`}
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-4 gap-6">
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">{orders.length}</div>
                <div className="text-sm text-gray-400">Total Orders</div>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total Spent</div>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-400">Delivered</div>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {orders.filter(o => o.status === 'pending' || o.status === 'processing').length}
                </div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}