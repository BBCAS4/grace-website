import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, referralReason } = body;

    // Validate required fields
    if (!name || !email || !referralReason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Resend client at runtime (not at module load time)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'GRACE Health <onboarding@resend.dev>',
      to: 'NP@GRACEIntegratedHealth.com.au',
      subject: `Referral from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nReferral Reason:\n${referralReason}`,
      html: `
        <h2>New Referral Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <h3>Referral Reason:</h3>
        <p>${referralReason.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Referral email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Referral sent successfully' 
    });
  } catch (error: any) {
    console.error('Error sending referral email:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    
    // Return a graceful error that won't break the frontend
    return NextResponse.json(
      { 
        error: 'Failed to send referral',
        details: error.message,
        hint: 'Check server console for details. Common issue: Recipient email needs verification in Resend dashboard.'
      },
      { status: 500 }
    );
  }
}

