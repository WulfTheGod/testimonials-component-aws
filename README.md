# Testimonials Component

A minimal, production-ready testimonials component that fetches real Google Business Profile reviews on the server and renders them with React.

## Quick Start

1. **Add environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Google Business Profile credentials
   ```

2. **Run Next.js example**
   ```bash
   cd examples/next
   npm install
   npm run dev
   ```
   Visit http://localhost:4000

3. **Optional: Deploy Lambda**
   ```bash
   cd examples/aws-lambda
   npm install
   npm run package
   # Upload function.zip to AWS Lambda
   ```

## Demo

![Testimonials Component Demo](https://i.imgur.com/KNv6RYX.jpeg)

## Usage

### Simple Example

```tsx
import { Testimonials } from 'testimonials-component';

export default function App() {
  return (
    <div>
      <h1>My Website</h1>
      {/* Component with built-in mock data - works out of the box! */}
      <Testimonials />
    </div>
  );
}
```

### With Custom Reviews

```tsx
import { Testimonials } from 'testimonials-component';
import type { Review } from 'testimonials-component';

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
  return <Testimonials reviews={customReviews} />;
}
```

### Server-side (Next.js App Router)

```tsx
import { Testimonials } from 'testimonials-component';
import { fetchGoogleReviews } from 'testimonials-component';

export default async function HomePage() {
  // Fetch reviews server-side
  const reviews = await fetchGoogleReviews();
  
  return <Testimonials reviews={reviews} />;
}
```

### Client-side with API

```tsx
'use client';
import { useState, useEffect } from 'react';
import { Testimonials } from 'testimonials-component';
import type { Review } from 'testimonials-component';

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(setReviews);
  }, []);

  return <Testimonials reviews={reviews} />;
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

1. Request access at [Google Business Profile API](https://developers.google.com/my-business/content/api-access-request)
2. Set up OAuth 2.0 in Google Cloud Console
3. Get your Business Profile Location ID from the API
4. Generate an access token (refresh token recommended for production)

### Development Fallback

If no `GOOGLE_ACCESS_TOKEN` is provided, the component automatically falls back to mock data for development - no blocking, no errors.

## Project Structure

```
src/
├── components/Testimonials.tsx    # React component
├── server/fetchGoogleReviews.ts   # Server-only fetcher
├── types/review.ts                # TypeScript types  
└── mock/reviews.json              # Dev fallback data

examples/
├── next/                          # Next.js App Router example
└── aws-lambda/                    # Lambda handler
```

## TypeScript Types

```typescript
interface Review {
  id: string;
  author: string;
  rating: number;        // 1-5
  text: string;
  createdAt: string;     // ISO date
  profilePhotoUrl?: string;
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

## License

MIT - Use freely in your projects!