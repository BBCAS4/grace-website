# Email Setup with Resend

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `re_`)

### 3. Configure Environment Variables

**For Local Development:**
Create a `.env.local` file in the root directory:
```
RESEND_API_KEY=re_your_actual_api_key_here
```

**For Azure Deployment:**
Add environment variable in Azure Portal:
- Name: `RESEND_API_KEY`
- Value: `re_your_actual_api_key_here`

### 4. Update Email Configuration (Optional)

To use your own domain instead of `onboarding@resend.dev`:
1. Verify your domain in Resend dashboard
2. Update the `from` field in:
   - `app/api/contact/route.ts`
   - `app/api/referral/route.ts`

### 5. Test Locally
```bash
npm run dev
```
Visit `http://localhost:3000` and test the forms.

### 6. Deploy
```bash
npm run build
npm start
```

## Key Changes Made

1. ✅ Removed static export from `next.config.js` (enables API routes)
2. ✅ Added Resend package to dependencies
3. ✅ Created `/api/contact` endpoint for contact form
4. ✅ Created `/api/referral` endpoint for referral form
5. ✅ Updated forms to use fetch instead of mailto links
6. ✅ Changed start script to use `next start` instead of `serve`

## Features

- ✅ Server-side email sending (more reliable than mailto)
- ✅ Graceful error handling
- ✅ HTML and plain text email formats
- ✅ No more dependency on user's email client
- ✅ Email delivery tracking via Resend dashboard

## Troubleshooting

**App not building?**
- Run `npm install` to install the Resend package

**Emails not sending?**
- Check that `RESEND_API_KEY` environment variable is set
- Verify the API key is correct in Resend dashboard
- Check browser console and server logs for errors

**For Azure:**
- Make sure Node.js runtime is enabled
- Verify environment variables are set in Azure Portal
- Check Azure logs for any startup errors

