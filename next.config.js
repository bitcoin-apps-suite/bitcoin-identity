/** @type {import('next').NextConfig} */
const frameAncestors =
  "frame-ancestors 'self' capacitor://localhost https://localhost https://web.bwalletx.com https://desktop.bwalletx.com";

const nextConfig = {
  images: {
    unoptimized: true
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Content-Security-Policy', value: frameAncestors }] }];
  }
}

module.exports = nextConfig
