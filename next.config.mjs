const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  basePath: "/docs",
  assetPrefix: "/docs",
  images: {
    domains: ["lh3.googleusercontent.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withMDX(config);
