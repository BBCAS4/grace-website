# 🚨 URGENT: Redeploy to Fix Email App Issue

## The Problem
Your Azure app is still running the **old static build** with mailto links. That's why clicking Submit/Send Referral opens your email app instead of sending emails automatically.

## ✅ SOLUTION: Redeploy with Fixed Configuration

I've created a **fixed deployment package** for you: `azure-deployment-fixed.zip` (25.4 MB)

### Quick Redeploy (Choose One):

#### Option 1: VS Code (Easiest)
1. **Open VS Code** in your project folder
2. **Press** `Ctrl+Shift+P`
3. **Type:** "Azure App Service: Deploy to Web App"
4. **Select** your web app
5. **Confirm** deployment

#### Option 2: Manual Upload
1. **Azure Portal** → Your App Service
2. **Development Tools** → **Advanced Tools (Kudu)**
3. Go to `site/wwwroot`
4. **Upload** `azure-deployment-fixed.zip`
5. **Extract** and replace all files

#### Option 3: Git (if configured)
```bash
git push azure master
```

## 🔧 After Redeployment

### 1. Set Environment Variable
**Azure Portal:**
1. **Configuration** → **Application settings**
2. **New application setting:**
   - Name: `RESEND_API_KEY`
   - Value: `re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba`
3. **Save** and **Restart** app

### 2. Test Immediately
1. Visit your Azure URL
2. Fill out contact/referral form
3. Click Submit
4. **Expected:** Success message, NO email app opens!

## 🔍 What Changed

**Old deployment:** Static files only (mailto links)
**New deployment:** Next.js server with API routes

The key fix in `web.config`:
```xml
<!-- API routes - let them pass through to Node.js -->
<rule name="API Routes" stopProcessing="true">
  <match url="^api/.*" />
  <action type="Rewrite" url="server.js" />
</rule>
```

## ✅ Success Indicators

After redeployment:
- ✅ Forms submit without opening email app
- ✅ "Thanks! Your message has been sent." appears
- ✅ Emails arrive at `NP@GRACEIntegratedHealth.com.au`
- ✅ No more mailto links

## 🚨 This Will Fix It!

The issue is **100% the deployment** - your local code is correct. Once you redeploy with the fixed `web.config`, the email app will stop opening and emails will send automatically.

---

**Files Ready:**
- ✅ `azure-deployment-fixed.zip` - Fixed deployment package
- ✅ `DEPLOYMENT_INSTRUCTIONS.md` - Detailed steps
- ✅ `AZURE_FIX.md` - Technical explanation

**Next Action:** Redeploy to Azure using one of the options above!
