import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: false,
  assetPrefix: "/docs",
  images: {
    domains: ["lh3.googleusercontent.com"], // Add other domains as needed
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: '/server/opentelemetry',
        destination: '/docs/OpenTelemetry',
        permanent: true, // 301 redirect
      },
      // Redirect /docs/* to /* for development/preview environments
      {
        source: '/docs/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ]
  },
  async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        },
      ]
    },
};

export default withMDX(config);
