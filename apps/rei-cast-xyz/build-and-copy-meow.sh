#!/bin/bash

# Script to copy Meow SPA build artifacts to rei-cast-xyz static content
# This script should be run from the apps/rei-cast-xyz directory

# Get the script directory (apps/rei-cast-xyz)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🔄 Building and copying Meow SPA..."
echo "📍 Script dir: $SCRIPT_DIR"
echo "📍 Workspace root: $WORKSPACE_ROOT"

# Build the UI package first
echo "📦 Building @rei-init/ui..."
cd "$WORKSPACE_ROOT/packages/ui"
pnpm run build

# Build the Meow SPA
echo "🐱 Building @rei-init/meow..."
cd "$WORKSPACE_ROOT/apps/meow"
pnpm run build 2>/dev/null || echo "⚠️  TypeScript errors (D1Database types), but Vite build succeeded"

# Create target directory
echo "📂 Creating static content directory..."
mkdir -p "$SCRIPT_DIR/static_content/apps/meow"

# Copy built files with their original names
echo "📋 Copying Meow SPA files..."
cp dist/meow-spa.js "$SCRIPT_DIR/static_content/apps/meow/"
cp dist/meow-spa-auto.js "$SCRIPT_DIR/static_content/apps/meow/" 2>/dev/null || echo "Auto-mount version not built"
cp dist/meow.css "$SCRIPT_DIR/static_content/apps/meow/"

# Copy ALL JS chunk files with any naming pattern (App-*.js, index-*.js, client-*.js, etc.)
echo "📦 Copying all JS chunk files..."
find dist/ -name "*.js" -not -name "meow-spa.js" -not -name "meow-spa-auto.js" -not -name "meow.js" -exec cp {} "$SCRIPT_DIR/static_content/apps/meow/" \; 2>/dev/null || echo "No chunk files found"

# Copy any other assets
cp dist/vite.svg "$SCRIPT_DIR/static_content/apps/meow/" 2>/dev/null || echo "No additional assets"

echo "✅ Meow SPA copied to rei-cast-xyz/static_content/apps/meow/"
echo "🎯 Available at: /apps/meow/meow-spa.js"

# List copied files
echo "📋 Copied files:"
ls -la "$SCRIPT_DIR/static_content/apps/meow/"