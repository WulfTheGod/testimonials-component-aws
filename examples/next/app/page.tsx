'use client';

import { useEffect, useState } from 'react';
import WorkingTestimonials from '../../../src/components/WorkingTestimonials';
import type { Review } from '../../../src/types/review';

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For static export, directly import mock data
    // In production, this would fetch from AWS Lambda or API Gateway
    import('../../../src/mock/reviews.json')
      .then(module => {
        setReviews(module.default);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load testimonials');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Loading testimonials...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Error loading testimonials</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <div style={{ padding: '2rem 1rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, color: '#1e293b' }}>Testimonials Component Demo</h1>
        <p style={{ margin: '0.5rem 0', color: '#64748b' }}>
          Showing {reviews.length} reviews
        </p>
      </div>
      <WorkingTestimonials reviews={reviews} />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <a 
          href="https://github.com/WulfTheGod/testimonials-component-aws"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#24292f',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#32383f'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#24292f'}
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}