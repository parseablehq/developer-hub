import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import SearchButton from '@/components/SearchButton';
import { AskAITrigger } from '@/components/AskAI';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions}
      searchToggle={{
        components: {
          sm: <SearchButton />,
          lg: <SearchButton />,
        },
      }}
    >
      {children}
      <AskAITrigger />
    </DocsLayout>
  );
}
