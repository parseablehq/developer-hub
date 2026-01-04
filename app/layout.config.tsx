import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <span className="font-bold text-xl">Parseable Docs</span>,
  },
  links: [],
  // Footer will be added in the layout component
  // Theme will be configured in the RootProvider
};
