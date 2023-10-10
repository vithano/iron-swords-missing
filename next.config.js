/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'drive.google.com',
            },
          ],      
    },
    experimental: {
        serverActions: true,
        isrMemoryCacheSize: 0,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'drive.google.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
