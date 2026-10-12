import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollRevealSection: Lightweight, accessible scroll-reveal container.
 * - Triggers once when the section enters the viewport.
 * - Respects prefers-reduced-motion: reduce immediately.
 * - Progressive enhancement: Content remains visible if JS or animation fails.
 * - Uses restrained 14px upward translation with 600ms ease.
 */
export default function ScrollRevealSection({ children, className = '', id }) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion or environment lacks IntersectionObserver, reveal immediately
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = domRef.current;
    if (el) {
      observer.observe(el);
    }

    // Safety fallback: Ensure visibility even under unexpected browser conditions
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      ref={domRef}
      id={id}
      className={`reveal-section ${isVisible ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
