#!/bin/bash
set -e

echo ""
echo "🛠️  Buildando projeto..."
npm run build

echo ""
echo "🚀 Publicando no NPM..."
npm publish --access public

echo ""
echo "✅ Publicado com sucesso!"