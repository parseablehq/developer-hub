import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { source, releaseNotesSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  // We'll use the original tree from the docs source
  // This will maintain the correct type structure

  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
