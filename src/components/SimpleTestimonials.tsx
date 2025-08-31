"use client";

import type { Review } from "../types/review";

interface SimpleTestimonialsProps {
  reviews?: Review[];
}

export default function SimpleTestimonials({ reviews = [] }: SimpleTestimonialsProps) {
  // Default fallback testimonials
  const fallbackTestimonials = [
    {
      id: "fallback-1",
      name: "Sarah J.",
      role: "Homeowner", 
      content: "Exceptional service! The team was professional and delivered exactly what we needed on time.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff&size=100&bold=true&format=png",
      location: "Montreal, QC",
      project: "Kitchen Renovation",
      source: "google",
      createdAt: "2024-02-15T10:30:00Z"
    }
  ];

  const testimonialsToShow = reviews.length > 0 ? reviews : fallbackTestimonials;
  const currentTestimonial = testimonialsToShow[0];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-slate-700 mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl relative">
            {/* Simple Google Badge */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-1 bg-white/90 rounded-full px-3 py-1.5 border">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs">Google</span>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center mb-4">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-gray-700 text-lg mb-6">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center">
              <div 
                className="w-14 h-14 rounded-full bg-cover bg-center mr-4"
                style={{ backgroundImage: `url(${currentTestimonial.image})` }}
              />
              <div>
                <div className="font-bold text-slate-700">{currentTestimonial.name}</div>
                <div className="text-gray-600">{currentTestimonial.role}</div>
                <div className="text-gray-400 text-sm">📍 {currentTestimonial.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}