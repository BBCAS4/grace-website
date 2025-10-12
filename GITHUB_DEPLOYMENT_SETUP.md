# GitHub Actions Deployment Setup

This guide will set up automatic deployment to Azure using GitHub Actions. The app will build on **Linux** (avoiding Windows path issues) and deploy automatically on every push.

## 📋 Prerequisites

- GitHub account
- GitHub repository for this project
- Azure Web App publish profile

## 🚀 Setup Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `grace-integrated-health`
3. **Don't initialize** with README (we already have files)

### Step 2: Get Azure Publish Profile

1. **Azure Portal** → Your App Service (`GraceIntegratedHealth`)
2. **Overview** tab → Click **"Get publish profile"** button
3. This downloads an `.xml` file
4. **Open the file** in Notepad and **copy all contents**

### Step 3: Add Publish Profile to GitHub

1. Go to your **GitHub repository**
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`
5. **Value**: Paste the entire contents of the publish profile XML
6. Click **"Add secret"**

### Step 4: Push Code to GitHub

Run these commands in your project directory:

```powershell
# Add all files
git add -A

# Commit changes
git commit -m "Add GitHub Actions deployment"

# Add your GitHub repo as remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin master
```

**Replace `YOUR_USERNAME` and `YOUR_REPO`** with your actual GitHub username and repository name.

### Step 5: Watch the Deployment

1. Go to your **GitHub repository**
2. Click **"Actions"** tab
3. You'll see the workflow running
4. Click on it to watch the build progress

## ✅ What Happens

Every time you push code to GitHub:
1. **GitHub Actions builds** the app on Linux
2. **No Windows path issues** (Linux paths used)
3. **Automatically deploys** to Azure
4. **App starts** with pre-built files

## 🎯 After First Deployment

Once the GitHub Action completes:
1. Check Azure logs for: `Ready on http://localhost:8080`
2. Visit: `https://graceintegratedhealth.azurewebsites.net`
3. Test the forms

## 📝 Future Updates

To update the website:
```powershell
git add .
git commit -m "Your update message"
git push
```

GitHub Actions will automatically build and deploy!

## ⚙️ Configuration

The workflow file is at: `.github/workflows/azure-deploy.yml`

**Azure Startup Command** should be:
```
npm install --production && npm start
```

This skips the build (since GitHub already built it) and only installs production dependencies.

