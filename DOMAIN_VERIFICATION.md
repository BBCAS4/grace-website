# Domain Verification for Production Email

## Current Setup ✅

**For Testing:**
- Emails currently send to: `ben@bbcas.com`
- This works immediately for testing
- Check `ben@bbcas.com` inbox to verify form submissions

## For Production: Verify Domain

To send emails to `NP@GRACEIntegratedHealth.com.au`, you need to verify your domain.

### Step 1: Add Domain in Resend

1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter: `graceintegratedhealth.com.au`
4. Click "Add"

### Step 2: Configure DNS Records

Resend will provide DNS records. Add these to your domain registrar:

**Example records (yours will be different):**
```
Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: MX  
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

**Where to add these:**
- Log into your domain registrar (e.g., GoDaddy, Namecheap, Crazy Domains)
- Find DNS management or DNS settings
- Add the records exactly as shown in Resend

### Step 3: Wait for Verification

- DNS changes take 15 minutes to 48 hours
- Check status at: https://resend.com/domains
- When verified, you'll see a green checkmark ✅

### Step 4: Update API Routes for Production

**Option A: Use Environment Variable (Recommended)**

Update your `.env.local`:
```
RESEND_API_KEY=re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba
PRODUCTION_EMAIL=NP@GRACEIntegratedHealth.com.au
FROM_EMAIL=contact@graceintegratedhealth.com.au
```

Then update both API files:

**File:** `app/api/contact/route.ts` (line 23)
```typescript
to: process.env.PRODUCTION_EMAIL || 'ben@bbcas.com',
from: process.env.FROM_EMAIL || 'GRACE Health <onboarding@resend.dev>',
```

**File:** `app/api/referral/route.ts` (line 23)
```typescript
to: process.env.PRODUCTION_EMAIL || 'ben@bbcas.com',
from: process.env.FROM_EMAIL || 'GRACE Health <onboarding@resend.dev>',
```

**Option B: Direct Update (Simpler)**

Just change the `to` line in both files:

**Before:**
```typescript
to: process.env.TEST_EMAIL || 'ben@bbcas.com',
```

**After:**
```typescript
to: 'NP@GRACEIntegratedHealth.com.au',
```

And update the `from` line:

**Before:**
```typescript
from: 'GRACE Health <onboarding@resend.dev>',
```

**After:**
```typescript
from: 'GRACE Health <contact@graceintegratedhealth.com.au>',
```

### Step 5: Test Production Setup

1. Restart server: `npm run dev`
2. Fill out contact form
3. Submit
4. Check `NP@GRACEIntegratedHealth.com.au` inbox
5. Should receive email! ✅

## For Azure Deployment

After domain verification, add these to Azure environment variables:

```
RESEND_API_KEY=re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba
PRODUCTION_EMAIL=NP@GRACEIntegratedHealth.com.au
FROM_EMAIL=contact@graceintegratedhealth.com.au
```

**How to add in Azure:**
1. Azure Portal → Your App Service
2. Configuration → Application settings
3. Click "New application setting"
4. Add each variable
5. Click "Save"
6. Restart the app

## Testing Checklist

### ✅ Testing Phase (Current)
- [x] Forms send emails to `ben@bbcas.com`
- [ ] Verified emails arrive at `ben@bbcas.com`
- [ ] Tested both contact and referral forms
- [ ] No app loading errors

### ✅ Production Phase (After Domain Verification)
- [ ] Domain verified in Resend
- [ ] Updated API routes to use verified domain
- [ ] Tested locally - emails arrive at NP@GRACEIntegratedHealth.com.au
- [ ] Deployed to Azure
- [ ] Set environment variables in Azure
- [ ] Tested on Azure - emails arrive successfully

## Troubleshooting

**"Domain not verified" error**
- Wait longer (DNS can take up to 48 hours)
- Double-check DNS records match exactly
- Use Resend's verification checker

**Emails not arriving at NP@GRACEIntegratedHealth.com.au**
- Check spam/junk folder
- Verify domain is fully verified (green checkmark)
- Check Resend dashboard for delivery status

**Still receiving at ben@bbcas.com after updating**
- Make sure you saved the file
- Restart the dev server
- Clear browser cache

## Quick Reference

**Test emails (current):** `ben@bbcas.com`
**Production emails (after verification):** `NP@GRACEIntegratedHealth.com.au`

**Files to update for production:**
- `app/api/contact/route.ts` (line 22-23)
- `app/api/referral/route.ts` (line 22-23)
- `.env.local` (optional, recommended)

**Resend Dashboard:**
- Domains: https://resend.com/domains
- Sent Emails: https://resend.com/emails
- API Keys: https://resend.com/api-keys

