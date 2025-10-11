# 🔄 Azure App Needs Restart

## The Problem
Azure deployed the new files but is still running the old `package.json` with `next start` instead of `node server.js`.

## ✅ SOLUTION: Restart the Azure App

### Step 1: Restart in Azure Portal
1. **Azure Portal** → Your App Service (`GraceIntegratedHealth`)
2. **Overview** → **Restart** button at the top
3. **Click "Yes"** to confirm
4. **Wait 30 seconds** for restart to complete

### Step 2: Check Log Stream
After restart, check **Monitoring** → **Log stream**

You should now see:
```
> grace-website@0.1.0 start
> node server.js
node_modules not found, extracting from tar.gz...
node_modules extracted successfully
> Ready on http://localhost:8080
```

### Step 3: Test the App
1. **Visit your Azure URL**
2. **Test contact/referral forms**
3. **Expected:** Forms work, NO email app opens

---

**Restart the app now to load the new package.json!**

