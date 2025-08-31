import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { fetchGoogleReviews } from '../../src/server/fetchGoogleReviews';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const reviews = await fetchGoogleReviews();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(reviews),
    };
  } catch (error) {
    console.error('Lambda error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch testimonials',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};