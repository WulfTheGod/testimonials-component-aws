'use client';

import React, { useState, useCallback } from 'react';
import type { Review } from '../types/review';

interface TestimonialsProps {
  reviews: Review[];
  title?: string;
  limit?: number;
}


function StarIcon({ filled, className = '' }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={`${className} ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
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
    <svg className="w-10 h-10 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

// Individual testimonial card component
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
  
  const cardClasses = isPreview
    ? "group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all duration-300 scale-85 opacity-60 hover:opacity-75"
    : "group relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-500 transform";

  const activeClasses = isActive && !isPreview 
    ? "shadow-2xl ring-2 ring-emerald-300 border-emerald-200 scale-102" 
    : "";

  return (
    <div className={`${cardClasses} ${activeClasses}`} onClick={onClick}>
      {/* Google Badge - Top right for Google reviews */}
      {isGoogle && !isPreview && (
        <div className="absolute top-6 right-6">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-gray-100">
            <GoogleIcon />
            <span className="text-xs font-medium text-gray-700">Google</span>
          </div>
        </div>
      )}
      
      {/* Quote Icon - For non-Google reviews */}
      {!isGoogle && !isPreview && (
        <div className="absolute top-6 right-6 text-emerald-300 group-hover:text-emerald-400 transition-colors">
          <QuoteIcon />
        </div>
      )}

      {/* Rating */}
      <div className={`flex items-center space-x-1 ${isPreview ? 'mb-2' : 'mb-4'}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            filled={star <= review.rating}
            className={isPreview ? 'w-3 h-3' : 'w-5 h-5'}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className={`text-gray-700 leading-relaxed relative z-10 ${
        isPreview 
          ? 'text-sm mb-3 line-clamp-2' 
          : 'text-lg mb-6 leading-7'
      }`}>
        &ldquo;{truncateText(review.text, isPreview ? 120 : 280)}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {review.profilePhotoUrl ? (
            <div
              className={`${isPreview ? 'w-10 h-10' : 'w-14 h-14'} rounded-full bg-cover bg-center bg-gray-200 shadow-md`}
              style={{ backgroundImage: `url(${review.profilePhotoUrl})` }}
            />
          ) : (
            <div className={`${isPreview ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-xl'} rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md`}>
              {review.author.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 rounded-full ring-2 ring-emerald-300 group-hover:ring-emerald-400 transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-bold text-navy truncate ${isPreview ? 'text-sm' : 'text-lg'}`}>
            {review.author}
          </div>
          <div className={`text-gray-600 truncate font-medium ${isPreview ? 'text-xs' : 'text-sm'}`}>
            Verified Customer
          </div>
          {!isPreview && (
            <div className="text-xs text-gray-400 truncate font-normal mt-0.5">
              {formatDate(review.createdAt)}
              {review.url && (
                <a 
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-600 ml-2 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View original
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
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
    <section className="section-padding bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-navy/10 to-emerald-100/80 text-navy font-semibold rounded-full text-sm mb-4 shadow-sm">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-navy mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Hear from satisfied clients who have experienced our exceptional service firsthand.
          </p>
        </div>

        {/* Single testimonial on mobile, Carousel on desktop */}
        <div className="block lg:hidden">
          <div className="relative min-h-[280px] flex items-center">
            <TestimonialCard
              review={currentTestimonial}
              isActive={true}
            />
          </div>
        </div>

        {/* Desktop: Main + Preview layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-6 min-h-[300px] items-start">
            {/* Main testimonial */}
            <div className="col-span-7">
              <TestimonialCard
                review={currentTestimonial}
                isActive={true}
              />
            </div>

            {/* Preview testimonials */}
            {previewTestimonials.length > 0 && (
              <div className="col-span-5 space-y-4">
                {previewTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-preview-${index}`}
                    review={testimonial}
                    isPreview={true}
                    onClick={() => goToSlide((currentIndex + index + 1) % displayedReviews.length)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation dots */}
        {displayedReviews.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {displayedReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-emerald-500 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}