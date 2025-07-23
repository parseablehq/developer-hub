import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { IconMonkeybar, IconApi, IconMapShare, IconAi } from "@tabler/icons-react";

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
  links: [
    {
      text: "Parseable Playground",
      url: "https://demo.parseable.com/login?q=eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9",
      external: true,
      icon: <IconMonkeybar />, // Icon for the link
    },
    {
      text: "Release Notes",
      url: "/docs/release-notes",
      external: false, // Internal link
      icon: <IconMapShare />, // Icon for the link
    },
    {
      text: "API Documentation",
      url: "/docs/api",
      external: false, // Internal link
      icon: <IconApi />, // Icon for the link
    },
  ],
  // Footer will be added in the layout component
  // Theme will be configured in the RootProvider
};
