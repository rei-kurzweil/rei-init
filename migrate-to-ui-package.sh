#!/bin/bash

# Migration script to update imports from local components to @rei-init/ui

echo "🔄 Migrating rei-cast-xyz to use @rei-init/ui package..."

# Find all TypeScript/TSX files in the rei-cast-xyz src directory
find /home/rei/_境内/rei-init/apps/rei-cast-xyz/src -name "*.ts" -o -name "*.tsx" | while read file; do
    echo "Processing: $file"
    
    # Replace local component imports with UI package imports
    sed -i "s|import.*from.*'\.\./\.\./react/components/\([^']*\)'|import { \1 } from '@rei-init/ui'|g" "$file"
    sed -i "s|import.*from.*'\.\.\/react/components/\([^']*\)'|import { \1 } from '@rei-init/ui'|g" "$file"
    sed -i "s|import.*from.*'react/components/\([^']*\)'|import { \1 } from '@rei-init/ui'|g" "$file"
done

echo "✅ Migration complete! Don't forget to:"
echo "   1. Install dependencies: pnpm install"
echo "   2. Build the UI package: cd packages/ui && npm run build"
echo "   3. Test your application"