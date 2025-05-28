import * as OpenAPI from 'fumadocs-openapi';
import { rimraf } from 'rimraf';

const INPUT = './public/parseable-api-schema-cleaned.yaml';
const OUTPUT = './content/docs/';

async function generateDocs() {
  // Clean only the API directory, preserving the index file
  const apiDir = './content/docs/api';
  await rimraf(`${apiDir}/*`, { 
    glob: { 
      ignore: ['**/index.mdx'],
      absolute: false
    } 
  });

  // Generate API docs
  await OpenAPI.generateFiles({
    input: INPUT,
    output: OUTPUT,
    per: 'operation',
    includeDescription: true,
    // Add baseUrl to ensure correct path resolution
    baseUrl: '/',
    // Customize the document path in the generated MDX
    transform: (content) => {
      return content.replace(
        /document={"([^"]+)"}/g,
        'document={"public/parseable-api-schema-cleaned.yaml"}'
      );
    },
  });

  console.log('API documentation generated successfully');
}

generateDocs().catch(error => {
  console.error('Error generating documentation:', error);
  process.exit(1);
});
