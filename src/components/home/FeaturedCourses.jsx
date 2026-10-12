import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, Layers, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { courses } from '../../data/courses';

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'adults', label: 'Adults & Professionals' },
    { id: 'kids', label: 'Kids & Young Learners' },
    { id: 'educators', label: 'Educator Pedagogy' },
  ];

  // Flagship course (IELTS, TOEFL, PTE & CELPIP)
  const flagship = courses.find(c => c.id === 'ielts-toefl-pte');

  // Featured flagship is shown separately on 'all' and 'adults'
  const showFeatured = (activeTab === 'all' || activeTab === 'adults') && flagship;

  // Courses displayed in the single horizontal carousel track
  // On 'all' and 'adults', flagship is featured above, so exclude it from the carousel to prevent duplicate cards
  // All remaining 13 programmes are accessible in the carousel!
  const carouselCourses = showFeatured
    ? courses.filter(c => c.id !== 'ielts-toefl-pte' && (activeTab === 'all' || c.category === activeTab))
    : courses.filter(c => c.category === activeTab);

  // Check scroll position to manage button states
  const checkScrollability = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Smooth scroll handler for previous and next buttons
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Reset scroll position to beginning whenever tab filter changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    const timer = setTimeout(checkScrollability, 120);
    return () => clearTimeout(timer);
  }, [activeTab, checkScrollability]);

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [checkScrollability, carouselCourses]);

  return (
    <section id="courses" className="py-14 sm:py-18 bg-brand-ivory border-b border-brand-border overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Heading */}
        <SectionHeading
          badge="Curriculum Directory"
          title="Courses Crafted for Measurable Progress"
          subtitle="From global IELTS test preparation to workplace communication and kids elocution, each curriculum is built with structured drills and direct mentor feedback."
          withRule={true}
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-brand-aubergine text-white shadow-xs'
                    : 'bg-white text-brand-charcoal hover:bg-stone-50 border border-brand-border shadow-subtle'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. Refined, Compact Featured Flagship Course Card */}
        {showFeatured && (
          <div className="mb-6 sm:mb-8 bg-white rounded-xl border border-brand-border/80 shadow-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* Image Frame with natural proportions */}
              <div className="md:col-span-5 lg:col-span-4 relative bg-stone-100 flex flex-col">
                <div className="relative w-full h-48 sm:h-56 md:h-full min-h-[200px] overflow-hidden">
                  <img
                    src={flagship.thumbnail}
                    alt={flagship.title}
                    className="w-full h-full object-cover object-center block"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-aubergine text-white shadow-sm border border-white/10">
                      Flagship Curriculum
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="md:col-span-7 lg:col-span-8 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-brand-charcoal-muted font-sans font-medium mb-1.5">
                    <span className="flex items-center gap-1 text-brand-purple">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{flagship.duration}</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                      <span>{flagship.moduleCount} Modules</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[#7C5A26] font-semibold">
                      Full &amp; Single-Skill Options
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-brand-aubergine leading-snug tracking-tight mb-0.5">
                    {flagship.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] font-sans font-semibold text-brand-purple mb-1.5">
                    {flagship.subtitle}
                  </p>

                  <p className="text-xs sm:text-[13px] text-brand-charcoal-muted leading-relaxed font-sans mb-3 max-w-2xl">
                    {flagship.targetAudience}
                  </p>

                  {/* Highlights Grid (4 Points in 2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2.5 border-t border-brand-border/70 text-xs font-sans text-brand-charcoal">
                    {flagship.highlights.slice(0, 4).map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                          <Check className="w-2 h-2" />
                        </span>
                        <span className="truncate leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-3 mt-3 border-t border-brand-border/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-charcoal-muted">
                      Fee:
                    </span>
                    <span className="font-heading text-lg sm:text-xl font-bold text-brand-aubergine leading-none">
                      {flagship.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(flagship)}
                      className="text-xs font-sans font-semibold px-2.5 py-1 text-brand-aubergine hover:text-brand-purple underline transition-colors"
                    >
                      View Syllabus
                    </button>
                    <Button
                      to={`/contact?course=${encodeURIComponent(flagship.title)}`}
                      variant="primary"
                      size="sm"
                      className="shadow-sm px-3.5 py-1.5 text-xs"
                    >
                      <span>Enroll in Cohort</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 2. Single Horizontal Scrolling Track of Programme Cards */}
        {carouselCourses.length > 0 && (
          <div className="relative">
            
            {/* Carousel Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3.5 gap-2">
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-aubergine">
                  {activeTab === 'all'
                    ? 'Programmes & Specialized Modules'
                    : tabs.find(t => t.id === activeTab)?.label || 'Courses'}
                </h3>
                <p className="text-xs font-sans text-brand-charcoal-muted mt-0.5">
                  Showing {carouselCourses.length} {carouselCourses.length === 1 ? 'programme' : 'programmes'} • Scroll horizontally to explore
                </p>
              </div>

              {/* Prev / Next Arrow Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  disabled={!canScrollLeft}
                  className="p-1.5 sm:p-2 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine transition-all shadow-subtle disabled:opacity-30 disabled:cursor-not-allowed hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
                  aria-label="Previous programmes"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  disabled={!canScrollRight}
                  className="p-1.5 sm:p-2 rounded-lg border border-brand-border bg-white hover:bg-stone-50 text-brand-aubergine transition-all shadow-subtle disabled:opacity-30 disabled:cursor-not-allowed hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple active:scale-95"
                  aria-label="Next programmes"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Horizontally Scrollable Track with CSS Scroll Snapping (Single Row, No Wrapping) */}
            <div
              ref={carouselRef}
              onScroll={checkScrollability}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-3 pt-1 px-1 -mx-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              tabIndex={0}
              aria-label="Programme catalogue horizontal list"
            >
              {carouselCourses.map((course) => (
                <div
                  key={course.id}
                  className="snap-start shrink-0 w-[84%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col"
                >
                  {/* Compact Programme Card */}
                  <div className="group bg-white rounded-xl border border-brand-border/80 p-4 sm:p-5 shadow-subtle hover:shadow-card hover:-translate-y-1 hover:border-brand-purple/40 transition-all duration-200 ease-out flex flex-col justify-between h-full">
                    <div>
                      {/* Thumbnail with Category Badge */}
                      <div className="relative rounded-lg overflow-hidden bg-stone-100 aspect-[16/10] mb-3 border border-brand-border/60">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="mauve" size="sm">
                            {course.categoryLabel}
                          </Badge>
                        </div>
                      </div>

                      {/* Duration & Module Specs */}
                      <div className="flex items-center gap-2 text-xs font-sans text-brand-charcoal-muted mb-1 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-purple" />
                          {course.duration}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span>{course.moduleCount} Modules</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h4 className="font-heading text-base sm:text-lg font-bold text-brand-aubergine leading-snug line-clamp-1 mb-0.5">
                        {course.title}
                      </h4>
                      <p className="text-xs font-sans text-brand-purple font-semibold line-clamp-1 mb-1.5">
                        {course.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs font-sans text-brand-charcoal-muted leading-relaxed line-clamp-2 mb-3">
                        {course.targetAudience}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1 text-[11px] font-sans text-brand-charcoal border-t border-brand-border/60 pt-2 mb-3">
                        {course.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2 h-2" />
                            </span>
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fee & Actions Footer */}
                    <div className="pt-2.5 border-t border-brand-border/70 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        <span className="text-[10px] font-sans uppercase font-bold text-brand-charcoal-muted block leading-none mb-0.5">
                          Fee
                        </span>
                        <span className="font-heading text-base sm:text-lg font-bold text-brand-aubergine leading-none">
                          {course.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="text-xs font-sans font-semibold px-2 py-1 text-brand-aubergine hover:text-brand-purple underline transition-colors"
                        >
                          Syllabus
                        </button>
                        <Button
                          to={`/contact?course=${encodeURIComponent(course.title)}`}
                          variant="primary"
                          size="sm"
                          className="px-3 py-1 text-xs shadow-xs"
                        >
                          <span>Enroll</span>
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden flex items-center justify-between text-[11px] text-stone-500 font-sans mt-2 px-1">
              <span>Swipe horizontally to browse</span>
              <span>{canScrollRight ? 'More programmes →' : 'End of track'}</span>
            </div>

          </div>
        )}

        {/* Compact View All Link Action */}
        <div className="mt-8 sm:mt-10 text-center">
          <Button to="/courses" variant="outline" size="md">
            <span>Browse All 13 Detailed Curricula</span>
            <ArrowRight className="w-4 h-4 ml-2 text-brand-purple" />
          </Button>
        </div>

      </div>

      {/* Syllabus Modal Dialog */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-brand-border shadow-elevated">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-brand-border flex justify-between items-start bg-brand-ivory/50">
              <div>
                <Badge variant="mauve" size="sm" className="mb-2">
                  {selectedCourse.categoryLabel}
                </Badge>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-aubergine">{selectedCourse.title}</h3>
                <p className="text-xs sm:text-sm font-sans text-brand-purple font-semibold mt-0.5">{selectedCourse.subtitle}</p>
                <p className="text-xs font-sans text-brand-charcoal-muted mt-1">Duration: {selectedCourse.duration} • Fee: {selectedCourse.price}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Curriculum Modules */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-charcoal-muted">
                Curriculum Modules ({selectedCourse.curriculum.length})
              </h4>
              <div className="space-y-2.5">
                {selectedCourse.curriculum.map((mod, i) => (
                  <div key={i} className="p-3 rounded-lg bg-brand-ivory/60 border border-brand-border/80">
                    <div className="flex items-center justify-between text-xs font-bold text-brand-aubergine">
                      <span>Module {mod.moduleNumber || i + 1}: {mod.title}</span>
                      {mod.duration && <span className="text-brand-charcoal-muted font-normal">{mod.duration}</span>}
                    </div>
                    <p className="text-xs font-sans text-brand-charcoal-muted mt-1 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-brand-border bg-stone-50 rounded-b-xl flex justify-between items-center">
              <span className="font-heading text-base sm:text-lg font-bold text-brand-aubergine">
                Fee: {selectedCourse.price}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                <Button
                  to={`/contact?course=${encodeURIComponent(selectedCourse.title)}`}
                  variant="primary"
                  size="sm"
                >
                  <span>Enroll in this Course</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
