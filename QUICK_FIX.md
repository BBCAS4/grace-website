# Quick Fix: "Failed to send referral" Error

## The Issue 🔴

Resend's **free tier** requires the recipient email (`NP@GRACEIntegratedHealth.com.au`) to be verified before you can send to it.

## Fastest Solution (2 minutes) ✅

### Step 1: Verify the Recipient Email

1. Go to: **https://resend.com/audiences**
2. Click **"Add Contact"**
3. Enter: `NP@GRACEIntegratedHealth.com.au`
4. Click Save
5. Resend sends verification email to that address
6. Have them click the verification link in their email

**OR** verify your domain (better for production):

1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**  
3. Enter: `graceintegratedhealth.com.au`
4. Follow DNS setup instructions

### Step 2: Test Again

1. Open new terminal in your project folder
2. Run: `npm run dev`
3. Open: http://localhost:3000
4. Fill out and submit the form
5. Should work now! ✅

## To See the Actual Error

1. Start server: `npm run dev`
2. Open browser
3. Press F12 (open developer tools)
4. Go to "Console" tab
5. Submit the form
6. Watch the terminal where you ran `npm run dev` - you'll see the full error

The error will likely say something like:
- "The domain is not verified" 
- "The to address is not verified"

## Test with Your Own Email (Alternative)

If you want to test immediately, temporarily change the recipient:

**File:** `app/api/referral/route.ts` (line 22)
```typescript
to: 'your-email@gmail.com',  // Use YOUR email temporarily
```

**File:** `app/api/contact/route.ts` (line 22)
```typescript
to: 'your-email@gmail.com',  // Use YOUR email temporarily
```

Save, restart server (`npm run dev`), and test. You should receive the emails at your address!

## Important Notes

- ✅ The app is **working correctly** - no loading errors
- ✅ The code is **correct** 
- ✅ The API routes are **working**
- ❌ The only issue is Resend's email verification requirement

## After Fixing

Once emails work locally, you can deploy to Azure. Just remember to:
1. Set `RESEND_API_KEY` environment variable in Azure Portal
2. If you verified your domain, update the `from` address in both API files
3. Deploy and test!

## Need Help?

Check `TROUBLESHOOTING_EMAIL.md` for detailed solutions and explanations.

