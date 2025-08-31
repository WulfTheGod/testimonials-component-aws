'use client';

import { memo } from "react";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  location: string;
  project?: string; // Optional project context
  source?: string; // 'google' or other source
  reviewTime?: string; // When review was posted
  isActive?: boolean;
  isPreview?: boolean;
}

const TestimonialCard = memo(function TestimonialCard({
  name,
  role,
  content,
  rating,
  image,
  location,
  project,
  source,
  reviewTime,
  isActive = false,
  isPreview = false,
}: TestimonialCardProps) {
  const cardClasses = isPreview
    ? "group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all duration-300 scale-85 opacity-60 hover:opacity-75"
    : "group relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-500 transform";

  const activeClasses = isActive && !isPreview 
    ? "shadow-2xl ring-2 ring-emerald-300 border-emerald-200 scale-102" 
    : "";

  return (
    <div className={`${cardClasses} ${activeClasses}`}>
      {/* Google Badge - Top right for Google reviews */}
      {source === 'google' && !isPreview && (
        <div className="absolute top-6 right-6">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-gray-100">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-medium text-gray-700">Google</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Quote Icon - For non-Google reviews */}
      {source !== 'google' && !isPreview && (
        <div className="absolute top-6 right-6 text-emerald-300 group-hover:text-emerald-400 transition-colors">
          <Quote className="w-10 h-10 drop-shadow-sm" aria-hidden="true" />
        </div>
      )}

      {/* Rating */}
      <div className={`flex items-center space-x-1 ${isPreview ? 'mb-2' : 'mb-4'}`}>
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            className={`${isPreview ? 'w-3 h-3' : 'w-5 h-5'} text-yellow-400 fill-current`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className={`text-gray-700 leading-relaxed relative z-10 ${
        isPreview 
          ? 'text-sm mb-3 line-clamp-2' 
          : 'text-lg mb-6 leading-7'
      }`}>
        &ldquo;{content}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className={`${isPreview ? 'w-10 h-10' : 'w-14 h-14'} rounded-full bg-cover bg-center bg-gray-200 shadow-md`}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-emerald-300 group-hover:ring-emerald-400 transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-bold text-navy truncate ${isPreview ? 'text-sm' : 'text-lg'}`}>
            {name}
          </div>
          <div className={`text-gray-600 truncate font-medium ${isPreview ? 'text-xs' : 'text-sm'}`}>
            {role}
          </div>
          {project && (
            <div className={`${isPreview ? 'mt-0.5' : 'mt-1.5'}`}>
              <span className={`inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 font-medium rounded-full truncate max-w-full ${
                isPreview ? 'text-xs scale-90 origin-left' : 'text-xs'
              }`}>
                {project}
              </span>
            </div>
          )}
          {!isPreview && (
            <div className="text-xs text-gray-400 truncate font-normal mt-0.5">
              📍 {location}
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </div>
  );
});

export default TestimonialCard;