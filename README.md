# Parseable Documentation Site

This repository contains the official documentation for [Parseable](https://parseable.io), providing fast observability on S3. The documentation is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## About Parseable

Parseable is a cloud-native observability platform designed for high performance and scalability on S3. It enables you to ingest, store, and query observability data at scale using familiar SQL syntax directly on S3. For more information about Parseable, visit the [official website](https://parseable.io) or the [GitHub repository](https://github.com/parseablehq/parseable).

## Contributing to the Documentation

We welcome contributions to improve the Parseable documentation! Here's how you can help:

1. Fork this repository
2. Make your changes
3. Submit a pull request

Please ensure your contributions follow our documentation style guide and are accurate.

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or above
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

```bash
# Using npm
npm install

# Using Yarn
yarn
```

### Running the Development Server

```bash
# Using npm
npm start

# Using Yarn
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Building for Production

```bash
# Using npm
npm run build

# Using Yarn
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The documentation is automatically deployed when changes are merged to the main branch. If you need to deploy manually:

```bash
# Using npm
npm run deploy

# Using Yarn
yarn deploy
```

## License

This documentation is licensed under the same license as Parseable. See the [LICENSE](LICENSE) file for details.
