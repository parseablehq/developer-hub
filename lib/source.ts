import { docs, releaseNotes } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createOpenAPI, openapiPlugin } from 'fumadocs-openapi/server';
import type { Folder, Item, Node } from 'fumadocs-core/page-tree';
import { createElement } from 'react';

function findPage(nodes: Node[], url: string): Item | undefined {
  for (const item of nodes) {
    if (item.type === 'page' && item.url === url) {
      return item;
    }

    if (item.type === 'folder') {
      const child = findPage(item.children, url);
      if (child) return child;
    }
  }
}

function hasQuickstartPages(item: Node): item is Folder {
  return (
    item.type === 'folder' &&
    item.children.some((child) => child.type === 'page' && child.url.startsWith('/quickstart/'))
  );
}

function isTelemetrySignalPage(item: Node): item is Item {
  return (
    item.type === 'page' &&
    ['/user-guide/logs', '/user-guide/metrics', '/user-guide/traces'].includes(item.url)
  );
}

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
          let children = node.children;
          const quickstartIndex = children.findIndex(hasQuickstartPages);
          const quickstartFolder = children[quickstartIndex];
          const quickstartPage = children.find(
            (item): item is Item => item.type === 'page' && item.url === '/get-started',
          );

          if (quickstartPage && quickstartFolder?.type === 'folder') {
            const selfHostedInstall = findPage(children, '/self-hosted/installation');
            const quickstartChildren: Node[] = [
              ...quickstartFolder.children,
              ...(selfHostedInstall
                ? [
                    {
                      ...selfHostedInstall,
                      $id: `${selfHostedInstall.$id ?? 'self-hosted-installation'}:quickstart`,
                      name: 'Self Host',
                    },
                  ]
                : []),
            ];
            const quickstartGroup: Folder = {
              $id: `${node.$id ?? 'root'}:quickstart`,
              type: 'folder',
              name: createElement('span', { 'data-quickstart-sidebar': '' }, quickstartPage.name),
              index: quickstartPage,
              icon: quickstartPage.icon,
              defaultOpen: false,
              children: quickstartChildren,
            };

            const nextChildren = children.filter(
              (item) => item !== quickstartPage && item !== quickstartFolder,
            );
            const insertAt = nextChildren.findIndex(
              (item) => item.type === 'page' && item.url === '/mcp',
            );
            const safeInsertAt = insertAt === -1 ? nextChildren.length : insertAt;

            children = [
              ...nextChildren.slice(0, safeInsertAt),
              quickstartGroup,
              ...nextChildren.slice(safeInsertAt),
            ];
          }

          children = children.map((item) => {
            if (item.type === 'folder' && item.index?.url === '/integrations') {
              return {
                ...item,
                name: 'Overview',
                index: {
                  ...item.index,
                  name: 'Overview',
                },
              };
            }

            return item;
          });

          const signalStart = children.findIndex(
            (item) => item.type === 'page' && item.url === '/user-guide/logs',
          );
          const signalPages = children.filter(isTelemetrySignalPage);

          if (signalStart !== -1 && signalPages.length === 3) {
            const telemetrySignalsGroup: Folder = {
              $id: `${node.$id ?? 'root'}:telemetry-signals`,
              type: 'folder',
              name: 'Telemetry Signals',
              defaultOpen: false,
              children: signalPages,
            };

            children = [
              ...children.slice(0, signalStart).filter((item) => !isTelemetrySignalPage(item)),
              telemetrySignalsGroup,
              ...children.slice(signalStart).filter((item) => !isTelemetrySignalPage(item)),
            ];
          }

          const start = children.findIndex(
            (item) => item.type === 'page' && item.url === '/ingestion',
          );
          if (start === -1) return { ...node, children };

          const nextSection = children.findIndex(
            (item, index) => index > start && item.type === 'separator',
          );
          const end = nextSection === -1 ? children.length : nextSection;
          const index = children[start];
          if (index.type !== 'page') return node;

          // Group sidebar links without moving content or changing their URLs.
          const group: Folder = {
            $id: `${node.$id ?? 'root'}:ingestion`,
            type: 'folder',
            name: 'Overview',
            index: {
              ...index,
              name: 'Overview',
            },
            defaultOpen: true,
            children: children.slice(start + 1, end),
          };

          return {
            ...node,
            children: [
              ...children.slice(0, start),
              group,
              ...children.slice(end),
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
