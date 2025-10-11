# Troubleshooting: "Failed to send referral" Error

## Common Issue: Resend Email Verification Required

### The Problem
When testing locally, you're getting: **"Failed to send referral. Please try again."**

This happens because **Resend's free tier has restrictions**:
- ✅ Can send FROM: `onboarding@resend.dev` (test address)
- ❌ Can only send TO verified email addresses (unless domain is verified)

### Solution Option 1: Add Recipient to Resend (Quickest)

1. Go to: https://resend.com/audiences
2. Click "Add Contact"
3. Add: `NP@GRACEIntegratedHealth.com.au`
4. Resend will send a verification email to that address
5. Have the recipient click the verification link
6. ✅ Emails will now send!

### Solution Option 2: Verify Your Domain (Best for Production)

1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter: `graceintegratedhealth.com.au`
4. Follow DNS setup instructions
5. Update API routes to use: `from: 'contact@graceintegratedhealth.com.au'`
6. ✅ Can send to anyone!

### Solution Option 3: Test with Your Own Email (Quick Test)

Temporarily change the recipient to your own email for testing:

**File:** `app/api/referral/route.ts` (line 22)
```typescript
// Change this:
to: 'NP@GRACEIntegratedHealth.com.au',

// To your email temporarily:
to: 'your-verified-email@example.com',
```

**File:** `app/api/contact/route.ts` (line 22)
```typescript
// Same change here
to: 'your-verified-email@example.com',
```

Then test - you should receive the emails!

### How to Start Server for Testing

**Option 1: Open new terminal** (recommended)
```bash
npm run dev
```

**Option 2: Double-click**
```
start-dev.bat
```

Then open: http://localhost:3000

### How to See the Actual Error

Open browser console (F12) and look at the Network tab:
1. Fill out form
2. Click Submit
3. Look for `/api/referral` or `/api/contact` request
4. Click on it → Preview tab → See error details

Or check the terminal where server is running - it will show the error.

### Common Error Messages

**"The domain is not verified"**
→ Solution: Verify domain (Option 2) or add recipient (Option 1)

**"The to address is not verified"**
→ Solution: Add recipient to Resend (Option 1)

**"Invalid API key"**
→ Solution: Check `.env.local` has correct API key

**"Missing required fields"**
→ Solution: Make sure form has all required fields filled

### Verify It's Working

After applying a solution:
1. Start dev server: `npm run dev`
2. Open: http://localhost:3000
3. Fill out referral form with test data
4. Click "Send referral"
5. Should see: ✅ "Thanks! We'll be in touch shortly."
6. Check Resend dashboard: https://resend.com/emails
7. You should see the sent email!

### For Azure Production Deployment

Once testing works locally:
1. Verify your domain in Resend
2. Update API routes to use your domain
3. Deploy to Azure
4. Add `RESEND_API_KEY` environment variable in Azure

## Quick Test Commands

**Start server:**
```bash
npm run dev
```

**Test API directly (PowerShell):**
```powershell
.\test-api.ps1
```

**Check API key:**
```powershell
Get-Content .env.local
```

**Check server status:**
```powershell
Test-NetConnection localhost -Port 3000
```

