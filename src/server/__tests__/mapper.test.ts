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
    location: 'Montreal, QC',
    source: 'google',
    url: `https://maps.google.com/?q=${googleReview.name}`,
  };
}

function formatName(fullName: string): string {
  if (!fullName || fullName.trim() === '') return 'Google User';
  
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return 'Google User';
  if (parts.length === 1) return parts[0];
  
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
    expect(mappedReview.name).toBe('John D.');
    expect(mappedReview.role).toBe('Verified Customer');
    expect(mappedReview.rating).toBe(5);
    expect(mappedReview.content).toBe('Excellent service! Highly recommend.');
    expect(mappedReview.createdAt).toBe('2024-02-15T10:30:00Z');
    expect(mappedReview.image).toBe('https://example.com/avatar.jpg');
    expect(mappedReview.location).toBe('Montreal, QC');
    expect(mappedReview.source).toBe('google');
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
    expect(mappedReview.name).toBe('Jane S.');
    expect(mappedReview.rating).toBe(4);
    expect(mappedReview.image).toContain('ui-avatars.com'); // Should generate avatar URL
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