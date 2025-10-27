#!/bin/bash

# Local Development Quick Start Script
# This script helps you quickly set up and run the Contentful CMS Tester locally

set -e

echo "🚀 Contentful CMS Tester - Local Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Ask if user wants to start the dev server
read -p "Start development server? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎉 Starting development server..."
    echo "Press Ctrl+C to stop"
    echo ""
    npm run dev
else
    echo ""
    echo "To start the development server later, run:"
    echo "  npm run dev"
    echo ""
    echo "Other useful commands:"
    echo "  npm run build    - Build for production"
    echo "  npm run preview  - Preview production build"
    echo ""
fi
