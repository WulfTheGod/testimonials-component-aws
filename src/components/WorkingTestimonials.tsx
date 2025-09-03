"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn, truncateText } from "./testimonials/utils";
import { spacing, radii, shadows, opacity } from "./testimonials/tokens";
import { durations, transforms, variants } from "./testimonials/motion";
import type { Review } from "../types/review";

export default function WorkingTestimonials({ reviews = [] }: { reviews?: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Use mock data from JSON file for consistency
  const defaultTestimonials: Review[] = [
    {
      id: "1",
      name: "Sarah J.",
      role: "Homeowner",
      content: "Exceptional service! The team was professional and delivered exactly what we needed on time.",
      rating: 5,
      createdAt: "2024-02-15T10:30:00Z",
      image: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff&size=100&bold=true&format=png",
      location: "Montreal, QC",
      project: "Kitchen Renovation",
      source: "google",
      url: "https://maps.google.com/?q=review1"
    },
    {
      id: "2", 
      name: "Michael C.",
      role: "Property Manager",
      content: "Outstanding work! They transformed our business processes and exceeded all expectations. Highly recommend for any organization looking to modernize.",
      rating: 5,
      createdAt: "2024-02-10T14:20:00Z",
      image: "https://ui-avatars.com/api/?name=MC&background=10b981&color=fff&size=100&bold=true&format=png",
      project: "Business Modernization",
      location: "Mississauga, ON",
      source: "google"
    },
    {
      id: "3",
      name: "Emily R.", 
      role: "Homeowner",
      content: "Great experience working with this team. Good communication throughout the project.",
      rating: 4,
      createdAt: "2024-02-05T09:15:00Z",
      image: "https://ui-avatars.com/api/?name=ER&background=8b5cf6&color=fff&size=100&bold=true&format=png",
      location: "Quebec City, QC",
      project: "Bathroom Renovation",
      source: "google",
      url: "https://maps.google.com/?q=review3"
    }
  ];

  const testimonials = reviews.length > 0 ? reviews : defaultTestimonials;
  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonials = testimonials.length > 1 ? [
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ] : [];

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((p) => (p + 1) % testimonials.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length, isTransitioning]);

  // Smooth card transition handler
  const handleCardTransition = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    const timer = setTimeout(() => setIsTransitioning(false), durations.swap * 1000);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);

  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-white py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-emerald-500/3 rounded-full filter blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-slate-900/3 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: durations.enter, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            What Our Clients Say
          </h2>
          <p 
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" 
            style={{ opacity: opacity.metadata }}
          >
            Hear from satisfied clients who have experienced our service firsthand.
          </p>
        </motion.header>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 lg:gap-6 mb-8 md:mb-10"
          variants={variants.section}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Active testimonial */}
          <motion.div
            layout
            variants={variants.card}
            className={cn(
              'relative bg-white border border-slate-200/60',
              'transition-all duration-150 ease-out will-change-transform',
              radii.card,
              shadows.cardActive,
              'z-10 px-6 py-6 md:px-8 md:py-7 min-h-[320px] flex flex-col'
            )}
            style={{
              scale: transforms.activeScale,
            }}
            whileHover={!prefersReducedMotion ? {
              y: transforms.liftY,
              scale: 1.015,
              transition: { duration: durations.hover },
            } : {}}
          >
            {/* Quote icon */}
            <div className="absolute top-4 right-4 text-emerald-500/12 z-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 z-2 relative">
              <motion.div
                className="flex items-center gap-0.5"
                whileHover={!prefersReducedMotion ? {
                  scale: 1.04,
                  transition: { duration: durations.stars },
                } : {}}
                role="img"
                aria-label={`Rating: ${currentTestimonial.rating} out of 5`}
              >
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-200'
                    )}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </motion.div>
              <span className="text-sm font-semibold text-slate-500">
                {currentTestimonial.rating}.0
              </span>
            </div>

            {/* Quote text */}
            <blockquote className="text-lg leading-[1.76] text-slate-700 font-normal flex-1 mb-6 z-2 relative">
              "{truncateText(currentTestimonial.content, 6)}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto z-2 relative">
              {/* Google badge */}
              {currentTestimonial.source === "google" && (
                <div className="absolute -bottom-3 right-0 inline-flex items-center gap-1 bg-white/98 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md border border-gray-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xs font-medium text-gray-700">Google</span>
                </div>
              )}

              <motion.img
                src={currentTestimonial.image}
                alt={`${currentTestimonial.name}'s profile`}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 flex-shrink-0"
                whileHover={{
                  filter: 'brightness(1.1)',
                  transition: { duration: durations.stars },
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-slate-900">
                  {currentTestimonial.name}
                </div>
                <div 
                  className="text-sm font-medium text-slate-500"
                  style={{ opacity: opacity.metadata }}
                >
                  {currentTestimonial.role} • {currentTestimonial.location}
                </div>
                {currentTestimonial.project && (
                  <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-medium rounded-md border border-slate-200/80 capitalize text-xs mt-1.5">
                    {currentTestimonial.project}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Preview testimonials */}
          <div className="flex flex-col gap-4">
            {nextTestimonials.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                variants={variants.card}
                className={cn(
                  'relative bg-white border border-slate-200/50 cursor-pointer',
                  'transition-all duration-150 ease-out will-change-transform',
                  radii.card,
                  shadows.card,
                  'z-1 px-5 py-5 md:px-6 md:py-6 min-h-[140px] flex flex-col',
                  'hover:' + shadows.cardHover.replace('shadow-', '')
                )}
                style={{
                  opacity: opacity.preview,
                  scale: transforms.previewScale,
                  filter: 'brightness(0.97)',
                }}
                whileHover={!prefersReducedMotion ? {
                  opacity: 1,
                  scale: transforms.hoverScale,
                  y: transforms.mobileLiftY,
                  filter: 'brightness(1)',
                  transition: { duration: durations.hover },
                } : {}}
                onClick={() => handleCardTransition((currentIndex + index + 1) % testimonials.length)}
              >
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="flex items-center gap-0.5 transition-transform duration-120"
                    role="img"
                    aria-label={`Rating: ${review.rating} out of 5`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'w-3.5 h-3.5',
                          i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                        )}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </motion.div>
                  <span className="text-xs font-semibold text-slate-500">
                    {review.rating}.0
                  </span>
                </div>

                {/* Quote text */}
                <blockquote className="text-sm leading-relaxed text-slate-700 font-normal flex-1 mb-3 line-clamp-3">
                  "{truncateText(review.content, 4)}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <motion.img
                    src={review.image}
                    alt={`${review.name}'s profile`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 flex-shrink-0"
                    whileHover={{
                      filter: 'brightness(1.1)',
                      transition: { duration: durations.stars },
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900">
                      {review.name}
                    </div>
                    <div 
                      className="text-xs font-medium text-slate-500"
                      style={{ opacity: opacity.metadata }}
                    >
                      {review.role} • {review.location}
                    </div>
                    {review.project && (
                      <span className="inline-block px-2 py-1 bg-slate-50 text-slate-600 font-medium rounded-md border border-slate-200/80 capitalize text-xs mt-1 scale-90 origin-left">
                        {review.project}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex flex-col items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: durations.enter }}
        >
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardTransition(index)}
                className={cn(
                  'rounded-full border-none cursor-pointer transition-all duration-150 ease-out p-0',
                  index === currentIndex 
                    ? 'w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15),0_2px_4px_rgba(16,185,129,0.2)]'
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400 hover:scale-110'
                )}
                style={{ opacity: index === currentIndex ? 1 : 0.4 }}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="w-8 h-0.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 rounded-full animate-[progress_6s_linear_infinite]"
              style={{ animationPlayState: isTransitioning ? 'paused' : 'running' }}
            />
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: durations.enter }}
        >
          <motion.a
            href="https://github.com/WulfTheGod/testimonials-component-aws"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-sm font-medium',
              'rounded-2xl shadow-[0_4px_12px_rgba(31,41,55,0.15)] border border-white/10',
              'transition-all duration-150 ease-out hover:scale-105 hover:shadow-[0_8px_24px_rgba(31,41,55,0.25)]',
              'hover:bg-slate-700'
            )}
            style={{ opacity: 0.9 }}
            whileHover={{ 
              opacity: 1,
              boxShadow: '0 8px 24px rgba(31, 41, 55, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.15)'
            }}
            aria-label="View testimonials component source code on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            See the code on GitHub
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @keyframes progress { 
          from { width: 0% } 
          to { width: 100% } 
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}