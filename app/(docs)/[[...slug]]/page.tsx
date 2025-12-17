import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { EditOnGitHub } from './page.client';
import { CopyPageDropdown } from '@/components/CopyPageDropdown';

const owner = 'parseablehq';
const repo = 'developer-hub';

import { HomepageContent } from './homepage.client';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  
  // If we're at the root /docs path, show the homepage content
  if (!params.slug || params.slug.length === 0) {
    return <HomepageContent />;
  }
  
  // Otherwise, show the regular docs page
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const path = `content/docs/${page.file.path}`;

  const MDXContent = page.data.body;

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full}
      tableOfContent={{
        header: <CopyPageDropdown slug={params.slug} filePath={page.file.path} />,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center mb-4">
        <EditOnGitHub
          url={`https://github.com/${owner}/${repo}/tree/main/${path}`}
        />
      </div>
      <hr/>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
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
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
