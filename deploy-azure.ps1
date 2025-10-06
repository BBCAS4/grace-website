# Azure Deployment Script - PowerShell version
Write-Host "🚀 Creating Azure deployment package..." -ForegroundColor Green

# Create a temporary directory for deployment
$TEMP_DIR = "azure-deploy-temp"
if (Test-Path $TEMP_DIR) {
    Remove-Item $TEMP_DIR -Recurse -Force
}
New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null

# Copy necessary files (excluding node_modules, .next, etc.)
Write-Host "📁 Copying project files..." -ForegroundColor Yellow
Copy-Item -Path "app" -Destination $TEMP_DIR -Recurse
Copy-Item -Path "components" -Destination $TEMP_DIR -Recurse
Copy-Item -Path "lib" -Destination $TEMP_DIR -Recurse
Copy-Item -Path "public" -Destination $TEMP_DIR -Recurse
Copy-Item -Path "package.json" -Destination $TEMP_DIR
Copy-Item -Path "package-lock.json" -Destination $TEMP_DIR
Copy-Item -Path "next.config.js" -Destination $TEMP_DIR
Copy-Item -Path "tailwind.config.js" -Destination $TEMP_DIR
Copy-Item -Path "postcss.config.js" -Destination $TEMP_DIR
Copy-Item -Path "tsconfig.json" -Destination $TEMP_DIR
Copy-Item -Path "web.config" -Destination $TEMP_DIR
Copy-Item -Path ".deployment" -Destination $TEMP_DIR
Copy-Item -Path "README.md" -Destination $TEMP_DIR

# Create deployment zip
Write-Host "📦 Creating deployment package..." -ForegroundColor Yellow
Set-Location $TEMP_DIR
Compress-Archive -Path * -DestinationPath "../azure-deployment.zip" -Force
Set-Location ..

# Clean up
Remove-Item $TEMP_DIR -Recurse -Force

Write-Host "✅ Deployment package created: azure-deployment.zip" -ForegroundColor Green
Write-Host "📏 Package size:" -ForegroundColor Yellow
Get-ChildItem azure-deployment.zip | Select-Object Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}

Write-Host ""
Write-Host "🎯 Ready for Azure deployment!" -ForegroundColor Green
Write-Host "Upload azure-deployment.zip to Azure App Service" -ForegroundColor Cyan
