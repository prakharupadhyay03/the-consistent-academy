import React, { useEffect } from 'react';
import { ExternalLink, GraduationCap, Quote, Check } from 'lucide-react';
import { books } from '../data/books';
import SectionHeading from '../components/common/SectionHeading';
import AboutGalleryCarousel from '../components/about/AboutGalleryCarousel';

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Founder, Books & Academy | The Consistent Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-ivory py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3">
            <span>Leadership &amp; Pedagogical Heritage</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-aubergine tracking-tight">
            About The Consistent Academy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans">
            Founded by author and British Council Certified Master Trainer Vidya Wankhade to bring structured, clarity-driven English language education to global test takers, corporate leaders, and young minds.
          </p>
        </div>

        {/* Detailed Founder Bio Section with Circular Editorial Portrait */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Circular Editorial Portrait (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center animate-fade-in-up">
              <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[340px] xl:h-[340px] rounded-full p-1.5 bg-white border-2 border-brand-gold/70 shadow-[0_12px_28px_-6px_rgba(53,33,59,0.12),0_4px_10px_-2px_rgba(53,33,59,0.06)] group">
                <div className="w-full h-full rounded-full overflow-hidden aspect-square bg-stone-100">
                  <img
                    src="/gallery/vidya.png"
                    alt="Vidya Wankhade - Founder and Master Trainer of The Consistent Academy"
                    className="w-full h-full object-cover object-[center_top] rounded-full transition-transform duration-[240ms] ease-out group-hover:scale-[1.018] block"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Dignified Caption Plate Beneath the Circular Frame */}
              <div className="mt-5 text-center">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-aubergine leading-snug">
                  Vidya Wankhade
                </h3>
                <p className="text-xs text-brand-charcoal-muted mt-0.5 font-sans">
                  Founder, Master Coach &amp; Published Author
                </p>
                <span className="inline-block mt-2 text-[11px] font-sans font-semibold px-3 py-0.5 rounded-full bg-brand-gold-light text-[#7C5A26] border border-brand-gold-border">
                  19+ Yrs Classroom Mastery
                </span>
              </div>
            </div>

            {/* In-Depth Academic Bio (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-mauve text-brand-aubergine text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Leadership</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-aubergine">
                Vidya Wankhade
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-brand-purple">
                Author, IELTS Master Coach, Corporate Soft-Skills Specialist &amp; NET Qualified Educator
              </p>

              <div className="p-4 rounded-lg bg-brand-ivory/80 border-l-4 border-brand-gold italic text-xs sm:text-sm text-brand-aubergine leading-relaxed flex gap-3">
                <Quote className="w-4 h-4 text-brand-gold shrink-0 not-italic opacity-60 mt-0.5" />
                <span>
                  &ldquo;Blends language mastery with real-world communication strategies — helping learners stand out, not just speak up.&rdquo;
                </span>
              </div>

              <p className="text-xs sm:text-sm text-brand-charcoal leading-relaxed font-sans">
                With more than 19 years of classroom and corporate training experience, Vidya Wankhade is the visionary behind The Consistent Academy. Her teaching philosophy is grounded in linguistic precision, cognitive habit formation, and building emotional resilience for high-pressure speaking environments such as IELTS examiner interviews, board presentations, and international university seminars.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>British Council Certified IELTS Master Trainer</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>UGC NET Qualified in Higher Education</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>TESOL &amp; TEFL Certified Global Instructor</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Certified Soft Skills Trainer (MPM, B.Ed)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>B.Sc, B.Ed &amp; MPM Academic Degrees</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>TOEFL &amp; PET Certified Master Coach</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Published Books Section */}
        <div id="books" className="mb-20">
          <SectionHeading
            badge="Literary Publications"
            title="Published Books by Vidya Wankhade"
            subtitle="Author-penned books distilling 19 years of practical testing strategy, children's deduction, and modern business philosophy."
            withRule={true}
          />

          {/* Flagship Featured Book Showcase */}
          {books[0] && (
            <div className="bg-white rounded-xl border border-brand-border shadow-card hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-purple/40 transition-all duration-[220ms] ease-out p-6 sm:p-8 mb-8 overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-lg overflow-hidden shadow-elevated border border-brand-border/70 bg-stone-100 flex items-center justify-center p-2">
                    <img
                      src={books[0].coverImage}
                      alt={books[0].title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-brand-aubergine text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Flagship Text
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                      IELTS Academic &amp; General Training
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-aubergine mt-1 leading-snug">
                      {books[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#7C5A26] mt-1">
                      {books[0].subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed font-sans">
                    {books[0].description}
                  </p>

                  <div className="pt-2 border-t border-brand-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-muted block mb-2.5">
                      Verified Retail Links:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {books[0].buyLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-ivory hover:bg-brand-purple hover:text-white text-brand-aubergine border border-brand-border transition-all shadow-subtle"
                        >
                          <span>{link.name}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Companion Volume Cards: Balanced, Equal-Height 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.slice(1).map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-brand-border p-6 sm:p-7 shadow-card hover:-translate-y-1 hover:shadow-card-hover hover:border-brand-purple/40 transition-all duration-[220ms] ease-out flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-start gap-5 mb-5">
                    {/* Consistent Cover Frame */}
                    <div className="relative w-32 sm:w-36 aspect-[3/4] shrink-0 rounded-lg overflow-hidden shadow-card border border-brand-border/70 bg-stone-100 p-2 flex items-center justify-center">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Aligned Card Headings */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple">
                        {book.id === 'the-reading-detective' ? 'Young Learners & Comprehension' : 'Executive Leadership'}
                      </span>
                      <h4 className="font-heading text-lg sm:text-xl font-bold text-brand-aubergine leading-snug">
                        {book.title}
                      </h4>
                      <p className="text-xs text-[#7C5A26] font-medium leading-relaxed">
                        {book.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed font-sans line-clamp-3">
                    {book.description}
                  </p>
                </div>

                {/* Aligned Purchase Channels at Bottom */}
                <div className="mt-6 pt-4 border-t border-brand-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-muted block mb-2.5">
                    Verified Purchase Channels:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {book.buyLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-ivory hover:bg-brand-purple hover:text-white text-brand-aubergine border border-brand-border transition-all shadow-subtle"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop & Classroom Gallery: Seamless Horizontal Carousel */}
        <div id="gallery">
          <SectionHeading
            badge="Visual Archives"
            title="Complete Workshop &amp; Classroom Gallery"
            subtitle="Authentic photographs capturing student presentations, elocution seminars, and milestone celebrations."
            withRule={true}
          />

          <AboutGalleryCarousel />
        </div>

      </div>
    </div>
  );
}
