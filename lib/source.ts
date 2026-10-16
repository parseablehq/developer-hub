import { docs, releaseNotes } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createOpenAPI, openapiPlugin } from 'fumadocs-openapi/server';
import type { Folder, Item, Node } from 'fumadocs-core/page-tree';
import { createElement } from 'react';

function isQuickstartFolder(item: Node): item is Folder {
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

function groupByUrls(nodes: Node[], urls: string[]): Item[] {
  return urls
    .map((url) => nodes.find((item): item is Item => item.type === 'page' && item.url === url))
    .filter((item): item is Item => Boolean(item));
}

function groupCloudProviders(nodes: Node[]): Node[] {
  return nodes.map((item) => {
    if (item.type !== 'folder') return item;

    const isCloudProviderFolder = item.children.some(
      (child) => child.type === 'page' && child.url.startsWith('/ingest-data/cloud/'),
    );

    if (!isCloudProviderFolder) {
      return {
        ...item,
        children: groupCloudProviders(item.children),
      };
    }

    const awsPages = groupByUrls(item.children, [
      '/ingest-data/cloud/aws-cloudwatch',
      '/ingest-data/cloud/aws-lambda',
      '/ingest-data/cloud/aws-data-firehose',
      '/ingest-data/cloud/aws-kinesis',
    ]);
    const azurePages = groupByUrls(item.children, [
      '/ingest-data/cloud/azure-event-hubs',
      '/ingest-data/cloud/azure-api-service',
      '/ingest-data/cloud/azure-service-bus',
    ]);
    const googlePages = groupByUrls(item.children, ['/ingest-data/cloud/gcp-pubsub']);
    const flyPages = groupByUrls(item.children, ['/ingest-data/cloud/fly-io']);

    return {
      ...item,
      children: [
        { $id: 'cloud-providers:aws', type: 'folder', name: 'AWS', children: awsPages },
        { $id: 'cloud-providers:azure', type: 'folder', name: 'Azure', children: azurePages },
        { $id: 'cloud-providers:google', type: 'folder', name: 'Google Cloud', children: googlePages },
        { $id: 'cloud-providers:fly', type: 'folder', name: 'Fly.io', children: flyPages },
      ],
    };
  });
}

function makeFolderDropdownOnly(nodes: Node[], urls: string[]): Node[] {
  return nodes.map((item) => {
    if (item.type !== 'folder') return item;

    const children = makeFolderDropdownOnly(item.children, urls);

    if (item.index && urls.includes(item.index.url)) {
      return {
        ...item,
        index: undefined,
        children,
      };
    }

    return {
      ...item,
      children,
    };
  });
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

          children = children.filter((item) => !isQuickstartFolder(item));
          children = children.map((item) => {
            if (
              item.type === 'folder' &&
              item.index &&
              ['/key-concepts', '/ingest-data/programming-languages'].includes(item.index.url)
            ) {
              return item.index;
            }

            return item;
          });
          children = groupCloudProviders(children);
          children = makeFolderDropdownOnly(children, ['/ingest-data/otel']);

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
