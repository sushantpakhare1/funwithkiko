// app/product/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { useAuth, useUser } from '@clerk/nextjs'
import axios from 'axios'
import ShippingAddressForm from '@/components/ShippingAddressForm'

type CheckoutStep = 'address' | 'payment' | 'processing'

export default function ProductPage() {
  const { isSignedIn, userId } = useAuth()
  const { user } = useUser()
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('address')
  const [shippingAddress, setShippingAddress] = useState<any>(null)
  
  const product = {
    name: "KIKO ROBOT Founder Edition",
    price: 4999,
    currency: "USD",
    description: "The ultimate AI companion with exclusive Founder Edition features. Limited to only 1,000 units worldwide.",
    specifications: [
      "Advanced Neural Processor (8.2 TFLOPS)",
      "360° LiDAR + HD Vision System",
      "Emotional Recognition Engine",
      "72-hour Battery Life",
      "Modular Expansion Ports",
      "Lifetime AI Updates"
    ],
    images: [
      "/images/robot-main.jpg",
      "/images/robot-side.jpg",
      "/images/robot-detail.jpg",
      "/images/robot-box.jpg"
    ]
  }

  // ✅ ADDED: Function to save order to localStorage
  const saveOrderToLocalStorage = (order: any) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('kiko_orders') || '[]')
      const updatedOrders = [...existingOrders.filter((o: any) => o.orderId !== order.orderId), order]
      localStorage.setItem('kiko_orders', JSON.stringify(updatedOrders))
      
      // Dispatch storage event for real-time updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'kiko_orders',
        newValue: JSON.stringify(updatedOrders)
      }))
      
      console.log('✅ Order saved to localStorage:', order.orderId)
    } catch (error) {
      console.error('❌ Failed to save order to localStorage:', error)
    }
  }

  const handleAddressSubmit = (address: any) => {
    setShippingAddress(address)
    setCheckoutStep('payment')
  }

  const handlePayment = async () => {
    if (!isSignedIn || !userId || !shippingAddress) {
      window.location.href = "/sign-in"
      return
    }

    setLoading(true)
    setCheckoutStep('processing')
    
    try {
      // Create order on server with shipping address
      const orderResponse = await axios.post('/api/create-order', {
        amount: product.price,
        currency: product.currency,
        notes: {
          product: product.name,
          userId: userId,
          userName: user?.fullName || shippingAddress.fullName,
          userEmail: user?.primaryEmailAddress?.emailAddress || shippingAddress.email,
          shippingAddress: shippingAddress
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
        order_id: order.orderId,
        handler: async function (response: any) {
          try {
            // Save order to database with shipping info
            const saveOrderResponse = await axios.post('/api/save-order', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: userId,
              userEmail: user?.primaryEmailAddress?.emailAddress || shippingAddress.email,
              userName: user?.fullName || shippingAddress.fullName,
              items: [{
                id: 'kiko-founder-edition',
                name: product.name,
                price: product.price,
                quantity: 1
              }],
              shippingAddress: shippingAddress,
              totalAmount: product.price,
              currency: product.currency
            })

            if (saveOrderResponse.data.success) {
              const savedOrder = saveOrderResponse.data.order
              
              // ✅ ADDED: Save to localStorage for real-time profile updates
              saveOrderToLocalStorage({
                ...savedOrder,
                status: 'processing',
                statusText: 'Processing',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              })
              
              window.location.href = `/order-success?order_id=${savedOrder.orderId}&payment_id=${savedOrder.paymentId}`
            } else {
              alert('Failed to save order. Please contact support.')
              setLoading(false)
              setCheckoutStep('payment')
            }
          } catch (error) {
            console.error('Order save error:', error)
            
            // ✅ ADDED: Even if API fails, try to save to localStorage
            try {
              const fallbackOrder = {
                id: `temp-${Date.now()}`,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                userId: userId,
                userEmail: user?.primaryEmailAddress?.emailAddress || shippingAddress.email,
                userName: user?.fullName || shippingAddress.fullName,
                items: [{
                  id: 'kiko-founder-edition',
                  name: product.name,
                  price: product.price,
                  quantity: 1
                }],
                shippingAddress: shippingAddress,
                totalAmount: product.price,
                currency: product.currency,
                status: 'pending',
                statusText: 'Payment Complete - Processing',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
              
              saveOrderToLocalStorage(fallbackOrder)
              alert('Payment successful! Order is being processed. Check your profile for updates.')
              window.location.href = `/order-success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`
            } catch (localStorageError) {
              alert('Payment successful but failed to save order details. Please contact support with your payment ID.')
            }
            
            setLoading(false)
            setCheckoutStep('payment')
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: '#06b6d4',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            setCheckoutStep('payment')
          }
        }
      }

      // Load Razorpay script
      if (!(window as any).Razorpay) {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => {
          const razorpay = new (window as any).Razorpay(options)
          razorpay.on('payment.failed', function (response: any) {
            alert(`Payment failed: ${response.error.description}`)
            setLoading(false)
            setCheckoutStep('payment')
          })
          razorpay.open()
        }
        document.body.appendChild(script)
      } else {
        const razorpay = new (window as any).Razorpay(options)
        razorpay.on('payment.failed', function (response: any) {
          alert(`Payment failed: ${response.error.description}`)
          setLoading(false)
          setCheckoutStep('payment')
        })
        razorpay.open()
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setLoading(false)
      setCheckoutStep('payment')
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Checkout Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <div className={`text-center ${checkoutStep === 'address' ? 'text-cyan-400' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${checkoutStep === 'address' ? 'bg-cyan-500' : 'bg-gray-800'}`}>
                  1
                </div>
                <span className="text-sm font-medium">Address</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${checkoutStep === 'payment' || checkoutStep === 'processing' ? 'bg-cyan-500' : 'bg-gray-800'}`}></div>
              <div className={`text-center ${checkoutStep === 'payment' || checkoutStep === 'processing' ? 'text-cyan-400' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${checkoutStep === 'payment' || checkoutStep === 'processing' ? 'bg-cyan-500' : 'bg-gray-800'}`}>
                  2
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-gray-800 mb-6">
                <Image
                  src={product.images[selectedImage]}
                  alt={`KIKO ROBOT - Image ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-cyan-500 scale-105' 
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`KIKO ROBOT Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Dynamic based on checkout step */}
            <div className="space-y-8">
              {checkoutStep === 'address' ? (
                // Address Collection
                <div>
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                      Step 1: Shipping Information
                    </span>
                    <h1 className="text-3xl font-bold mb-4">Where should we deliver your KIKO?</h1>
                    <p className="text-gray-400 mb-6">
                      Please provide your shipping details. Your KIKO ROBOT will be delivered to this address.
                    </p>
                  </div>
                  
                  <ShippingAddressForm
                    onSubmit={handleAddressSubmit}
                    initialData={{
                      email: user?.primaryEmailAddress?.emailAddress || '',
                      fullName: user?.fullName || ''
                    }}
                    isLoading={loading}
                  />
                </div>
              ) : checkoutStep === 'payment' ? (
                // Payment Section
                <div>
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                      Step 2: Review & Payment
                    </span>
                    <h1 className="text-3xl font-bold mb-4">Complete Your Order</h1>
                    
                    {/* Shipping Address Preview */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Shipping to:</h3>
                      <div className="space-y-2 text-gray-300">
                        <p>{shippingAddress.fullName}</p>
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                        <p>{shippingAddress.country}</p>
                        <p className="pt-2">📧 {shippingAddress.email}</p>
                        <p>📱 {shippingAddress.phone}</p>
                      </div>
                      <button
                        onClick={() => setCheckoutStep('address')}
                        className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
                      >
                        Edit address
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6">
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
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shipping</span>
                        <span className="text-gray-300">Free</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-800">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-cyan-400">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
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
                      `Pay Now - $${product.price.toLocaleString()}`
                    )}
                  </button>
                  
                  {/* Security Note */}
                  <div className="mt-6 p-4 bg-gray-900/30 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 text-sm">🔒</span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-300">Secure Payment</div>
                        <div className="text-gray-500">Powered by Razorpay • Your data is encrypted</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Processing State
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-6"></div>
                  <h3 className="text-2xl font-bold mb-4">Processing Your Order</h3>
                  <p className="text-gray-400">Please wait while we prepare your payment...</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-300"></div>
                    <span>Creating order and preparing payment gateway</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}