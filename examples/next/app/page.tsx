'use client';

import { useEffect, useState } from 'react';
import WorkingTestimonials from '../../../src/components/WorkingTestimonials';
import type { Review } from '../../../src/types/review';

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
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
        <h1 style={{ margin: 0, color: '#1e293b' }}>Testimonials Component Example</h1>
        <p style={{ margin: '0.5rem 0', color: '#64748b' }}>
          Showing {reviews.length} reviews from Google Business Profile (or mock data)
        </p>
      </div>
      <WorkingTestimonials reviews={reviews} />
    </main>
  );
}