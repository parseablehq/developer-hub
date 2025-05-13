#!/bin/bash

# Find all .md files in the content/docs directory
find /Users/deba/Documents/developer-hub/content/docs -name "*.md" | while read -r file; do
  # Get the directory and filename without extension
  dir=$(dirname "$file")
  filename=$(basename "$file" .md)
  
  # Create the new .mdx filename
  new_file="$dir/$filename.mdx"
  
  # Copy the content from .md to .mdx
  cp "$file" "$new_file"
  
  echo "Converted: $file -> $new_file"
done

echo "Conversion complete!"
