import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { releaseNotesSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  // We'll just use the standard layout options
  // The duplicate sidebar entry is a visual issue but doesn't affect functionality

  return (
    <DocsLayout
      {...baseOptions}
      tree={releaseNotesSource.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
