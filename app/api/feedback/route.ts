// app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log('📝 FEEDBACK API CALLED')
  
  try {
    const feedback = await request.json()
    console.log('Feedback received:', JSON.stringify(feedback, null, 2))

    // Validate required fields
    if (!feedback.feature || !feedback.description) {
      return NextResponse.json(
        { error: 'Feature and description are required' },
        { status: 400 }
      )
    }

    // Create email content
    const urgencyLabels: Record<string, string> = {
      low: '⭐ Nice to have',
      medium: '⭐⭐ Important',
      high: '⭐⭐⭐ Critical',
      critical: '🚨 Must have'
    }

    const urgencyLabel = urgencyLabels[feedback.urgency] || 'Not specified'

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'KIKO Feedback System <onboarding@resend.dev>', // Use test domain for now
      to: ['kikorobotai@gmail.com'],
      replyTo: feedback.contactEmail || undefined,
      subject: `🚀 New KIKO Feature Request: ${feedback.feature}`,
      text: `
NEW FEEDBACK SUBMISSION

Feature Category: ${feedback.feature}
Importance: ${urgencyLabel}

Description:
${feedback.description}

${feedback.contactEmail ? `Contact Email: ${feedback.contactEmail}` : 'No contact email provided'}

---
Submitted: ${new Date(feedback.timestamp).toLocaleString()}
User Agent: ${feedback.userAgent}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #06b6d4; }
        .label { font-weight: bold; color: #06b6d4; display: inline-block; width: 150px; }
        .urgency { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .urgency-low { background: #e5e7eb; color: #374151; }
        .urgency-medium { background: #dbeafe; color: #1e40af; }
        .urgency-high { background: #fef3c7; color: #92400e; }
        .urgency-critical { background: #fee2e2; color: #991b1b; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Feature Request</h1>
            <p>KIKO Robot Feedback System</p>
        </div>
        <div class="content">
            <div class="section">
                <div><span class="label">Feature Category:</span> <strong>${feedback.feature}</strong></div>
            </div>
            
            <div class="section">
                <div><span class="label">Importance:</span> 
                    <span class="urgency urgency-${feedback.urgency}">${urgencyLabel}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="label">Description:</div>
                <p style="white-space: pre-wrap; margin-top: 10px;">${feedback.description}</p>
            </div>
            
            ${feedback.contactEmail ? `
            <div class="section">
                <div><span class="label">Contact Email:</span> 
                    <a href="mailto:${feedback.contactEmail}">${feedback.contactEmail}</a>
                </div>
            </div>
            ` : ''}
            
            <div class="footer">
                <p>Submitted: ${new Date(feedback.timestamp).toLocaleString()}</p>
                <p>This feedback was submitted via the KIKO Robot website.</p>
            </div>
        </div>
    </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error('❌ Resend error:', error)
      // Fallback: Save to file
      await saveToFile(feedback)
      return NextResponse.json(
        { error: 'Failed to send email, but feedback was saved locally' },
        { status: 500 }
      )
    }

    console.log('✅ Feedback email sent successfully!')

    // Also save to local file as backup
    await saveToFile(feedback)

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully!',
      emailId: data?.id
    })

  } catch (error: any) {
    console.error('❌ Feedback API error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}

// Helper function to save feedback to file
async function saveToFile(feedback: any) {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const feedbackDir = path.join(process.cwd(), 'data', 'feedback')
    await fs.mkdir(feedbackDir, { recursive: true })
    
    const filename = `feedback-${Date.now()}.json`
    await fs.writeFile(
      path.join(feedbackDir, filename),
      JSON.stringify(feedback, null, 2)
    )
    
    console.log('✅ Feedback saved to file:', filename)
  } catch (fileError) {
    console.error('❌ Failed to save feedback to file:', fileError)
  }
}