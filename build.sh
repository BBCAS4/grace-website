#!/bin/bash
set -e

echo "Starting static export build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build static export
echo "Building static export..."
npm run build

echo "Static export build completed successfully!"
echo "Static files are in the 'out' directory"
