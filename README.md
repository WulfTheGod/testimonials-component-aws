# Testimonials Component AWS

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

## Usage

```tsx
import { Testimonials } from './src/components/Testimonials';
import type { Review } from './src/types/review';

// Fetch reviews server-side
import { fetchGoogleReviews } from './src/server/fetchGoogleReviews';
const reviews = await fetchGoogleReviews();

// Render component
<Testimonials reviews={reviews} title="Customer Reviews" limit={6} />
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

## License

MIT - Use freely in your projects!