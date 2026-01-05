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
      sidebar={{
        tabs: {
          transform(option, node) {
            if (!node.icon) return option;
            const color = `var(--${node.name?.toString().toLowerCase().replace(/[- ]/g, '-')}-color, var(--color-fd-foreground))`;

            return {
              ...option,
              icon: (
                <div
                  className="[&_svg]:size-full rounded-lg size-full max-md:bg-[var(--tab-color)]/10 max-md:border max-md:p-1.5"
                  style={{
                    '--tab-color': color,
                    color: color,
                  } as React.CSSProperties}
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
      <AskAITrigger />
    </DocsLayout>
  );
}
