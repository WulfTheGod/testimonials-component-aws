"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Review } from "../types/review";

export default function WorkingTestimonials({ reviews = [] }: { reviews?: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default testimonials
  const defaultTestimonials: Review[] = [
    {
      id: "1",
      name: "Sarah J.",
      role: "Homeowner",
      content: "Exceptional service! The team was professional and delivered exactly what we needed on time. Their attention to detail and commitment to quality really impressed us throughout the entire process.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff&size=80&bold=true&format=png",
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
      content: "Outstanding work! They transformed our business processes and exceeded all expectations. Highly recommend for any organization looking to modernize their operations and improve efficiency.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=MC&background=10b981&color=fff&size=80&bold=true&format=png",
      location: "Mississauga, ON",
      project: "Business Modernization",
      source: "google",
      createdAt: "2024-02-10T14:20:00Z"
    },
    {
      id: "3",
      name: "Emily R.",
      role: "Homeowner",
      content: "Great experience working with this team. Good communication throughout the project and they delivered exactly what was promised on schedule and within budget.",
      rating: 4,
      image: "https://ui-avatars.com/api/?name=ER&background=8b5cf6&color=fff&size=80&bold=true&format=png",
      location: "Quebec City, QC", 
      project: "Bathroom Renovation",
      source: "google",
      createdAt: "2024-02-05T09:15:00Z",
      url: "https://maps.google.com/?q=review3"
    }
  ];

  const testimonials = reviews.length > 0 ? reviews : defaultTestimonials;
  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonials =
    testimonials.length > 1
      ? [
          testimonials[(currentIndex + 1) % testimonials.length],
          testimonials[(currentIndex + 2) % testimonials.length],
        ]
      : [];

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => setCurrentIndex((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Viewport intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            const timer = setTimeout(() => setIsVisible(true), 150);
            return () => clearTimeout(timer);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth card transition handler
  const handleCardTransition = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    const timer = setTimeout(() => setIsTransitioning(false), 320);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);

  // Truncate text with read more
  const truncateText = useCallback((text: string, maxLines: number = 5) => {
    const words = text.split(' ');
    const maxWords = maxLines * 8;
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 40%, #ffffff 100%)",
        padding: "3rem 0 0.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Background decorative elements */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "240px", height: "240px",
        background: "radial-gradient(circle, rgba(16,185,129,.03) 0%, transparent 70%)", 
        borderRadius: "50%", filter: "blur(60px)", transform: "translate(-30%,-30%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: "240px", height: "240px",
        background: "radial-gradient(circle, rgba(30,58,138,.03) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", transform: "translate(30%,30%)",
      }} />

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ 
            fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem", 
            lineHeight: 1.2, letterSpacing: "-0.025em" 
          }}>
            <style>{`
              @media (min-width:768px){.hdr{font-size:2.75rem}}
              @media (min-width:1024px){.hdr{font-size:3rem}}
            `}</style>
            <span className="hdr">What Our Clients Say</span>
          </h2>
          <p style={{ 
            fontSize: "1rem", color: "#64748b", maxWidth: "32rem", margin: "0 auto", 
            lineHeight: 1.6, opacity: 0.7 
          }}>
            <style>{`@media (min-width:768px){.lead{font-size:1.125rem}}`}</style>
            <span className="lead">Hear from satisfied clients who have experienced our service firsthand.</span>
          </p>
        </header>

        {/* Testimonials Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "1rem", 
          alignItems: "start",
          marginBottom: "1.75rem"
        }}>
          <style>{`
            @media (min-width:640px) and (max-width:767px){
              .testimonials-grid{grid-template-columns:1fr !important; gap:1.25rem !important}
              .testimonials-grid .active-card{order:1}
              .testimonials-grid .preview-cards{order:2; display:flex; flex-direction:column; gap:1rem}
            }
            @media (min-width:768px) and (max-width:1023px){
              .testimonials-grid{grid-template-columns:1.05fr 1fr !important; gap:1.25rem !important}
              .testimonials-grid .preview-cards{gap:0.75rem !important}
            }
            @media (min-width:1024px){
              .testimonials-grid{grid-template-columns:1.1fr 1fr !important; gap:1.5rem !important}
            }
            @media (max-width:639px){
              .testimonials-grid .active-card{margin-bottom:0.5rem}
              .testimonials-grid .preview-cards{gap:0.75rem !important}
            }
          `}</style>

          <div className="testimonials-grid" style={{ 
            display: "grid", gridTemplateColumns: "1fr", gap: "1rem", alignItems: "start" 
          }}>
            {/* Active testimonial card */}
            <div 
              className="active-card"
              style={{
                position: "relative",
                backgroundColor: "#ffffff",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                boxShadow: "0 12px 40px -4px rgba(0, 0, 0, 0.12), 0 6px 20px -2px rgba(0, 0, 0, 0.06)",
                border: "1px solid rgba(226, 232, 240, 0.6)",
                transition: prefersReducedMotion ? "none" : 
                  isTransitioning ? "all 300ms cubic-bezier(0.2, 0.7, 0.2, 1)" : "all 150ms ease-out",
                display: "flex",
                flexDirection: "column",
                minHeight: "280px",
                maxWidth: "100%",
                opacity: isVisible ? (isTransitioning ? 0.95 : 1) : 0,
                transform: isVisible && !prefersReducedMotion ? 
                  `translateY(0) scale(${isTransitioning ? 1.005 : 1.01})` : 
                  "translateY(16px) scale(0.98)",
                animationDelay: !prefersReducedMotion && isVisible ? "0ms" : undefined,
                animationDuration: !prefersReducedMotion ? "340ms" : undefined,
                animationTimingFunction: !prefersReducedMotion ? "cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
                animationFillMode: "both",
                willChange: "transform, opacity",
                zIndex: 3,
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.boxShadow = "0 16px 56px -4px rgba(0, 0, 0, 0.15), 0 8px 24px -2px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(0, 0, 0, 0.12), 0 6px 20px -2px rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.transform = "translateY(0) scale(1.02)";
                }
              }}
            >
              {/* Quote icon */}
              <div style={{ position: "absolute", top: "1rem", right: "1rem", color: "rgba(16, 185, 129, 0.12)", zIndex: 1 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", zIndex: 2, position: "relative" }}>
                <div 
                  style={{ display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      style={{ 
                        color: i < currentTestimonial.rating ? "#f59e0b" : "#e2e8f0",
                        transition: prefersReducedMotion ? "none" : "all 150ms ease"
                      }}
                      aria-label={i < currentTestimonial.rating ? "Filled star" : "Empty star"}
                    >
                      <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ 
                  fontSize: "0.875rem", color: "#64748b", fontWeight: 600, lineHeight: "1" 
                }}>
                  {currentTestimonial.rating}.0
                </span>
              </div>

              {/* Quote text */}
              <blockquote style={{ 
                color: "#1f2937", fontSize: "1rem", lineHeight: 1.72, marginBottom: "1.5rem", 
                fontWeight: 400, flex: 1, overflow: "hidden", display: "-webkit-box", 
                WebkitLineClamp: 6, WebkitBoxOrient: "vertical", zIndex: 2, position: "relative" 
              }}>
                <style>{`
                  @media (min-width:768px){.qt-active{font-size:1.0625rem;line-height:1.74}}
                  @media (min-width:1024px){.qt-active{font-size:1.125rem;line-height:1.76}}
                `}</style>
                <span className="qt-active">"{truncateText(currentTestimonial.content, 6)}"</span>
              </blockquote>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "auto", position: "relative" }}>
                {/* Google badge */}
                {currentTestimonial.source === "google" && (
                  <div style={{
                    position: "absolute", bottom: "-0.5rem", right: "0",
                    display: "inline-flex", alignItems: "center", gap: "2px",
                    backgroundColor: "rgba(255,255,255,.98)", border: "1px solid rgba(226,232,240,.6)",
                    borderRadius: "8px", padding: "1px 4px", 
                    boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                    fontSize: "8px", fontWeight: 500, color: "#64748b",
                  }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </div>
                )}

                <img 
                  src={currentTestimonial.image} 
                  alt={`${currentTestimonial.name}'s profile`} 
                  style={{ 
                    width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", 
                    backgroundColor: "#e5e7eb", border: "2px solid #10b981", flexShrink: 0,
                    transition: prefersReducedMotion ? "none" : "filter .15s ease"
                  }} 
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.filter = "brightness(1.1) saturate(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.filter = "none";
                    }
                  }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ 
                    fontWeight: 700, color: "#1f2937", fontSize: "0.75rem", 
                    marginBottom: "0.125rem", lineHeight: 1.3 
                  }}>
                    {currentTestimonial.name}
                  </div>
                  <div style={{ 
                    color: "#64748b", fontSize: "0.6875rem", fontWeight: 500, 
                    lineHeight: 1.3, marginBottom: "0.125rem", opacity: 0.7 
                  }}>
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </div>
                  {currentTestimonial.project && (
                    <span style={{
                      display: "inline-block", padding: "1px 4px", backgroundColor: "#f8fafc",
                      color: "#64748b", fontWeight: 500, fontSize: "8px", borderRadius: "4px",
                      border: "1px solid rgba(226,232,240,.6)", textTransform: "uppercase",
                      letterSpacing: "0.02em", opacity: 0.85,
                    }}>
                      {currentTestimonial.project}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Preview cards */}
            <div className="preview-cards" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {nextTestimonials.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    position: "relative",
                    backgroundColor: "#ffffff", 
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.04), 0 2px 8px -2px rgba(0, 0, 0, 0.02)",
                    border: "1px solid rgba(226, 232, 240, 0.5)",
                    cursor: "pointer",
                    transition: prefersReducedMotion ? "none" : 
                      isTransitioning ? "all 280ms cubic-bezier(0.2, 0.7, 0.2, 1)" : "all 150ms ease-out",
                    minHeight: "130px",
                    overflow: "hidden",
                    opacity: isVisible ? (isTransitioning ? 0.9 : 0.85) : 0,
                    filter: isVisible ? "brightness(0.97)" : "brightness(1)",
                    transform: isVisible && !prefersReducedMotion ? 
                      `translateY(0) scale(${isTransitioning ? 0.995 : 0.999})` : 
                      "translateY(16px) scale(0.98)",
                    animationDelay: !prefersReducedMotion && isVisible ? `${80 + (i * 80)}ms` : undefined,
                    animationDuration: !prefersReducedMotion ? "340ms" : undefined,
                    animationTimingFunction: !prefersReducedMotion ? "cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
                    animationFillMode: "both",
                    willChange: "transform, opacity",
                    zIndex: 1,
                  }}
                  onClick={() => handleCardTransition((currentIndex + i + 1) % testimonials.length)}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion && !isTransitioning) {
                      e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(0, 0, 0, 0.1), 0 6px 16px -2px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.filter = "brightness(1)";
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.005)";
                      
                      // Enhance rating stars on card hover
                      const stars = e.currentTarget.querySelector('.preview-stars');
                      if (stars) {
                        (stars as HTMLElement).style.transform = "scale(1.04)";
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!prefersReducedMotion && !isTransitioning) {
                      e.currentTarget.style.boxShadow = "0 4px 20px -4px rgba(0, 0, 0, 0.04), 0 2px 8px -2px rgba(0, 0, 0, 0.02)";
                      e.currentTarget.style.opacity = "0.85";
                      e.currentTarget.style.filter = "brightness(0.97)";
                      e.currentTarget.style.transform = "translateY(0) scale(0.999)";
                      
                      // Reset rating stars
                      const stars = e.currentTarget.querySelector('.preview-stars');
                      if (stars) {
                        (stars as HTMLElement).style.transform = "scale(1)";
                      }
                    }
                  }}
                >
                  {/* Rating */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.75rem" }}>
                    <div 
                      className="preview-stars"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1px",
                        transition: prefersReducedMotion ? "none" : "transform 120ms ease-out"
                      }}>
                      {[...Array(5)].map((_, j) => (
                        <svg 
                          key={j} 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          style={{ color: j < t.rating ? "#f59e0b" : "#e2e8f0" }}
                          aria-label={j < t.rating ? "Filled star" : "Empty star"}
                        >
                          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span style={{ 
                      fontSize: "0.75rem", color: "#64748b", fontWeight: 500, lineHeight: "1" 
                    }}>
                      {t.rating}.0
                    </span>
                  </div>

                  {/* Quote text */}
                  <p style={{ 
                    color: "#374151", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "0.75rem", 
                    fontWeight: 400, overflow: "hidden", display: "-webkit-box", 
                    WebkitLineClamp: 3, WebkitBoxOrient: "vertical" 
                  }}>
                    "{truncateText(t.content, 4)}"
                  </p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "auto" }}>
                    <img 
                      src={t.image} 
                      alt={`${t.name}'s profile`} 
                      style={{ 
                        width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", 
                        backgroundColor: "#e5e7eb", border: "2px solid #10b981", flexShrink: 0,
                        transition: prefersReducedMotion ? "none" : "filter 150ms ease"
                      }} 
                      onMouseEnter={(e) => {
                        if (!prefersReducedMotion) {
                          e.currentTarget.style.filter = "brightness(1.1) saturate(1.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!prefersReducedMotion) {
                          e.currentTarget.style.filter = "none";
                        }
                      }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ 
                        fontWeight: 700, color: "#1f2937", fontSize: "0.8125rem", 
                        marginBottom: "0.125rem", lineHeight: 1.3 
                      }}>
                        {t.name}
                      </div>
                      <div style={{ 
                        color: "#64748b", fontSize: "0.6875rem", fontWeight: 500, 
                        lineHeight: 1.4, marginBottom: "0.25rem", opacity: 0.75 
                      }}>
                        {t.role} • {t.location}
                      </div>
                      {t.project && (
                        <span style={{
                          display: "inline-block", padding: "2px 6px", backgroundColor: "#f1f5f9",
                          color: "#475569", fontWeight: 500, fontSize: "0.6875rem", borderRadius: "4px",
                          border: "1px solid rgba(226,232,240,.8)", textTransform: "capitalize",
                          letterSpacing: "0.01em", opacity: 0.85,
                        }}>
                          {t.project}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation indicators */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleCardTransition(i)}
                style={{
                  width: i === currentIndex ? "10px" : "6px", 
                  height: i === currentIndex ? "10px" : "6px", 
                  borderRadius: "50%",
                  backgroundColor: i === currentIndex ? "#10b981" : "#cbd5e1",
                  border: "none", cursor: "pointer", 
                  transition: prefersReducedMotion ? "none" : "all 150ms ease", 
                  opacity: i === currentIndex ? 1 : 0.4, padding: 0,
                  transform: i === currentIndex ? "scale(1)" : "scale(0.9)",
                  boxShadow: i === currentIndex ? "0 0 0 3px rgba(16, 185, 129, 0.15), 0 2px 4px rgba(16, 185, 129, 0.2)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion && i !== currentIndex) {
                    e.currentTarget.style.opacity = "0.7";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion && i !== currentIndex) {
                    e.currentTarget.style.opacity = "0.4";
                    e.currentTarget.style.transform = "scale(0.9)";
                  }
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
          <div style={{ 
            width: "32px", height: "1px", backgroundColor: "rgba(203,213,225,.2)", 
            borderRadius: "1px", overflow: "hidden" 
          }}>
            <div style={{ 
              height: "100%", backgroundColor: "rgba(16,185,129,.4)", borderRadius: "1px", 
              animation: "progress 6s linear infinite" 
            }} />
          </div>
        </div>

        {/* GitHub CTA pill */}
        <div style={{ textAlign: "center", paddingBottom: "0rem" }}>
          <a
            href="https://github.com/WulfTheGod/testimonials-component-aws"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View testimonials component source code on GitHub"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.375rem",
              padding: "0.4rem 0.85rem",
              backgroundColor: "#1f2937",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "18px",
              fontSize: "0.75rem",
              fontWeight: 500,
              transition: prefersReducedMotion ? "none" : "all 150ms ease-out",
              boxShadow: "0 4px 12px rgba(31, 41, 55, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              lineHeight: 1.2,
              opacity: 0.9,
            }}
            onMouseEnter={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.backgroundColor = "#374151";
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(31, 41, 55, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.15)";
                e.currentTarget.style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.backgroundColor = "#1f2937";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(31, 41, 55, 0.15)";
                e.currentTarget.style.opacity = "0.9";
              }
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>See the code on GitHub</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes progress { 
          from { width: 0% } 
          to { width: 100% } 
        }
        
        /* Responsive animation optimizations */
        @media (max-width: 768px) {
          .active-card, .preview-cards > div {
            animation-duration: 240ms !important;
          }
          .active-card:hover, .preview-cards > div:hover {
            transform: translateY(-2px) scale(1.01) !important;
          }
        }
        
        /* Performance optimizations */
        .active-card, .preview-cards > div {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transform: none !important;
          }
          .active-card, .preview-cards > div {
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}