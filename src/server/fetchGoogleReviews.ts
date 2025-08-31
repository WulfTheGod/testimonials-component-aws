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
  const initials = getInitials(googleReview.reviewer.displayName);
  const backgroundColor = getColorFromName(googleReview.reviewer.displayName);
  
  return {
    id: googleReview.reviewId,
    name: formatName(googleReview.reviewer.displayName),
    role: 'Verified Customer',
    content: googleReview.comment,
    rating: mapStarRating(googleReview.starRating),
    createdAt: googleReview.createTime,
    image: googleReview.reviewer.profilePhotoUrl || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor}&color=fff&size=100&bold=true&format=png`,
    location: 'Montreal, QC', // Default location, could be enhanced with actual data
    source: 'google',
    url: `https://maps.google.com/?q=${googleReview.name}`,
  };
}

function formatName(fullName: string): string {
  if (!fullName || fullName.trim() === '') return 'Google User';
  
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return 'Google User';
  if (parts.length === 1) return parts[0];
  
  // Return first name and last initial (John D.)
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}

function getInitials(name: string): string {
  if (!name || name === '') return 'GU';
  
  const parts = name.trim().split(/\s+/).filter(part => part.length > 0);
  if (parts.length === 0) return 'GU';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = [
    '6366f1', '8b5cf6', '06b6d4', '10b981', 'f59e0b',
    'ef4444', '84cc16', 'f97316', 'ec4899', '3b82f6'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
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