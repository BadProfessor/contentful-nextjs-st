#!/bin/bash

# Production Build and Deployment Script
# This script builds the app and can deploy to various platforms

set -e

echo "🏗️  Building Contentful CMS Tester for Production"
echo "=================================================="
echo ""

# Clean previous build
if [ -d "dist" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf dist
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
fi

# Build the application
echo "🔨 Building application..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo "📂 Build output is in the 'dist' folder"
echo ""

# Show build size
if command -v du &> /dev/null; then
    BUILD_SIZE=$(du -sh dist | cut -f1)
    echo "📊 Build size: $BUILD_SIZE"
    echo ""
fi

# Deployment options
echo "Deployment Options:"
echo "==================="
echo ""
echo "1. Vercel (Recommended)"
echo "   Run: vercel --prod"
echo "   Or: vercel deploy --prod"
echo ""
echo "2. Netlify"
echo "   Run: netlify deploy --prod --dir=dist"
echo ""
echo "3. Docker"
echo "   Run: docker build -t contentful-cms-tester ."
echo "   Then: docker run -p 8080:80 contentful-cms-tester"
echo ""
echo "4. Manual Upload"
echo "   Upload the contents of the 'dist' folder to your hosting provider"
echo ""

# Ask if user wants to preview
read -p "Preview the production build locally? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🌐 Starting preview server..."
    echo "Press Ctrl+C to stop"
    npm run preview
else
    echo ""
    echo "To preview the build later, run:"
    echo "  npm run preview"
fi
