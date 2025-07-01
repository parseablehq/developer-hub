import fs from 'fs/promises';
import { glob } from 'glob';

/**
 * Fix the generated API documentation files to handle path parameters correctly
 * The issue is that React interprets {stream_name} as a variable reference
 * We need to modify the MDX files to avoid this issue while keeping the OpenAPI schema references intact
 */
async function fixApiDocs() {
  try {
    // Find all MDX files in the API directory
    const files = await glob('./content/docs/api/**/*.mdx');
    
    console.log(`Found ${files.length} API documentation files to process`);
    
    for (const file of files) {
      // Read the file content
      let content = await fs.readFile(file, 'utf8');
      
      // Step 1: Fix the text content by replacing {stream_name} with `stream_name`
      // But only in the markdown text, not in the component props
      const textRegex = /\*\*http:\/\/INGESTION_ENDPOINT\/api\/v1\/logstream\/\{stream_name\}\*\*/g;
      content = content.replace(textRegex, '**http://INGESTION_ENDPOINT/api/v1/logstream/`stream_name`**');
      
      // Step 2: Add a JSX expression to render the path parameter in the APIPage component
      // This is the key fix - we'll add a JSX expression at the top of the file that defines the stream_name variable
      if (content.includes('/api/v1/logstream/{stream_name}')) {
        // Add the JSX expression after the frontmatter
        const jsxExpression = '\n{/* Define variables for path parameters */}\nexport const stream_name = "stream_name";\n';
        content = content.replace('---\n\n{/* This file', `---${jsxExpression}\n{/* This file`);
      }
      
      // Write the updated content back to the file
      await fs.writeFile(file, content, 'utf8');
      console.log(`Fixed: ${file}`);
    }
    
    console.log('API documentation files fixed successfully');
  } catch (error) {
    console.error('Error fixing API documentation:', error);
    process.exit(1);
  }
}

fixApiDocs();
