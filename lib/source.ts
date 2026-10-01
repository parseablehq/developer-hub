import { docs, releaseNotes } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createOpenAPI, openapiPlugin } from 'fumadocs-openapi/server';
import type { Folder } from 'fumadocs-core/page-tree';
import { createElement } from 'react';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // Next.js adds the public `/docs` base path to generated links.
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  plugins: [openapiPlugin()],
  pageTree: {
    transformers: [
      {
        file(node) {
          if (node.url === '/ingest-data/logging-agents/otel-collector') {
            return {
              ...node,
              name: 'OTel Collector',
            };
          }

          return node;
        },
        root(node) {
          const start = node.children.findIndex(
            (item) => item.type === 'page' && item.url === '/ingestion',
          );
          if (start === -1) return node;

          const nextSection = node.children.findIndex(
            (item, index) => index > start && item.type === 'separator',
          );
          const end = nextSection === -1 ? node.children.length : nextSection;
          const index = node.children[start];
          if (index.type !== 'page') return node;

          // Group sidebar links without moving content or changing their URLs.
          const group: Folder = {
            $id: `${node.$id ?? 'root'}:ingestion`,
            type: 'folder',
            name: index.name,
            index,
            defaultOpen: true,
            children: node.children.slice(start + 1, end),
          };

          return {
            ...node,
            children: [
              ...node.children.slice(0, start),
              group,
              ...node.children.slice(end),
            ],
          };
        },
      },
    ],
  },
  icon(icon) {
    if (icon && icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});

// Create a separate loader for release notes
export const releaseNotesSource = loader({
  baseUrl: '/release-notes',
  source: releaseNotes.toFumadocsSource(),
});

// Create OpenAPI instance for the Parseable API
export const openapi = createOpenAPI();
