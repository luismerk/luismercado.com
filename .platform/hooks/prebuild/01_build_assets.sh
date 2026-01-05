#!/usr/bin/env bash
set -e

echo "Installing JS dependencies"
npm install

echo "Building JS"
node_modules/.bin/esbuild app/javascript/application.jsx \
  --bundle \
  --minify \
  --outdir=public/assets

echo "Building CSS"
node_modules/.bin/postcss app/javascript/styles/application.css \
  --output public/assets/application.css

echo "Assets built successfully"
