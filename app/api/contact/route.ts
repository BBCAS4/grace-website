import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    // Check if request has valid JSON
    let body;
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    const { name, email, phone, message, referralReason, firstName, lastName } = body
    
    // Log the incoming request
    console.log('Contact form request received:', {
      name, email, phone, message, referralReason, firstName, lastName,
      timestamp: new Date().toISOString()
    })
    
    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY || '')

    // Basic validation
    if (!name && (!firstName || !lastName)) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Construct the full name
    const fullName = name || `${firstName} ${lastName}`
    
    // Log the email address being used
    console.log('Email recipient:', 'NP@GRACEIntegratedHealth.com.au')

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in environment variables')
      console.log('Contact form submission (email not sent - no API key):', {
        fullName,
        email,
        phone,
        message,
        referralReason,
        timestamp: new Date().toISOString()
      })
      return NextResponse.json(
        { 
          message: 'Form submitted successfully (email configuration pending)', 
          debug: 'RESEND_API_KEY not configured in Azure environment variables'
        },
        { status: 200 }
      )
    }

    console.log('Resend API key found, attempting to send email...')

    // Prepare email content
    const emailSubject = referralReason 
      ? 'New Referral from GRACE Website' 
      : 'New Contact Form Submission from GRACE Website'
    
    const emailBody = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${referralReason ? `<p><strong>Referral Reason:</strong></p><p>${referralReason}</p>` : ''}
      ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
    `

    // Send email using Resend (using verified domain)
    console.log('Sending email with details:', {
      from: 'GRACE Website <onboarding@resend.dev>',
      to: 'NP@GRACEIntegratedHealth.com.au',
      subject: emailSubject,
      reply_to: email
    })

    const { data, error: emailError } = await resend.emails.send({
      from: 'GRACE Website <onboarding@resend.dev>',
      to: ['np@graceintegratedhealth.com.au'],
      subject: emailSubject,
      html: emailBody,
      reply_to: email
    })

    if (emailError) {
      console.error('Email sending error:', emailError)
      console.error('Full error details:', JSON.stringify(emailError, null, 2))
      
      // Log the submission even if email fails
      console.log('Contact form submission (email failed):', {
        fullName,
        email,
        phone,
        message,
        referralReason,
        timestamp: new Date().toISOString(),
        error: emailError.message
      })
      
      // Return success but log the email failure
      return NextResponse.json(
        { 
          message: 'Form submitted successfully (email delivery issue - we have your information)', 
          warning: 'Email delivery failed, but your submission was received'
        },
        { status: 200 }
      )
    }

    console.log('Email sent successfully:', data)
    console.log('Email details:', {
      to: 'NP@GRACEIntegratedHealth.com.au',
      from: 'onboarding@resend.dev',
      subject: emailSubject,
      emailId: data?.id,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        message: 'Form submitted successfully', 
        emailId: data?.id,
        debug: 'Email sent via Resend'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    )
  }
}
