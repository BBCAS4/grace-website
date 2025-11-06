# Quick Fix for 403 Deployment Error

## ⚠️ The "Failed to get app runtime OS" warning means the deployment can't connect to your App Service.

## Step-by-Step Fix (Do These in Order)

### 🔴 Step 1: Start Your App Service (MOST IMPORTANT)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: **App Services** → **GraceIntegratedHealth**
3. On the **Overview** page, look at the top toolbar
4. If you see a **"Start"** button, click it
5. Wait for the status to change to **"Running"** (green)
6. **This is the #1 cause of 403 errors!**

### 🔴 Step 2: Check Network Access Restrictions

1. In Azure Portal → Your App Service
2. Go to **Networking** → **Access restriction**
3. Check if there are any rules listed
4. If you see rules blocking access:
   - Click **"+ Add rule"** if needed
   - Or temporarily remove restrictions
   - Make sure **SCM (Kudu) site** is accessible

### 🔴 Step 3: Check SCM Site Access

1. Azure Portal → Your App Service
2. Go to **Configuration** → **General settings**
3. Scroll down to **"SCM site access"**
4. Make sure it's set to **"Allow"** (not "Restrict")
5. Click **"Save"** at the top
6. Restart the app if prompted

### 🔴 Step 4: Verify App Service Name

1. Check the exact name in Azure Portal
2. Open `.github/workflows/azure-deploy.yml`
3. Verify line 10 matches exactly:
   ```yaml
   AZURE_WEBAPP_NAME: GraceIntegratedHealth
   ```
4. If names don't match, update the workflow file

### 🔴 Step 5: Refresh Publish Profile

1. Azure Portal → Your App Service → **Overview**
2. Click **"Get publish profile"** button (top toolbar)
3. Download the `.xml` file
4. Open it in Notepad and copy ALL contents
5. Go to GitHub → Your Repository
6. **Settings** → **Secrets and variables** → **Actions**
7. Find **`AZURE_WEBAPP_PUBLISH_PROFILE`**
8. Click **"Update"** 
9. Paste the entire XML file contents
10. Click **"Update secret"**

## After Fixing - Re-run Deployment

1. Go to GitHub → Your Repository → **Actions** tab
2. Find the failed workflow run
3. Click **"Re-run jobs"** → **"Re-run failed jobs"**
4. Or simply push a new commit to trigger a new run

## Still Not Working?

If it still fails after all these steps:

### Alternative: Manual Deployment via VS Code

1. Install **Azure App Service** extension in VS Code
2. Press `Ctrl+Shift+P`
3. Type: **"Azure App Service: Deploy to Web App"**
4. Select your app
5. This bypasses GitHub Actions and deploys directly

### Check Azure Logs

1. Azure Portal → Your App Service
2. Go to **Log stream** (under Monitoring)
3. Look for any error messages
4. Check **Deployment Center** → **Logs** tab

## Common Issues Summary

| Issue | Symptom | Fix |
|-------|---------|-----|
| App Stopped | Can't connect, 403 error | Start the app in Azure Portal |
| IP Restrictions | 403 error, can't get OS info | Disable or allow all IPs |
| SCM Blocked | 403 error | Set SCM access to "Allow" |
| Wrong Name | 403 error | Update workflow file |
| Invalid Profile | 403 error | Refresh publish profile |

## Quick Test

After fixing, test if the app is accessible:
- Visit: `https://graceintegratedhealth-g7ewbyc2eghhezga.australiaeast-01.azurewebsites.net`
- If it shows 403 or "stopped", the app needs to be started

