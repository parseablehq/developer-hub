#!/bin/bash

# Step 1: Remove all .md files in the content/docs directory
echo "Removing .md files..."
find /Users/deba/Documents/developer-hub/content/docs -name "*.md" -type f -delete

# Step 2: Find and replace all references to .md with .mdx in all files
echo "Updating references from .md to .mdx in all files..."
find /Users/deba/Documents/developer-hub/content/docs -type f -name "*.mdx" -exec sed -i '' 's/\.md)/\.mdx)/g' {} \;
find /Users/deba/Documents/developer-hub/content/docs -type f -name "*.mdx" -exec sed -i '' 's/\.md#/\.mdx#/g' {} \;
find /Users/deba/Documents/developer-hub/content/docs -type f -name "*.mdx" -exec sed -i '' 's/\.md"/\.mdx"/g' {} \;

# Step 3: Update any references in other source files
echo "Updating references in source files..."
find /Users/deba/Documents/developer-hub/app -type f -name "*.tsx" -o -name "*.ts" -exec sed -i '' 's/\.md/\.mdx/g' {} \;
find /Users/deba/Documents/developer-hub/lib -type f -name "*.tsx" -o -name "*.ts" -exec sed -i '' 's/\.md/\.mdx/g' {} \;
find /Users/deba/Documents/developer-hub -maxdepth 1 -type f -name "*.ts" -o -name "*.tsx" -exec sed -i '' 's/\.md/\.mdx/g' {} \;

echo "Conversion and cleanup complete!"
