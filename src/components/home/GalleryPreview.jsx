import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, X, ZoomIn, ExternalLink } from 'lucide-react';
import { galleryPhotos } from '../../data/gallery';
import Button from '../common/Button';

export default function GalleryPreview() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const accumulatedPosRef = useRef(0);

  // Check prefers-reduced-motion accessibility preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  // Sync accumulatedPos with container.scrollLeft when user manually scrolls or touches
  const handleScroll = () => {
    if (containerRef.current && (isTouching || isHovered || isFocused)) {
      accumulatedPosRef.current = containerRef.current.scrollLeft;
    }
  };

  // Continuous automatic scrolling loop using requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Do not animate if user prefers reduced motion, lightbox is open, or paused/hovered/focused/touching
    const shouldRun =
      !prefersReducedMotion &&
      !isPaused &&
      !isHovered &&
      !isFocused &&
      !isTouching &&
      activeLightboxIndex === null;

    if (!shouldRun) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    // Scroll speed: ~38 pixels per second (calm, dignified, legible)
    const SPEED_PIXELS_PER_SEC = 38;

    const tick = (timestamp) => {
      if (!containerRef.current) return;

      if (lastTimeRef.current !== null) {
        const deltaMs = Math.min(timestamp - lastTimeRef.current, 64); // Guard against tab inactive spikes
        const deltaPixels = (SPEED_PIXELS_PER_SEC * deltaMs) / 1000;

        accumulatedPosRef.current += deltaPixels;

        const halfWidth = containerRef.current.scrollWidth / 2;
        if (halfWidth > 0 && accumulatedPosRef.current >= halfWidth) {
          accumulatedPosRef.current -= halfWidth;
        }

        containerRef.current.scrollLeft = accumulatedPosRef.current;
      }

      lastTimeRef.current = timestamp;
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [prefersReducedMotion, isPaused, isHovered, isFocused, isTouching, activeLightboxIndex]);

  // Pause temporarily after manual button navigation or touch end
  const pauseTemporarily = useCallback((durationMs = 3000) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    setIsTouching(true);
    resumeTimerRef.current = setTimeout(() => {
      setIsTouching(false);
      if (containerRef.current) {
        accumulatedPosRef.current = containerRef.current.scrollLeft;
      }
    }, durationMs);
  }, []);

  // Manual Step Navigation (Left/Right)
  const handleStep = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    // Calculate step based on visible card width + gap
    const card = container.querySelector('.gallery-card');
    const stepSize = card ? card.offsetWidth + 24 : 380;
    const halfWidth = container.scrollWidth / 2;

    pauseTemporarily(3500);

    let targetLeft = container.scrollLeft + direction * stepSize;

    // Seamless wrapping in manual navigation
    if (targetLeft < 0 && halfWidth > 0) {
      container.scrollLeft += halfWidth;
      targetLeft = container.scrollLeft + direction * stepSize;
    } else if (targetLeft >= halfWidth && halfWidth > 0) {
      container.scrollLeft -= halfWidth;
      targetLeft = container.scrollLeft + direction * stepSize;
    }

    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });

    accumulatedPosRef.current = targetLeft;
  };

  // Handle Touch End on Mobile
  const handleTouchEnd = () => {
    pauseTemporarily(2500);
  };

  // Lightbox Keyboard Navigation & Body Scroll Lock
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % galleryPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex]);

  // Exactly 22 unique gallery photos rendered twice to form a seamless loop
  const duplicatedPhotos = [...galleryPhotos, ...galleryPhotos];

  return (
    <section 
      id="gallery" 
      className="py-20 lg:py-24 bg-brand-ivory border-b border-brand-border overflow-hidden"
      aria-label="Academy Photography Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        
        {/* Section Heading & Control Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Left-Aligned Editorial Masthead */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
                Classroom &amp; Seminar Archives
              </span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-brand-aubergine tracking-tight mt-3 leading-tight">
              Moments of Consistent Growth
            </h2>
            
            <p className="mt-2.5 text-sm sm:text-base text-brand-charcoal-muted leading-relaxed font-sans">
              An unedited visual chronicle of our 22 authentic masterclasses, student presentations, elocution debates, and milestone recognitions in Pune.
            </p>
          </div>

          {/* Editorial Navigation & Auto-Scroll Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Play / Pause Auto-scroll Button */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className={`h-9 inline-flex items-center gap-1.5 px-3 sm:px-3.5 rounded-lg border text-xs font-semibold transition-all shadow-subtle ${
                  isPaused
                    ? 'bg-brand-mauve border-brand-purple/40 text-brand-aubergine'
                    : 'bg-white border-brand-border hover:bg-stone-50 text-brand-charcoal'
                }`}
                title={isPaused ? "Resume continuous auto-scroll" : "Pause continuous auto-scroll"}
                aria-label={isPaused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-brand-aubergine text-brand-aubergine" />
                    <span>Auto-Scroll: Paused</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Auto-Scroll: Active</span>
                  </>
                )}
              </button>
            )}

            {/* Left & Right Step Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                className="w-9 h-9 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine flex items-center justify-center transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                aria-label="Scroll left to previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleStep(1)}
                className="w-9 h-9 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine flex items-center justify-center transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                aria-label="Scroll right to next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Horizontal Carousel Track with Subtle Gradient Vignette Masks */}
      <div className="relative w-full">
        
        {/* Left Edge Fade Mask */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-brand-ivory via-brand-ivory/80 to-transparent z-10" 
          aria-hidden="true" 
        />

        {/* Right Edge Fade Mask */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-brand-ivory via-brand-ivory/80 to-transparent z-10" 
          aria-hidden="true" 
        />

        {/* Continuous Scroll Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-4 sm:px-8 select-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
          aria-label="Scrollable photo carousel. Use left and right arrow keys or tab to browse photos."
        >
          {duplicatedPhotos.map((photo, index) => {
            const originalIndex = index % galleryPhotos.length;
            const isFirstOccurrence = index < galleryPhotos.length;

            return (
              <div
                key={`${photo.id}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveLightboxIndex(originalIndex)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxIndex(originalIndex);
                  }
                }}
                aria-label={`Open photo: ${photo.caption} (${originalIndex + 1} of ${galleryPhotos.length})`}
                className="gallery-card group relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[410px] shrink-0 aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-brand-border/80 shadow-card hover:shadow-elevated transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
              >
                {/* Landscape Photographic Image */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={isFirstOccurrence && index < 6 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  draggable={false}
                />

                {/* Refined Bottom Gradient Scrim (Protects caption legibility without obscuring the photograph) */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-brand-aubergine-deep/90 via-brand-aubergine-deep/30 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" 
                  aria-hidden="true"
                />

                {/* Upper Category Tag & Zoom Indicator */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-aubergine/80 text-white backdrop-blur-xs border border-white/10">
                    {photo.category || "Classroom"}
                  </span>
                  
                  <span className="w-7 h-7 rounded-full bg-white/90 text-brand-aubergine flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Bottom Editorial Caption */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white z-10">
                  <p className="font-heading text-xs sm:text-sm font-semibold leading-snug line-clamp-2 text-stone-100 group-hover:text-white transition-colors">
                    {photo.caption}
                  </p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-sans">
                    The Consistent Academy · Pune
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Accessible Photo Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${activeLightboxIndex + 1} of ${galleryPhotos.length}`}
          className="fixed inset-0 z-50 bg-brand-aubergine-deep/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Modal Content Box */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white mb-3 px-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  Photo {activeLightboxIndex + 1} of {galleryPhotos.length}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-xs text-stone-300 uppercase tracking-wide">
                  {galleryPhotos[activeLightboxIndex].category}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close photo preview (Escape key)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image Frame */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-elevated">
              <img
                src={galleryPhotos[activeLightboxIndex].src}
                alt={galleryPhotos[activeLightboxIndex].caption}
                className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain block mx-auto"
              />

              {/* In-Modal Previous Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length)}
                className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-brand-purple text-white transition-colors backdrop-blur-xs border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                aria-label="Previous photograph (Left Arrow key)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* In-Modal Next Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex((prev) => (prev + 1) % galleryPhotos.length)}
                className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-brand-purple text-white transition-colors backdrop-blur-xs border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                aria-label="Next photograph (Right Arrow key)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="w-full mt-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <div>
                <p className="font-heading text-base sm:text-lg font-bold text-stone-100">
                  {galleryPhotos[activeLightboxIndex].caption}
                </p>
                <p className="text-xs text-stone-300 font-sans mt-0.5">
                  The Consistent Academy · Pune Classroom &amp; Hybrid Cohort Archives
                </p>
              </div>

              <div className="text-xs text-stone-400 font-sans shrink-0">
                <span>Use </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 font-mono text-[11px]">←</kbd>
                <span> </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 font-mono text-[11px]">→</kbd>
                <span> keys to browse • </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 font-mono text-[11px]">ESC</kbd>
                <span> to close</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
