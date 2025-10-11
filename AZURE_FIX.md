# 🔧 Azure Deployment Fix - API Routes Not Working

## The Problem

Your Azure app is serving **static files only** instead of running the **Next.js server with API routes**. This is why forms open your email app instead of sending emails automatically.

## ✅ The Fix

I've updated your `web.config` to properly handle API routes. Now you need to redeploy.

### Step 1: Commit the Fix

```bash
git add web.config
git commit -m "Fix web.config for Azure API routes"
```

### Step 2: Redeploy to Azure

**Option A: VS Code**
1. Press `Ctrl+Shift+P`
2. Type: "Azure App Service: Deploy to Web App"
3. Select your app
4. Confirm deployment

**Option B: PowerShell**
```powershell
.\deploy-azure.ps1
```

### Step 3: Verify Environment Variable

Make sure in Azure Portal:
1. **Configuration** → **Application settings**
2. Add: `RESEND_API_KEY` = `re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba`
3. **Save** and **restart** the app

### Step 4: Test

1. Visit your Azure URL
2. Fill out contact/referral form
3. Click Submit/Send referral
4. **Expected:** Success message, NO email app opens
5. Check `NP@GRACEIntegratedHealth.com.au` inbox

## What Changed

**Old web.config:** Static files only (mailto links)
**New web.config:** Proper Next.js server with API routes

The key change:
```xml
<!-- API routes - let them pass through to Node.js -->
<rule name="API Routes" stopProcessing="true">
  <match url="^api/.*" />
  <action type="Rewrite" url="server.js" />
</rule>
```

## Troubleshooting

### Still Opening Email App?

1. **Clear browser cache:** `Ctrl+Shift+F5`
2. **Check Azure logs:** Portal → Your App → Log stream
3. **Verify deployment:** Make sure new web.config deployed
4. **Restart Azure app:** After setting environment variables

### API Routes Not Working?

Check Azure logs for errors:
- Node.js not starting properly
- Missing environment variables
- Build errors

### Emails Not Sending?

1. **Check environment variable:** `RESEND_API_KEY` set in Azure
2. **Verify domain:** Still verified at https://resend.com/domains
3. **Check Resend dashboard:** https://resend.com/emails

## Expected Result After Fix

✅ Forms submit without opening email app  
✅ "Thanks! Your message has been sent." appears  
✅ Emails arrive at `NP@GRACEIntegratedHealth.com.au`  
✅ No more mailto links  

---

**The issue was web.config configuration - this fix will resolve it!**
