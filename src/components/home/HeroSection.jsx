import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Check, Play, Pause } from 'lucide-react';
import Button from '../common/Button';

// Selected authentic classroom & academic photographs from existing repository archives
// Clean photographic scenes: students learning, teachers guiding, university classrooms
// No poster collages, no flyers, and no text-heavy graphics
const HERO_SLIDES = [
  {
    id: 'classroom-mentorship',
    src: '/gallery/v15.jpeg',
    mobileSrc: null,
    alt: 'Master trainer Vidya Wankhade conducting an interactive English coaching session with students at lecture desks',
    label: 'Classroom Mentorship',
    caption: 'Active Classroom Coaching & Student Mentorship',
    position: 'center 35%',
    mobilePosition: '60% 20%',
  },
  {
    id: 'university-classroom',
    src: '/gallery/v9.jpeg',
    mobileSrc: null,
    alt: 'University classroom with attentive students seated at study desks in white shirts and ties',
    label: 'Study Hall',
    caption: 'University Lecture & Individual Study Hall',
    position: 'center 40%',
    mobilePosition: 'center 25%',
  },
  {
    id: 'curricula-seminar',
    src: '/gallery/v14.jpeg',
    mobileSrc: null,
    alt: 'Academic student seminar cohort engaged in English curriculum discussion at seminar table',
    label: 'Curricula Seminar',
    caption: 'Academic Curricula & English Seminar Cohort',
    position: 'center 30%',
    mobilePosition: 'center 20%',
  },
  {
    id: 'lecture-cohort',
    src: '/gallery/v6.png',
    mobileSrc: null,
    alt: 'Classroom cohort of students with notebooks and books engaged in classroom learning',
    label: 'Classroom Cohort',
    caption: 'Interactive Classroom Learning & Student Engagement',
    position: 'center 35%',
    mobilePosition: 'center 25%',
  },
  {
    id: 'academic-symposium',
    src: '/gallery/v11.jpeg',
    mobileSrc: null,
    alt: 'Academic student seminar and communication forum cohort in university hall',
    label: 'Speech Forum',
    caption: 'Academic Symposium & Speech Forum Cohort',
    position: 'center 40%',
    mobilePosition: 'center 25%',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect and respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Preload slides for smooth, flicker-free crossfades
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  // Smooth cinematic auto-advance (7 seconds per photograph)
  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPlaying, isReducedMotion]);

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSelectSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-brand-ivory pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 xl:pt-40 border-b border-brand-border overflow-hidden">

      {/* ==================================================================== */}
      {/* CINEMATIC FULL-WIDTH BACKGROUND SLIDESHOW LAYER                      */}
      {/* ==================================================================== */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <div
              key={slide.id}
              className={`hero-slide-wrapper ${isActive ? 'is-active' : ''}`}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <picture className="w-full h-full block">
                {slide.mobileSrc && (
                  <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                )}
                <img
                  src={slide.src}
                  alt=""
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className={`hero-slide-img ${isActive && !isReducedMotion ? 'hero-slide-zoom' : ''
                    } ${!isPlaying ? 'hero-slide-paused' : ''}`}
                  style={{
                    objectPosition: slide.position,
                    '--desktop-pos': slide.position,
                    '--mobile-pos': slide.mobilePosition || slide.position,
                  }}
                />
              </picture>
            </div>
          );
        })}

        {/* Top Vignette on Mobile for Seamless Floating Navbar Transition */}
        <div className="hero-vignette-top md:hidden" />

        {/* Carefully Balanced Ivory Gradient Overlay (Stronger on left reading area, transparent towards right) */}
        <div className="hero-gradient-overlay" />

        {/* Bottom Vignette for Seamless Section Transition */}
        <div className="hero-vignette-bottom" />
      </div>

      {/* ==================================================================== */}
      {/* TEXT-FIRST EDITORIAL HERO FOREGROUND CONTENT                         */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Spacious, Single-Column Text-Focused Composition */}
        <div className="max-w-4xl space-y-4 sm:space-y-6">

          {/* 1. Brand Label */}
          <div className="hero-animate-label">
            <span className="text-[11px] sm:text-[13px] font-heading font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-brand-purple">
              The Consistent Academy
            </span>
          </div>

          {/* 2. Credential Line */}
          <div className="flex items-center gap-2 sm:gap-3 hero-animate-label">
            <span className="h-[2px] w-5 sm:w-8 rounded-full bg-brand-gold shrink-0"></span>
            <span className="text-[11px] sm:text-[13px] font-heading font-bold uppercase tracking-wide sm:tracking-wider text-[#7C5A26] leading-snug">
              British Council Certified Pedagogy · Pune, Maharashtra
            </span>
          </div>

          {/* 3. Distinctive Main Headline */}
          <h1 className="font-heading font-bold text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-[3.65rem] text-brand-aubergine-deep tracking-[-0.025em] leading-[1.18] sm:leading-[1.15] hero-animate-headline">
            Master English with{' '}
            <span className="text-brand-purple font-extrabold">
              Clarity
            </span>
            <span className="block sm:inline"> &amp; Academic Confidence.</span>
          </h1>

          {/* 4. Supporting Lead Description */}
          <p className="text-[14px] sm:text-lg md:text-xl text-brand-charcoal/90 sm:text-brand-charcoal leading-relaxed font-sans max-w-xl sm:max-w-3xl hero-animate-paragraph">
            Targeted IELTS, TOEFL &amp; PTE preparation, executive communication, and young learner elocution. Mentored personally by author and master coach Vidya Wankhade with structured diagnostic feedback.
          </p>

          {/* 5. Clear Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 hero-animate-cta">
            <Button
              to="/courses"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-sm group text-center justify-center py-2.5 sm:py-3 px-5 sm:px-6 text-sm sm:text-base font-semibold"
            >
              <span>Explore All Programs</span>
              <ArrowRight className="w-4 h-4 ml-2 link-arrow shrink-0" />
            </Button>

            <Button
              to="/tests"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/95 hover:bg-white text-center justify-center py-2.5 sm:py-3 px-5 sm:px-6 text-sm sm:text-base font-semibold shadow-subtle"
            >
              <Compass className="w-4 h-4 mr-2 text-brand-purple shrink-0" />
              <span>Take Diagnostic Test</span>
            </Button>
          </div>

          {/* 6. Academic Pedagogy Pillars — Responsive 3-Card Grid */}
          <div className="pt-4 sm:pt-7 border-t border-brand-border/80 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-[2px] border border-brand-border/90 shadow-subtle hero-animate-proof-1">
              <span className="w-5 h-5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-heading font-bold text-brand-aubergine uppercase tracking-wider leading-tight">
                  1-on-1 Feedback
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-brand-charcoal-muted mt-0.5 leading-tight">
                  Direct mentor corrections
                </p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-[2px] border border-brand-border/90 shadow-subtle hero-animate-proof-2">
              <span className="w-5 h-5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-heading font-bold text-brand-aubergine uppercase tracking-wider leading-tight">
                  Official Formats
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-brand-charcoal-muted mt-0.5 leading-tight">
                  Real exam benchmarking
                </p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl bg-white/95 backdrop-blur-[2px] border border-brand-border/90 shadow-subtle hero-animate-proof-3">
              <span className="w-5 h-5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-heading font-bold text-brand-aubergine uppercase tracking-wider leading-tight">
                  Author Curricula
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-brand-charcoal-muted mt-0.5 leading-tight">
                  Original published texts
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Ambient Slideshow Controller & Archive Status Bar */}
        <div className="mt-4 sm:mt-10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pt-2 sm:pt-3">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-[2px] border border-brand-border/80 shadow-subtle max-w-full overflow-hidden">
            {/* Unobtrusive Pause / Play Toggle */}
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause cinematic background slideshow" : "Play cinematic background slideshow"}
              aria-pressed={!isPlaying}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-mauve/70 hover:bg-brand-mauve text-brand-aubergine transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-brand-aubergine text-brand-aubergine" />
              ) : (
                <Play className="w-3 h-3 fill-brand-aubergine text-brand-aubergine ml-0.5" />
              )}
            </button>

            {/* Slide Position Indicators */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0" role="tablist" aria-label="Background slideshow slides">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}: ${slide.label}`}
                    onClick={() => handleSelectSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${isActive
                        ? 'w-5 sm:w-6 bg-brand-purple'
                        : 'w-2 bg-brand-charcoal/25 hover:bg-brand-charcoal/50'
                      }`}
                  />
                );
              })}
            </div>

            <div className="h-3 w-px bg-brand-border hidden sm:block shrink-0" />

            {/* Current Active Image Scene Caption */}
            <span className="text-[10px] sm:text-[11px] font-sans font-medium text-brand-charcoal-muted tracking-tight truncate max-w-[135px] sm:max-w-xs">
              {HERO_SLIDES[currentSlide].caption}
            </span>
          </div>

          {/* Genuine Academy Pedagogy Badge */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-wider text-[#7C5A26] px-3 py-1.5 rounded-full bg-brand-gold-light/90 border border-brand-gold-border/70 shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
            <span>Pune Academy &amp; University Classrooms</span>
          </div>
        </div>

        {/* Bottom Trust Stat Ledger (Unified Editorial Bar in Plus Jakarta Sans) */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-brand-border/80 hero-animate-ledger">
          <div className="bg-white/95 rounded-xl border border-brand-border shadow-subtle divide-y sm:divide-y-0 sm:divide-x divide-brand-border grid grid-cols-2 lg:grid-cols-4">

            <div className="p-3 sm:p-6 text-left">
              <span className="text-[10.5px] sm:text-xs font-heading font-bold uppercase tracking-wider text-brand-charcoal-muted">Experience</span>
              <div className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-brand-aubergine mt-0.5 sm:mt-1">19+ <span className="text-[11px] sm:text-sm font-normal text-brand-charcoal-muted">Years</span></div>
              <p className="text-[10.5px] sm:text-xs text-brand-charcoal-muted mt-0.5 sm:mt-1 font-sans">Proven teaching mastery in Pune</p>
            </div>

            <div className="p-3 sm:p-6 text-left">
              <span className="text-[10.5px] sm:text-xs font-heading font-bold uppercase tracking-wider text-brand-purple">Curriculum</span>
              <div className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-brand-purple mt-0.5 sm:mt-1">13 <span className="text-[11px] sm:text-sm font-normal text-brand-charcoal-muted">Programs</span></div>
              <p className="text-[10.5px] sm:text-xs text-brand-charcoal-muted mt-0.5 sm:mt-1 font-sans">Foundational to executive tiers</p>
            </div>

            <div className="p-3 sm:p-6 text-left">
              <span className="text-[10.5px] sm:text-xs font-heading font-bold uppercase tracking-wider text-[#7C5A26]">Alumni</span>
              <div className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-[#7C5A26] mt-0.5 sm:mt-1">1,000+ <span className="text-[11px] sm:text-sm font-normal text-brand-charcoal-muted">Students</span></div>
              <p className="text-[10.5px] sm:text-xs text-brand-charcoal-muted mt-0.5 sm:mt-1 font-sans">Mentored across India &amp; overseas</p>
            </div>

            <div className="p-3 sm:p-6 text-left">
              <span className="text-[10.5px] sm:text-xs font-heading font-bold uppercase tracking-wider text-brand-aubergine">Exam Record</span>
              <div className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold text-brand-aubergine mt-0.5 sm:mt-1">Band 8.5 <span className="text-[11px] sm:text-sm font-normal text-brand-charcoal-muted">IELTS</span></div>
              <p className="text-[10.5px] sm:text-xs text-brand-charcoal-muted mt-0.5 sm:mt-1 font-sans">Top verified student score</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
