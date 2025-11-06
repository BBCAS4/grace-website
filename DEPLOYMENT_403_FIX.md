# Fixing 403 Error During Azure Deployment

## Error Message
```
Error: Failed to deploy web package to App Service.
Error: The deployment to your web app failed with HTTP status code 403.
```

## Common Causes & Solutions

### 1. App Service is Stopped ⚠️ **MOST COMMON**

**Solution:**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your App Service: `GraceIntegratedHealth`
3. Click **"Start"** button if it shows as stopped
4. Wait for it to start (status should show "Running")
5. Re-run the GitHub Actions workflow

### 2. Network Restrictions / IP Restrictions

**Check if IP restrictions are enabled:**
1. Azure Portal → Your App Service
2. Go to **Networking** → **Access restriction**
3. Check if there are any IP restrictions
4. If yes, you need to either:
   - **Option A**: Add GitHub Actions IP ranges (not recommended - changes frequently)
   - **Option B**: Disable IP restrictions temporarily for deployment
   - **Option C**: Use Azure Private Endpoints with proper configuration

**Recommended Solution**: Disable IP restrictions or allow all IPs during deployment.

### 3. Private Endpoints / VNet Integration

If your App Service has Private Endpoints or VNet Integration:
1. Go to **Networking** → Check if Private Endpoints are configured
2. For deployment, you may need to deploy from within the VNet
3. Or temporarily disable Private Endpoint for deployments

### 4. Invalid or Expired Publish Profile

**Solution:**
1. Go to Azure Portal → Your App Service
2. Click **"Get publish profile"** button
3. Download the new `.xml` file
4. Go to GitHub → Repository → **Settings** → **Secrets and variables** → **Actions**
5. Find `AZURE_WEBAPP_PUBLISH_PROFILE`
6. Click **"Update"** and paste the entire contents of the new publish profile
7. Re-run the workflow

### 5. App Service Name Mismatch

**Check:**
1. Verify the App Service name in workflow matches Azure:
   - Workflow file: `.github/workflows/azure-deploy.yml`
   - Line: `AZURE_WEBAPP_NAME: GraceIntegratedHealth`
2. In Azure Portal, verify your actual App Service name
3. Update the workflow if they don't match

### 6. SCM Site Access Restrictions

**Check:**
1. Azure Portal → Your App Service
2. Go to **Configuration** → **General settings**
3. Scroll to **"SCM site access"**
4. Ensure it's set to **"Allow"** (not "Restrict")
5. Save and restart the app

### 7. Authentication Issues

**Verify publish profile format:**
- The publish profile should be XML format
- It should contain `<publishProfile>` tags
- Make sure you copied the **entire** file contents (including opening/closing tags)

## Quick Fix Checklist

Run through these steps in order:

- [ ] **Start the App Service** in Azure Portal (if stopped)
- [ ] **Check IP restrictions** in Networking → Access restriction
- [ ] **Disable IP restrictions** temporarily (if enabled)
- [ ] **Check SCM site access** in Configuration → General settings → Set to "Allow"
- [ ] **Refresh publish profile** and update GitHub secret
- [ ] **Verify App Service name** matches workflow
- [ ] **Check Private Endpoints** - disable temporarily if needed
- [ ] **Re-run GitHub Actions workflow**

## Manual Deployment Alternative

If GitHub Actions continues to fail, you can deploy manually:

### Option 1: VS Code Azure Extension
1. Install Azure App Service extension in VS Code
2. Press `Ctrl+Shift+P` → "Azure App Service: Deploy to Web App"
3. Select your app and deploy

### Option 2: Azure CLI
```bash
# Login to Azure
az login

# Deploy using zip
az webapp deployment source config-zip \
  --resource-group YOUR_RESOURCE_GROUP \
  --name GraceIntegratedHealth \
  --src deployment.zip
```

### Option 3: Azure Portal Kudu Console
1. Go to: `https://graceintegratedhealth-g7ewbyc2eghhezga.scm.australiaeast-01.azurewebsites.net`
2. Navigate to **Debug console** → **CMD**
3. Upload your `.next/standalone` folder contents

## Verify App Service Status

Check these in Azure Portal:

1. **Overview** → Status should be **"Running"**
2. **Networking** → No IP restrictions blocking deployment
3. **Configuration** → General settings → **SCM site access** = "Allow"
4. **Deployment Center** → Check deployment logs for errors

## After Fixing

Once the deployment succeeds:
1. Check Azure Log stream to verify app starts
2. Visit your app URL to confirm it's working
3. Test the contact forms
4. Monitor for any runtime errors

## Still Having Issues?

If none of these solutions work:
1. Check Azure App Service logs: **Log stream** in Azure Portal
2. Check GitHub Actions logs for more detailed error messages
3. Verify your Azure subscription and permissions
4. Contact Azure support if you have access restrictions that can't be changed

