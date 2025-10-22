/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Enable for Azure deployment
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  redirects: async () => {
    return [
      // Redirect Azure domain to custom domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'graceintegratedhealth.azurewebsites.net',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true, // 301 redirect
      },
      // Add any other Azure subdomain variations if needed
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'grace-website.azurewebsites.net',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true, // 301 redirect
      },
      // Handle root domain - redirect to www for consistency
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'graceintegratedhealth.com.au',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
