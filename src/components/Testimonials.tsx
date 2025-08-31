import React from 'react';
import type { Review } from '../types/review';

interface TestimonialsProps {
  reviews: Review[];
  title?: string;
  limit?: number;
}

const styles = `
.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.testimonials-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.testimonial-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e5e7eb;
}

.testimonial-author-info {
  flex: 1;
  min-width: 0;
}

.testimonial-author {
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.testimonial-rating {
  display: flex;
  gap: 0.125rem;
  margin-top: 0.25rem;
}

.star {
  width: 16px;
  height: 16px;
}

.star-filled {
  color: #fbbf24;
}

.star-empty {
  color: #d1d5db;
}

.testimonial-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.testimonial-text.truncated {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.testimonial-date {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.testimonial-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.testimonial-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .testimonials-container {
    padding: 1rem 0.5rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .testimonials-title {
    font-size: 1.5rem;
  }
}
`;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`star ${filled ? 'star-filled' : 'star-empty'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.020L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.020l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function truncateText(text: string, maxLength: number = 300): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > maxLength * 0.8
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

export function Testimonials({ reviews, title = 'Customer Reviews', limit = 6 }: TestimonialsProps) {
  const displayedReviews = reviews.slice(0, limit);

  if (displayedReviews.length === 0) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="testimonials-container" aria-labelledby="testimonials-title">
        {title && (
          <h2 id="testimonials-title" className="testimonials-title">
            {title}
          </h2>
        )}
        
        <ul className="testimonials-grid" role="list">
          {displayedReviews.map((review) => (
            <li key={review.id} className="testimonial-card">
              <div className="testimonial-header">
                {review.profilePhotoUrl ? (
                  <img
                    src={review.profilePhotoUrl}
                    alt={`${review.author}'s profile`}
                    className="testimonial-avatar"
                    loading="lazy"
                  />
                ) : (
                  <div 
                    className="testimonial-avatar"
                    aria-hidden="true"
                    style={{
                      backgroundColor: '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#6b7280'
                    }}
                  >
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div className="testimonial-author-info">
                  <h3 className="testimonial-author">{review.author}</h3>
                  <div 
                    className="testimonial-rating"
                    role="img"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= review.rating} />
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote>
                <p className={`testimonial-text ${review.text.length > 300 ? 'truncated' : ''}`}>
                  {truncateText(review.text)}
                </p>
              </blockquote>
              
              <div className="testimonial-date">
                {formatDate(review.createdAt)}
                {review.url && (
                  <a 
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="testimonial-link"
                  >
                    View original
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}