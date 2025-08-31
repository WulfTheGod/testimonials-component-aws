"use client";

import type { Review } from "../types/review";

export default function DiagnosticTestimonials({ reviews = [] }: { reviews?: Review[] }) {
  const testimonialsToShow = reviews.length > 0 ? reviews : [
    {
      id: "1",
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

  const testimonial = testimonialsToShow[0];

  return (
    <div style={{ padding: '40px', backgroundColor: '#f3f4f6' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Diagnostic View</h2>
      
      {/* Test 1: Simple card with inline styles */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '10px' }}>Test 1: Simple Card with Inline Styles</h3>
        <div style={{
          position: 'relative',
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          maxWidth: '600px'
        }}>
          {/* Google Badge with inline styles */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: '1px solid #e5e7eb'
          }}>
            <svg 
              style={{ width: '16px', height: '16px', flexShrink: 0 }}
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ fontSize: '12px', color: '#374151' }}>Google</span>
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} style={{ width: '20px', height: '20px', color: '#fbbf24', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          {/* Content */}
          <p style={{ fontSize: '18px', color: '#374151', marginBottom: '24px' }}>
            "{testimonial.content}"
          </p>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%',
                border: '2px solid #10b981'
              }}
            />
            <div>
              <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{testimonial.name}</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{testimonial.role}</div>
              <div style={{ color: '#9ca3af', fontSize: '12px' }}>📍 {testimonial.location}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test 2: Check if Tailwind classes work */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '10px' }}>Test 2: Tailwind Classes</h3>
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">
          <p className="text-gray-700">If this has white background, shadow, and padding, Tailwind is working.</p>
          <div className="w-4 h-4 bg-blue-500 mt-2"></div>
          <p className="text-xs mt-2">Above should be a small blue square (16x16px)</p>
        </div>
      </div>

      {/* Test 3: SVG sizing test */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '10px' }}>Test 3: SVG Sizing</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <p>16x16px SVG:</p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            </svg>
          </div>
          <div>
            <p>className="w-4 h-4":</p>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}