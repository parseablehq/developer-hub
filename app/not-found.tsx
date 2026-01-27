'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mappings without /docs prefix - we normalize paths before matching
const URL_MAPPINGS: Array<{ pattern: RegExp; replacement: string }> = [
  // Remove /server/ prefix (most common pattern from old docs)
  { pattern: /^\/server\/(.+)/, replacement: '/$1' },
  
  // features -> user-guide
  { pattern: /^\/features\/alerts/, replacement: '/user-guide/alerting' },
  { pattern: /^\/features\/dashboards/, replacement: '/user-guide/dashboards' },
  { pattern: /^\/features\/retention/, replacement: '/user-guide/retention' },
  { pattern: /^\/features\/rbac/, replacement: '/user-guide/rbac' },
  { pattern: /^\/features\/oidc/, replacement: '/user-guide/openid' },
  { pattern: /^\/features\/openid/, replacement: '/user-guide/openid' },
  { pattern: /^\/features\/smart-cache/, replacement: '/user-guide/smart-cache' },
  { pattern: /^\/features\/sql-editor/, replacement: '/user-guide/sql-editor' },
  { pattern: /^\/features\/log-iq/, replacement: '/user-guide/log-iq' },
  { pattern: /^\/features\/tiering/, replacement: '/user-guide/tiering' },
  { pattern: /^\/features\/auto-schema/, replacement: '/key-concepts/data-model' },
  { pattern: /^\/features\/setting-retention/, replacement: '/user-guide/retention' },
  { pattern: /^\/features\//, replacement: '/user-guide/' },
  
  // installation paths
  { pattern: /^\/installation\/docker$/, replacement: '/self-hosted/installation/standalone/docker' },
  { pattern: /^\/installation\/setup-parseable-on-docker/, replacement: '/self-hosted/installation/standalone/docker' },
  { pattern: /^\/installation\/kubernetes-helm/, replacement: '/self-hosted/installation/distributed/k8s-helm' },
  { pattern: /^\/installation\/setup-parseable-on-kubernetes/, replacement: '/self-hosted/installation/distributed/k8s-helm' },
  { pattern: /^\/installation\/eks/, replacement: '/self-hosted/installation/standalone/aws-eks' },
  { pattern: /^\/installation\/ecs/, replacement: '/self-hosted/installation/standalone/aws-ecs' },
  { pattern: /^\/installation\/systemd/, replacement: '/self-hosted/installation/standalone/linux' },
  { pattern: /^\/installation\/standalone\/setup-parseable-on-aws-eks/, replacement: '/self-hosted/installation/standalone/aws-eks' },
  { pattern: /^\/installation\/standalone\/setup-parseable-on-kubernetes/, replacement: '/self-hosted/installation/standalone/k8s' },
  { pattern: /^\/installation\/standalone\/setup-parseable-on-docker/, replacement: '/self-hosted/installation/standalone/docker' },
  { pattern: /^\/installation\/standalone\/setup-systemd/, replacement: '/self-hosted/installation/standalone/linux' },
  { pattern: /^\/installation\/standalone/, replacement: '/self-hosted/installation/standalone' },
  { pattern: /^\/installation\/distributed\/setup-distributed-parseable-on-docker/, replacement: '/self-hosted/installation/distributed/docker-compose' },
  { pattern: /^\/installation\/distributed\/setup-distributed-parseable-on-kubernetes/, replacement: '/self-hosted/installation/distributed/k8s-helm' },
  { pattern: /^\/installation\/distributed/, replacement: '/self-hosted/installation/distributed' },
  { pattern: /^\/installation-planning/, replacement: '/self-hosted/installation' },
  { pattern: /^\/installation$/, replacement: '/self-hosted/installation' },
  { pattern: /^\/installation\//, replacement: '/self-hosted/installation/' },
  
  // datasource/log-agents -> ingest-data/logging-agents
  { pattern: /^\/datasource\/log-agents\//, replacement: '/ingest-data/logging-agents/' },
  { pattern: /^\/datasource\/log-agents/, replacement: '/ingest-data/logging-agents' },
  
  // log-ingestion paths
  { pattern: /^\/log-ingestion\/agents\/how-to-setup-fluent-bit/, replacement: '/ingest-data/logging-agents/fluent-bit' },
  { pattern: /^\/log-ingestion\/agents\/how-to-setup-logstash/, replacement: '/ingest-data/logging-agents/logstash' },
  { pattern: /^\/log-ingestion\/agents\/how-to-setup-vector/, replacement: '/ingest-data/logging-agents/vector' },
  { pattern: /^\/log-ingestion\/agents\/apache-log4j/, replacement: '/ingest-data/logging-agents/apache-log-4j' },
  { pattern: /^\/log-ingestion\/agents/, replacement: '/ingest-data/logging-agents' },
  { pattern: /^\/log-ingestion\/applications\/python/, replacement: '/ingest-data/applications/python' },
  { pattern: /^\/log-ingestion\/applications\/java/, replacement: '/ingest-data/applications/java' },
  { pattern: /^\/log-ingestion\/applications\/csharp/, replacement: '/ingest-data/applications/csharp' },
  { pattern: /^\/log-ingestion\/applications/, replacement: '/ingest-data/applications' },
  { pattern: /^\/log-ingestion\/cdn/, replacement: '/ingest-data/cdn' },
  { pattern: /^\/log-ingestion\//, replacement: '/ingest-data/' },
  
  // concepts -> key-concepts
  { pattern: /^\/concepts\/distributed-architecture/, replacement: '/key-concepts/high-availability' },
  { pattern: /^\/concepts\/environment-variables/, replacement: '/self-hosted/configuration' },
  { pattern: /^\/concepts\/query/, replacement: '/key-concepts/query' },
  { pattern: /^\/concepts\//, replacement: '/key-concepts/' },
  { pattern: /^\/concepts$/, replacement: '/key-concepts' },
  
  // integrations paths
  { pattern: /^\/integrations\/alertmanager/, replacement: '/alerting/alert-manager' },
  { pattern: /^\/integrations\/grafana/, replacement: '/integrations/visualization/grafana' },
  { pattern: /^\/integrations\/setup-redpanda/, replacement: '/ingest-data/streaming/redpanda' },
  { pattern: /^\/integrations\/tetragon/, replacement: '/ingest-data/zero-instrumentation' },
  { pattern: /^\/integrations\/llm/, replacement: '/ai-features/text-to-sql' },
  
  // alerts paths
  { pattern: /^\/alerts\/alertmanager/, replacement: '/alerting/alert-manager' },
  
  // opentelemetry paths
  { pattern: /^\/opentelemetry\/opentelemetry-logs/, replacement: '/ingest-data/otel/logs' },
  { pattern: /^\/opentelemetry\/logs/, replacement: '/ingest-data/otel/logs' },
  { pattern: /^\/opentelemetry\/metrics/, replacement: '/ingest-data/otel/metrics' },
  { pattern: /^\/opentelemetry\/traces/, replacement: '/ingest-data/otel/traces' },
  { pattern: /^\/opentelemetry\//, replacement: '/ingest-data/otel/' },
  { pattern: /^\/OpenTelemetry\//, replacement: '/ingest-data/otel/' },
  
  // get-started / quickstart
  { pattern: /^\/docker-quick-start/, replacement: '/quickstart/docker' },
  { pattern: /^\/get-started\/docker-quick-start/, replacement: '/quickstart/docker' },
  
  // api paths
  { pattern: /^\/api\/overview/, replacement: '/api' },
  { pattern: /^\/api\/log-query/, replacement: '/api' },
  { pattern: /^\/api-reference\/apireference\//, replacement: '/api' },
  
  // pb CLI
  { pattern: /^\/cli\/pb-user-management/, replacement: '/pb' },
  { pattern: /^\/pb\/introduction/, replacement: '/pb' },
  
  // contributing
  { pattern: /^\/contributing/, replacement: '/get-started' },
  
  // category pages (Docusaurus style)
  { pattern: /^\/category\/agents/, replacement: '/ingest-data/logging-agents' },
  { pattern: /^\/category\/applications/, replacement: '/ingest-data/applications' },
  { pattern: /^\/category\/cdn/, replacement: '/ingest-data/cdn' },
  { pattern: /^\/category\/distributed/, replacement: '/self-hosted/installation/distributed' },
  { pattern: /^\/category\//, replacement: '/' },
  
  // storage paths
  { pattern: /^\/storage\/aws-s3/, replacement: '/self-hosted/storage-targets/aws-s3' },
  { pattern: /^\/storage\/awss3/, replacement: '/self-hosted/storage-targets/aws-s3' },
  { pattern: /^\/storage\/azure/, replacement: '/self-hosted/storage-targets/azure-blob-storage' },
  { pattern: /^\/storage\//, replacement: '/self-hosted/storage-targets/' },
  { pattern: /^\/storage$/, replacement: '/self-hosted/storage-targets' },
  
  // streaming paths
  { pattern: /^\/streaming\/setup-redpanda/, replacement: '/ingest-data/streaming/redpanda' },
  { pattern: /^\/streamin\/setup-redpanda/, replacement: '/ingest-data/streaming/redpanda' },
  { pattern: /^\/streaming\//, replacement: '/ingest-data/streaming/' },
  
  // ebpf paths
  { pattern: /^\/ebpf\/tetragon/, replacement: '/ingest-data/zero-instrumentation' },
  { pattern: /^\/ebpf\//, replacement: '/ingest-data/zero-instrumentation' },
  { pattern: /^\/eBPF\//, replacement: '/ingest-data/zero-instrumentation' },
  
  // oauth paths
  { pattern: /^\/oauth\/authentik/, replacement: '/user-guide/openid' },
  { pattern: /^\/oauth\//, replacement: '/user-guide/openid' },
  
  // llm paths
  { pattern: /^\/llm\/llm-based-sql/, replacement: '/ai-features/text-to-sql' },
  { pattern: /^\/llm\//, replacement: '/ai-features/' },
  
  // aws/cloud-providers paths
  { pattern: /^\/aws\/aws-lambda/, replacement: '/ingest-data/aws-lambda' },
  { pattern: /^\/aws\/kinesis/, replacement: '/ingest-data/kinesis' },
  { pattern: /^\/aws\/overview/, replacement: '/ingest-data' },
  { pattern: /^\/aws\//, replacement: '/ingest-data/' },
  { pattern: /^\/cloud-providers\/aws\/aws-lambda/, replacement: '/ingest-data/aws-lambda' },
  { pattern: /^\/cloud-providers\/aws\/kinesis/, replacement: '/ingest-data/kinesis' },
  { pattern: /^\/cloud-providers\/azure\/apim/, replacement: '/ingest-data/azure-apim' },
  { pattern: /^\/cloud-providers\//, replacement: '/ingest-data/' },
  
  // visualization paths
  { pattern: /^\/visualization\/grafana/, replacement: '/integrations/visualization/grafana' },
  { pattern: /^\/visualization\//, replacement: '/integrations/visualization/' },
  { pattern: /^\/grafana-data-source/, replacement: '/integrations/visualization/grafana' },
  
  // rbac at root
  { pattern: /^\/rbac-role-based/, replacement: '/user-guide/rbac' },
  { pattern: /^\/rbac$/, replacement: '/user-guide/rbac' },
  
  // oidc at root
  { pattern: /^\/openid/, replacement: '/user-guide/openid' },
  
  // faq
  { pattern: /^\/faq/, replacement: '/get-started' },
  
  // environment variables / metrics
  { pattern: /^\/environment-variables/, replacement: '/self-hosted/configuration' },
  { pattern: /^\/prometheus-metrics/, replacement: '/self-hosted/metrics' },
  
  // redpanda at root
  { pattern: /^\/redpanda/, replacement: '/ingest-data/streaming/redpanda' },
];

function applyMappings(path: string): string {
  // Keep applying mappings until no more changes
  let current = path;
  let changed = true;
  let iterations = 0;
  const maxIterations = 5; // Prevent infinite loops
  
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    
    for (const { pattern, replacement } of URL_MAPPINGS) {
      if (pattern.test(current)) {
        const newPath = current.replace(pattern, replacement);
        if (newPath !== current) {
          current = newPath.replace(/\/+/g, '/').replace(/\/$/, '');
          changed = true;
          break; // Start over with new path
        }
      }
    }
  }
  
  return current;
}

function getSuggestedUrl(pathname: string): string | null {
  // Check if we're in development (no /docs prefix in routes)
  const isDev = typeof window !== 'undefined' && window.location.port !== '';

  // Normalize: remove /docs prefix if present for matching
  let normalizedPath = pathname;
  const hasDocsPrefix = pathname.startsWith('/docs/') || pathname === '/docs';

  if (hasDocsPrefix) {
    normalizedPath = pathname.replace(/^\/docs/, '') || '/';
  }

  // Apply all mappings
  const suggested = applyMappings(normalizedPath);

  // Only return a suggestion if mappings actually changed the path
  if (suggested !== normalizedPath) {
    if (isDev) {
      return suggested;
    }
    return hasDocsPrefix ? '/docs' + suggested : suggested;
  }

  // No mapping found - return null
  return null;
}

export default function NotFound() {
  const pathname = usePathname();
  const suggestedUrl = getSuggestedUrl(pathname);

  // Check if we're in development
  const isDev = typeof window !== 'undefined' && window.location.port !== '';
  const homeUrl = isDev ? '/get-started' : '/docs/get-started';

  // Only show suggested URL button if it's different from current path
  const showSuggested = suggestedUrl && suggestedUrl !== pathname && suggestedUrl !== homeUrl;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-fd-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {showSuggested && (
          <Link
            href={suggestedUrl}
            className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            Go to Suggested Page
          </Link>
        )}
        <Link
          href={homeUrl}
          className="px-6 py-3 border border-fd-border rounded-md hover:bg-fd-secondary transition-colors font-medium"
        >
          Go to Documentation Home
        </Link>
      </div>
    </div>
  );
}
