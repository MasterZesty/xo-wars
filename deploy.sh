#!/bin/bash

# Exit on first error
set -e

# 1. Build Angular app with correct base-href
ng build --base-href "https://masterzesty.github.io/xo-wars/"

# 2. Deploy to GitHub Pages using angular-cli-ghpages
npx angular-cli-ghpages --dir=dist

echo "🚀 Deployment complete! Visit: https://masterzesty.github.io/xo-wars/"
