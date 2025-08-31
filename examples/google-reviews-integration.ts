/**
 * Google Reviews Integration Example
 * Complete implementation for fetching and syncing Google Business Profile reviews
 */

import { google } from 'googleapis';
import type { Testimonial, LocalizedText } from '../lib/types/testimonial';
import { testimonialsService } from '../lib/services/testimonials';

// Google Business Profile API configuration
const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN!,
  locationId: process.env.GOOGLE_GBP_LOCATION_ID!,
};

// Initialize Google Auth
const auth = new google.auth.OAuth2(
  GOOGLE_CONFIG.clientId,
  GOOGLE_CONFIG.clientSecret
);

auth.setCredentials({
  refresh_token: GOOGLE_CONFIG.refreshToken
});

// Google Business Profile API client
const mybusiness = google.mybusinessbusinessinformation('v1');

/**
 * Fetch all locations for your Google Business account
 */
export async function getBusinessLocations() {
  try {
    const response = await mybusiness.accounts.locations.list({
      parent: 'accounts/-', // Use '-' to list all accessible accounts
      auth: auth
    });

    return response.data.locations?.map(location => ({
      name: location.name,
      displayName: location.displayName,
      address: location.address,
      locationId: location.name?.split('/').pop() // Extract ID from name
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw new Error('Failed to fetch business locations');
  }
}

/**
 * Fetch reviews from Google Business Profile
 */
export async function fetchGoogleReviews(): Promise<Testimonial[]> {
  try {
    // Note: As of 2024, Google deprecated the reviews.list endpoint
    // This is kept for reference - you'll need to use the new Business Profile API
    
    console.warn('Google Reviews API is deprecated. Use Google Business Profile API instead.');
    
    // Alternative: Use Google Places API for public reviews
    return await fetchPlacesReviews();
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    throw new Error('Failed to fetch Google reviews');
  }
}

/**
 * Alternative: Fetch reviews using Google Places API
 */
export async function fetchPlacesReviews(): Promise<Testimonial[]> {
  const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID!;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Places API error: ${data.status}`);
    }

    return data.result.reviews?.map((review: any) => ({
      id: `google-${review.time}`,
      clientName: review.author_name,
      content: {
        en: review.text,
        fr: review.text // You would translate this
      } as LocalizedText,
      rating: review.rating,
      role: '', // Google doesn't provide role
      location: review.author_name, // Use author name as location fallback
      isActive: true,
      source: 'google' as const,
      createdAt: new Date(review.time * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    })) || [];
  } catch (error) {
    console.error('Error fetching Places reviews:', error);
    throw error;
  }
}

/**
 * Sync Google reviews to your database
 */
export async function syncGoogleReviews(): Promise<{
  synced: number;
  errors: string[];
}> {
  const results = {
    synced: 0,
    errors: [] as string[]
  };

  try {
    // Fetch reviews from Google
    const googleReviews = await fetchPlacesReviews();
    
    // Get existing reviews to avoid duplicates
    const existingResult = await testimonialsService.getAll();
    const existingIds = existingResult.success 
      ? new Set(existingResult.data?.map(r => r.id) || [])
      : new Set();

    // Sync new reviews
    for (const review of googleReviews) {
      if (existingIds.has(review.id)) {
        continue; // Skip existing reviews
      }

      try {
        const result = await testimonialsService.create(review);
        if (result.success) {
          results.synced++;
        } else {
          results.errors.push(`Failed to sync review ${review.id}: ${result.error}`);
        }
      } catch (error) {
        results.errors.push(`Error syncing review ${review.id}: ${error}`);
      }
    }

    return results;
  } catch (error) {
    results.errors.push(`Sync failed: ${error}`);
    return results;
  }
}

/**
 * Automated sync function (call this from a cron job or scheduled function)
 */
export async function automatedSync(): Promise<void> {
  console.log('Starting automated Google Reviews sync...');
  
  try {
    const results = await syncGoogleReviews();
    
    console.log(`✅ Sync completed: ${results.synced} reviews synced`);
    
    if (results.errors.length > 0) {
      console.warn('⚠️  Sync errors:', results.errors);
    }
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

/**
 * Example usage in a Next.js API route
 */

// pages/api/sync-reviews.ts (or app/api/sync-reviews/route.ts)
/*
export async function GET() {
  try {
    const results = await syncGoogleReviews();
    
    return Response.json({
      success: true,
      synced: results.synced,
      errors: results.errors
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
*/

/**
 * Environment variables needed:
 * 
 * # Google Places API (recommended approach)
 * GOOGLE_PLACES_API_KEY=your_places_api_key
 * GOOGLE_PLACE_ID=your_place_id
 * 
 * # Legacy Google Business Profile API (deprecated)
 * GOOGLE_CLIENT_ID=your_oauth_client_id
 * GOOGLE_CLIENT_SECRET=your_oauth_client_secret
 * GOOGLE_REFRESH_TOKEN=your_oauth_refresh_token
 * GOOGLE_GBP_LOCATION_ID=your_location_id
 */

/**
 * Setup instructions:
 * 
 * 1. Go to Google Cloud Console
 * 2. Enable Places API
 * 3. Create API key with Places API restrictions
 * 4. Find your Place ID using Place ID Finder
 * 5. Set environment variables
 * 6. Call syncGoogleReviews() periodically
 */