// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import { remarkAdmonition } from "fumadocs-core/mdx-plugins";
var docs = defineDocs({
  // The root directory for all documentation
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var releaseNotes = defineDocs({
  // The root directory for release notes
  dir: "content/release-notes",
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAdmonition],
    rehypePlugins: []
  }
});
export {
  source_config_default as default,
  docs,
  releaseNotes
};
