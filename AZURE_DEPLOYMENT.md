# Azure Web App Deployment Guide

## Prerequisites

1. **Azure Account** - Sign up at [azure.microsoft.com](https://azure.microsoft.com)
2. **VS Code** with Azure Extensions:
   - Azure App Service
   - Azure Account
   - Azure Resources

## Step 1: Install Azure Extensions in VS Code

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Install these extensions:
   - **Azure App Service** (by Microsoft)
   - **Azure Account** (by Microsoft)
   - **Azure Resources** (by Microsoft)

## Step 2: Create Azure Web App

### Option A: Using VS Code
1. Press `Ctrl+Shift+P` to open command palette
2. Type "Azure App Service: Create New Web App"
3. Follow the prompts:
   - Select your subscription
   - Enter app name: `GraceIntegratedHealth` (or your preferred name)
   - Select runtime: **Node 18 LTS**
   - Select OS: **Linux**
   - Select region: **Australia East** (or closest to you)

### Option B: Using Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → "Web App"
3. Fill in details:
   - **Name**: `GraceIntegratedHealth`
   - **Runtime stack**: Node 18 LTS
   - **Operating System**: Linux
   - **Region**: Australia East

## Step 3: Configure Environment Variables

1. In Azure Portal, go to your App Service
2. Navigate to **Configuration** → **Application settings**
3. Add these settings:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your actual Resend API key
   - **Name**: `NODE_ENV`
   - **Value**: `production`

## Step 4: Deploy from VS Code

### Method 1: Direct Deployment
1. Open your project in VS Code
2. Press `Ctrl+Shift+P`
3. Type "Azure App Service: Deploy to Web App"
4. Select your web app
5. Choose deployment method: **Zip Deploy**
6. Wait for deployment to complete

### Method 2: Using Tasks
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select "npm: build" to build the project
4. Then deploy using Method 1

## Step 5: Verify Deployment

1. Go to your Azure Web App URL: `https://grace-website.azurewebsites.net`
2. Test the website functionality
3. Test the contact form (ensure RESEND_API_KEY is configured)

## Troubleshooting

### Common Issues:

1. **Build fails**: 
   - Check Node.js version matches Azure runtime (18 LTS)
   - Ensure all dependencies are in package.json

2. **App won't start**:
   - Check logs in Azure Portal → Log stream
   - Ensure you're using Linux App Service (not Windows)
   - Verify startup command is set to `./startup.sh`

3. **Environment variables not working**:
   - Ensure they're set in Azure Configuration
   - Restart the app after adding variables

4. **Contact form not working**:
   - Verify RESEND_API_KEY is set correctly
   - Check application logs for errors

5. **"No new trace" error**:
   - This usually indicates the app failed to start properly
   - Check that Node.js version matches (18.x)
   - Verify the standalone deployment structure is correct
   - Ensure startup script has execute permissions

### View Logs:
```bash
# In Azure Portal
App Service → Monitoring → Log stream
```

## File Structure for Deployment

```
├── .vscode/
│   ├── settings.json      # VS Code Azure settings
│   ├── tasks.json         # Build tasks
│   └── launch.json        # Debug configuration
├── web.config             # Azure IIS configuration
├── next.config.js         # Next.js configuration for Azure
├── package.json           # Dependencies and scripts
└── AZURE_DEPLOYMENT.md    # This guide
```

## Cost Optimization

- **Free Tier**: F1 (1 GB RAM, 1 GB storage)
- **Basic Tier**: B1 (~$13/month, 1.75 GB RAM, 10 GB storage)
- **Standard Tier**: S1 (~$73/month, 1.75 GB RAM, 50 GB storage)

## Security Notes

- Never commit API keys to your repository
- Use Azure Application Settings for sensitive data
- Enable HTTPS only in Azure App Service settings
- Consider using Azure Key Vault for production secrets

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up backup and disaster recovery
4. Configure CI/CD pipeline (optional)
