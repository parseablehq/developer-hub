import { docs, releaseNotes } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { createOpenAPI, openapiPlugin } from 'fumadocs-openapi/server';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // baseUrl is now handled by basePath in next.config.mjs
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  plugins: [openapiPlugin()],
});

// Create a separate loader for release notes
export const releaseNotesSource = loader({
  baseUrl: '/release-notes',
  source: releaseNotes.toFumadocsSource(),
});

// Create OpenAPI instance for the Parseable API
export const openapi = createOpenAPI();