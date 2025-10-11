# 🔧 Azure App Settings Configuration

## The Problem
Azure is still trying to run Oryx build even though we want to deploy pre-built files.

## ✅ SOLUTION: Configure Azure to Skip Build

### Step 1: Add App Setting to Disable Build
1. **Azure Portal** → Your App Service (`GraceIntegratedHealth`)
2. **Configuration** → **Application settings**
3. **Click "+ New application setting"**
4. **Add these settings:**

| Name | Value |
|------|-------|
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` |
| `WEBSITE_RUN_FROM_PACKAGE` | `0` |

5. **Click "OK"** for each
6. **Click "Save"** at the top
7. **Click "Continue"** to confirm restart

### Step 2: Clear Startup Command
1. **Configuration** → **General settings**
2. **Startup Command:** Leave **EMPTY**
3. **Save**

### Step 3: Redeploy
1. **VS Code:** `Ctrl+Shift+P`
2. **"Azure App Service: Deploy to Web App"**
3. **Confirm deployment**

## What This Does

- `SCM_DO_BUILD_DURING_DEPLOYMENT=false` - Tells Azure NOT to run Oryx build
- `WEBSITE_RUN_FROM_PACKAGE=0` - Tells Azure to extract files normally (not run from zip)

## Expected Result

Deployment logs should show:
```
Deploying files...
Deployment successful
Starting container...
> next start
✓ Ready on http://localhost:8080
```

NOT:
```
Running oryx build...  ❌
Could not detect any platform  ❌
```

---

**Configure these settings first, then redeploy!**

