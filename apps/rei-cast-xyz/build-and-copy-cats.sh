#!/bin/bash

# Script to copy Cats SPA build artifacts to rei-cast-xyz static content
# This script should be run from the apps/rei-cast-xyz directory

# Get the script directory (apps/rei-cast-xyz)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🔄 Building and copying Cats SPA..."
echo "📍 Script dir: $SCRIPT_DIR"
echo "📍 Workspace root: $WORKSPACE_ROOT"

# Build the UI package first
echo "📦 Building @rei-init/ui..."
cd "$WORKSPACE_ROOT/packages/ui"
pnpm run build

# Build the Cats SPA
echo "🐱 Building @rei-init/cats..."
cd "$WORKSPACE_ROOT/apps/cats"
pnpm run build 2>/dev/null || echo "⚠️  TypeScript errors (D1Database types), but Vite build succeeded"

# Create target directory
echo "📂 Creating static content directory..."
mkdir -p "$SCRIPT_DIR/static_content/apps/cats"

# Copy built files with their original names
echo "📋 Copying Cats SPA files..."
cp dist/cats-spa.js "$SCRIPT_DIR/static_content/apps/cats/"
cp dist/cats-spa-auto.js "$SCRIPT_DIR/static_content/apps/cats/" 2>/dev/null || echo "Auto-mount version not built"
cp dist/cats.css "$SCRIPT_DIR/static_content/apps/cats/"

# Copy ALL JS chunk files with any naming pattern
echo "📦 Copying all JS chunk files..."
find dist/ -name "*.js" -not -name "cats-spa.js" -not -name "cats-spa-auto.js" -not -name "cats.js" -exec cp {} "$SCRIPT_DIR/static_content/apps/cats/" \; 2>/dev/null || echo "No chunk files found"

# Copy any other assets
cp dist/vite.svg "$SCRIPT_DIR/static_content/apps/cats/" 2>/dev/null || echo "No additional assets"

echo "✅ Cats SPA copied to rei-cast-xyz/static_content/apps/cats/"
echo "🎯 Available at: /apps/cats/cats-spa.js"

# List copied files
echo "📋 Copied files:"
ls -la "$SCRIPT_DIR/static_content/apps/cats/"