#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'docs');

const brokenLinks = [];
const checkedFiles = [];

// Get all MDX files recursively
function getMdxFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extract all internal links from content
function extractLinks(content, filePath) {
  const links = [];
  
  // Match href="/..." patterns (JSX/MDX)
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push({ url: match[1], type: 'href' });
  }
  
  // Match [text](url) markdown links
  const mdLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    links.push({ url: match[2], type: 'markdown' });
  }
  
  return links;
}

// Check if a docs path exists
function doesDocPathExist(urlPath) {
  // Remove /docs prefix if present
  let docPath = urlPath;
  if (docPath.startsWith('/docs/')) {
    docPath = docPath.slice(6);
  } else if (docPath.startsWith('/docs')) {
    docPath = docPath.slice(5);
  }
  
  // Handle root docs path
  if (docPath === '' || docPath === '/') {
    return fs.existsSync(path.join(contentDir, 'index.mdx')) || 
           fs.existsSync(path.join(contentDir, 'index.md'));
  }
  
  // Remove leading slash
  if (docPath.startsWith('/')) {
    docPath = docPath.slice(1);
  }
  
  // Remove anchor
  if (docPath.includes('#')) {
    docPath = docPath.split('#')[0];
  }
  
  // Remove trailing slash
  if (docPath.endsWith('/')) {
    docPath = docPath.slice(0, -1);
  }
  
  if (!docPath) return true;
  
  const possiblePaths = [
    path.join(contentDir, docPath + '.mdx'),
    path.join(contentDir, docPath + '.md'),
    path.join(contentDir, docPath, 'index.mdx'),
    path.join(contentDir, docPath, 'index.md'),
  ];
  
  return possiblePaths.some(p => fs.existsSync(p));
}

// Check links in a file
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const links = extractLinks(content, filePath);
  const relativePath = path.relative(rootDir, filePath);
  
  checkedFiles.push(relativePath);
  
  for (const link of links) {
    const url = link.url;
    
    // Skip external links, anchors only, and special protocols
    if (url.startsWith('http://') || 
        url.startsWith('https://') || 
        url.startsWith('#') ||
        url.startsWith('mailto:') ||
        url.startsWith('tel:')) {
      continue;
    }
    
    // Check internal /docs links
    if (url.startsWith('/docs')) {
      if (!doesDocPathExist(url)) {
        brokenLinks.push({
          file: relativePath,
          url: url,
          type: link.type
        });
      }
    }
    // Check relative links without /docs prefix that should have it
    else if (url.startsWith('/') && !url.startsWith('/api') && !url.startsWith('/_')) {
      // These might be missing /docs prefix
      const withDocsPrefix = '/docs' + url;
      if (doesDocPathExist(withDocsPrefix) && !doesDocPathExist(url)) {
        brokenLinks.push({
          file: relativePath,
          url: url,
          type: link.type,
          suggestion: withDocsPrefix
        });
      }
    }
  }
}

// Main
console.log('🔍 Checking links in documentation...\n');

const mdxFiles = getMdxFiles(contentDir);

for (const file of mdxFiles) {
  checkFile(file);
}

console.log(`📄 Checked ${checkedFiles.length} files\n`);

if (brokenLinks.length === 0) {
  console.log('✅ No broken links found!');
} else {
  console.log(`❌ Found ${brokenLinks.length} broken/suspicious link(s):\n`);
  
  for (const link of brokenLinks) {
    console.log(`  File: ${link.file}`);
    console.log(`  Link: ${link.url}`);
    if (link.suggestion) {
      console.log(`  Suggestion: ${link.suggestion}`);
    }
    console.log('');
  }
  
  process.exit(1);
}
