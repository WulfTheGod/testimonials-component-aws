"use client";

import { memo } from "react";

interface NavigationDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

const NavigationDots = memo(function NavigationDots({
  total,
  current,
  onDotClick,
  className = "",
}: NavigationDotsProps) {
  if (total <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 focus:ring-offset-1 ${
            index === current
              ? "bg-emerald-400/60 scale-125"
              : "bg-gray-300/40 hover:bg-gray-400/50"
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
});

export default NavigationDots;