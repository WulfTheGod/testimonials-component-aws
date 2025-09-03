# AWS Deployment Guide

## 🔧 Initial Setup

1. **Copy the environment template**:
   ```bash
   cp .env.example .env.production
   ```

2. **Set up AWS credentials**: Follow [AWS_IAM_SETUP.md](./AWS_IAM_SETUP.md) to create an IAM user

3. **Edit `.env.production`** with your AWS values:
   ```bash
   # Edit with your preferred editor
   nano .env.production
   ```

4. **Set your values**:
   - `S3_BUCKET_NAME`: Your unique S3 bucket name
   - `AWS_REGION`: Your preferred AWS region (default: us-east-1)
   - `DOMAIN_NAME`: Your custom domain (optional)
   - `AWS_ACCESS_KEY_ID`: From IAM setup
   - `AWS_SECRET_ACCESS_KEY`: From IAM setup

## 🚀 Quick Start

### Option 1: AWS Amplify (Recommended - Easiest)

1. **Connect to AWS Amplify Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Choose GitHub and authorize
   - Select your forked repository
   - Branch: `main`

2. **Configure build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
           - cd examples/next
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: examples/next/out
       files:
         - '**/*'
   ```

3. **Deploy**: Click "Save and deploy"

4. **Custom domain** (optional): 
   - Go to Domain management
   - Add your domain

### Option 2: S3 Static Hosting (HTTP)

**Note**: This option provides HTTP hosting. CloudFront is optional and only needed for HTTPS/SSL.

1. **Create S3 bucket**:
   ```bash
   aws s3api create-bucket \
     --bucket your-bucket-name \
     --region us-east-1
   ```

2. **Enable static hosting**:
   ```bash
   aws s3 website s3://your-bucket-name/ \
     --index-document index.html \
     --error-document 404.html
   ```

3. **Set bucket policy** (create `bucket-policy.json`):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

4. **Apply policy**:
   ```bash
   aws s3api put-bucket-policy \
     --bucket your-bucket-name \
     --policy file://bucket-policy.json
   ```

5. **Build and deploy**:
   ```bash
   # Build the project
   npm install
   cd examples/next
   npm install
   npm run build
   
   # Deploy to S3
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

### Option 3: Using Scripts (Recommended)

After setting up your `.env.production`:

```bash
# Create AWS infrastructure
./scripts/setup-aws.sh

# Deploy the application
./scripts/deploy.sh
```

### Option 4: GitHub Actions CI/CD

1. **Fork this repository**

2. **Add GitHub Secrets**:
   - Go to Settings → Secrets → Actions
   - Add these secrets:
     - `AWS_ACCESS_KEY_ID`: Your AWS access key
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
     - `S3_BUCKET_NAME`: Your S3 bucket name
     - `CLOUDFRONT_DISTRIBUTION_ID`: (Optional) Your CloudFront ID

3. **Push to main branch** to trigger deployment

## 🔧 AWS Services Demonstrated

- **S3**: Static website hosting (HTTP)
- **CloudFront**: CDN for global distribution and HTTPS (optional)
- **Lambda**: Serverless function example (see `examples/aws-lambda/`)
- **API Gateway**: RESTful API pattern
- **Route 53**: DNS management (optional)
- **ACM**: SSL certificates (optional, requires CloudFront)

## 📊 Architecture Benefits

- **Serverless**: No infrastructure to manage
- **Scalable**: Handles traffic spikes automatically
- **Cost-effective**: Pay only for what you use
- **Global**: CloudFront edge locations worldwide (optional)
- **Secure**: HTTPS with CloudFront + ACM (optional, S3 provides HTTP)
- **Fast**: Static content served from S3 (or edge locations with CloudFront)

## 💡 Interview Talking Points

1. **Component Architecture**: Modular, reusable React components
2. **TypeScript**: Type safety and better developer experience
3. **AWS Integration**: Multiple deployment options showcasing AWS services
4. **Performance**: Optimized builds, lazy loading, caching strategies
5. **CI/CD**: Automated deployments with GitHub Actions
6. **Best Practices**: Clean code, proper error handling, responsive design

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run the Next.js example locally
cd examples/next
npm install
npm run dev
```

Visit http://localhost:4000 to see the demo.

## 📁 Project Structure

```
testimonials-component-aws/
├── src/                    # React component source
├── examples/
│   ├── next/              # Next.js demo application
│   └── aws-lambda/        # Lambda function example
├── scripts/               # Deployment scripts
├── docs/                  # Documentation
└── .github/workflows/     # CI/CD pipelines
```

## 🔗 Resources

- [AWS S3 Static Hosting Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Distribution Setup](https://docs.aws.amazon.com/cloudfront/latest/developerguide/distribution-create.html)
- [AWS Amplify Hosting](https://aws.amazon.com/amplify/hosting/)
- [GitHub Actions with AWS](https://github.com/aws-actions/configure-aws-credentials)