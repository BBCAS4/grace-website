# Production Deployment Guide

## ✅ Code Updated for Production

Emails now send to: **`NP@GRACEIntegratedHealth.com.au`**

**⚠️ IMPORTANT:** This requires domain verification in Resend to work. Follow the steps below.

## Step 1: Verify Domain in Resend (REQUIRED)

### 1.1 Add Domain
1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter: `graceintegratedhealth.com.au`
4. Click "Add"

### 1.2 Configure DNS Records

Resend will provide DNS records. You need to add these to your domain registrar.

**Example records (yours will be different):**

| Type | Name | Value | Priority |
|------|------|-------|----------|
| TXT | resend._domainkey | p=MIGfMA0GC... | - |
| MX | @ | feedback-smtp.us-east-1.amazonses.com | 10 |

**Where to add DNS records:**

#### If using GoDaddy:
1. Log into GoDaddy
2. Go to "My Products" → "Domains"
3. Click DNS next to your domain
4. Click "Add" for each record
5. Enter Type, Name, Value exactly as shown in Resend

#### If using Namecheap:
1. Log into Namecheap
2. Domain List → Manage → Advanced DNS
3. Add records as shown in Resend

#### If using Crazy Domains or other:
1. Find DNS management in your account
2. Add the records exactly as provided

### 1.3 Wait for Verification

- DNS changes take **15 minutes to 48 hours**
- Check status at: https://resend.com/domains
- You'll see a **green checkmark ✅** when verified
- You can click "Verify" to check status

## Step 2: Deploy to Azure

### 2.1 Build for Production

Already done! ✅ The latest build includes the production email addresses.

### 2.2 Deploy Using VS Code (Recommended)

1. Open project in VS Code
2. Press `Ctrl+Shift+P`
3. Type: "Azure App Service: Deploy to Web App"
4. Select your web app
5. Confirm deployment
6. Wait for completion

### 2.3 Deploy Using PowerShell Script

```powershell
.\deploy-azure.ps1
```

This creates `azure-deployment.zip` which you can upload manually in Azure Portal.

### 2.4 Set Environment Variable in Azure

**CRITICAL STEP:**

1. Go to: **Azure Portal** → Your App Service
2. Navigate to: **Configuration** → **Application settings**
3. Click **"New application setting"**
4. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba`
5. Click **"OK"**
6. Click **"Save"** at the top
7. **Restart** the app service

## Step 3: Test Production Deployment

1. Go to your Azure URL: `https://your-app.azurewebsites.net`
2. Fill out the contact form with test data
3. Click "Submit"
4. Expected result: ✅ "Thanks! Your message has been sent."

### Check Email Delivery

**Option 1: Check Recipient Inbox**
- Check `NP@GRACEIntegratedHealth.com.au` inbox
- Check spam/junk folder

**Option 2: Check Resend Dashboard**
- Go to: https://resend.com/emails
- You'll see all sent emails with delivery status

## Troubleshooting

### ❌ Error: "Failed to send email"

**Check browser console (F12) or Azure logs for details:**

**Error 1: "The domain is not verified"**
- Solution: Complete Step 1 - Domain verification
- Check https://resend.com/domains for status

**Error 2: "The to address is not verified"**
- Solution: Verify domain (Step 1)
- Alternative: Add recipient to Resend Audiences

**Error 3: "Invalid API key"**
- Solution: Check `RESEND_API_KEY` in Azure Configuration
- Make sure there are no extra spaces
- Restart Azure app after setting

### ❌ App Not Starting on Azure

**Check Azure Logs:**
1. Azure Portal → Your App Service
2. Monitoring → Log stream
3. Look for errors

**Common fixes:**
- Ensure Node.js 18 LTS runtime is selected
- Check all files deployed correctly
- Verify `package.json` has all dependencies
- Restart the app service

### ✅ Everything Works Locally But Not on Azure

**Checklist:**
- [ ] Domain verified in Resend
- [ ] `RESEND_API_KEY` set in Azure Configuration
- [ ] Azure app restarted after setting environment variable
- [ ] Build completed successfully before deployment
- [ ] No build errors in Azure deployment log

## Verification Checklist

### Before Deployment
- [x] Code updated to send to `NP@GRACEIntegratedHealth.com.au`
- [x] Build completed successfully (`npm run build`)
- [x] Changes committed to git
- [ ] Domain verified in Resend (shows green checkmark)
- [ ] Tested locally with domain verified

### During Deployment
- [ ] Deployed to Azure successfully
- [ ] `RESEND_API_KEY` environment variable set in Azure
- [ ] Azure app service restarted
- [ ] No errors in Azure logs

### After Deployment
- [ ] Website loads on Azure URL
- [ ] Forms submit without errors
- [ ] Emails arrive at `NP@GRACEIntegratedHealth.com.au`
- [ ] Email content is correct
- [ ] Both contact and referral forms tested

## Expected Timeline

| Task | Time Required |
|------|--------------|
| Add domain to Resend | 2 minutes |
| Configure DNS records | 5-10 minutes |
| DNS propagation | 15 min - 48 hours |
| Deploy to Azure | 5-10 minutes |
| Testing | 5 minutes |

**Total:** Minimum 30 minutes (if DNS fast) to 2 days (if DNS slow)

## Important Notes

1. **DNS verification is the critical step** - nothing will work until this is complete
2. **Check spam folders** when testing email delivery
3. **Environment variables require app restart** in Azure
4. **Keep your API key secret** - never commit it to git
5. **Test thoroughly** before announcing to users

## Support Resources

- **Resend Dashboard:** https://resend.com
- **Resend Documentation:** https://resend.com/docs
- **Azure Portal:** https://portal.azure.com
- **Check DNS Propagation:** https://dnschecker.org

## Need Help?

Check these files:
- `DOMAIN_VERIFICATION.md` - Detailed domain setup
- `TROUBLESHOOTING_EMAIL.md` - Common issues
- `AZURE_DEPLOYMENT.md` - Azure-specific guidance

---

**Current Status:** ✅ Code ready for production deployment
**Next Step:** Verify domain at https://resend.com/domains

