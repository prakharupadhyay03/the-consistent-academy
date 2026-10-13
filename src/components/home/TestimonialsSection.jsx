import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

// The 4 verified testimonial cohorts (3 per group, cohort 4 features milestone achievements)
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
 * - Subtle lift on hover: translateY(-5px)
 * - Soft, elegant shadow with aubergine and subtle purple depth
 * - Slightly more prominent border using existing purple accent (hover:border-brand-purple/50)
 * - Smooth transition: 300ms ease-out
 * - Respects prefers-reduced-motion
 * - Essential content always visible without requiring hover
 * - Preserves existing white card, cream background, gold stars, purple accents, typography, and badges
 */
function TestimonialCard({ item, isSpotlight = false }) {
  return (
    <div
      className={`group bg-white rounded-xl border border-brand-border p-5 sm:p-6 lg:p-7 shadow-subtle hover:shadow-[0_12px_24px_-4px_rgba(53,33,59,0.08),0_4px_12px_-2px_rgba(150,54,245,0.06)] hover:-translate-y-[5px] hover:border-brand-purple/50 motion-reduce:hover:translate-y-0 motion-reduce:transition-none transition-all duration-300 ease-out flex flex-col justify-between h-full select-none ${
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
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const isTransitioningRef = useRef(false);
  const isScrollingProgrammaticallyRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

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

  // Responsive breakpoint detection (Mobile < 640px vs Tablet/Desktop >= 640px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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

  // Smooth programmatic scroll to a specific card index
  const scrollToCard = useCallback(
    (targetCardIndex) => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const targetCard = cardRefs.current[targetCardIndex];
      if (!targetCard) return;

      isScrollingProgrammaticallyRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const containerRect = container.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const targetLeft = currentScroll + (cardRect.left - containerRect.left);

      const maxScroll = container.scrollWidth - container.clientWidth;
      const finalScroll = Math.max(0, Math.min(targetLeft, maxScroll));

      container.scrollTo({
        left: finalScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingProgrammaticallyRef.current = false;
      }, prefersReducedMotion ? 50 : 500);
    },
    [prefersReducedMotion]
  );

  // Manual scroll sync listener with active indicator tracking
  const handleScroll = useCallback(() => {
    if (isScrollingProgrammaticallyRef.current) return;
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // At the end: last card and last cohort
    if (maxScroll > 0 && scrollLeft >= maxScroll - 20) {
      setActiveGroup(totalGroups - 1);
      setMobileIndex(totalTestimonials - 1);
      return;
    }

    // At the start: first card and first cohort
    if (scrollLeft <= 15) {
      setActiveGroup(0);
      setMobileIndex(0);
      return;
    }

    const containerLeft = container.getBoundingClientRect().left;
    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const cardLeft = cardEl.getBoundingClientRect().left;
      const distance = Math.abs(cardLeft - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setMobileIndex(closestIndex);
    const groupIdx = Math.min(totalGroups - 1, Math.floor(closestIndex / 3));
    setActiveGroup(groupIdx);
  }, [totalGroups, totalTestimonials]);

  // Next navigation handler
  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const isMobileMode = typeof window !== 'undefined' ? window.innerWidth < 640 : isMobile;

    if (isMobileMode) {
      const nextMobile = (mobileIndex + 1) % totalTestimonials;
      const nextGrp = Math.min(3, Math.floor(nextMobile / 3));
      setActiveGroup(nextGrp);
      setMobileIndex(nextMobile);
      setElapsed(0);
      scrollToCard(nextMobile);
    } else {
      const nextGrp = (activeGroup + 1) % totalGroups;
      const targetCard = nextGrp * 3 < totalTestimonials ? nextGrp * 3 : totalTestimonials - 1;
      setActiveGroup(nextGrp);
      setMobileIndex(targetCard);
      setElapsed(0);
      scrollToCard(targetCard);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [isMobile, mobileIndex, totalTestimonials, activeGroup, totalGroups, scrollToCard]);

  // Prev navigation handler
  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const isMobileMode = typeof window !== 'undefined' ? window.innerWidth < 640 : isMobile;

    if (isMobileMode) {
      const prevMobile = (mobileIndex - 1 + totalTestimonials) % totalTestimonials;
      const prevGrp = Math.min(3, Math.floor(prevMobile / 3));
      setActiveGroup(prevGrp);
      setMobileIndex(prevMobile);
      setElapsed(0);
      scrollToCard(prevMobile);
    } else {
      const prevGrp = (activeGroup - 1 + totalGroups) % totalGroups;
      const targetCard = prevGrp * 3 < totalTestimonials ? prevGrp * 3 : totalTestimonials - 1;
      setActiveGroup(prevGrp);
      setMobileIndex(targetCard);
      setElapsed(0);
      scrollToCard(targetCard);
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [isMobile, mobileIndex, totalTestimonials, activeGroup, totalGroups, scrollToCard]);

  // Direct jump to cohort
  const jumpToGroup = useCallback(
    (groupIndex) => {
      if (isTransitioningRef.current || groupIndex === activeGroup) return;
      isTransitioningRef.current = true;

      const targetCard = groupIndex * 3 < totalTestimonials ? groupIndex * 3 : totalTestimonials - 1;
      setActiveGroup(groupIndex);
      setMobileIndex(targetCard);
      setElapsed(0);
      scrollToCard(targetCard);

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 450);
    },
    [activeGroup, totalTestimonials, scrollToCard]
  );

  // Keyboard navigation on scroll container
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
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
          {/* Horizontally Scrollable Testimonials Container */}
          <div className="relative w-full">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
              tabIndex={0}
              role="region"
              aria-label="Student testimonials carousel"
              className="testimonials-scroll-container flex items-stretch gap-4 sm:gap-5 lg:gap-6 overflow-x-auto overflow-y-visible py-4 px-1 -mx-1 snap-x snap-mandatory scroll-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 rounded-2xl"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="shrink-0 snap-start flex flex-col w-[85%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2*1.5rem)/3)] transition-all duration-500 ease-out"
                  style={{
                    transitionDelay: prefersReducedMotion ? '0ms' : `${Math.min(index * 60, 300)}ms`,
                  }}
                >
                  <TestimonialCard item={item} isSpotlight={item.id === 10} />
                </div>
              ))}
            </div>

            {/* Mobile Touch Guidance & Direct Micro Dots */}
            <div className="flex sm:hidden items-center justify-between mt-4 px-1 text-xs text-brand-charcoal-muted font-sans">
              <span className="text-[11px] text-stone-500">
                Swipe left / right to navigate
              </span>
              <div className="flex items-center gap-1" role="tablist" aria-label="Testimonial cards">
                {testimonials.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      setMobileIndex(dotIdx);
                      setActiveGroup(Math.min(3, Math.floor(dotIdx / 3)));
                      setElapsed(0);
                      scrollToCard(dotIdx);
                    }}
                    aria-label={`Go to testimonial ${dotIdx + 1} of ${totalTestimonials}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      mobileIndex === dotIdx
                        ? 'w-4 bg-brand-purple'
                        : 'w-1.5 bg-stone-300 hover:bg-stone-400'
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
