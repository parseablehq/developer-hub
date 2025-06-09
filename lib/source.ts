import { docs, releaseNotes } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createOpenAPI, attachFile } from 'fumadocs-openapi/server';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  pageTree: {
    // adds a badge to each page item in page tree
    attachFile,
  },
});

// Create a separate loader for release notes
export const releaseNotesSource = loader({
  baseUrl: '/release-notes',
  source: releaseNotes.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

// Create OpenAPI instance for the Parseable API
export const openapi = createOpenAPI({
  // Point to the correct schema file
  generateCodeSamples() {
    return [
      {
        lang: 'javascript',
        label: 'JavaScript',
        source: false
      },
      {
        lang: 'python',
        label: 'Python',
        source: false
      },
      {
        lang: 'go',
        label: 'Go',
        source: false
      },
    ];
  },
});