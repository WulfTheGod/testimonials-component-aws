import { promises as fs } from 'fs';
import path from 'path';
import type { Review } from '../types/review';

interface GoogleBusinessProfileReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment: string;
  createTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  name: string;
}

interface GoogleBusinessProfileResponse {
  reviews?: GoogleBusinessProfileReview[];
  nextPageToken?: string;
}

function mapStarRating(rating: string): number {
  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return ratingMap[rating as keyof typeof ratingMap] || 5;
}

function mapGoogleReviewToReview(googleReview: GoogleBusinessProfileReview): Review {
  return {
    id: googleReview.reviewId,
    author: googleReview.reviewer.displayName,
    rating: mapStarRating(googleReview.starRating),
    text: googleReview.comment,
    createdAt: googleReview.createTime,
    profilePhotoUrl: googleReview.reviewer.profilePhotoUrl,
    url: `https://maps.google.com/?q=${googleReview.name}`,
  };
}

async function fetchFromGoogleBusinessProfile(): Promise<Review[]> {
  const locationId = process.env.GOOGLE_LOCATION_ID;
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

  if (!locationId || !accessToken) {
    throw new Error('Missing GOOGLE_LOCATION_ID or GOOGLE_ACCESS_TOKEN');
  }

  const reviews: Review[] = [];
  let nextPageToken: string | undefined;

  try {
    do {
      const url = new URL(
        `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/-/locations/${locationId}/reviews`
      );
      
      if (nextPageToken) {
        url.searchParams.set('pageToken', nextPageToken);
      }
      url.searchParams.set('pageSize', '50');

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status} ${response.statusText}`);
      }

      const data: GoogleBusinessProfileResponse = await response.json();
      
      if (data.reviews) {
        reviews.push(...data.reviews.map(mapGoogleReviewToReview));
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return reviews;
  } catch (error) {
    console.error('Failed to fetch from Google Business Profile:', error);
    throw error;
  }
}

async function loadMockReviews(): Promise<Review[]> {
  try {
    // Try multiple possible paths for the mock file
    const possiblePaths = [
      path.join(process.cwd(), 'src/mock/reviews.json'), // From root
      path.join(process.cwd(), '../../src/mock/reviews.json'), // From examples/next
      path.join(__dirname, '../mock/reviews.json'), // Relative to this file
      path.join(__dirname, '../../mock/reviews.json'), // Relative to this file (alt)
    ];

    for (const mockPath of possiblePaths) {
      try {
        const mockData = await fs.readFile(mockPath, 'utf-8');
        return JSON.parse(mockData) as Review[];
      } catch (err) {
        // Continue to next path
        continue;
      }
    }
    
    throw new Error('Mock reviews file not found in any expected location');
  } catch (error) {
    console.error('Failed to load mock reviews:', error);
    return [];
  }
}

export async function fetchGoogleReviews(): Promise<Review[]> {
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.log('No GOOGLE_ACCESS_TOKEN found, using mock data for development');
    return loadMockReviews();
  }

  try {
    return await fetchFromGoogleBusinessProfile();
  } catch (error) {
    console.error('Failed to fetch Google reviews, falling back to mock data:', error);
    return loadMockReviews();
  }
}