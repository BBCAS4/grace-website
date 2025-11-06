#!/usr/bin/env node

/**
 * Azure App Service server entry point for Next.js standalone deployment
 * This file handles both standalone and standard Next.js deployments
 */

const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const hostname = process.env.WEBSITE_HOSTNAME ? '0.0.0.0' : 'localhost';

// Check if we're in standalone mode (after build)
const standalonePath = path.join(__dirname, '.next', 'standalone');
const standaloneServerPath = path.join(standalonePath, 'server.js');

if (fs.existsSync(standaloneServerPath)) {
  // Standalone mode - change to standalone directory and run the server
  console.log('Starting Next.js standalone server...');
  console.log('Standalone path:', standalonePath);
  
  // Change working directory to standalone (required for relative paths)
  process.chdir(standalonePath);
  
  // The standalone server.js expects to be run from the standalone directory
  require('./server.js');
} else {
  // Fallback: try to use Next.js standard server
  console.log('Standalone server not found, attempting standard Next.js server...');
  
  try {
    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');
    
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev, hostname, port });
    const handle = app.getRequestHandler();
    
    app.prepare().then(() => {
      const server = createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('Error occurred handling', req.url, err);
          res.statusCode = 500;
          res.end('internal server error');
        }
      });
      
      server.listen(port, hostname, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('Make sure you have run: npm run build');
    process.exit(1);
  }
}

