#!/bin/bash

# Azure Deployment Script - Excludes node_modules and other unnecessary files
echo "🚀 Creating Azure deployment package..."

# Create a temporary directory for deployment
TEMP_DIR="azure-deploy-temp"
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Copy necessary files (excluding node_modules, .next, etc.)
echo "📁 Copying project files..."
cp -r app $TEMP_DIR/
cp -r components $TEMP_DIR/
cp -r lib $TEMP_DIR/
cp -r public $TEMP_DIR/
cp package.json $TEMP_DIR/
cp package-lock.json $TEMP_DIR/
cp next.config.js $TEMP_DIR/
cp tailwind.config.js $TEMP_DIR/
cp postcss.config.js $TEMP_DIR/
cp tsconfig.json $TEMP_DIR/
cp web.config $TEMP_DIR/
cp .deployment $TEMP_DIR/
cp README.md $TEMP_DIR/

# Create deployment zip
echo "📦 Creating deployment package..."
cd $TEMP_DIR
zip -r ../azure-deployment.zip . -x "*.DS_Store" "*.log" "*.tmp"
cd ..

# Clean up
rm -rf $TEMP_DIR

echo "✅ Deployment package created: azure-deployment.zip"
echo "📏 Package size:"
ls -lh azure-deployment.zip

echo ""
echo "🎯 Ready for Azure deployment!"
echo "Upload azure-deployment.zip to Azure App Service"
