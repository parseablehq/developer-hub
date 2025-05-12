import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Link from 'next/link';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <span className="flex items-center gap-2">
          <span className="font-bold text-xl">Parseable</span>
        </span>
      </>
    ),
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/parseablehq/parseable',
      external: true,
    },
  ],
  // Footer will be added in the layout component
  // Theme will be configured in the RootProvider
};
