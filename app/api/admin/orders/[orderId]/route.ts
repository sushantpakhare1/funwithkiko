// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { updateOrderStatus, getOrderById, deleteOrder } from "@/lib/db/orders"

// GET - Retrieve order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const order = await getOrderById(orderId)
    
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error: any) {
    console.error("Failed to get order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to get order" },
      { status: 500 }
    )
  }
}

// PUT - Update order status (your code)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { status } = await request.json()
    const { orderId } = await params

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

// DELETE - Delete order
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    await deleteOrder(orderId)

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully"
    })
  } catch (error: any) {
    console.error("Failed to delete order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete order" },
      { status: 500 }
    )
  }
}


