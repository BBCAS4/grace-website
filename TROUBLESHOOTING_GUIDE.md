# Grace Website Email - Complete Troubleshooting Guide

This guide covers all the issues we encountered and their solutions during the deployment and email setup process.

## Table of Contents
1. [Initial GitHub Actions Warning](#initial-github-actions-warning)
2. [504 Gateway Timeout Error](#504-gateway-timeout-error)
3. [500 Internal Server Error](#500-internal-server-error)
4. [Email Functionality Issues](#email-functionality-issues)
5. [Quick Diagnostic Checklist](#quick-diagnostic-checklist)
6. [Prevention Tips](#prevention-tips)

---

## Initial GitHub Actions Warning

**Issue:** `Context access might be invalid: AZURE_WEBAPP_PUBLISH_PROFILE`

**Solution:** This is a harmless GitHub Actions validation warning. The syntax is correct, but GitHub cannot validate secrets at parse time.

**Action Required:** None - just ensure the secret exists in GitHub repository settings.

---

## 504 Gateway Timeout Error

**Symptoms:**
- Website loads but shows "504.0 Gateway Timeout"
- Azure Front Door cannot connect to the origin server

**Root Causes & Solutions:**

### 1. Windows Path Issues in Linux Deployment
**Problem:** Windows path separators (`\`) in deployed files cause issues on Linux Azure App Service.

**Solution:**
```yaml
# In .github/workflows/azure-deploy.yml
- name: Prepare deployment package
  run: |
    mkdir -p deploy
    cp -r .next/standalone/. deploy/
    cp -r .next/static/. deploy/.next/static/
    cp -r public/. deploy/public/
    cp package.json deploy/
```

### 2. Conflicting Workflows
**Problem:** Multiple GitHub Actions workflows deploying simultaneously.

**Solution:** Delete auto-generated Azure workflows (e.g., `master_graceintegratedhealth.yml`) and use only your custom workflow.

### 3. Incorrect Startup Command
**Problem:** Azure App Service startup command not set correctly.

**Solution:** Set startup command to `npm start` in Azure Portal → App Services → Your App → Configuration → General settings.

---

## 500 Internal Server Error

**Symptoms:**
- Website loads but shows "500 Internal Server Error"
- Application starts but crashes

**Root Causes & Solutions:**

### 1. Build-time API Key Issues
**Problem:** Resend client initialized during build when API key is not available.

**Solution:**
```typescript
// In app/api/contact/route.ts and app/api/referral/route.ts
export async function POST(request: Request) {
  try {
    // ... validation code ...
    
    // Initialize Resend client at runtime (not at module load time)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // ... rest of the code ...
  } catch (error) {
    // ... error handling ...
  }
}
```

### 2. Incorrect Start Script
**Problem:** `package.json` start script pointing to wrong location.

**Solution:**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### 3. Next.js Version Issues
**Problem:** Older Next.js versions have bugs with standalone output.

**Solution:** Upgrade to Next.js 14.2.0 or later:
```bash
npm install next@^14.2.0 eslint-config-next@^14.2.0
```

---

## Email Functionality Issues

### 1. API Key Invalid
**Symptoms:**
```
error: {
  statusCode: 401,
  name: 'validation_error',
  message: 'API key is invalid'
}
```

**Solution:**
1. Go to Resend Dashboard → API Keys
2. Generate a new API key
3. Update Azure App Service → Configuration → Application settings
4. Set `RESEND_API_KEY` to the new key
5. Restart the App Service

### 2. Domain Not Verified
**Symptoms:**
```
error: {
  statusCode: 403,
  message: 'The GRACEIntegratedHealth.com.au domain is not verified'
}
```

**Solution:**
1. Go to Resend Dashboard → Domains
2. Add your domain: `graceintegratedhealth.com.au`
3. Add required DNS records (MX, SPF, DKIM)
4. Wait for verification to complete

### 3. Form Reset Error
**Symptoms:**
```
TypeError: Cannot read properties of null (reading 'reset')
```

**Solution:**
```typescript
// In components/contact-form.tsx and components/referral-form.tsx
<form onSubmit={async (e)=>{
  e.preventDefault();
  const form = e.currentTarget; // Store reference early
  // ... rest of the code ...
  
  if (response.ok) {
    setSent(true);
    form.reset(); // Use stored reference
  }
}}>
```

### 4. Case Sensitivity Issues
**Problem:** Email addresses with different cases causing issues.

**Solution:** Use consistent case:
```typescript
from: 'GRACE Health <np@graceintegratedhealth.com.au>',
to: 'NP@GRACEIntegratedHealth.com.au',
```

---

## Quick Diagnostic Checklist

When email functionality stops working:

### 1. Check Azure Logs
- Go to Azure Portal → App Services → Your App → Log stream
- Look for error messages in the logs

### 2. Check Browser Console
- Open Developer Tools (F12) → Network tab
- Submit the form and check the API response

### 3. Verify Environment Variables
- Azure Portal → App Services → Configuration → Application settings
- Ensure `RESEND_API_KEY` exists and is correct

### 4. Check Resend Dashboard
- Go to Resend Dashboard → Logs
- Look for failed email attempts
- Verify domain status

### 5. Test API Directly
```bash
curl -X POST https://your-app.azurewebsites.net/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
```

---

## Prevention Tips

### 1. Always Use Custom GitHub Actions Workflow
- Delete auto-generated Azure workflows
- Use your custom `.github/workflows/azure-deploy.yml`

### 2. Proper Environment Variable Management
- Never hardcode API keys
- Always use environment variables
- Test locally with `.env.local`

### 3. Consistent Email Configuration
- Use your verified domain for sender emails
- Keep recipient emails consistent
- Test with both forms regularly

### 4. Regular Monitoring
- Check Azure logs weekly
- Monitor Resend dashboard for failed emails
- Test forms after any deployments

### 5. Version Management
- Keep Next.js updated
- Use specific version ranges in package.json
- Test upgrades in development first

---

## Emergency Recovery Steps

If everything breaks:

1. **Revert to Last Working Commit**
   ```bash
   git log --oneline -5  # Find last working commit
   git reset --hard <commit-hash>
   git push origin master --force
   ```

2. **Check Azure App Service Status**
   - Azure Portal → App Services → Your App → Overview
   - Restart the service if needed

3. **Verify Environment Variables**
   - Azure Portal → Configuration → Application settings
   - Re-enter the RESEND_API_KEY if needed

4. **Test Basic Functionality**
   - Check if website loads
   - Test contact form
   - Check Azure logs

---

## Contact Information

If issues persist:
- Check Azure App Service logs first
- Verify Resend dashboard for email delivery status
- Test API endpoints directly
- Review this guide for common solutions

---

*Last updated: October 2025*
*Based on actual troubleshooting session with Grace Integrated Health website*
