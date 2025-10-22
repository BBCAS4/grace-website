import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { uploadFilesToBlob } from '../../../lib/azure-storage';

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
    
    // Log form data for debugging
    console.log('Form data entries:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value instanceof File ? `File(${value.name})` : value}`);
    });
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const referralReason = formData.get('referralReason') as string;
    
    // Get uploaded files
    const files: File[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('file_') && value instanceof File) {
        files.push(value);
      }
    });

    // Upload files to Azure Blob Storage
    let uploadedFiles: Array<{ url: string; fileName: string }> = [];
    if (files.length > 0) {
      try {
        uploadedFiles = await uploadFilesToBlob(files, 'referral');
        console.log('Files uploaded successfully:', uploadedFiles);
      } catch (error) {
        console.error('Error uploading files:', error);
        return NextResponse.json(
          { error: 'Failed to upload files' },
          { status: 500 }
        );
      }
    }

    console.log('Extracted form data:', { name, email, phone, referralReason, uploadedFilesCount: uploadedFiles.length });

    if (!name || !email || !referralReason) {
      console.log('Validation failed:', { name: !!name, email: !!email, referralReason: !!referralReason });
      return NextResponse.json(
        { error: 'Name, email, and referral reason are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Grace Integrated Health <noreply@graceintegratedhealth.com.au>',
      to: ['np@graceintegratedhealth.com.au'],
      subject: `New Rapid Referral from ${name}`,
      html: `
        <h2>New Rapid Referral</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Referral Reason:</strong></p>
        <p>${referralReason.replace(/\n/g, '<br>')}</p>
        ${uploadedFiles.length > 0 ? `
          <p><strong>Attached Files:</strong></p>
          <ul>
            ${uploadedFiles.map(file => `<li><a href="${file.url}" target="_blank">${file.fileName}</a></li>`).join('')}
          </ul>
        ` : ''}
        <hr>
        <p><em>This referral was submitted through the Grace Integrated Health website rapid referral form.</em></p>
      `,
      text: `
New Rapid Referral

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Referral Reason: ${referralReason}
${uploadedFiles.length > 0 ? `
Files:
${uploadedFiles.map(file => `- ${file.fileName}: ${file.url}`).join('\n')}
` : ''}

This referral was submitted through the Grace Integrated Health website rapid referral form.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send referral email', details: error.message },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data?.id);
    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Referral form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
