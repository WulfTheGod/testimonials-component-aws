#!/bin/bash

# AWS S3 + CloudFront Setup Script
# This script creates the AWS infrastructure for hosting the testimonials demo

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
if [ -z "$S3_BUCKET_NAME" ] || [ -z "$AWS_REGION" ]; then
  echo "❌ Error: Missing required environment variables"
  echo "Please ensure S3_BUCKET_NAME and AWS_REGION are set in your .env file"
  exit 1
fi

echo "🚀 Setting up AWS infrastructure"
echo "================================"
echo "Bucket: $S3_BUCKET_NAME"
echo "Region: $AWS_REGION"
echo ""

# Create S3 bucket
echo "📦 Creating S3 bucket..."
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
aws s3api create-bucket \
  --bucket "$S3_BUCKET_NAME" \
  --region "$AWS_REGION" \
  $(if [ "$AWS_REGION" != "us-east-1" ]; then echo "--create-bucket-configuration LocationConstraint=$AWS_REGION"; fi) \
  2>/dev/null || echo "Bucket already exists or you don't have permission"

# Enable static website hosting
echo "🌐 Configuring static website hosting..."
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
aws s3api put-bucket-website \
  --bucket "$S3_BUCKET_NAME" \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "404.html"}
  }'

# Create bucket policy for public access
echo "📝 Setting public access policy..."
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${S3_BUCKET_NAME}/*"
    }
  ]
}
EOF

# Disable block public access (required for public website)
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
aws s3api put-public-access-block \
  --bucket "$S3_BUCKET_NAME" \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Apply bucket policy
AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
aws s3api put-bucket-policy \
  --bucket "$S3_BUCKET_NAME" \
  --policy file:///tmp/bucket-policy.json

# Clean up
rm -f /tmp/bucket-policy.json

echo ""
echo "✅ S3 bucket configured successfully!"
echo ""
echo "🌐 Your S3 website URL:"
echo "   http://${S3_BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com"
echo ""
echo "📋 Next Steps:"
echo "1. Run './scripts/deploy.sh' to deploy the application"
echo "2. (Optional) Create CloudFront distribution:"
echo "   aws cloudfront create-distribution --distribution-config file://cloudfront-config.json"
echo "3. (Optional) Configure Route 53 for custom domain"
echo ""
echo "💡 For now, you can test with just S3 hosting, then add CloudFront later for HTTPS"