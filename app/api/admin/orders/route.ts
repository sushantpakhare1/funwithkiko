// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getOrders, updateOrderStatus } from "@/lib/db/orders"

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const orders = await getOrders()
    
    // Sort by newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({
      success: true,
      orders: orders
    })
  } catch (error: any) {
    console.error("Failed to fetch orders:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    )
  }
}