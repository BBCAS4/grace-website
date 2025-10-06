/** @type {import('next').NextConfig} */
const nextConfig = {
  // Azure App Service configuration
  // Ensure proper static file serving
  trailingSlash: false,
  // Optimize for Azure deployment
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
