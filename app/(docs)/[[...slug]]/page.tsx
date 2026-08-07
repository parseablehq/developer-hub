import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound, redirect } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { CopyPageDropdown } from "@/components/CopyPageDropdown";
import { Feedback } from "@/components/feedback/client";
import { onPageFeedbackAction } from "@/components/feedback/actions";
import { MdxLink } from "@/components/MdxLink";
import { getPageDescription } from "@/lib/page-metadata";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Fumadocs represents the index page with an empty slug array. Optional
  // catch-all routes provide `undefined` for the root request, so normalize it
  // before looking up the page.
  const page = source.getPage(params.slug ?? []);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const description = getPageDescription(
    page.data.title,
    page.data.description,
  );

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      tableOfContentPopover={{
        style: "clerk",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center mb-4">
        <CopyPageDropdown
          slug={params.slug ?? []}
          filePath={`${params.slug?.join("/") || "index"}.mdx`}
        />
      </div>
      <hr />
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page, MdxLink),
          })}
        />
      </DocsBody>
      <Feedback onSendAction={onPageFeedbackAction} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Handle root /docs path - will redirect, but provide metadata just in case
  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Parseable Documentation",
      description:
        "Explore Parseable documentation for installation, telemetry ingestion, querying, integrations, and operating an observability data lake.",
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const description = getPageDescription(
    page.data.title,
    page.data.description,
  );

  return {
    title: page.data.title,
    description,
    openGraph: {
      title: page.data.title,
      description,
    },
    twitter: {
      title: page.data.title,
      description,
    },
  };
}
