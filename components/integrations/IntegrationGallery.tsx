import fs from 'node:fs';
import path from 'node:path';
import { Card, Cards } from 'fumadocs-ui/components/card';
import {
  IconApi,
  IconBox,
  IconBrain,
  IconChartBar,
  IconCloud,
  IconCode,
  IconCpu,
  IconDatabase,
  IconFileText,
  IconGitBranch,
  IconPuzzle,
  IconRobot,
  IconServer,
  IconShield,
  IconStack2,
} from '@tabler/icons-react';

type Integration = {
  id: string;
  name: string;
  resource: string;
  telemetry_types: string[];
  description: string;
  isOtel?: boolean;
  links: { docs: string };
  assets?: { logo?: string | null };
};

type ResourceDef = { id: string; label: string; order: number };

const resourceOrder: ResourceDef[] = [
  { id: 'opentelemetry', label: 'OpenTelemetry', order: 1 },
  { id: 'ebpf', label: 'eBPF', order: 2 },
  { id: 'llm-ai-agents', label: 'LLMs & AI Agents', order: 3 },
  { id: 'telemetry-agents', label: 'Telemetry Agents', order: 4 },
  { id: 'databases', label: 'Databases', order: 5 },
  { id: 'containers', label: 'Containers', order: 6 },
  { id: 'streaming', label: 'Streaming', order: 7 },
  { id: 'ci-cd', label: 'CI/CD', order: 8 },
  { id: 'cloud-providers', label: 'Cloud Providers', order: 9 },
  { id: 'security', label: 'Security', order: 10 },
  { id: 'programming-languages', label: 'Programming Languages', order: 11 },
];

const fallbackIconByResource: Record<string, React.ReactNode> = {
  'opentelemetry': <IconStack2 />,
  'ebpf': <IconCpu />,
  'llm-ai-agents': <IconRobot />,
  'telemetry-agents': <IconChartBar />,
  'databases': <IconDatabase />,
  'containers': <IconBox />,
  'streaming': <IconGitBranch />,
  'ci-cd': <IconCode />,
  'cloud-providers': <IconCloud />,
  'security': <IconShield />,
  'programming-languages': <IconFileText />,
};

const manifestPath = path.join(
  process.cwd(),
  'vendor',
  'datasources',
  'dist',
  'integrations.json',
);

function loadIntegrations(): Integration[] | null {
  try {
    const raw = fs.readFileSync(manifestPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Integration[];
    if (parsed && Array.isArray(parsed.integrations)) {
      return parsed.integrations as Integration[];
    }
    return null;
  } catch {
    return null;
  }
}

function toInternalHref(docsUrl: string): string {
  return docsUrl.replace(/^https?:\/\/(www\.)?parseable\.com/, '');
}

function logoSrc(logoPath: string | null | undefined): string | null {
  if (!logoPath) return null;
  const base = path.basename(logoPath);
  return `/integrations/logos/${base.toLowerCase()}`;
}

function LogoIcon({ integration }: { integration: Integration }) {
  const src = logoSrc(integration.assets?.logo);
  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        style={{ width: 20, height: 20, objectFit: 'contain' }}
      />
    );
  }
  return (
    <>{fallbackIconByResource[integration.resource] ?? <IconPuzzle />}</>
  );
}

export function IntegrationGallery() {
  const integrations = loadIntegrations();

  if (!integrations) {
    return (
      <div
        style={{
          padding: '1rem',
          border: '1px dashed var(--color-fd-border, #ccc)',
          borderRadius: 8,
          fontSize: '0.875rem',
          color: 'var(--color-fd-muted-foreground, #666)',
        }}
      >
        Integrations catalog not found at
        {' '}<code>vendor/datasources/dist/integrations.json</code>.
        {' '}Run{' '}
        <code>git submodule update --init --recursive</code>
        {' '}then{' '}
        <code>pnpm sync-catalog</code>.
      </div>
    );
  }

  const grouped = new Map<string, Integration[]>();
  for (const integration of integrations) {
    const list = grouped.get(integration.resource) ?? [];
    list.push(integration);
    grouped.set(integration.resource, list);
  }
  for (const list of grouped.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      {resourceOrder.map((resource) => {
        const items = grouped.get(resource.id);
        if (!items || items.length === 0) return null;
        return (
          <section key={resource.id}>
            <h2>{resource.label}</h2>
            <Cards>
              {items.map((integration) => (
                <Card
                  key={integration.id}
                  title={integration.name}
                  href={toInternalHref(integration.links.docs)}
                  icon={<LogoIcon integration={integration} />}
                >
                  {integration.description}
                </Card>
              ))}
            </Cards>
          </section>
        );
      })}
    </>
  );
}
