import React, { useState, useCallback, useEffect } from 'react';
import type { Review } from '../types/review';

interface TestimonialsProps {
  reviews: Review[];
  title?: string;
  limit?: number;
}

// Professional styling that matches main-website
const styles = {
  section: {
    padding: '4rem 1rem',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    minHeight: '60vh',
  },
  
  decorativeBlob1: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '24rem',
    height: '24rem',
    background: 'rgba(16, 185, 129, 0.05)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    transform: 'translate(-50%, -50%)',
  },
  
  decorativeBlob2: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: '24rem',
    height: '24rem',
    background: 'rgba(30, 41, 59, 0.05)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    transform: 'translate(50%, 50%)',
  },
  
  container: {
    maxWidth: '80rem',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 10,
  },
  
  header: {
    textAlign: 'center' as const,
    marginBottom: '2.5rem',
  },
  
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.1), rgba(16, 185, 129, 0.1))',
    color: '#1e293b',
    fontWeight: '600',
    borderRadius: '50px',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  
  subtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    maxWidth: '48rem',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  
  mobileView: {
    display: 'block',
  },
  
  desktopView: {
    display: 'none',
  },
  
  mobileCardContainer: {
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
  },
  
  desktopGrid: {
    display: 'grid',
    gridTemplateColumns: '7fr 5fr',
    gap: '1.5rem',
    minHeight: '300px',
    alignItems: 'start',
  },
  
  previewColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  
  navigationDots: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    gap: '0.5rem',
  },
  
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#cbd5e1',
  },
  
  dotActive: {
    width: '24px',
    backgroundColor: '#10b981',
  },
};


function StarIcon({ filled, size = 20 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? '#fbbf24' : '#d1d5db'}
      style={{ filter: filled ? 'drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3))' : 'none' }}
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
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 24 24" 
      fill="#10b981" 
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    >
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
  return review.source === 'google' || review.url?.includes('google') || review.url?.includes('maps.google') || false;
}

// Responsive component that handles mobile/desktop layouts
function ResponsiveTestimonials({
  currentTestimonial,
  previewTestimonials,
  onSlideChange,
  currentIndex,
  totalCount
}: {
  currentTestimonial: Review;
  previewTestimonials: Review[];
  onSlideChange: (index: number) => void;
  currentIndex: number;
  totalCount: number;
}) {
  const [isMobile, setIsMobile] = useState(true);

  // Check screen size on mount and resize
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    // Mobile: Single testimonial
    return (
      <div style={{ minHeight: '280px', display: 'flex', alignItems: 'center' }}>
        <TestimonialCard
          review={currentTestimonial}
          isActive={true}
        />
      </div>
    );
  }

  // Desktop: Main + Preview layout
  return (
    <div style={styles.desktopGrid}>
      {/* Main testimonial */}
      <div>
        <TestimonialCard
          review={currentTestimonial}
          isActive={true}
        />
      </div>

      {/* Preview testimonials */}
      {previewTestimonials.length > 0 && (
        <div style={styles.previewColumn}>
          {previewTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-preview-${index}`}
              review={testimonial}
              isPreview={true}
              onClick={() => onSlideChange((currentIndex + index + 1) % totalCount)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual testimonial card component with inline styles
function TestimonialCard({ 
  review, 
  isActive = false, 
  isPreview = false,
  onClick 
}: {
  review: Review;
  isActive?: boolean;
  isPreview?: boolean;
  onClick?: () => void;
}) {
  const isGoogle = isGoogleReview(review);
  
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    background: 'white',
    borderRadius: isPreview ? '0.75rem' : '1rem',
    padding: isPreview ? '1rem' : '2rem',
    boxShadow: isPreview 
      ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: isPreview ? '1px solid #e2e8f0' : '1px solid #10b981',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
    opacity: isPreview ? 0.6 : 1,
    transform: isPreview ? 'scale(0.85)' : 'scale(1)',
    overflow: 'hidden',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: isPreview ? '0.75rem' : '1.5rem',
    right: isPreview ? '0.75rem' : '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '0.5rem 0.75rem',
    borderRadius: '50px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#374151',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {/* Google Badge or Quote Icon */}
      {!isPreview && (
        <>
          {isGoogle ? (
            <div style={badgeStyle}>
              <GoogleIcon />
              <span>Google</span>
            </div>
          ) : (
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <QuoteIcon />
            </div>
          )}
        </>
      )}

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: isPreview ? '0.5rem' : '1rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= review.rating}
            size={isPreview ? 14 : 20}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote style={{
        color: '#374151',
        lineHeight: '1.7',
        margin: `0 0 ${isPreview ? '0.75rem' : '1.5rem'} 0`,
        fontSize: isPreview ? '0.875rem' : '1.125rem',
        position: 'relative',
        zIndex: 10,
      }}>
        &ldquo;{truncateText(review.content, isPreview ? 120 : 280)}&rdquo;
      </blockquote>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: isPreview ? '2.5rem' : '3.5rem',
              height: isPreview ? '2.5rem' : '3.5rem',
              borderRadius: '50%',
              backgroundImage: `url(${review.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#e5e7eb',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '50%',
            border: '2px solid #10b981',
            opacity: 0.8,
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 'bold',
            color: '#1e293b',
            fontSize: isPreview ? '0.875rem' : '1.125rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {review.name}
          </div>
          <div style={{
            color: '#64748b',
            fontSize: isPreview ? '0.75rem' : '0.875rem',
            fontWeight: '500',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {review.role}
          </div>
          {review.project && (
            <div style={{ marginTop: isPreview ? '0.25rem' : '0.375rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.125rem 0.5rem',
                backgroundColor: '#d1fae5',
                color: '#047857',
                fontWeight: '500',
                borderRadius: '9999px',
                fontSize: isPreview ? '0.625rem' : '0.75rem',
                transform: isPreview ? 'scale(0.9)' : 'none',
                transformOrigin: 'left',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}>
                {review.project}
              </span>
            </div>
          )}
          {!isPreview && (
            <div style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              marginTop: '0.25rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              📍 {review.location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ reviews, title = 'What Our Clients Say', limit = 6 }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedReviews = reviews.slice(0, limit);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const getPreviewTestimonials = useCallback(() => {
    if (displayedReviews.length <= 1) return [];
    
    const previews = [];
    for (let i = 1; i <= Math.min(2, displayedReviews.length - 1); i++) {
      const index = (currentIndex + i) % displayedReviews.length;
      previews.push(displayedReviews[index]);
    }
    return previews;
  }, [displayedReviews, currentIndex]);

  if (displayedReviews.length === 0) {
    return null;
  }

  const currentTestimonial = displayedReviews[currentIndex];
  const previewTestimonials = getPreviewTestimonials();

  return (
    <section style={styles.section}>
      {/* Background decorative elements */}
      <div style={styles.decorativeBlob1} />
      <div style={styles.decorativeBlob2} />
      
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.badge}>
            Client Stories
          </span>
          <h2 style={styles.title}>
            {title}
          </h2>
          <p style={styles.subtitle}>
            Hear from satisfied clients who have experienced our exceptional service firsthand.
          </p>
        </div>

        {/* Responsive Layout */}
        <ResponsiveTestimonials
          currentTestimonial={currentTestimonial}
          previewTestimonials={previewTestimonials}
          onSlideChange={goToSlide}
          currentIndex={currentIndex}
          totalCount={displayedReviews.length}
        />

        {/* Navigation dots */}
        {displayedReviews.length > 1 && (
          <div style={styles.navigationDots}>
            {displayedReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex ? styles.dotActive : {})
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.backgroundColor = '#cbd5e1';
                  }
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}