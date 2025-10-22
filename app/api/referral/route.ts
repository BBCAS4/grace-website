import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }
    
    // Initialize Resend client at runtime to ensure environment variable is available
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const formData = await request.formData();
    console.log('Referral form data received');
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const referralReason = formData.get('referralReason') as string;
    
    // Get uploaded files info
    const uploadedFiles: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('file_') && value instanceof File) {
        uploadedFiles.push(value.name);
      }
    });

    if (!name || !email || !referralReason) {
      return NextResponse.json(
        { error: 'Name, email, and referral reason are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Grace Integrated Health <onboarding@resend.dev>',
      to: ['ben@bbcas.com'],
      subject: `New Rapid Referral from ${name}`,
      html: `
        <h2>New Rapid Referral</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Referral Reason:</strong></p>
        <p>${referralReason.replace(/\n/g, '<br>')}</p>
        ${uploadedFiles.length > 0 ? `<p><strong>Files:</strong> ${uploadedFiles.join(', ')}</p>` : ''}
        <hr>
        <p><em>This referral was submitted through the Grace Integrated Health website rapid referral form.</em></p>
      `,
      text: `
New Rapid Referral

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Referral Reason: ${referralReason}
${uploadedFiles.length > 0 ? `Files: ${uploadedFiles.join(', ')}` : ''}

This referral was submitted through the Grace Integrated Health website rapid referral form.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send referral email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Referral form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
