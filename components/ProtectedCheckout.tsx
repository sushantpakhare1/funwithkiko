// components/ProtectedCheckout.tsx
'use client'

import { useState } from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import axios from 'axios'

interface ProtectedCheckoutProps {
  product: {
    name: string
    price: number
    currency: string
  }
}

export default function ProtectedCheckout({ product }: ProtectedCheckoutProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create order on server
      const orderResponse = await axios.post('/api/create-order', {
        amount: product.price,
        currency: product.currency,
        notes: {
          product: product.name,
        }
      })

      const order = orderResponse.data

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'KIKO ROBOT',
        description: `Purchase: ${product.name}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verification = await axios.post('/api/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verification.data.success) {
              // Redirect to success page
              window.location.href = `/order-success?order_id=${verification.data.orderId}`
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Verification error:', error)
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: 'Customer Name', // Would be populated from Clerk user data
          email: 'customer@example.com',
        },
        theme: {
          color: '#06b6d4',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      // Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options)
      razorpay.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`)
        setLoading(false)
      })
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setLoading(false)
    }
  }

  return (
    <SignedIn>
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Product</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Price</span>
              <span className="text-cyan-400 font-bold">
                ${product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-800">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-cyan-400">
                ${product.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
              Processing...
            </>
          ) : (
            `Complete Purchase - $${product.price.toLocaleString()}`
          )}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Secure checkout powered by Razorpay
        </p>
      </div>
    </SignedIn>
  )
}