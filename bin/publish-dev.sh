#!/bin/bash

# Interrompe a execução se algum comando falhar
set -e

echo ""
echo "📦 Criando nova versão de desenvolvimento..."
echo "-------------------------------------------"
npm version prerelease --preid=dev --no-git-tag-version

echo ""
echo "🛠️  Buildando projeto..."
echo "------------------------"
npm run build

echo ""
echo "🚀 Publicando no NPM..."
echo "------------------------"
npm publish --access public

echo ""
echo "✅ Publicado com sucesso!"
echo "--------------------------"