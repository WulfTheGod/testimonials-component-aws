# React Testimonials Component

A production-ready testimonials component with TypeScript, AWS DynamoDB, and Google Reviews integration.

## ✨ Features

- 🎨 **Beautiful UI** - Responsive testimonial cards with ratings
- 🔷 **TypeScript** - Fully typed for IntelliSense support
- 🗄️ **Multiple Data Sources** - DynamoDB, Google Reviews, or static data
- 🌐 **i18n Ready** - Multi-language support built-in
- ⚡ **Lightweight** - Minimal dependencies, tree-shakeable

## 📦 Installation

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
# or
yarn add @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

## 🚀 Quick Start

### 1. Basic Usage (Static Data)

```tsx
import { TestimonialCard } from './components/TestimonialCard';

const testimonial = {
  id: "1",
  clientName: "John Doe",
  content: { 
    en: "Amazing service!", 
    fr: "Service incroyable!" 
  },
  rating: 5,
  role: "CEO, TechCorp",
  location: "San Francisco, CA",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

function App() {
  return <TestimonialCard testimonial={testimonial} language="en" />;
}
```

### 2. With DynamoDB

```tsx
import { testimonialsService } from './lib/services/testimonials';

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function loadTestimonials() {
      const result = await testimonialsService.getAll();
      if (result.success) {
        setTestimonials(result.data);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}
```

## 🔧 Setup Guide

### DynamoDB Setup

#### 1. Create AWS Account
- Go to [AWS Console](https://aws.amazon.com)
- Sign up for free tier (includes 25GB DynamoDB storage)

#### 2. Create DynamoDB Table

```bash
aws dynamodb create-table \
  --table-name testimonials \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

Or via AWS Console:
1. Go to DynamoDB → Create table
2. Table name: `testimonials`
3. Partition key: `id` (String)
4. Use default settings → Create

#### 3. Set Environment Variables

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
TESTIMONIALS_TABLE=testimonials
```

### Google Reviews Integration

#### Step 1: Request API Access

1. Go to [Google Business Profile API Form](https://developers.google.com/my-business/content/api-access-request)
2. Fill out the form:
   - **Project Description**: "Display Google Reviews on business website"
   - **Use Case**: "Show authentic customer testimonials"
3. Wait 2-5 business days for approval

#### Step 2: Enable APIs in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable these APIs:
   - Google My Business API
   - Google Business Profile API
4. Create OAuth 2.0 credentials

#### Step 3: Get Your Location ID

```javascript
// Use Google's API to find your location
const {google} = require('googleapis');
const mybusiness = google.mybusinessbusinessinformation('v1');

async function getLocations() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const response = await mybusiness.accounts.locations.list({
    parent: 'accounts/YOUR_ACCOUNT_ID',
    auth: auth
  });
  
  console.log(response.data.locations);
  // Find your location ID in the response
}
```

#### Step 4: Fetch Reviews

```typescript
// lib/services/google-reviews.ts
export async function fetchGoogleReviews() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const reviews = await mybusiness.accounts.locations.reviews.list({
    parent: `accounts/${accountId}/locations/${locationId}`,
    auth: auth
  });

  // Transform Google reviews to your format
  return reviews.data.reviews.map(review => ({
    id: review.reviewId,
    clientName: review.reviewer.displayName,
    content: { 
      en: review.comment, 
      fr: review.comment // You'd translate this
    },
    rating: review.starRating,
    source: 'google',
    createdAt: review.createTime
  }));
}
```

## 📁 Project Structure

```
your-project/
├── components/
│   └── TestimonialCard.tsx    # The UI component
├── lib/
│   ├── types/
│   │   └── testimonial.ts     # TypeScript interfaces
│   └── services/
│       ├── testimonials.ts    # DynamoDB service
│       └── google-reviews.ts  # Google Reviews service (you create)
└── hooks/
    └── useTestimonials.ts     # React hook (optional)
```

## 🎯 Integration Examples

### Next.js App Router

```tsx
// app/testimonials/page.tsx
import { testimonialsService } from '@/lib/services/testimonials';
import { TestimonialCard } from '@/components/TestimonialCard';

export default async function TestimonialsPage() {
  const { data: testimonials } = await testimonialsService.getAll();
  
  return (
    <div className="grid gap-6">
      {testimonials?.map(t => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}
```

### React (Vite/CRA)

```tsx
// components/TestimonialsList.tsx
import { useEffect, useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { testimonialsService } from '../lib/services/testimonials';

export function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsService.getAll()
      .then(result => {
        if (result.success) setTestimonials(result.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <>
      {testimonials.map(t => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </>
  );
}
```

### Static Site (No Database)

```tsx
// Use local JSON data
import testimonialData from './data/testimonials.json';
import { TestimonialCard } from './components/TestimonialCard';

export function StaticTestimonials() {
  return (
    <>
      {testimonialData.map(t => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </>
  );
}
```

## 🎨 Styling

The component uses Tailwind CSS classes. Make sure Tailwind is installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add to your `tailwind.config.js`:
```js
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    // ... your other paths
  ],
  // ... rest of config
}
```

## 📝 TypeScript Types

```typescript
interface Testimonial {
  id: string;
  clientName: string;
  content: LocalizedText;
  rating: number;
  role?: string;
  location?: string;
  projectId?: string;
  isActive: boolean;
  source?: 'google' | 'direct' | 'email';
  createdAt: string;
  updatedAt: string;
}

interface LocalizedText {
  en: string;
  fr: string;
}
```

## 🔐 Environment Variables

Create a `.env` file:

```env
# AWS (for DynamoDB)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG
TESTIMONIALS_TABLE=testimonials

# Google Reviews (optional)
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_GBP_LOCATION_ID=your_location_id
```

## 🚨 Troubleshooting

### "Cannot find module" Error
- Ensure all dependencies are installed
- Check your import paths match your project structure

### AWS Credentials Error
- Verify your AWS credentials in `.env`
- Check IAM permissions include DynamoDB access

### Google API Access Denied
- Must complete the access request form
- Verify OAuth credentials are correct
- Check API is enabled in Google Cloud Console

### No Testimonials Showing
- Check DynamoDB table has data
- Verify `isActive: true` on testimonials
- Check browser console for errors

## 📄 License

MIT - Use freely in your projects!

## 🤝 Contributing

This is a portfolio demonstration project. Feel free to fork and customize!

---

**Questions?** The code is self-documenting with TypeScript. Check the type definitions for all available props and options.