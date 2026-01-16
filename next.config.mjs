import { createMDX } from 'fumadocs-mdx/next';
import { createRequire } from 'module';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withMDX = createMDX();

// Load generated redirects if available
let generatedRedirects = [];
const redirectsPath = join(__dirname, 'redirects.json');
if (existsSync(redirectsPath)) {
  const require = createRequire(import.meta.url);
  generatedRedirects = require('./redirects.json');
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: false,
  assetPrefix: "/docs",
  images: {
    domains: ["lh3.googleusercontent.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      // Rewrite *.mdx requests to llms.mdx route for AI agents
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // Static redirects
      {
        source: '/server/opentelemetry',
        destination: '/docs/OpenTelemetry',
        permanent: true, // 301 redirect
      },
      // Generated redirects from frontmatter redirect_from
      ...generatedRedirects,
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
