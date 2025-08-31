"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import NavigationDots from "./NavigationDots";
import ProgressIndicator from "./ProgressIndicator";
import SwipeHandler from "./SwipeHandler";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  location: string;
  project?: string;
}

interface CarouselContainerProps {
  testimonials: Testimonial[];
  autoScrollInterval?: number;
  pauseOnHover?: boolean;
}

const CarouselContainer = memo(function CarouselContainer({
  testimonials,
  autoScrollInterval = 5000,
  pauseOnHover = true,
}: CarouselContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-scroll
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Pause/resume auto-scroll
  const pauseAutoScroll = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const resumeAutoScroll = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Intersection Observer for auto-scroll activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoScrollActive(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Get preview testimonials for desktop
  const getPreviewTestimonials = () => {
    if (testimonials.length <= 1) return [];
    
    const previews = [];
    for (let i = 1; i <= 2; i++) {
      const index = (currentIndex + i) % testimonials.length;
      previews.push({ ...testimonials[index], previewIndex: i });
    }
    return previews;
  };

  const currentTestimonial = testimonials[currentIndex];
  const previewTestimonials = getPreviewTestimonials();

  if (!currentTestimonial) {
    return <div className="text-center text-gray-500">No testimonials available</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      <SwipeHandler
        onSwipeLeft={goToNext}
        onSwipeRight={goToPrevious}
        className="w-full"
      >
        {/* Mobile: Single testimonial view */}
        <div className="block lg:hidden">
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                  scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }}
                className="w-full"
              >
                <TestimonialCard
                  {...currentTestimonial}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: Main + Preview layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-6 min-h-[300px] items-start">
            {/* Main testimonial - reduced from col-span-8 to col-span-7 */}
            <div className="col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ 
                    duration: 0.65, 
                    ease: [0.22, 1, 0.36, 1],
                    scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="h-full"
                >
                  <TestimonialCard
                    {...currentTestimonial}
                    isActive={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preview testimonials - increased from col-span-4 to col-span-5 */}
            <div className="col-span-5 space-y-4">
              {previewTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-preview`}
                  initial={{ opacity: 0, x: 12, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                    scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  }}
                  whileHover={{ 
                    scale: 1.025, 
                    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } 
                  }}
                  whileTap={{ scale: 0.975 }}
                  onClick={() => goToSlide((currentIndex + index + 1) % testimonials.length)}
                >
                  <TestimonialCard
                    {...testimonial}
                    isPreview={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SwipeHandler>

      {/* Navigation Controls - Positioned below main testimonial, more subtle */}
      <div className="mt-6 flex flex-col items-center space-y-3">
        {/* Navigation Dots - Smaller and more subtle */}
        <div className="relative flex justify-center group opacity-50 hover:opacity-80 transition-opacity duration-500">
          <NavigationDots
            total={testimonials.length}
            current={currentIndex}
            onDotClick={goToSlide}
            className="scale-75"
          />
        </div>

        {/* Progress Indicator - extremely subtle, positioned after dots */}
        <ProgressIndicator
          duration={autoScrollInterval}
          isActive={isAutoScrollActive && !isPaused && testimonials.length > 1}
          onComplete={goToNext}
          resetKey={currentIndex}
          className="opacity-30"
        />

        {/* Extremely subtle counter - appears on hover of navigation area */}
        <div className="opacity-0 hover:opacity-30 transition-opacity duration-700">
          <span className="text-xs text-gray-400/40 font-mono select-none tracking-wide">
            {currentIndex + 1} / {testimonials.length}
          </span>
        </div>

        {/* Hidden pause button - only for accessibility */}
        <div className="sr-only">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CarouselContainer;