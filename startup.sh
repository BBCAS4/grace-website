#!/bin/bash

# Azure App Service startup script for Next.js standalone deployment
echo "Starting Grace Integrated Health website..."

# Set default port if not provided
if [ -z "$PORT" ]; then
    export PORT=8080
fi

# Change to the app directory
cd /home/site/wwwroot

# Debug: List directory contents
echo "Current directory contents:"
ls -la

# Check if standalone directory exists
if [ -d ".next/standalone" ]; then
    echo "Found standalone directory, changing to it..."
    cd .next/standalone
    echo "Standalone directory contents:"
    ls -la
else
    echo "Standalone directory not found, staying in root..."
fi

# Start the Next.js application
echo "Starting Node.js application on port $PORT..."

# Try npm start first (uses package.json start script)
if [ -f "package.json" ]; then
    echo "Found package.json, using npm start..."
    npm start
else
    echo "package.json not found, trying direct server.js..."
    if [ -f "server.js" ]; then
        echo "Found server.js, starting application..."
        node server.js
    else
        echo "server.js not found, trying alternative paths..."
        if [ -f ".next/server.js" ]; then
            echo "Found .next/server.js, starting application..."
            node .next/server.js
        else
            echo "No server.js found. Available files:"
            find . -name "*.js" -type f | head -10
            exit 1
        fi
    fi
fi
