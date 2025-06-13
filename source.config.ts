import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

// Define the documentation collection
export const docs = defineDocs({
  // The root directory for all documentation
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
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

// Define a custom schema for blog posts that includes the date field
const blogFrontmatterSchema = frontmatterSchema.extend({
  date: z.string().optional(),
  author: z.string().optional(),
});

// Define the blog collection
export const blog = defineDocs({
  // The root directory for blog posts
  dir: 'content/blog',
  docs: {
    schema: blogFrontmatterSchema,
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
