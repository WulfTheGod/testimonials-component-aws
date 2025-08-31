# AWS Lambda Deployment

## Option 1: ZIP Upload

```bash
cd examples/aws-lambda
npm install
npm run package
# Upload function.zip to AWS Lambda
```

## Option 2: Container Image

```bash
cd examples/aws-lambda
docker build -t testimonials-lambda .
docker tag testimonials-lambda:latest YOUR_ECR_URI:latest
docker push YOUR_ECR_URI:latest
```

## Environment Variables

Set these in your Lambda configuration:
- `GOOGLE_LOCATION_ID`
- `GOOGLE_ACCESS_TOKEN`

## API Gateway Integration

Create an API Gateway REST API that triggers this Lambda function on `GET /testimonials`.