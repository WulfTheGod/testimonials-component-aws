"use client";

import { memo, useEffect, useState } from "react";

interface ProgressIndicatorProps {
  duration: number; // in milliseconds
  isActive: boolean;
  onComplete: () => void;
  resetKey?: string | number; // Force restart when this changes
  className?: string;
}

const ProgressIndicator = memo(function ProgressIndicator({
  duration,
  isActive,
  onComplete,
  resetKey,
  className = "",
}: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Always reset progress when resetKey changes or when becoming inactive
    setProgress(0);
    
    if (!isActive) {
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete, resetKey]);

  return (
    <div className={`mx-auto bg-gray-200/30 rounded-full overflow-hidden ${className}`} 
         style={{ 
           width: '35%', 
           height: '0.5px',
           opacity: 0.4
         }}>
      <div
        className="h-full bg-emerald-400/60 transition-all duration-75 ease-linear rounded-full"
        style={{ 
          width: `${progress}%`,
          transform: isActive ? 'translateX(0)' : 'translateX(-100%)'
        }}
      />
    </div>
  );
});

export default ProgressIndicator;