/**
 * TestimonialCard Component
 * Displays individual testimonial with rating, content, and author info
 */

'use client';

import { memo } from "react";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
  isPreview?: boolean;
  language?: 'en' | 'fr';
}

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  isActive = false,
  isPreview = false,
  language = 'en'
}: TestimonialCardProps) {
  const { 
    clientName, 
    content, 
    rating, 
    role, 
    location, 
    source 
  } = testimonial;

  // Dynamic styling based on state
  const cardClasses = isPreview
    ? "group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-300 scale-85 opacity-60 hover:opacity-75"
    : "group relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-500 transform";

  const activeClasses = isActive && !isPreview 
    ? "shadow-2xl ring-2 ring-blue-300 border-blue-200 scale-102" 
    : "";

  // Generate avatar from initials
  const initials = clientName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`${cardClasses} ${activeClasses}`}>
      {/* Source Badge */}
      {source === 'google' && !isPreview && (
        <div className="absolute top-6 right-6">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-gray-100">
            <GoogleIcon />
            <span className="text-xs font-medium text-gray-700">Google</span>
          </div>
        </div>
      )}
      
      {/* Quote Icon */}
      {source !== 'google' && !isPreview && (
        <div className="absolute top-6 right-6 text-blue-300 group-hover:text-blue-400 transition-colors">
          <Quote className="w-10 h-10 drop-shadow-sm" aria-hidden="true" />
        </div>
      )}

      {/* Rating Stars */}
      <div className={`flex items-center space-x-1 ${isPreview ? 'mb-2' : 'mb-4'}`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${isPreview ? 'w-3 h-3' : 'w-5 h-5'} ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>

      {/* Testimonial Content */}
      <blockquote className={`text-gray-700 leading-relaxed relative z-10 ${
        isPreview 
          ? 'text-sm mb-3 line-clamp-2' 
          : 'text-lg mb-6 leading-7'
      }`}>
        &ldquo;{content[language]}&rdquo;
      </blockquote>

      {/* Author Information */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div
            className={`${
              isPreview ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-lg'
            } rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center shadow-md`}
          >
            {initials}
          </div>
          <div className="absolute inset-0 rounded-full ring-2 ring-blue-300 group-hover:ring-blue-400 transition-colors" />
        </div>
        
        {/* Author Details */}
        <div className="min-w-0 flex-1">
          <div className={`font-bold text-gray-900 truncate ${
            isPreview ? 'text-sm' : 'text-lg'
          }`}>
            {clientName}
          </div>
          {role && (
            <div className={`text-gray-600 truncate font-medium ${
              isPreview ? 'text-xs' : 'text-sm'
            }`}>
              {role}
            </div>
          )}
          {location && !isPreview && (
            <div className="text-xs text-gray-400 truncate font-normal mt-0.5">
              📍 {location}
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </div>
  );
});

// Google Icon Component
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default TestimonialCard;