/**
 * Complete implementation example
 * Shows how to integrate the testimonials component in your project
 */

import React, { useEffect, useState } from 'react';
import { TestimonialCard } from '../components/TestimonialCard';
import { testimonialsService } from '../lib/services/testimonials';
import type { Testimonial } from '../lib/types/testimonial';

// ============================================
// OPTION 1: Simple Static Implementation
// ============================================
export function StaticTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      content: { 
        en: "Exceptional work! Delivered on time and exceeded expectations.", 
        fr: "Travail exceptionnel! Livré à temps et a dépassé les attentes." 
      },
      rating: 5,
      role: "CEO, TechStartup",
      location: "San Francisco, CA",
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    // Add more static testimonials here
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {testimonials.map(testimonial => (
        <TestimonialCard 
          key={testimonial.id} 
          testimonial={testimonial}
          language="en"
        />
      ))}
    </div>
  );
}

// ============================================
// OPTION 2: Dynamic with DynamoDB
// ============================================
export function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const result = await testimonialsService.getAll();
        
        if (result.success && result.data) {
          // Filter only active testimonials
          const activeTestimonials = result.data
            .filter(t => t.isActive)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          
          setTestimonials(activeTestimonials);
        } else {
          setError(result.error || 'Failed to load testimonials');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        <p>No testimonials available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {testimonials.map(testimonial => (
        <TestimonialCard 
          key={testimonial.id} 
          testimonial={testimonial}
          language="en"
        />
      ))}
    </div>
  );
}

// ============================================
// OPTION 3: With Carousel
// ============================================
export function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials (same as Option 2)
  useEffect(() => {
    // ... fetch logic
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className="relative max-w-4xl mx-auto p-6">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <TestimonialCard testimonial={testimonial} language="en" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
      >
        ←
      </button>
      <button 
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
      >
        →
      </button>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// OPTION 4: Custom Hook Pattern
// ============================================
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const result = await testimonialsService.getAll();
      if (result.success && result.data) {
        setTestimonials(result.data.filter(t => t.isActive));
      } else {
        setError(result.error || 'Failed to load');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: fetchTestimonials };
}

// Use the hook in your component
export function TestimonialsWithHook() {
  const { testimonials, loading, error } = useTestimonials();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-6">
      {testimonials.map(t => (
        <TestimonialCard key={t.id} testimonial={t} language="en" />
      ))}
    </div>
  );
}