/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Enable for Azure deployment
  trailingSlash: true,
  // Disable client-side rendering for problematic browsers
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverComponentsExternalPackages: [],
  },
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
    serverComponentsExternalPackages: [],
  },
  // Add mobile-specific optimizations
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  async redirects() {
    return [
      // Redirect Azure domains to custom domain
      // Using specific host matching to avoid redirect loops
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'graceintegratedhealth.azurewebsites.net',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'grace-website.azurewebsites.net',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'graceintegratedhealth-g7ewbyc2eghhezga.australiaeast-01.azurewebsites.net',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true,
      },
      // Redirect non-www to www (only if not already www)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'graceintegratedhealth.com.au',
          },
        ],
        destination: 'https://www.graceintegratedhealth.com.au/:path*',
        permanent: true,
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
            value: 'public, max-age=86400, stale-while-revalidate=604800',
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
