import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

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
          <span className="font-bold text-xl">Parseable Docs</span>
        </span>
      </>
    ),
  },
  links: [
    {
      text: 'Parseable Playground',
      url: 'https://demo.parseable.com/login?q=eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9',
      external: true,
    },
    {
      text: 'API Documentation',
      url: '/docs/api',
      external: false, // Internal link
    },
    {
      text: 'Release Notes',
      url: '/release-notes',
      external: false, // Internal link
    },
  ],
  // Footer will be added in the layout component
  // Theme will be configured in the RootProvider
};
