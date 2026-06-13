import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import SearchButton from '@/components/SearchButton';
import { AskAITrigger } from '@/components/AskAI';
import { BookOpen, Terminal } from 'lucide-react';

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
      sidebar={{
        tabs: [
          {
            title: 'Parseable',
            description: 'Docs & Guides',
            url: '/docs',
            icon: <BookOpen className="size-4" />,
          },
          {
            title: 'pb CLI',
            description: 'Command-line interface',
            url: '/docs/pb-cli',
            icon: <Terminal className="size-4" />,
          },
        ],
      }}
    >
      {children}
      <AskAITrigger />
    </DocsLayout>
  );
}
