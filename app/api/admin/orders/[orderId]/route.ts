// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { updateOrderStatus } from "@/lib/db/orders"

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { status } = await request.json()
    const orderId = params.orderId

    await updateOrderStatus(orderId, status)

    return NextResponse.json({
      success: true,
      message: "Order status updated"
    })
  } catch (error: any) {
    console.error("Failed to update order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update order" },
      { status: 500 }
    )
  }
}