// app/api/contact/route.ts - DEBUG VERSION
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  console.log('📧 CONTACT API CALLED');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Body received:', JSON.stringify(body, null, 2));
    
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ RESEND_API_KEY is missing from environment variables');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('✅ RESEND_API_KEY exists, length:', process.env.RESEND_API_KEY.length);

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email with Resend's test domain
    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: 'KIKO ROBOT <onboarding@resend.dev>', // ← MUST USE THIS
      to: ['kikorobotai@gmail.com'],
      replyTo: email,
      subject: `Contact: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.log('❌ RESEND ERROR:', error);
      return NextResponse.json(
        { error: `Email service error: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully! Data:', data);
    
    // Also save to local file for backup
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const dataDir = path.join(process.cwd(), 'data', 'contacts');
    await fs.mkdir(dataDir, { recursive: true });
    
    const contactData = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      sentVia: 'resend',
      emailId: data?.id || 'unknown'
    };
    
    await fs.writeFile(
      path.join(dataDir, `contact-${Date.now()}.json`),
      JSON.stringify(contactData, null, 2)
    );
    
    console.log('✅ Contact saved to local file');

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error: any) {
    console.log('❌ UNEXPECTED ERROR:', error);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}