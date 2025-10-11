# How to Start the Server with Email Functionality

## Quick Start

Open a terminal in the project folder and run:

```bash
npm start
```

The server will start on `http://localhost:3000`

## What Changed

✅ **Old behavior (BROKEN):** Clicking Submit opened your email app  
✅ **New behavior (FIXED):** Clicking Submit sends email automatically via Resend API

## How It Works Now

1. User fills out contact or referral form
2. Clicks "Submit" or "Send referral"
3. **Email is sent automatically** to `NP@GRACEIntegratedHealth.com.au`
4. User sees confirmation message (no email app opens!)

## Testing

1. Start server: `npm start`
2. Open browser: `http://localhost:3000`
3. Fill out a form
4. Click submit
5. You should see: "Thanks! Your message has been sent."

## Verify Email Sending

Check your Resend dashboard at: https://resend.com/emails

You'll see all sent emails listed there.

## Important Notes

- **No more static builds!** The old `out` folder is deleted
- **API routes are now active** (`/api/contact` and `/api/referral`)
- **Environment variable set:** `RESEND_API_KEY` in `.env.local`
- **Forms work automatically** - no email client needed!

## Troubleshooting

**Server won't start?**
- Make sure no other app is using port 3000
- Run: `npm install` first
- Check that `.env.local` exists with your API key

**Still opening email app?**
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you're on `http://localhost:3000` (not opening local files)
- Restart the server

## For Azure Deployment

Don't forget to set environment variable in Azure:
- **Configuration → Application settings**
- Add: `RESEND_API_KEY` = `your_api_key`

