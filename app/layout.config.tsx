import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

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
      <div className="flex items-center gap-2">
        <Image
          src="/docs/images/parseable-icon.svg"
          alt="Parseable"
          width={180}
          height={24}
          className="dark:invert"
          unoptimized
        />
      </div>
    ),
  },
  links: [],
  // Footer will be added in the layout component
  // Theme will be configured in the RootProvider
};
