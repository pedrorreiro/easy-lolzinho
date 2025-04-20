#!/bin/bash

set -e

echo "📦 Criando nova versão de desenvolvimento..."

npm version prerelease --preid=dev --no-git-tag-version

echo "🛠️ Buildando projeto..."
npm run build

echo "🚀 Publicando no NPM..."
npm publish --access public

echo "✅ Publicado com sucesso!"