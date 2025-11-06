#!/bin/bash

# Azure App Service startup script for Next.js standalone deployment
echo "Starting Grace Integrated Health website..."

# Set default port if not provided
if [ -z "$PORT" ]; then
    export PORT=8080
fi

# Set Node environment
export NODE_ENV=production

# Change to the app directory
cd /home/site/wwwroot

# Debug: List directory contents
echo "Current directory contents:"
ls -la

# Start the Next.js application using npm start
# This will use the server.js file in the root which handles both standalone and standard modes
echo "Starting Node.js application on port $PORT..."

if [ -f "package.json" ]; then
    echo "Found package.json, using npm start..."
    npm start
elif [ -f "server.js" ]; then
    echo "Found server.js, starting application..."
    node server.js
elif [ -d ".next/standalone" ]; then
    echo "Found standalone directory, starting from there..."
    cd .next/standalone
    if [ -f "server.js" ]; then
        node server.js
    else
        echo "server.js not found in standalone directory"
        exit 1
    fi
else
    echo "No valid startup method found. Available files:"
    find . -maxdepth 2 -name "*.js" -type f | head -10
    exit 1
fi
