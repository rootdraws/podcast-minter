/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['vercel.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.buzzsprout.com https://*.buzzsprout.com https://*.alchemy.com https://*.walletconnect.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://*.vercel.app https://*.buzzsprout.com https://*.alchemy.com blob:;
              connect-src 'self' https://*.buzzsprout.com https://*.alchemy.com https://*.walletconnect.com wss://*.walletconnect.com;
              frame-src 'self' https://www.buzzsprout.com https://*.walletconnect.com;
              font-src 'self';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

export default nextConfig
