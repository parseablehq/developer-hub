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
        /document=\{"([^"]+)"\}/g,
        'document={"public/parseable-api-schema-cleaned.yaml"}'
      );
    },
  });

  console.log('API documentation generated successfully');
  
  // Run the fix-api-docs script to handle path parameters
  const { execSync } = await import('child_process');
  try {
    console.log('Fixing API documentation path parameters...');
    execSync('node scripts/fix-api-docs.mjs', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error fixing API documentation:', error);
    process.exit(1);
  }
}

generateDocs().catch(error => {
  console.error('Error generating documentation:', error);
  process.exit(1);
});
