"use client";

import { useRef, ReactNode } from "react";

interface SwipeHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  className?: string;
  children: ReactNode;
}

export default function SwipeHandler({
  onSwipeLeft,
  onSwipeRight,
  className = "",
  children,
}: SwipeHandlerProps) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}