import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '../../../../../src/server/fetchGoogleReviews';

export async function GET() {
  try {
    const reviews = await fetchGoogleReviews();
    
    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}