import { describe, it, expect } from 'vitest';
import type { Review } from '../../types/review';

// Mock Google Business Profile review payload
interface GoogleBusinessProfileReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment: string;
  createTime: string;
  name: string;
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

describe('Google Business Profile Review Mapper', () => {
  it('should map a sample GBP review payload to Review type', () => {
    const sampleGoogleReview: GoogleBusinessProfileReview = {
      reviewId: 'review_123',
      reviewer: {
        displayName: 'John Doe',
        profilePhotoUrl: 'https://example.com/avatar.jpg',
      },
      starRating: 'FIVE',
      comment: 'Excellent service! Highly recommend.',
      createTime: '2024-02-15T10:30:00Z',
      name: 'accounts/123/locations/456',
    };

    const mappedReview = mapGoogleReviewToReview(sampleGoogleReview);

    // Assert all required fields are mapped correctly
    expect(mappedReview.id).toBe('review_123');
    expect(mappedReview.author).toBe('John Doe');
    expect(mappedReview.rating).toBe(5);
    expect(mappedReview.text).toBe('Excellent service! Highly recommend.');
    expect(mappedReview.createdAt).toBe('2024-02-15T10:30:00Z');
    expect(mappedReview.profilePhotoUrl).toBe('https://example.com/avatar.jpg');
    expect(mappedReview.url).toBe('https://maps.google.com/?q=accounts/123/locations/456');
  });

  it('should handle missing optional fields', () => {
    const reviewWithoutPhoto: GoogleBusinessProfileReview = {
      reviewId: 'review_456',
      reviewer: {
        displayName: 'Jane Smith',
      },
      starRating: 'FOUR',
      comment: 'Good experience overall.',
      createTime: '2024-02-10T14:20:00Z',
      name: 'accounts/123/locations/456',
    };

    const mappedReview = mapGoogleReviewToReview(reviewWithoutPhoto);

    expect(mappedReview.id).toBe('review_456');
    expect(mappedReview.author).toBe('Jane Smith');
    expect(mappedReview.rating).toBe(4);
    expect(mappedReview.profilePhotoUrl).toBeUndefined();
  });

  it('should map star ratings correctly', () => {
    const ratings = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'] as const;
    const expectedNumbers = [1, 2, 3, 4, 5];

    ratings.forEach((rating, index) => {
      expect(mapStarRating(rating)).toBe(expectedNumbers[index]);
    });
  });

  it('should default to 5 stars for unknown rating', () => {
    expect(mapStarRating('UNKNOWN')).toBe(5);
  });
});