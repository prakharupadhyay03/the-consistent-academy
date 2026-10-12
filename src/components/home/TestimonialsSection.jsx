import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

// The 4 verified testimonial cohorts for desktop (3 per group, group 4 features milestone achievements)
const DESKTOP_GROUPS = [
  testimonials.slice(0, 3), // Ninoshka, Sucharita, Deepak S.
  testimonials.slice(3, 6), // Atharv, Shreya, Amol D.
  testimonials.slice(6, 9), // Neha O., Monika, IT Aspirant
  testimonials.slice(9, 10), // Sudhanshu
];

const AUTO_INTERVAL_MS = 7000;
const PROGRESS_STEP_MS = 50;

/**
 * Reusable Testimonial Card with premium hover interactions:
 * - 3-4px upward translation (hover:-translate-y-1)
 * - Subtle shadow transition (shadow-subtle to hover:shadow-card)
 * - Gold stars brighten subtly on card hover (group-hover:fill-amber-400)
 * - Pristine white background with deep aubergine and academy purple accents
 */
function TestimonialCard({ item, isSpotlight = false }) {
  return (
    <div
      className={`group bg-white rounded-xl border border-brand-border p-5 sm:p-6 lg:p-7 shadow-subtle hover:shadow-card hover:-translate-y-1 hover:border-brand-purple/35 transition-all duration-200 ease-out flex flex-col justify-between h-full ${
        isSpotlight ? 'ring-1 ring-brand-purple/20 bg-gradient-to-b from-white to-brand-ivory/30' : ''
      }`}
    >
      <div>
        {/* Rating Stars & Band Score Pill */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-1"
            aria-label={`${item.rating} out of 5 stars`}
          >
            {[...Array(item.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-brand-gold text-brand-gold transition-colors duration-200 group-hover:fill-amber-400 group-hover:text-amber-400"
              />
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-brand-gold-light text-[#7C5A26] border border-brand-gold-border font-sans">
            {item.score}
          </span>
        </div>

        {/* Testimonial Quote */}
        <p className="text-xs sm:text-sm text-brand-charcoal leading-relaxed italic mb-6">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Student Profile & Destination Metadata */}
      <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-2 mt-auto">
        <div className="min-w-0 pr-2">
          <h4 className="font-heading text-sm font-bold text-brand-aubergine truncate">
            {item.name}
          </h4>
          <p className="text-[11px] text-brand-charcoal-muted font-sans truncate">
            {item.role}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-semibold text-brand-purple flex items-center gap-1 justify-end font-sans">
            <span aria-hidden="true">{item.flag}</span>
            <span>{item.destination}</span>
          </span>
          <span className="text-[10px] text-brand-charcoal-muted block font-sans">
            First Attempt
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  const totalGroups = DESKTOP_GROUPS.length; // 4
  const totalTestimonials = testimonials.length; // 10

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Responsive breakpoint detection (Mobile < 768px vs Desktop >= 768px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause when browser tab is inactive / hidden
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Lightweight IntersectionObserver for scroll-reveal entrance
  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Sync mobile index with active group when switching modes
  const syncIndices = useCallback((newGroup, newMobileIdx) => {
    setActiveGroup(newGroup);
    setMobileIndex(newMobileIdx);
    setElapsed(0);
  }, []);

  // Manual Navigation Handlers with debouncing guard against rapid double clicks
  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const isMobileMode = typeof window !== 'undefined' ? window.innerWidth < 768 : isMobile;

    if (isMobileMode) {
      const nextMobile = (mobileIndex + 1) % totalTestimonials;
      const nextGrp = Math.min(3, Math.floor(nextMobile / 3));
      syncIndices(nextGrp, nextMobile);
    } else {
      const nextGrp = (activeGroup + 1) % totalGroups;
      const nextMobile = nextGrp * 3 < totalTestimonials ? nextGrp * 3 : totalTestimonials - 1;
      syncIndices(nextGrp, nextMobile);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [isMobile, mobileIndex, totalTestimonials, activeGroup, totalGroups, syncIndices]);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const isMobileMode = typeof window !== 'undefined' ? window.innerWidth < 768 : isMobile;

    if (isMobileMode) {
      const prevMobile = (mobileIndex - 1 + totalTestimonials) % totalTestimonials;
      const prevGrp = Math.min(3, Math.floor(prevMobile / 3));
      syncIndices(prevGrp, prevMobile);
    } else {
      const prevGrp = (activeGroup - 1 + totalGroups) % totalGroups;
      const prevMobile = prevGrp * 3 < totalTestimonials ? prevGrp * 3 : totalTestimonials - 1;
      syncIndices(prevGrp, prevMobile);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [isMobile, mobileIndex, totalTestimonials, activeGroup, totalGroups, syncIndices]);

  const jumpToGroup = useCallback((groupIndex) => {
    if (isTransitioningRef.current || groupIndex === activeGroup) return;
    isTransitioningRef.current = true;

    const targetMobile = groupIndex * 3 < totalTestimonials ? groupIndex * 3 : totalTestimonials - 1;
    syncIndices(groupIndex, targetMobile);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [activeGroup, totalTestimonials, syncIndices]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsHovered(true); // pause timer while touching
  };

  const handleTouchMove = (e) => {
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    const swipeThreshold = 45; // 45px swipe threshold
    if (touchDeltaXRef.current < -swipeThreshold) {
      handleNext();
    } else if (touchDeltaXRef.current > swipeThreshold) {
      handlePrev();
    }
    touchDeltaXRef.current = 0;
  };

  // Automatic Carousel Interval & Progress Bar Timer
  const isPaused = isHovered || isFocused || isTabHidden;

  // Progress ticker effect
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + PROGRESS_STEP_MS;
        if (next >= AUTO_INTERVAL_MS) {
          return AUTO_INTERVAL_MS;
        }
        return next;
      });
    }, PROGRESS_STEP_MS);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  // Trigger advance when interval is reached
  useEffect(() => {
    if (elapsed >= AUTO_INTERVAL_MS) {
      handleNext();
      setElapsed(0);
    }
  }, [elapsed, handleNext]);

  // Current progress percentage of the 7-second interval (0 to 100%)
  const progressPercent = Math.min(100, (elapsed / AUTO_INTERVAL_MS) * 100);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-24 bg-brand-ivory border-b border-brand-border overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      aria-label="Student Testimonials and Outcomes"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-Reveal Fade & Upward Motion */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 transition-all duration-700 ease-out ${
            hasRevealed || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-brand-gold" aria-hidden="true"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
                Verified Alumni Outcomes
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-aubergine tracking-tight mt-3">
              Real Testimonies from Global Achievers
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-charcoal-muted leading-relaxed font-sans">
              From healthcare practitioners to engineering students, our alumni have achieved their required IELTS band scores on their first attempt and pursued their dreams across Canada, Germany, Australia, and the UK.
            </p>
          </div>

          {/* Carousel Navigation: 4 Progress Indicators & Chevron Arrows */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 self-start md:self-end">
            
            {/* 4 Animated Carousel Progress Indicators */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Testimonial cohorts"
            >
              {[0, 1, 2, 3].map((grpIdx) => {
                const isActive = activeGroup === grpIdx;
                const isPast = activeGroup > grpIdx;

                return (
                  <button
                    key={grpIdx}
                    type="button"
                    onClick={() => jumpToGroup(grpIdx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to testimonial cohort ${grpIdx + 1} of ${totalGroups}`}
                    className="group relative p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    {/* Progress Bar Track */}
                    <div className="w-8 sm:w-11 md:w-12 h-1.5 rounded-full bg-stone-200 overflow-hidden transition-colors group-hover:bg-stone-300">
                      <div
                        className={`h-full rounded-full bg-brand-purple ${
                          isActive && !prefersReducedMotion
                            ? 'transition-[width] duration-75 ease-linear'
                            : 'transition-all duration-300'
                        }`}
                        style={{
                          width: isActive
                            ? prefersReducedMotion
                              ? '100%'
                              : `${progressPercent}%`
                            : isPast
                            ? '100%'
                            : '0%',
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Cohort Counter Label */}
            <div className="text-xs font-semibold text-brand-charcoal-muted px-1 min-w-[55px] text-center font-sans">
              <span className="sr-only">Viewing group </span>
              {activeGroup + 1} / {totalGroups}
              {isMobile && (
                <span className="text-[10px] text-brand-purple ml-1 sm:hidden">
                  ({mobileIndex + 1}/{totalTestimonials})
                </span>
              )}
            </div>

            {/* Previous & Next Control Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 sm:p-2.5 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine transition-colors shadow-subtle hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
                aria-label={isMobile ? 'Previous testimonial' : 'Previous testimonial cohort'}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 sm:p-2.5 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine transition-colors shadow-subtle hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
                aria-label={isMobile ? 'Next testimonial' : 'Next testimonial cohort'}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Viewport with Scroll-Reveal Staggered Entrance */}
        <div
          className={`transition-all duration-700 delay-150 ease-out ${
            hasRevealed || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* DESKTOP & TABLET VIEW (3 Cards per Group, Group 4 Features Spotlight) */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform ease-out"
              style={{
                transform: `translateX(-${activeGroup * 100}%)`,
                transitionDuration: prefersReducedMotion ? '0ms' : '500ms',
              }}
            >
              {DESKTOP_GROUPS.map((group, grpIdx) => (
                <div key={grpIdx} className="w-full shrink-0">
                  <div className="grid grid-cols-3 gap-4 lg:gap-6">
                    {group.map((item, cardIdx) => (
                      <div
                        key={item.id}
                        className={`h-full ${
                          group.length === 1 ? 'col-start-2' : ''
                        } transition-all duration-500 ease-out ${
                          hasRevealed || prefersReducedMotion
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{
                          transitionDelay: prefersReducedMotion
                            ? '0ms'
                            : `${200 + cardIdx * 100}ms`,
                        }}
                      >
                        <TestimonialCard item={item} isSpotlight={group.length === 1} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW (One Card at a Time with Touch-Swipe & Full Accessibility of all 10 Testimonials) */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform ease-out"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
                transitionDuration: prefersReducedMotion ? '0ms' : '450ms',
              }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-0.5">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

            {/* Mobile Touch Guidance & Direct Micro Dots */}
            <div className="flex items-center justify-between mt-4 px-1 text-xs text-brand-charcoal-muted font-sans">
              <span className="text-[11px] text-stone-500">
                Swipe left / right to navigate
              </span>
              <div className="flex items-center gap-1" aria-hidden="true">
                {testimonials.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      mobileIndex === dotIdx
                        ? 'w-4 bg-brand-purple'
                        : 'w-1.5 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
