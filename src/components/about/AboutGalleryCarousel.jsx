import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, X, Camera, ZoomIn } from 'lucide-react';
import { galleryPhotos } from '../../data/gallery';

/**
 * AboutGalleryCarousel: Premium automatic horizontal photo carousel for the About page.
 * - Displays all 22 original workshop & classroom photographs in a seamless loop.
 * - Clean and photograph-focused: No text overlays on carousel cards.
 * - Smooth linear auto-scroll at ~35px/s with RAF.
 * - Pauses on hover, keyboard focus, reduced motion, and when out of viewport.
 * - Manual play/pause toggle and previous/next navigation buttons.
 * - Full accessible lightbox with keyboard navigation, body scroll lock, and focus restoration.
 */
export default function AboutGalleryCarousel() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const lastActiveTriggerRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const accumulatedPosRef = useRef(0);

  // Check prefers-reduced-motion accessibility preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
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

  // Viewport detection to pause animation when scrolled away
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
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

    // Do not animate if user prefers reduced motion, lightbox is open, out of view, or paused
    const shouldRun =
      !prefersReducedMotion &&
      !isPaused &&
      !isHovered &&
      !isFocused &&
      !isTouching &&
      isInViewport &&
      activeLightboxIndex === null;

    if (!shouldRun) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    // Scroll speed: ~35 pixels per second (calm, dignified, smooth)
    const SPEED_PIXELS_PER_SEC = 35;

    const tick = (timestamp) => {
      if (!containerRef.current) return;

      if (lastTimeRef.current !== null) {
        const deltaMs = Math.min(timestamp - lastTimeRef.current, 64);
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
  }, [prefersReducedMotion, isPaused, isHovered, isFocused, isTouching, isInViewport, activeLightboxIndex]);

  // Pause temporarily after manual button navigation or touch
  const pauseTemporarily = useCallback((durationMs = 3200) => {
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

    const card = container.querySelector('.about-gallery-card');
    const stepSize = card ? card.offsetWidth + 20 : 340;
    const halfWidth = container.scrollWidth / 2;

    pauseTemporarily(3500);

    let targetLeft = container.scrollLeft + direction * stepSize;

    if (targetLeft < 0 && halfWidth > 0) {
      container.scrollLeft += halfWidth;
      targetLeft = container.scrollLeft + direction * stepSize;
    } else if (targetLeft >= halfWidth && halfWidth > 0) {
      container.scrollLeft -= halfWidth;
      targetLeft = container.scrollLeft + direction * stepSize;
    }

    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });

    accumulatedPosRef.current = targetLeft;
  };

  const handleTouchEnd = () => {
    pauseTemporarily(2500);
  };

  // Open Lightbox and remember trigger element for focus restoration
  const openLightbox = (index, event) => {
    lastActiveTriggerRef.current = event?.currentTarget || null;
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    // Restore focus to the card that triggered the lightbox
    setTimeout(() => {
      if (lastActiveTriggerRef.current && typeof lastActiveTriggerRef.current.focus === 'function') {
        lastActiveTriggerRef.current.focus();
      }
    }, 50);
  };

  // Lightbox Keyboard Navigation & Body Scroll Lock
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
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

  // Exactly 22 unique gallery photos rendered twice to form a seamless infinite loop
  const duplicatedPhotos = [...galleryPhotos, ...galleryPhotos];

  return (
    <div ref={sectionRef} className="w-full">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-brand-gold"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
            Visual Learning Archives
          </span>
        </div>

        {/* Action Controls: Photo count, Play/Pause, Prev/Next */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Photo Count Counter */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-border text-xs font-semibold text-brand-charcoal-muted shadow-subtle">
            <Camera className="w-3.5 h-3.5 text-brand-purple" />
            <span>{galleryPhotos.length} Authentic Photographs</span>
          </div>

          {/* Play / Pause Auto-scroll Button */}
          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
                isPaused
                  ? 'bg-brand-mauve border-brand-purple/40 text-brand-aubergine'
                  : 'bg-white border-brand-border hover:bg-stone-50 text-brand-charcoal'
              }`}
              title={isPaused ? "Resume continuous auto-scroll" : "Pause continuous auto-scroll"}
              aria-label={isPaused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-brand-aubergine text-brand-aubergine" />
                  <span>Resume Auto-Scroll</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-brand-purple" />
                  <span>Pause</span>
                </>
              )}
            </button>
          )}

          {/* Left & Right Step Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="w-8 h-8 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine flex items-center justify-center transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
              aria-label="Scroll left to previous photograph"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleStep(1)}
              className="w-8 h-8 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine flex items-center justify-center transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
              aria-label="Scroll right to next photograph"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with Subtle Gradient Vignette Masks */}
      <div className="relative w-full overflow-hidden rounded-xl">
        {/* Left Edge Fade Mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-brand-ivory via-brand-ivory/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Right Edge Fade Mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-brand-ivory via-brand-ivory/80 to-transparent z-10"
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
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-2 select-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
          aria-label="Classroom photo carousel. Use previous and next buttons or touch swipe to browse."
        >
          {duplicatedPhotos.map((photo, index) => {
            const originalIndex = index % galleryPhotos.length;
            const isFirstOccurrence = index < galleryPhotos.length;

            return (
              <div
                key={`${photo.id}-${index}`}
                role="button"
                tabIndex={0}
                onClick={(e) => openLightbox(originalIndex, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(originalIndex, e);
                  }
                }}
                aria-label={`View photo ${originalIndex + 1} of ${galleryPhotos.length}: ${photo.caption}`}
                className="about-gallery-card group relative w-[250px] sm:w-[290px] md:w-[320px] lg:w-[340px] shrink-0 aspect-[16/10] rounded-xl overflow-hidden bg-white border border-brand-border/80 shadow-subtle hover:shadow-card hover:border-brand-purple/40 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
              >
                {/* Clean, Undistorted Photographic Image without Text Overlays */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={isFirstOccurrence && index < 6 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  draggable={false}
                />

                {/* Subtle Hover Zoom Pill Indicator in Corner */}
                <span className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-brand-aubergine/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm backdrop-blur-xs pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
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
          onClick={closeLightbox}
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
                onClick={closeLightbox}
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
    </div>
  );
}
