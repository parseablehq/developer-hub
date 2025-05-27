import { generateFiles } from 'fumadocs-openapi';
import fs from 'fs';
import path from 'path';

// First, clean up any existing API documentation files
const apiDocsDir = path.join(process.cwd(), 'content/docs/api');
if (fs.existsSync(apiDocsDir)) {
  console.log('Cleaning up existing API documentation files...');
  const files = fs.readdirSync(apiDocsDir);
  for (const file of files) {
    if (file.endsWith('.mdx')) {
      fs.unlinkSync(path.join(apiDocsDir, file));
    }
  }
}

// Generate new API documentation files from the cleaned schema
void generateFiles({
  // The cleaned OpenAPI schema
  input: './public/parseable-api-schema-cleaned.yaml',
  // Output directory for generated MDX files
  output: './content/docs/', 
  // Include descriptions from the OpenAPI schema (recommended)
  includeDescription: true,
});

console.log('API documentation generation script finished.');
