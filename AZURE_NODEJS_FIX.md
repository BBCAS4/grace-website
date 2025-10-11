# 🔧 Azure Node.js Configuration Fix

## The Problem
Even after redeployment, your Azure app is still serving static files instead of running the Next.js server. This means Azure isn't configured to run Node.js properly.

## ✅ SOLUTION: Configure Azure for Node.js

### Step 1: Set Startup Command in Azure

1. **Azure Portal** → Your App Service
2. **Configuration** → **General settings**
3. **Startup Command:** Enter this exactly:
   ```
   npm start
   ```
4. **Save**

### Step 2: Verify Node.js Runtime

1. **Configuration** → **General settings**
2. **Stack:** Should be **Node**
3. **Major version:** Should be **18 LTS** or **20 LTS**
4. **Minor version:** Latest available
5. **Save**

### Step 3: Add Required Environment Variables

**Configuration** → **Application settings** → Add these:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | `re_VxrdeGJV_CDiitad1eTGihqPTpaTku1Ba` |
| `NODE_ENV` | `production` |
| `WEBSITE_NODE_DEFAULT_VERSION` | `18.19.0` |

### Step 4: Restart the App

After making these changes:
1. **Overview** → **Restart**
2. Wait for restart to complete

## 🔍 Verify the Fix

### Check 1: App Logs
1. **Monitoring** → **Log stream**
2. You should see Node.js starting up:
   ```
   > grace-website@0.1.0 start
   > next start -p 3000
   ▲ Next.js 14.0.4
   ✓ Ready in [time]
   ```

### Check 2: API Routes
Visit these URLs (should return JSON, not 404):
- `https://your-app.azurewebsites.net/api/contact`
- `https://your-app.azurewebsites.net/api/referral`

### Check 3: Test Forms
1. Visit your main site
2. Fill out contact/referral form
3. Submit
4. **Expected:** Success message, NO email app opens!

## 🚨 Alternative: Manual Server File

If the above doesn't work, create a `server.js` file:

### Create server.js in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

Then set **Startup Command** to: `node server.js`

## 📋 Troubleshooting Checklist

- [ ] Startup command set to `npm start`
- [ ] Node.js runtime version 18 LTS or 20 LTS
- [ ] `RESEND_API_KEY` environment variable set
- [ ] `NODE_ENV` set to `production`
- [ ] App restarted after configuration changes
- [ ] No errors in Azure logs
- [ ] API routes accessible (not 404)

## 🎯 Expected Result

After proper configuration:
✅ Forms submit without opening email app  
✅ Success messages appear  
✅ Emails sent to `NP@GRACEIntegratedHealth.com.au`  
✅ No more mailto links  

---

**The key is configuring Azure to run Node.js instead of serving static files!**
