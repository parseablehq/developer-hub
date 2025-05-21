import { generateFiles } from 'fumadocs-openapi';

void generateFiles({
  // The OpenAPI schema
  input: './public/parseable-api-schema.yaml',
  // Output directory for generated MDX files
  output: './content/docs/', 
  // Include descriptions from the OpenAPI schema (recommended)
  includeDescription: true,
});

console.log('API documentation generation script finished.');
