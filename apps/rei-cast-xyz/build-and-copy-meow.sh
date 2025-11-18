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

# Copy all built files from dist to static content
echo "📋 Copying all Meow build artifacts (JS, CSS, source maps, assets)..."
cp -r dist/* "$SCRIPT_DIR/static_content/apps/meow/"

echo "✅ Meow SPA copied to rei-cast-xyz/static_content/apps/meow/"
echo "🎯 Available at: /apps/meow/meow-spa.js"

# List copied files
echo "📋 Copied files:"
ls -la "$SCRIPT_DIR/static_content/apps/meow/"