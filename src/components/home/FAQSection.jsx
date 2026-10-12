import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How are the IELTS, TOEFL & PTE preparation courses structured?",
      a: "Our core IELTS program is a comprehensive 20-hour master course covering all four modules: Listening, Reading, Writing, and Speaking (5 hours per module). In addition to full batches, we offer single-skill modules (7 hours each at ₹4,000) for learners who only need targeted improvement in Writing or Speaking."
    },
    {
      q: "Can I attend classes online if I do not reside in Pune?",
      a: "Yes. While we host interactive classroom sessions in Pune, all programs are fully available as live online hybrid cohorts with the exact same 1-on-1 feedback, essay grading, and mock speaking assessments."
    },
    {
      q: "What study materials and diagnostic evaluations are included?",
      a: "All enrolled students receive comprehensive study materials, Cambridge practice tests, author-penned scoring rubrics, and detailed individual feedback on every written assignment and simulated speaking interview."
    },
    {
      q: "How do the Young Learners & Kids programs differ from adult courses?",
      a: "Our kids programs (Elocution, TedX & Toastmaster, Grammar Foundations, Creative Writing, and Reading Club) are structured in 4-week experiential modules designed for ages 6–15. They emphasize voice clarity, posture, stage fear reduction, and building a genuine love for reading."
    },
    {
      q: "How does the free diagnostic test work?",
      a: "Our diagnostic assessments (Kids Grammar, Adults Advanced Grammar, and Leadership Style) evaluate your baseline proficiency across key sentence mechanics, vocabulary in context, and error frequency. Our mentors review the submission and recommend the exact curriculum level suited to your goals."
    },
    {
      q: "Who conducts the mentoring sessions?",
      a: "All courses are designed and overseen directly by founder Vidya Wankhade, a British Council Certified IELTS Master Trainer, UGC NET holder, and author of 3 published educational books with over 19 years of classroom experience."
    }
  ];

  return (
    <section className="py-20 bg-brand-ivory border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything You Need to Know"
          subtitle="Answers to common questions regarding batch schedules, individual feedback, test preparation, and admissions."
          withRule={true}
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-subtle transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-brand-aubergine">
                    {faq.q}
                  </span>
                  <span className={`w-7 h-7 rounded-full bg-brand-ivory flex items-center justify-center shrink-0 text-brand-aubergine transition-transform duration-normal ${
                    isOpen ? 'rotate-180 bg-brand-mauve text-brand-purple' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed border-t border-brand-border/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-white rounded-xl border border-brand-border p-6 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading text-base font-bold text-brand-aubergine">Have a specific question about your target band?</h4>
            <p className="text-xs text-brand-charcoal-muted mt-0.5">Speak directly with our academic coordinator.</p>
          </div>
          <Button to="/contact" variant="primary" size="sm">
            <span>Contact Admissions</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
