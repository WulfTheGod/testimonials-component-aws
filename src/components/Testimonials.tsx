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
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 60vh;
}

.testimonials-title {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.testimonial-card {
  position: relative;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.testimonial-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border-color: #10b981;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 1rem;
}

.testimonial-card:hover::before {
  opacity: 0.05;
}

.google-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  z-index: 10;
}

.quote-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #10b981;
  opacity: 0.3;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 5;
}

.testimonial-content {
  position: relative;
  z-index: 10;
}

.testimonial-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

.star {
  width: 1.25rem;
  height: 1.25rem;
}

.star-filled {
  color: #fbbf24;
  filter: drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3));
}

.star-empty {
  color: #d1d5db;
}

.testimonial-text {
  color: #374151;
  line-height: 1.7;
  margin: 0 0 2rem 0;
  font-size: 1.125rem;
  position: relative;
  z-index: 10;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  color: #10b981;
  opacity: 0.2;
  position: absolute;
  left: -1rem;
  top: -1rem;
  font-family: serif;
  line-height: 1;
  z-index: -1;
}

.testimonial-author-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 10;
}

.testimonial-avatar {
  position: relative;
}

.testimonial-avatar img {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-avatar::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover .testimonial-avatar::after {
  opacity: 1;
}

.testimonial-avatar-fallback {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-author-info {
  flex: 1;
  min-width: 0;
}

.testimonial-author {
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.2;
}

.testimonial-date {
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.testimonial-link {
  color: #10b981;
  text-decoration: none;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.testimonial-link:hover {
  color: #059669;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .testimonials-container {
    padding: 2rem 1rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .testimonials-title {
    font-size: 2rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .testimonials-container {
    padding: 1.5rem 0.75rem;
  }
  
  .testimonial-card {
    padding: 1.25rem;
  }
  
  .testimonials-title {
    font-size: 1.75rem;
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

function QuoteIcon() {
  return (
    <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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

function truncateText(text: string, maxLength: number = 280): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > maxLength * 0.8
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

function isGoogleReview(review: Review): boolean {
  return review.url?.includes('google') || review.url?.includes('maps.google') || false;
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
          {displayedReviews.map((review) => {
            const isGoogle = isGoogleReview(review);
            
            return (
              <li key={review.id} className="testimonial-card">
                {/* Google Badge or Quote Icon */}
                {isGoogle ? (
                  <div className="google-badge">
                    <GoogleIcon />
                    <span>Google</span>
                  </div>
                ) : (
                  <QuoteIcon />
                )}
                
                <div className="testimonial-content">
                  {/* Rating */}
                  <div 
                    className="testimonial-rating"
                    role="img"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= review.rating} />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <blockquote>
                    <p className="testimonial-text">
                      {truncateText(review.text)}
                    </p>
                  </blockquote>
                  
                  {/* Author Section */}
                  <div className="testimonial-author-section">
                    <div className="testimonial-avatar">
                      {review.profilePhotoUrl ? (
                        <img
                          src={review.profilePhotoUrl}
                          alt={`${review.author}'s profile`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="testimonial-avatar-fallback">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="testimonial-author-info">
                      <h3 className="testimonial-author">{review.author}</h3>
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
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}