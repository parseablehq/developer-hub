import Link from "fumadocs-core/link";
import type { ComponentProps } from "react";

export function MdxLink({
  href,
  external,
  prefetch,
  ...props
}: ComponentProps<typeof Link>) {
  if (typeof href === "string" && href.startsWith("#")) {
    return <a href={href} {...props} />;
  }

  return (
    <Link href={href} external={external} prefetch={prefetch} {...props} />
  );
}
