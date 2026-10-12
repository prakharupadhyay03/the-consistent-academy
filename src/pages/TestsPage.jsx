import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function TestsPage() {
  const [activeSample, setActiveSample] = useState(null);

  useEffect(() => {
    document.title = "Diagnostic Tests & Assessment | The Consistent Academy";
    window.scrollTo(0, 0);
  }, []);

  const tests = [
    {
      id: 'kids-grammar',
      title: "Grammar Diagnostic Test for Kids",
      target: "Young Learners & School Students (Ages 5–17 Years)",
      length: "25 Multiple-Choice Questions",
      duration: "15 Minutes",
      topics: [
        "Fill in the Blanks (Prepositions, Articles, Conjunctions)",
        "Tenses (Past, Present, Future Forms)",
        "Sentence Correction & Punctuation",
        "Vocabulary in Context"
      ],
      description: "A friendly, diagnostic quiz designed to assess sentence formation, verb tenses, and grammatical accuracy for school students.",
      badge: "School Level",
      sampleQuestion: {
        q: "Choose the correct sentence: (A) She don't like reading books. (B) She doesn't likes reading books. (C) She doesn't like reading books.",
        answer: "(C) She doesn't like reading books."
      }
    },
    {
      id: 'adults-grammar',
      title: "Advanced Grammar & Precision Test",
      target: "Adults, College Students & IELTS Aspirants",
      length: "28 Advanced Diagnostic Questions",
      duration: "20 Minutes",
      topics: [
        "Subject-Verb Agreement in Complex Clauses",
        "Conditionals (Zero, First, Second & Third)",
        "Subjunctive Mood & Inversion",
        "Idiomatic Prepositions & Collocations"
      ],
      description: "Benchmarked against CEFR B2–C1 standards. Evaluates linguistic precision required for academic writing and professional articulation.",
      badge: "Advanced CEFR B2-C1",
      sampleQuestion: {
        q: "Neither the manager nor the employees _____ willing to compromise on the delivery deadline. (A) was (B) were (C) is",
        answer: "(B) were (In 'neither... nor', the verb agrees with the closer subject 'employees')."
      }
    },
    {
      id: 'leadership-styles',
      title: "Executive Leadership Style Diagnostic",
      target: "Managers, Team Leads, Entrepreneurs & Educators",
      length: "60 Psychometric Likert Statements",
      duration: "25 Minutes",
      topics: [
        "10 Evaluated Archetypes (Visionary, Coaching, Servant, etc.)",
        "Decision-Making Tendencies Under Pressure",
        "Communication & Team Empowerment Matrix",
        "Tailored Behavioral Improvement Roadmaps"
      ],
      description: "Comprehensive psychometric evaluation identifying your primary and secondary leadership styles across 10 distinct leadership models.",
      badge: "Psychometric Assessment",
      sampleQuestion: {
        q: "Rate from 1 to 5: 'I believe team members perform best when given autonomy rather than rigid step-by-step instructions.'",
        answer: "Evaluates Democratic vs. Autocratic leadership balance."
      }
    }
  ];

  const leadershipArchetypes = [
    { name: "Visionary", file: "/leadership/visionary.png" },
    { name: "Coaching", file: "/leadership/coaching.png" },
    { name: "Democratic", file: "/leadership/democratic.png" },
    { name: "Servant", file: "/leadership/servant.webp" },
    { name: "Transformational", file: "/leadership/transformational.webp" },
    { name: "Situational", file: "/leadership/situational.webp" },
    { name: "Transactional", file: "/leadership/transactional.jpeg" },
    { name: "Bureaucratic", file: "/leadership/bureaucratic.png" },
    { name: "Autocratic", file: "/leadership/autocratic.webp" },
    { name: "Laissez-Faire", file: "/leadership/laissez.png" },
  ];

  return (
    <div className="bg-brand-ivory py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3">
            <span>Skill Benchmarking Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-aubergine tracking-tight">
            English &amp; Leadership Diagnostic Tests
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans">
            Diagnose your grammatical strengths, identify subtle sentence structure errors, or evaluate your managerial communication style with our free benchmark assessments.
          </p>
        </div>

        {/* Group 1: English & Grammar Diagnostics */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-0.5 w-8 bg-brand-gold"></span>
            <h2 className="font-serif text-2xl font-bold text-brand-aubergine">
              Linguistic &amp; Grammatical Benchmark Tests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tests.filter(t => t.id !== 'leadership-styles').map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="mauve" size="sm">
                      {test.badge}
                    </Badge>
                    <span className="text-xs font-bold text-[#7C5A26] bg-brand-gold-light border border-brand-gold-border px-2.5 py-0.5 rounded">
                      Free Assessment
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-brand-aubergine mb-1.5 leading-snug">
                    {test.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-purple mb-3">
                    {test.target}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed mb-5">
                    {test.description}
                  </p>

                  {/* Topics list */}
                  <div className="border-t border-brand-border pt-4 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-aubergine mb-2.5">
                      Evaluated Competencies:
                    </p>
                    <ul className="space-y-2 text-xs text-brand-charcoal">
                      {test.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-between mt-auto">
                  <div className="text-xs text-brand-charcoal-muted">
                    <span className="font-semibold text-brand-aubergine block">{test.length}</span>
                    <span className="text-[11px] text-stone-500">{test.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSample(test)}
                      className="text-xs font-semibold px-2.5 py-1.5 text-brand-charcoal hover:text-brand-purple underline transition-colors"
                    >
                      View Sample
                    </button>
                    <Button
                      to={`/contact?course=${encodeURIComponent(test.title)}`}
                      variant="primary"
                      size="sm"
                    >
                      <span>Request Test</span>
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Executive Leadership & Psychometrics */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-0.5 w-8 bg-brand-gold"></span>
            <h2 className="font-serif text-2xl font-bold text-brand-aubergine">
              Executive Communication &amp; Behavioral Diagnostics
            </h2>
          </div>

          {tests.find(t => t.id === 'leadership-styles') && (
            (() => {
              const test = tests.find(t => t.id === 'leadership-styles');
              return (
                <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-card mb-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="mauve" size="sm">{test.badge}</Badge>
                        <span className="text-xs font-bold text-[#7C5A26] bg-brand-gold-light border border-brand-gold-border px-2.5 py-0.5 rounded">
                          Free Evaluation
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-aubergine">
                        {test.title}
                      </h3>
                      <p className="text-xs font-semibold text-brand-purple">
                        {test.target}
                      </p>
                      <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed">
                        {test.description}
                      </p>

                      <div className="pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-aubergine mb-2">
                          Core Diagnostic Modules:
                        </p>
                        <ul className="space-y-1.5 text-xs text-brand-charcoal">
                          {test.topics.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-3.5 h-3.5 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-brand-ivory/60 p-6 rounded-xl border border-brand-border space-y-4">
                      <div>
                        <span className="text-[11px] uppercase font-bold text-brand-charcoal-muted block">Format Specifications</span>
                        <p className="font-serif text-lg font-bold text-brand-aubergine mt-0.5">{test.length}</p>
                        <p className="text-xs text-brand-charcoal-muted mt-0.5">Estimated Duration: {test.duration}</p>
                      </div>

                      <div className="pt-3 border-t border-brand-border space-y-2">
                        <Button
                          to={`/contact?course=${encodeURIComponent(test.title)}`}
                          variant="primary"
                          size="md"
                          className="w-full justify-center"
                        >
                          <span>Request Leadership Assessment</span>
                        </Button>
                        <button
                          type="button"
                          onClick={() => setActiveSample(test)}
                          className="w-full text-center text-xs font-semibold text-brand-charcoal hover:text-brand-purple underline py-1"
                        >
                          View Sample Statement &amp; Methodology
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {/* 10 Evaluated Leadership Archetypes Grid */}
          <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-card">
            <div className="max-w-2xl mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-purple bg-brand-mauve px-2 py-0.5 rounded">
                Benchmarked Framework
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-aubergine mt-2">
                10 Evaluated Leadership Archetypes
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-muted mt-1">
                Our 60-question assessment categorizes decision-making tendencies across these 10 verified organizational models:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {leadershipArchetypes.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-brand-ivory/40 border border-brand-border text-center flex flex-col items-center justify-center hover:border-brand-purple/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-2 bg-stone-100 border border-brand-border/60 p-1 flex items-center justify-center">
                    <img
                      src={arch.file}
                      alt={`${arch.name} style icon`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-bold text-brand-aubergine">{arch.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology notice */}
        <div className="bg-brand-mauve/30 rounded-xl border border-brand-mauve-border/60 p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-lg bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine">How Diagnostic Feedback Is Provided</h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-muted mt-1 leading-relaxed font-sans">
              Upon requesting an assessment, our academic team sends you the secure test sheet. Once completed, you receive a personalized scorecard highlighting grammatical error frequencies, syntactic weaknesses, and targeted course recommendations.
            </p>
          </div>
          <div className="shrink-0">
            <Button to="/contact" variant="primary" size="md">
              <span>Book Assessment Call</span>
            </Button>
          </div>
        </div>

      </div>

      {/* Sample Question Modal */}
      {activeSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-brand-border shadow-elevated">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-serif text-lg font-bold text-brand-aubergine">
                Sample Question — {activeSample.title}
              </h4>
              <button
                type="button"
                onClick={() => setActiveSample(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded"
              >
                ✕
              </button>
            </div>
            <div className="my-4 p-4 rounded-lg bg-brand-ivory border border-brand-border text-xs sm:text-sm text-brand-charcoal leading-relaxed font-medium">
              {activeSample.sampleQuestion.q}
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-5">
              <strong>Academic Key / Rationale:</strong> {activeSample.sampleQuestion.answer}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveSample(null)}>
                Close
              </Button>
              <Button
                to={`/contact?course=${encodeURIComponent(activeSample.title)}`}
                variant="primary"
                size="sm"
              >
                <span>Request Full Test</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
