import React from 'react';
import { Award, BookOpen, ExternalLink, GraduationCap, Quote, Check, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { books } from '../../data/books';

export default function FounderSpotlight() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-brand-ivory border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Narrative Section - Editorial Split */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Prominent, Natural Founder Portrait (5 cols) */}
            <div className="lg:col-span-5">
              <div className="max-w-[420px] mx-auto lg:max-w-none">
                <div className="founder-card group">
                  <div className="founder-portrait-img-container">
                    <img
                      src="/gallery/vidya.png"
                      alt="Vidya Wankhade - Founder and Master Trainer of The Consistent Academy"
                      className="founder-portrait-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-5 py-4 bg-white border-t border-brand-border flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-brand-aubergine leading-snug">
                        Vidya Wankhade
                      </h3>
                      <p className="text-xs text-brand-charcoal-muted mt-0.5 font-sans">
                        Founder, Master Coach &amp; Published Author
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] font-sans font-semibold px-2.5 py-1 rounded bg-brand-gold-light text-[#7C5A26] border border-brand-gold-border">
                      19+ Yrs Exp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative Hierarchy & Verified Background (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-8 bg-brand-gold"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
                  Academic Leadership &amp; Pedagogy
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-aubergine tracking-tight leading-[1.18]">
                An Academic Life Dedicated to Linguistic Precision.
              </h2>

              <p className="text-sm sm:text-base font-semibold text-brand-purple">
                Author, IELTS Master Trainer, Interview Coach &amp; Corporate Communication Specialist
              </p>

              {/* Verified Philosophy Pull Quote */}
              <div className="p-5 rounded-xl bg-white border-l-4 border-brand-gold text-sm sm:text-base text-brand-aubergine leading-relaxed italic shadow-subtle flex gap-3.5">
                <Quote className="w-5 h-5 text-brand-gold shrink-0 not-italic opacity-70 mt-0.5" />
                <span>
                  &ldquo;We blend language mastery with real-world communication strategies — helping learners stand out, not just speak up.&rdquo;
                </span>
              </div>

              {/* Verified Bio Narrative */}
              <p className="text-sm text-brand-charcoal-muted leading-relaxed font-sans">
                With more than <strong className="font-semibold text-brand-aubergine">19 years of dedicated mentoring experience</strong> in Pune and across global cohorts, Vidya Wankhade has guided students, working professionals, corporate executives, and school educators to achieve genuine linguistic fluency. Her structured methodology emphasizes daily consistency, diagnostic evaluation, and building real psychological confidence alongside grammatical clarity.
              </p>

              {/* Verified Credentials Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-brand-charcoal bg-white/70 p-2.5 rounded-lg border border-brand-border/70">
                  <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>British Council Certified IELTS Master Trainer</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-charcoal bg-white/70 p-2.5 rounded-lg border border-brand-border/70">
                  <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>UGC NET Qualified in Higher Education</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-charcoal bg-white/70 p-2.5 rounded-lg border border-brand-border/70">
                  <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>TESOL / TEFL Certified Global Instructor</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-charcoal bg-white/70 p-2.5 rounded-lg border border-brand-border/70">
                  <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>Certified Soft Skills &amp; Corporate Trainer (MPM, B.Ed)</span>
                </div>
              </div>

              <div className="pt-2">
                <Button to="/about" variant="primary" size="md">
                  <span>Read Full Academic Profile</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>

            </div>

          </div>
        </div>

        {/* Published Books Showcase */}
        <div>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
                Literary Works &amp; Publications
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-brand-aubergine mt-3 tracking-tight">
              Published Works by Vidya Wankhade
            </h3>
            <p className="text-sm sm:text-base text-brand-charcoal-muted mt-2 font-sans leading-relaxed">
              Curricula grounded in published scholarship. Explore our author-penned volumes available internationally on Amazon, Flipkart, and Evincepub.
            </p>
          </div>

          {/* 1. Flagship Book Feature Showcase: Cakewalk IELTS */}
          {books[0] && (
            <div className="bg-white rounded-xl border border-brand-border shadow-card p-6 sm:p-8 mb-8 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Book Cover (4 cols) */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-lg overflow-hidden shadow-elevated border border-brand-border/70 bg-stone-100 group">
                    <img
                      src={books[0].coverImage}
                      alt={books[0].title}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-brand-aubergine text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Flagship Text
                    </div>
                  </div>
                </div>

                {/* Book Details (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                      IELTS Academic &amp; General Training
                    </span>
                    <h4 className="font-heading text-2xl sm:text-3xl font-bold text-brand-aubergine mt-1 leading-snug">
                      {books[0].title}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#7C5A26] mt-1">
                      {books[0].subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed font-sans">
                    {books[0].description}
                  </p>

                  <div className="pt-2 border-t border-brand-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-muted block mb-2.5">
                      Available on Verified Retailers:
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
                          <ExternalLink className="w-3 h-3 text-brand-purple group-hover:text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. Companion Volumes: 2-Column Balanced Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.slice(1).map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-brand-border p-6 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-5 mb-4">
                    {/* Cover Frame */}
                    <div className="relative w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-md overflow-hidden shadow-card border border-brand-border/70 bg-stone-100">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple">
                        {book.id === 'the-reading-detective' ? 'Young Learners & Comprehension' : 'Executive Leadership'}
                      </span>
                      <h4 className="font-heading text-lg sm:text-xl font-bold text-brand-aubergine leading-snug">
                        {book.title}
                      </h4>
                      <p className="text-xs text-[#7C5A26] font-medium">
                        {book.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-brand-charcoal-muted leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                </div>

                {/* Purchase Links */}
                <div className="mt-5 pt-3.5 border-t border-brand-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-muted block mb-2">
                    Verified Purchase Channels:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {book.buyLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-ivory hover:bg-brand-purple hover:text-white text-brand-aubergine border border-brand-border transition-colors shadow-subtle"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
