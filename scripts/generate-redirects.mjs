#!/usr/bin/env node

/**
 * Script to generate redirects from frontmatter `redirect_from` arrays
 * Reads all MDX files and extracts redirect_from metadata to create a redirects JSON file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '..', 'content', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', 'redirects.json');

/**
 * Recursively find all MDX files in a directory
 */
function findMdxFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMdxFiles(fullPath, files);
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Convert file path to URL path
 * e.g., content/docs/flavours/pro.mdx -> /flavours/pro
 */
function filePathToUrlPath(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  let urlPath = relativePath
    .replace(/\.mdx$/, '')
    .replace(/index$/, '')
    .replace(/\\/g, '/'); // Windows compatibility
  
  // Remove trailing slash but keep root as empty
  urlPath = urlPath.replace(/\/$/, '');
  
  return '/' + urlPath;
}

/**
 * Main function to generate redirects
 */
function generateRedirects() {
  const mdxFiles = findMdxFiles(DOCS_DIR);
  const redirects = [];
  
  for (const filePath of mdxFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(content);
      
      if (frontmatter.redirect_from && Array.isArray(frontmatter.redirect_from)) {
        const destination = filePathToUrlPath(filePath);
        
        for (const source of frontmatter.redirect_from) {
          // Normalize source path
          const normalizedSource = source.startsWith('/') ? source : '/' + source;
          
          // Skip if source equals destination
          if (normalizedSource === destination) {
            console.warn(`Skipping self-redirect: ${normalizedSource}`);
            continue;
          }
          
          redirects.push({
            source: normalizedSource,
            destination,
            permanent: true,
          });
          
          console.log(`Redirect: ${normalizedSource} -> ${destination}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
  
  // Write redirects to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(redirects, null, 2));
  console.log(`\nGenerated ${redirects.length} redirects to ${OUTPUT_FILE}`);
  
  return redirects;
}

generateRedirects();
