# 🚀 Azure Redeployment Instructions

## The Problem
Your Azure app is still serving the **old static build** with mailto links instead of the **new API version**. You need to redeploy with the fixed `web.config`.

## ✅ Solution: Redeploy Now

### Option 1: VS Code (Recommended)

1. **Open VS Code** in your project folder
2. **Press** `Ctrl+Shift+P`
3. **Type:** "Azure App Service: Deploy to Web App"
4. **Select** your web app
5. **Confirm** deployment
6. **Wait** for completion

### Option 2: Manual Upload

1. **Create deployment package:**
   ```powershell
   # Copy all necessary files to a new folder
   mkdir azure-deploy
   Copy-Item -Path "app", "components", "lib", "public", "package.json", "package-lock.json", "next.config.js", "tailwind.config.js", "postcss.config.js", "tsconfig.json", "web.config" -Destination "azure-deploy" -Recurse
   
   # Create zip
   Compress-Archive -Path "azure-deploy\*" -DestinationPath "azure-deployment-fixed.zip"
   ```

2. **Upload to Azure:**
   - Azure Portal → Your App Service
   - Development Tools → Advanced Tools (Kudu)
   - Go to `site/wwwroot`
   - Upload and extract the zip file

### Option 3: Git Deployment

If you have Git deployment set up:
```bash
git push azure master
```

## 🔧 After Deployment

### 1. Set Environment Variable

**Azure Portal:**
1. Go to **Your App Service**
2. **Configuration** → **Application settings**
3. **New application setting:**
   - Name: `RESEND_API_KEY`
   - Value: `re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba`
4. **Save**
5. **Restart** the app

### 2. Test the Fix

1. **Visit your Azure URL**
2. **Fill out contact/referral form**
3. **Click Submit/Send referral**
4. **Expected result:**
   - ✅ "Thanks! Your message has been sent."
   - ✅ NO email app opens
   - ✅ Email sent to `NP@GRACEIntegratedHealth.com.au`

## 🔍 Verify the Fix Worked

### Check API Routes
Visit these URLs (should return JSON, not 404):
- `https://your-app.azurewebsites.net/api/contact`
- `https://your-app.azurewebsites.net/api/referral`

### Check Browser Console
1. Press `F12` in browser
2. Go to **Network** tab
3. Submit a form
4. Look for `/api/contact` or `/api/referral` requests
5. Should see successful API calls (not mailto links)

## ❌ If Still Not Working

### Check Azure Logs
1. Azure Portal → Your App Service
2. **Monitoring** → **Log stream**
3. Look for errors about:
   - Node.js not starting
   - Missing files
   - Configuration errors

### Common Issues

**"Cannot find module" errors:**
- Missing `node_modules` in deployment
- Run `npm install` on Azure or include in deployment

**"API routes not found" errors:**
- `web.config` not updated properly
- Redeploy with correct `web.config`

**"Environment variable not found" errors:**
- `RESEND_API_KEY` not set in Azure
- Restart app after setting environment variable

## ✅ Success Indicators

After successful redeployment:
- ✅ Forms submit without opening email app
- ✅ Success messages appear
- ✅ Emails arrive at `NP@GRACEIntegratedHealth.com.au`
- ✅ No more mailto links

## 📞 Need Help?

Check these files:
- `AZURE_FIX.md` - Technical details about the fix
- `PRODUCTION_DEPLOYMENT.md` - Complete deployment guide

---

**The key is redeploying with the fixed `web.config` that enables API routes!**
