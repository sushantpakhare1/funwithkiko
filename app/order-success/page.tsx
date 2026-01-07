// app/order-success/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentId = searchParams.get('payment_id')
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      // In real app, fetch from your database
      setOrder({
        id: orderId,
        paymentId: paymentId,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: new Date().toLocaleTimeString(),
        total: 1499,
        items: ['KIKO ROBOT Founder Edition'],
        shipping: {
          address: 'Main St, MAHARASHTRA, CA 94107',
          estimated: '3-5 business days',
          status: 'Processing'
        }
      })
    }
  }, [orderId, paymentId])

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 text-xl">
            Thank you for purchasing the KIKO ROBOT Founder Edition.
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 relative rounded-xl overflow-hidden border border-gray-700">
              <Image
                src="/images/robot-main.jpg"
                alt="KIKO ROBOT"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Order Confirmed</h2>
              <p className="text-gray-400">Your robot is being prepared for shipment</p>
            </div>
          </div>

          {order && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">Order ID</div>
                  <div className="font-mono text-sm">{order.id}</div>
                </div>
                <div className="bg-gray-900/30 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">Payment ID</div>
                  <div className="font-mono text-sm">{order.paymentId}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Date & Time</span>
                  <span>{order.date} at {order.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Product</span>
                  <span>{order.items[0]}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Shipping Address</span>
                  <span className="text-right">{order.shipping.address}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Estimated Delivery</span>
                  <span>{order.shipping.estimated}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-800">
                  <span className="text-lg font-semibold">Total Paid</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-6">
          <p className="text-gray-400">
            You will receive shipping confirmation and tracking details within 24 hours.
            Welcome to the KIKO family! 🤖
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Return Home
            </Link>
            <Link
              href="/profile"
              className="border-2 border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              View Order History
            </Link>
            <button
              onClick={() => window.print()}
              className="border-2 border-gray-700 hover:border-gray-500 text-gray-300 hover:text-gray-200 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}