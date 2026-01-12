import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

// Extend frontmatter schema to include 'full' property for full-width pages
const extendedFrontmatterSchema = frontmatterSchema.extend({
  full: z.boolean().default(false),
});

// Define the documentation collection
export const docs = defineDocs({
  // The root directory for all documentation
  dir: 'content/docs',
  docs: {
    schema: extendedFrontmatterSchema,
    postprocess: {
      // Only include processed markdown in production (for LLM endpoints)
      includeProcessedMarkdown: process.env.NODE_ENV === 'production',
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Define the release notes collection
export const releaseNotes = defineDocs({
  // The root directory for release notes
  dir: 'content/release-notes',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

// Configure MDX options
export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAdmonition],
    rehypePlugins: [],
  },
});
