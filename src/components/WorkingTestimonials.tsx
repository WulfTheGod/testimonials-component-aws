"use client";

import { useState, useEffect } from "react";
import type { Review } from "../types/review";

export default function WorkingTestimonials({ reviews = [] }: { reviews?: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default testimonials
  const defaultTestimonials: Review[] = [
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
      createdAt: "2024-02-15T10:30:00Z",
      url: "https://maps.google.com/?q=review1"
    },
    {
      id: "2",
      name: "Michael C.",
      role: "Property Manager",
      content: "Outstanding work! They transformed our business processes and exceeded all expectations. Highly recommend for any organization looking to modernize.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=MC&background=10b981&color=fff&size=100&bold=true&format=png",
      location: "Mississauga, ON",
      source: "google",
      createdAt: "2024-02-10T14:20:00Z"
    },
    {
      id: "3",
      name: "Emily R.",
      role: "Homeowner",
      content: "Great experience working with this team. Good communication throughout the project.",
      rating: 4,
      image: "https://ui-avatars.com/api/?name=ER&background=8b5cf6&color=fff&size=100&bold=true&format=png",
      location: "Quebec City, QC",
      project: "Bathroom Renovation",
      source: "google",
      createdAt: "2024-02-05T09:15:00Z",
      url: "https://maps.google.com/?q=review3"
    }
  ];

  const testimonials = reviews.length > 0 ? reviews : defaultTestimonials;
  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonials = testimonials.length > 1 
    ? [testimonials[(currentIndex + 1) % testimonials.length], testimonials[(currentIndex + 2) % testimonials.length]]
    : [];

  // Auto-advance timer
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const containerStyle = {
    backgroundColor: '#f9fafb',
    background: 'linear-gradient(180deg, #f3f4f6 0%, #f9fafb 50%, #f3f4f6 100%)',
    padding: '80px 24px',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const decorativeBlobStyle1 = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '384px',
    height: '384px',
    background: 'rgba(16, 185, 129, 0.05)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    transform: 'translate(-50%, -50%)'
  };

  const decorativeBlobStyle2 = {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: '384px',
    height: '384px',
    background: 'rgba(30, 58, 138, 0.05)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    transform: 'translate(50%, 50%)'
  };

  const mainCardStyle = {
    position: 'relative' as const,
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #f3f4f6',
    transform: 'scale(1.02)'
  };

  const previewCardStyle = {
    position: 'relative' as const,
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f4f6',
    cursor: 'pointer',
    transform: 'scale(0.85)',
    opacity: 0.6,
    transition: 'all 0.3s ease'
  };

  const googleBadgeStyle = {
    position: 'absolute' as const,
    top: '24px',
    right: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    borderRadius: '9999px',
    padding: '6px 12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f4f6'
  };

  return (
    <section style={containerStyle}>
      {/* Background decorations */}
      <div style={decorativeBlobStyle1} />
      <div style={decorativeBlobStyle2} />

      {/* Container */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'linear-gradient(90deg, rgba(30, 58, 138, 0.1), rgba(16, 185, 129, 0.1))',
            color: '#1e3a8a',
            fontWeight: '600',
            borderRadius: '9999px',
            fontSize: '14px',
            marginBottom: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            Client Stories
          </span>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '600',
            color: '#1e3a8a',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            What Our Clients Say
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#374151',
            maxWidth: '768px',
            margin: '0 auto',
            lineHeight: '1.75'
          }}>
            Hear from satisfied clients who have experienced the ToughJobs difference firsthand.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', minHeight: '300px', alignItems: 'start' }}>
          {/* Main testimonial */}
          <div style={{ gridColumn: 'span 7' }}>
            <div style={mainCardStyle}>
              {/* Google Badge */}
              {currentTestimonial.source === 'google' && (
                <div style={googleBadgeStyle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>Google</span>
                </div>
              )}

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" fill="#facc15" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote style={{
                color: '#374151',
                fontSize: '18px',
                lineHeight: '1.75',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 10
              }}>
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      backgroundColor: '#e5e7eb'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid #10b981'
                  }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#1e3a8a',
                    fontSize: '18px'
                  }}>
                    {currentTestimonial.name}
                  </div>
                  <div style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {currentTestimonial.role}
                  </div>
                  {currentTestimonial.project && (
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      fontWeight: '500',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}>
                      {currentTestimonial.project}
                    </span>
                  )}
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginTop: '2px'
                  }}>
                    📍 {currentTestimonial.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview testimonials */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {nextTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                style={previewCardStyle}
                onClick={() => setCurrentIndex((currentIndex + index + 1) % testimonials.length)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.75';
                  e.currentTarget.style.transform = 'scale(0.88)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.transform = 'scale(0.85)';
                }}
              >
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '8px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="12" height="12" fill="#facc15" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p style={{
                  color: '#374151',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid #10b981'
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      fontSize: '14px'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      color: '#6b7280',
                      fontSize: '12px'
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: index === currentIndex ? '8px' : '6px',
                  height: index === currentIndex ? '8px' : '6px',
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? 'rgba(16, 185, 129, 0.6)' : 'rgba(209, 213, 219, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            width: '35%',
            height: '1px',
            backgroundColor: 'rgba(229, 231, 235, 0.3)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: 'rgba(16, 185, 129, 0.4)',
              borderRadius: '9999px',
              animation: 'progress 6s linear infinite'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}