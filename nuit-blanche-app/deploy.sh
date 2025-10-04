#!/bin/bash

echo "🎨 Nuit Blanche Navigator - Quick Deploy Script"
echo "================================================"
echo ""
echo "This will deploy your app to Vercel in seconds!"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "🚀 Deploying to Vercel..."
echo ""

# Deploy
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Open the URL on your phone and tap 'Add to Home Screen'"
echo "🎯 Ready for Nuit Blanche tonight!"
