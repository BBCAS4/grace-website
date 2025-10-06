#!/bin/bash

# Azure Deployment Script for GRACE Website
echo "🚀 Starting Azure deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📋 Build summary:"
    echo "   - Next.js app built successfully"
    echo "   - Static pages generated"
    echo "   - API routes compiled"
    echo ""
    echo "🎯 Ready for deployment to Azure!"
else
    echo "❌ Build failed!"
    echo "Please check the error messages above and fix any issues."
    exit 1
fi
