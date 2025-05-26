import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { releaseNotesSource } from '@/lib/source';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { getMDXComponents } from '@/mdx-components';

export const metadata: Metadata = {
  title: 'Release Notes | Parseable',
  description: 'Latest updates and improvements to Parseable',
};

export default async function ReleaseNotesPage() {
  // Get the release notes page content
  const page = releaseNotesSource.getPage([]);
  
  if (!page) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Release Notes</h1>
          <p>Release notes content not found.</p>
        </div>
      </div>
    );
  }
  
  const MDXContent = page.data.body;

  // Extract the first section for the overview
  const content = fs.readFileSync(
    path.join(process.cwd(), 'content/release-notes/index.md'),
    'utf8'
  );
  
  // Extract the latest release information for the overview
  const latestReleaseMatch = content.match(/## (Version [0-9.]+) \(([^)]+)\)/);
  const latestVersion = latestReleaseMatch ? latestReleaseMatch[1] : 'Latest Version';
  const latestDate = latestReleaseMatch ? latestReleaseMatch[2] : '';
  
  // Extract the description of the latest release
  const latestReleaseContent = content.split(/## Version [0-9.]+/)[1] || '';
  
  // We'll just use the version and date for the overview

  return (
    <DocsPage>
      <DocsTitle>Release Notes</DocsTitle>
      <DocsDescription>
        Stay up-to-date with the latest features, improvements, and bug fixes in Parseable.
      </DocsDescription>
      
      {/* Latest Release Overview */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{latestVersion}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{latestDate}</p>
        <a 
          href="#latest-release" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View release details
        </a>
      </div>
      
      {/* Full Release Notes */}
      <DocsBody>
        <div id="latest-release"></div>
        <MDXContent components={getMDXComponents({})} />
      </DocsBody>
    </DocsPage>
  );
}