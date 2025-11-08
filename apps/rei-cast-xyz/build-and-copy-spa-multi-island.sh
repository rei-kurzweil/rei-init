#!/bin/bash

# Script to copy spa-multi-island build artifacts to rei-cast-xyz static content
# This script should be run from the apps/rei-cast-xyz directory

# Get the script directory (apps/rei-cast-xyz)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🔄 Building and copying spa-multi-island lib..."
echo "📍 Script dir: $SCRIPT_DIR"
echo "📍 Workspace root: $WORKSPACE_ROOT"

# Build the spa-multi-island package
echo "🧩 Building @rei-init/spa-multi-island..."
cd "$WORKSPACE_ROOT/packages/spa-multi-island"
pnpm run build

# Ensure the micro-bus dependency is available as a browser module
echo "🚌 Building @rei-init/micro-bus..."
cd "$WORKSPACE_ROOT/packages/micro-bus"
pnpm run build
cp dist/index.mjs "$SCRIPT_DIR/static_content/apps/micro-bus.js"

# Create target directory for shared JS libs
echo "📂 Creating static content js directory..."
mkdir -p "$SCRIPT_DIR/static_content/js"

# Copy built file as spa-multi-island.js (ESM browser module)
echo "📋 Copying spa-multi-island bundle..."
cd "$WORKSPACE_ROOT/packages/spa-multi-island"
cp dist/index.js "$SCRIPT_DIR/static_content/js/spa-multi-island.js"

echo "✅ spa-multi-island copied to rei-cast-xyz/static_content/js/spa-multi-island.js"
echo "🎯 Available at: /js/spa-multi-island.js"

# List copied files
echo "📋 Copied files:"
ls -la "$SCRIPT_DIR/static_content/js/"
