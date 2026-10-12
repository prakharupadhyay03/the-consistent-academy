import React from 'react';
import { Clock, Users, Award, Target, Check } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function WhyChooseUs() {
  const principles = [
    {
      num: "01",
      title: "Consistency Over Cramming",
      lead: "Language acquisition is a cognitive and neuromuscular habit.",
      description: "Fluency cannot be acquired through last-minute exam tricks. Our modular lessons break complex English syntax into manageable daily drills that compound into effortless fluency."
    },
    {
      num: "02",
      title: "1-on-1 Diagnostic Feedback",
      lead: "Every sentence evaluated against British Council descriptors.",
      description: "Rather than generic group lectures, learners receive line-by-line essay corrections and recorded speaking assessments with precise phonetic and grammatical adjustments."
    },
    {
      num: "03",
      title: "Certified Master Pedagogy",
      lead: "Author-led curricula refined across 19+ years of classroom experience.",
      description: "Direct mentorship under Vidya Wankhade — British Council Certified Master Trainer, UGC NET qualified educator, and author of 3 published guides."
    },
    {
      num: "04",
      title: "Real-World Executive Presence",
      lead: "Beyond clearing exam thresholds to lifelong articulation.",
      description: "We prepare learners for high-stakes visa interviews, international boardrooms, and university defenses, cultivating genuine psychological confidence."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Pedagogical Manifesto (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] font-sans">
                Our Methodological Philosophy
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-brand-aubergine tracking-tight leading-[1.18]">
              The Pedagogy of Deliberate Consistency.
            </h2>

            <p className="text-base text-brand-charcoal-muted leading-relaxed font-sans">
              Traditional language institutes rely on memorization drills. At The Consistent Academy, we treat English as an instrument of thought — instilling deep structural understanding, instinctive syntax, and authentic self-expression.
            </p>

            {/* Restrained Accent Block */}
            <div className="p-5 rounded-xl bg-brand-ivory border-l-4 border-brand-aubergine text-xs text-brand-charcoal leading-relaxed font-sans">
              <span className="font-bold text-brand-aubergine block mb-1">
                Author-Authored Textbooks
              </span>
              All enrolled students train directly with Vidya Wankhade&apos;s published publications, ensuring consistent alignment between classroom theory and real evaluation criteria.
            </div>
          </div>

          {/* Right Column: Numbered Architectural Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-6 divide-y divide-brand-border">
            {principles.map((item, idx) => (
              <div 
                key={idx} 
                className={`pt-6 first:pt-0 group`}
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  {/* Number */}
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-brand-purple/70 group-hover:text-brand-purple transition-colors shrink-0">
                    {item.num}
                  </span>

                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-aubergine tracking-tight group-hover:text-brand-purple transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-semibold text-[#7C5A26]">
                      {item.lead}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed">
                      {item.description}
                    </p>
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
