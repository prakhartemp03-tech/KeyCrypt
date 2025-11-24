'use client';

import { useEffect, useRef } from 'react';

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'scale-in' | 'stagger-fade';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedContainer({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 300,
  className = ''
}: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    // Set initial state based on animation type
    switch (animation) {
      case 'fade-in':
        element.style.opacity = '0';
        element.style.transform = 'translateY(0)';
        break;
      case 'slide-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        break;
      case 'scale-in':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        break;
      case 'stagger-fade':
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        break;
    }

    // Apply transition styles
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

    // Trigger animation after delay
    const timeoutId = setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animation, delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Hook for staggered animations on child elements
export function useStaggeredAnimation(childCount: number, baseDelay: number = 100) {
  return (index: number) => ({
    animation: 'fade-in' as const,
    delay: baseDelay * index,
    duration: 300
  });
}