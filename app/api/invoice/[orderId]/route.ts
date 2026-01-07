// app/api/invoice/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId
    
    // In real app, fetch order from database
    // For now, create a mock invoice
    const invoiceData = {
      orderId,
      date: new Date().toISOString(),
      customer: 'KIKO Customer',
      items: ['KIKO ROBOT Founder Edition'],
      total: 4999,
      invoiceNumber: `INV-${Date.now()}`
    }

    // Create PDF invoice (in real app, use a PDF library)
    const invoiceText = `
      KIKO ROBOT INVOICE
      ==================
      Invoice: ${invoiceData.invoiceNumber}
      Order ID: ${invoiceData.orderId}
      Date: ${new Date(invoiceData.date).toLocaleDateString()}
      
      Items:
      - ${invoiceData.items[0]}
      
      Total: $${invoiceData.total.toLocaleString()}
      
      Thank you for your purchase!
    `

    return new NextResponse(invoiceText, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="invoice-${orderId}.txt"`
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    )
  }
}