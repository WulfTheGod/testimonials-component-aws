# Testimonials Component for AWS

🚀 A production-ready React testimonials component with **AWS deployment examples**, serverless Lambda functions, and S3 static hosting. Perfect for showcasing customer reviews with beautiful animations and responsive design.

**🌐 <a href="http://testimonials-aws-demo.wulfthegod.com/" target="_blank" rel="noopener noreferrer">Live Demo</a>** - Deployed on AWS S3

[![Deploy to AWS](https://img.shields.io/badge/Deploy%20to-AWS-FF9900?style=for-the-badge&logo=amazon-aws)](./docs/AWS_DEPLOYMENT.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

## 🌟 Features

### Core Features
- ✨ **Beautiful Animations**: Smooth Framer Motion transitions and interactions
- 📱 **Fully Responsive**: Mobile-first design that looks great on all devices
- 🎨 **Modern Design**: Clean UI with gradient backgrounds and card-based layout
- ♿ **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- 🚀 **Performance Optimized**: Lightweight with automatic code splitting

### Technical Features
- 🔷 **TypeScript**: Full type safety and IntelliSense support
- ⚛️ **React 18**: Built with the latest React features
- 🎭 **Framer Motion**: Professional animations with reduced motion support
- 🎯 **Tailwind CSS**: Utility-first styling with custom configurations
- 🔄 **Auto-rotation**: Automatic testimonial cycling with pause on interaction

### AWS Integration
- ☁️ **S3 Static Hosting**: Simple deployment to AWS S3
- 🔄 **CloudFront CDN**: Optional global distribution (upgrade path)
- 🚀 **AWS Amplify**: Alternative managed hosting with CI/CD
- 🔧 **Lambda Ready**: Serverless function examples included

## 📋 Requirements

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **AWS Account** (for deployment only)
- **React** 18.x in your project

## 🚀 Quick Start

### Installation

Since this component is not yet published to npm, you can use it by:

1. **Clone the repository:**
```bash
git clone https://github.com/WulfTheGod/testimonials-component-aws.git
cd testimonials-component-aws
npm install
```

2. **Run the example:**
```bash
cd examples/next
npm install
npm run dev
```

3. **Visit:** http://localhost:4000

### Deploy to AWS

```bash
# 1. Setup your environment
cp .env.example .env.production
# Edit .env.production with your AWS values

# 2. Create AWS infrastructure
./scripts/setup-aws.sh

# 3. Deploy the application
./scripts/deploy.sh
```

**Deployment Options:**
- **[AWS Amplify](./docs/AWS_DEPLOYMENT.md)** - Managed hosting with CI/CD (Option 1)
- **[S3 Static Hosting](./docs/AWS_DEPLOYMENT.md)** - Simple HTTP hosting (Option 2)
- **[S3 + CloudFront](./docs/AWS_DEPLOYMENT.md)** - Add HTTPS and global CDN (optional)
- **[Lambda Function](./examples/aws-lambda)** - Serverless API endpoint

📚 **Documentation:**
- [AWS IAM Setup Guide](./docs/AWS_IAM_SETUP.md) - Create IAM user and credentials
- [AWS Deployment Guide](./docs/AWS_DEPLOYMENT.md) - Detailed deployment instructions


## 📖 Usage

### Integration in Your Project

#### Option 1: Copy Files (Current Method)
To use this component in your own project, copy the component files:

```bash
# Copy the component to your project
cp src/components/WorkingTestimonials.tsx your-project/components/
cp src/types/review.ts your-project/types/
```

Then import directly:
```tsx
import WorkingTestimonials from './components/WorkingTestimonials';

export default function App() {
  return (
    <div>
      <h1>My Website</h1>
      {/* Component with built-in mock data - works out of the box! */}
      <WorkingTestimonials />
    </div>
  );
}
```

#### Option 2: Package Import (Future)
When published to npm, you'll be able to use:
```tsx
import { Testimonials } from 'testimonials-component-aws';

export default function App() {
  return (
    <div>
      <h1>My Website</h1>
      <Testimonials />
    </div>
  );
}
```

### With Custom Reviews

```tsx
import WorkingTestimonials from './components/WorkingTestimonials';
import type { Review } from './types/review';

const customReviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "Exceptional service! Professional team that delivered exactly what we needed.",
    rating: 5,
    location: "Montreal, QC",
    project: "Kitchen Renovation",
    source: "google",
    createdAt: "2024-02-15T10:30:00Z",
    image: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff"
  }
];

export default function App() {
  return <WorkingTestimonials reviews={customReviews} />;
}
```

### Server-side (Next.js App Router)

```tsx
// If using copied files in your project:
import WorkingTestimonials from '@/components/WorkingTestimonials';
import { fetchGoogleReviews } from '@/server/fetchGoogleReviews';

// Or if importing from the source (like in our example):
// import WorkingTestimonials from '../../../src/components/WorkingTestimonials';

export default async function HomePage() {
  // Fetch reviews server-side
  const reviews = await fetchGoogleReviews();
  
  return <WorkingTestimonials reviews={reviews} />;
}
```

### Client-side with API

```tsx
'use client';
import { useState, useEffect } from 'react';
import WorkingTestimonials from '@/components/WorkingTestimonials';
import type { Review } from '@/types/review';

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(setReviews);
  }, []);

  return <WorkingTestimonials reviews={reviews} />;
}
```

## Google Business Profile API

**Important**: Google's Places API only returns a limited number of recent reviews (typically 5 most recent). For full review listing, you need Google Business Profile API with OAuth access.

This component currently accepts an access token via environment variable for simplicity:

```env
GOOGLE_LOCATION_ID=your_location_id
GOOGLE_ACCESS_TOKEN=your_oauth_access_token
```

### Getting Access

1. Request access at [Google Business Profile API](https://developers.google.com/my-business/content/prereqs)
2. Set up OAuth 2.0 in Google Cloud Console
3. Get your Business Profile Location ID from the API
4. Generate an access token (refresh token recommended for production)

### Development Fallback

If no `GOOGLE_ACCESS_TOKEN` is provided, the component automatically falls back to mock data for development - no blocking, no errors.

## Project Structure

```
src/
├── components/
│   └── WorkingTestimonials.tsx    # Main React component
├── server/
│   └── fetchGoogleReviews.ts      # Server-only fetcher
├── types/
│   └── review.ts                  # TypeScript types
├── mock/
│   └── reviews.json               # Mock data for development
└── index.ts                       # Main exports

examples/
├── next/                          # Next.js App Router example
└── aws-lambda/                    # Lambda handler
```

## TypeScript Types

```typescript
interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;        // 1-5
  createdAt: string;     // ISO date
  image: string;
  location: string;
  project?: string;
  source?: string;
  url?: string;
}
```

## Testing

Run the test suite:

```bash
npm test
```

Current test coverage includes Google Business Profile API response mapping and TypeScript type validation.

## Demo

For a live demo, check out the Next.js example at `/examples/next`:

```bash
cd examples/next
npm install
npm run dev
# Visit http://localhost:4000
```

The demo shows both real Google Business Profile data (if configured) and graceful fallback to mock data.

## AWS Hosting

The project includes AWS Lambda deployment examples for serverless hosting:

1. **Lambda Function**: Deploy the testimonials fetcher as a serverless function
2. **API Gateway**: Create REST endpoints for client-side consumption
3. **CloudFront**: Optional CDN for global performance
4. **ECS/Fargate**: For containerized deployments

See `/examples/aws-lambda/` for complete deployment instructions.

## 🔧 Troubleshooting

### Common Issues

**Build fails with Tailwind CSS errors:**
- Ensure all utility classes are in the safelist in `tailwind.config.js`
- Run `npm run build` to regenerate CSS

**Component not rendering properly:**
- Check that Framer Motion is installed: `npm install framer-motion`
- Verify Tailwind CSS is configured in your project
- Ensure you're using React 18 or higher

**AWS deployment issues:**
- Verify AWS credentials are set in `.env.production`
- Check S3 bucket permissions allow public read access
- Ensure bucket name matches your domain configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT - Use freely in your projects!

## 🙏 Support

If you find this component helpful, please give it a ⭐ on [GitHub](https://github.com/WulfTheGod/testimonials-component-aws)!

---

Built with ❤️ using React, TypeScript, and Tailwind CSS