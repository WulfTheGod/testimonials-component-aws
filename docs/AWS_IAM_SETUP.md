# AWS IAM Setup Guide

This guide helps you create an IAM user with the necessary permissions to deploy the testimonials demo to AWS.

## 📋 Prerequisites

- AWS Account (free tier is sufficient)
- Access to AWS Console with administrator privileges

## 🔧 Step 1: Create IAM User

1. **Log into AWS Console**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Navigate to **IAM** service

2. **Create New User**
   - Click **Users** in the left sidebar
   - Click **Create user**
   - User name: `testimonials-demo-deployer` (or your choice)
   - Select **"Provide user access to the AWS Management Console"** if you want console access (optional)
   - Click **Next**

3. **Set Permissions**
   - Choose **"Attach policies directly"**
   - **Required**: Search and select **`AmazonS3FullAccess`**
   - **Optional for HTTPS**: For CloudFront: **`CloudFrontFullAccess`**
   - **Optional for DNS**: For Route 53: **`AmazonRoute53FullAccess`**
   - Click **Next**

4. **Review and Create**
   - Review the settings
   - Click **Create user**

## 🔑 Step 2: Create Access Keys

1. **Access the User**
   - Click on the newly created user name
   - Go to **"Security credentials"** tab

2. **Create Access Key**
   - Scroll down to **"Access keys"** section
   - Click **"Create access key"**
   - Select **"Command Line Interface (CLI)"**
   - Check the confirmation checkbox
   - Click **Next**

3. **Add Description (Optional)**
   - Description: "Testimonials demo deployment"
   - Click **Create access key**

4. **Save Credentials**
   - **⚠️ Important**: Copy and save both:
     - **Access key ID**: `AKIA...`
     - **Secret access key**: `wJalrXUt...`
   - Click **Download .csv file** for backup
   - Click **Done**

## 🔐 Step 3: Configure Credentials

Choose one of these methods:

### Method A: Update .env.production file
```bash
# Edit your .env.production file
AWS_ACCESS_KEY_ID=AKIA...your-access-key
AWS_SECRET_ACCESS_KEY=wJalrXUt...your-secret-key
```

### Method B: AWS CLI (Alternative)
```bash
aws configure
# Enter your credentials when prompted
```

### Method C: Environment Variables (Temporary)
```bash
export AWS_ACCESS_KEY_ID=AKIA...your-access-key
export AWS_SECRET_ACCESS_KEY=wJalrXUt...your-secret-key
```

## 🔒 Production-Ready IAM Policy (Advanced)

For production use, replace the broad policies with this specific policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:GetBucketWebsite",
        "s3:PutBucketWebsite",
        "s3:PutBucketPolicy",
        "s3:GetBucketPolicy",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucketVersions"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateDistribution",
        "cloudfront:UpdateDistribution",
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistribution",
        "cloudfront:ListDistributions"
      ],
      "Resource": "*"
    }
  ]
}
```

## ✅ Step 4: Test Configuration

Test your setup:

```bash
# Test AWS credentials
aws sts get-caller-identity

# Should return something like:
# {
#   "UserId": "AIDACK....",
#   "Account": "123456789012",
#   "Arn": "arn:aws:iam::123456789012:user/testimonials-demo-deployer"
# }
```

## 🚨 Security Best Practices

1. **Never commit credentials to git**
   - `.env.production` is in `.gitignore`
   - Use GitHub Secrets for CI/CD

2. **Use specific permissions**
   - Replace full access policies with minimal required permissions
   - Scope S3 permissions to your specific bucket

3. **Rotate access keys regularly**
   - Create new keys every 90 days
   - Delete old unused keys

4. **For production applications**
   - Use IAM Roles instead of access keys when possible
   - Enable MFA for sensitive operations
   - Use AWS STS for temporary credentials

## 🆘 Troubleshooting

**"Access Denied" errors:**
- Check IAM policy has required permissions
- Verify correct region in your configuration
- Ensure bucket name doesn't already exist globally

**"Invalid security token":**
- Regenerate access keys
- Check for typos in credentials
- Verify user has programmatic access enabled

**"Bucket already exists":**
- S3 bucket names are globally unique
- Try a different bucket name in `.env.production`

## 📚 Next Steps

Once your IAM setup is complete:

1. Update your `.env.production` file with the credentials
2. Run `./scripts/setup-aws.sh` to create AWS infrastructure
3. Run `./scripts/deploy.sh` to deploy your application

For more deployment options, see [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md).