import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // Add other domains as needed
    dangerouslyAllowSVG: true,
    basePath: '/docs',
    assetsPrefix: '/docs',
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withMDX(config);
