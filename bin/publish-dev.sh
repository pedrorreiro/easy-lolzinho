#!/bin/bash
set -e

echo ""
echo "🛠️  Building project..."
npm run build

echo ""
echo "📦 Creating development version..."
npm version prerelease --preid=dev --no-git-tag-version

echo ""
echo "🚀 Publishing to NPM..."
npm publish --access public

echo ""
echo "✅ Successfully published!"