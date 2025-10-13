import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Resend client at runtime (not at module load time)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'GRACE Health <noreply@graceintegratedhealth.com.au>',
      to: 'NP@GRACEIntegratedHealth.com.au',
      subject: `Contact from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    // Return a graceful error that won't break the frontend
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error.message,
        hint: 'Check server console for details. Common issue: Recipient email needs verification in Resend dashboard.'
      },
      { status: 500 }
    );
  }
}

