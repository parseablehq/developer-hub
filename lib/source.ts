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

function isOperatePage(item: Node): item is Item {
  return (
    item.type === 'page' &&
    [
      '/user-guide/rbac',
      '/user-guide/multi-tenancy',
      '/user-guide/api-keys',
      '/user-guide/openid',
      '/user-guide/retention',
      '/user-guide/smart-cache',
      '/self-hosted/metrics',
      '/self-hosted/telemetry',
    ].includes(item.url)
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
                ...item.index,
                name: 'Integrations',
              };
            }

            return item;
          });

          const ingestionIndex = children.findIndex(
            (item) => item.type === 'page' && item.url === '/ingestion',
          );
          const ingestionSectionIndex = children.findIndex(
            (item, index) => index > ingestionIndex && item.type === 'separator' && item.name === 'Ingestion',
          );

          if (ingestionIndex !== -1 && ingestionSectionIndex !== -1) {
            const nextSectionIndex = children.findIndex(
              (item, index) => index > ingestionSectionIndex && item.type === 'separator',
            );
            const ingestionSectionEnd = nextSectionIndex === -1 ? children.length : nextSectionIndex;
            const ingestionPage = children[ingestionIndex];
            const ingestionChildren = children
              .slice(ingestionSectionIndex + 1, ingestionSectionEnd)
              .filter((item) => !hasQuickstartPages(item));

            if (ingestionPage.type === 'page' && ingestionChildren.length > 0) {
              const ingestionGroup: Folder = {
                $id: `${node.$id ?? 'root'}:ingestion`,
                type: 'folder',
                name: 'Ingestion',
                index: ingestionPage,
                defaultOpen: true,
                children: ingestionChildren,
              };

              children = [
                ...children.slice(0, ingestionIndex),
                ingestionGroup,
                ...children.slice(ingestionIndex + 1, ingestionSectionIndex),
                ...children.slice(ingestionSectionEnd),
              ];
            }
          }

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

          const operateStart = children.findIndex(
            (item) => item.type === 'page' && item.url === '/user-guide/rbac',
          );
          const operatePages = children.filter(isOperatePage);

          if (operateStart !== -1 && operatePages.length > 0) {
            const operateGroup: Folder = {
              $id: `${node.$id ?? 'root'}:operate`,
              type: 'folder',
              name: 'Operate',
              defaultOpen: false,
              children: operatePages,
            };

            children = [
              ...children.slice(0, operateStart).filter((item) => !isOperatePage(item)),
              operateGroup,
              ...children.slice(operateStart).filter((item) => !isOperatePage(item)),
            ];
          }

          return {
            ...node,
            children,
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
