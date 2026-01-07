// app/api/save-order/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createOrder, getOrderByPaymentId } from "@/lib/db/orders"

export async function POST(request: NextRequest) {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      userId,
      userEmail,
      userName,
      items,
      shippingAddress,
      totalAmount,
      currency
    } = await request.json()

    // Verify payment signature
    const body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // Check if order already exists
    const existingOrder = await getOrderByPaymentId(razorpayPaymentId)
    if (existingOrder) {
      return NextResponse.json({
        success: true,
        message: "Order already exists",
        order: existingOrder
      })
    }

    // Create new order
    const order = await createOrder({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      userId: userId,
      userEmail: userEmail,
      userName: userName,
      items: items,
      shippingAddress: shippingAddress,
      totalAmount: totalAmount,
      currency: currency || "USD",
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      order: order
    })

  } catch (error: any) {
    console.error("Order save error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to save order" },
      { status: 500 }
    )
  }
}