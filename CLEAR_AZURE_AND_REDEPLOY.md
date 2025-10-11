# 🔥 CRITICAL: Clear Azure Deployment Folder First

## The Problem
Azure still has the old Windows-built `.next` folder with Windows path separators. We need to completely clear it before deploying the new standalone build.

## ✅ SOLUTION: Clear Azure wwwroot Folder

### Step 1: Stop the App
1. **Azure Portal** → Your App Service (`GraceIntegratedHealth`)
2. **Overview** → **Stop** button
3. **Wait** for it to stop

### Step 2: Clear wwwroot via Kudu
1. **Development Tools** → **Advanced Tools** → **Go**
2. In Kudu, click **Debug console** → **CMD** or **PowerShell**
3. Navigate to: `site/wwwroot`
4. **Select all files/folders** and **delete them**
   - OR run this command in the Kudu console:
   ```
   cd D:\home\site\wwwroot
   del /F /S /Q *.*
   rd /S /Q .next
   ```

### Step 3: Start the App
1. **Azure Portal** → Your App Service
2. **Overview** → **Start** button

### Step 4: Deploy Fresh
1. **VS Code:** `Ctrl+Shift+P`
2. **"Azure App Service: Deploy to Web App"**
3. **Confirm**

## 🎯 Why This is Necessary

The old `.next` folder on Azure has:
- ❌ Windows path separators (`\`)
- ❌ Built on Windows, incompatible with Linux

The new standalone build has:
- ✅ Cross-platform compatibility
- ✅ Linux path separators (`/`)
- ✅ Self-contained server

## ✅ After Clean Deployment

The app will work correctly:
- ✅ No path separator errors
- ✅ Forms submit without opening email app
- ✅ Emails sent automatically

---

**Clear Azure wwwroot first, then redeploy!**

