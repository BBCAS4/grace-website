const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { createServer } = require('http');
const { parse } = require('url');

// Check if node_modules exists, if not extract from tar.gz
if (!existsSync('./node_modules')) {
  console.log('node_modules not found, extracting from tar.gz...');
  try {
    execSync('tar -xzf node_modules.tar.gz', { stdio: 'inherit' });
    console.log('node_modules extracted successfully');
  } catch (err) {
    console.error('Failed to extract node_modules:', err);
    process.exit(1);
  }
}

const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
