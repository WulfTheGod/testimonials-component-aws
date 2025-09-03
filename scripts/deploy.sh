#!/bin/bash

# Deploy script for AWS S3
# Builds and deploys the Next.js application to S3

set -e

# Load environment variables
if [ -f .env.production ]; then
  source .env.production
elif [ -f .env ]; then
  source .env
else
  echo "❌ Error: No .env or .env.production file found"
  echo "Please copy .env.example to .env.production and update with your values"
  exit 1
fi

# Validate required environment variables
if [ -z "$S3_BUCKET_NAME" ]; then
  echo "❌ Error: S3_BUCKET_NAME not set in environment"
  exit 1
fi

echo "🚀 Deploying to AWS S3"
echo "====================="
echo "Bucket: $S3_BUCKET_NAME"
echo ""

# Build the application
echo "📦 Building Next.js application..."
cd examples/next

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build for production
npm run build
cd ../..

# Deploy to S3
echo "☁️  Uploading to S3..."
aws s3 sync examples/next/out "s3://$S3_BUCKET_NAME" \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync examples/next/out "s3://$S3_BUCKET_NAME" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json" \
  --cache-control "public, max-age=3600"

# Invalidate CloudFront if configured
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site is available at:"
echo "   http://${S3_BUCKET_NAME}.s3-website-${AWS_REGION:-us-east-1}.amazonaws.com"

if [ ! -z "$DOMAIN_NAME" ]; then
  echo "   https://${DOMAIN_NAME} (if configured)"
fi