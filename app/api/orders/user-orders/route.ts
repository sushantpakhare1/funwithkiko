// app/api/orders/user-orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getOrders } from '@/lib/db/orders'
import { auth } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  try {
    // Get user ID from Clerk
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all orders from database
    const allOrders = await getOrders()
    
    // Filter orders for current user
    const userOrders = allOrders
      .filter(order => order.userId === userId)
      .map(order => ({
        id: order.id,
        orderId: order.orderId,
        paymentId: order.paymentId,
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
        currency: order.currency,
        status: order.status,
        statusText: order.status.charAt(0).toUpperCase() + order.status.slice(1),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        shippingAddress: order.shippingAddress
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      success: true,
      orders: userOrders,
      count: userOrders.length
    })

  } catch (error: any) {
    console.error('Failed to fetch user orders:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}