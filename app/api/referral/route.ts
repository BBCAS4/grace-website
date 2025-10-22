import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const referralReason = formData.get('referralReason') as string;
    const uploadedFiles = formData.get('uploadedFiles') as string;

    if (!name || !email || !referralReason) {
      return NextResponse.json(
        { error: 'Name, email, and referral reason are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Grace Integrated Health <onboarding@resend.dev>',
      to: ['info@graceintegratedhealth.com.au'],
      subject: `New Rapid Referral from ${name}`,
      html: `
        <h2>New Rapid Referral</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Referral Reason:</strong></p>
        <p>${referralReason.replace(/\n/g, '<br>')}</p>
        ${uploadedFiles ? `<p><strong>Files:</strong> ${uploadedFiles}</p>` : ''}
        <hr>
        <p><em>This referral was submitted through the Grace Integrated Health website rapid referral form.</em></p>
      `,
      text: `
New Rapid Referral

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Referral Reason: ${referralReason}
${uploadedFiles ? `Files: ${uploadedFiles}` : ''}

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
