import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Award, Mic, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ClubPage() {
  useEffect(() => {
    document.title = "Consistent Communicators Club | The Consistent Academy";
    window.scrollTo(0, 0);
  }, []);

  const clubPillars = [
    {
      title: "Stage Presence & Body Language",
      desc: "Overcome performance anxiety with physical grounding techniques, purposeful eye contact, and expansive vocal projection."
    },
    {
      title: "Speech Structuring & The Hook",
      desc: "Master the classic 3-act speech structure, narrative storytelling hooks, and persuasive emotional calls-to-action."
    },
    {
      title: "Impromptu Speaking (Table Topics)",
      desc: "Learn to think on your feet, organize structured arguments within 30 seconds, and eliminate filler words ('um', 'ah')."
    },
    {
      title: "Debating & Critical Reasoning",
      desc: "Construct evidence-backed rebuttals, deconstruct opposing arguments without aggression, and persuade diverse audiences."
    }
  ];

  return (
    <div className="bg-brand-ivory py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-brand-aubergine text-white rounded-2xl p-8 sm:p-14 border border-brand-aubergine-deep shadow-card mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-stone-200 border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <Mic className="w-3.5 h-3.5 text-brand-gold" />
                <span>College Public Speaking &amp; Leadership Forum</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Consistent Communicators Club
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-2xl">
                A structured speech transformation initiative designed for university students and ambitious young professionals. Equip yourself with the poise, diction, and impromptu speech mastery needed for campus elections, debates, and placement interviews.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <Button to="/contact?course=Consistent%20Communicators%20Club" variant="primary" size="md">
                  <span>Apply for Next Club Cohort</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link to="/" className="btn-outline bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs py-2 px-4">
                  Back to TCA
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full bg-white p-3 shadow-card border-4 border-brand-gold/40 flex items-center justify-center">
                <img
                  src="/logo2.png"
                  alt="Consistent Communicators Club Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-serif text-sm font-bold text-white mt-4">CC Club Emblem</p>
              <p className="text-xs text-stone-300">The Consistent Academy Initiative</p>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C5A26] bg-brand-gold-light border border-brand-gold-border px-3 py-1 rounded-md">
              Transformation Curriculum
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-aubergine mt-3">
              The 4 Pillars of Confident Speaking
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-muted mt-2">
              Every weekly session combines vocal warm-ups, prepared speeches, peer evaluations, and impromptu speaking challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubPillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-brand-mauve text-brand-purple flex items-center justify-center mb-4">
                    <span className="font-serif font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-aubergine mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-brand-border flex items-center gap-1.5 text-[11px] font-bold text-brand-purple">
                  <Check className="w-3.5 h-3.5" />
                  <span>Weekly Drills</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Note Banner */}
        <div className="bg-brand-mauve/30 rounded-xl border border-brand-mauve-border/60 p-6 sm:p-8 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-brand-purple shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-brand-charcoal leading-relaxed">
            <p className="font-bold text-brand-aubergine">Member Portal &amp; Authentication Notice</p>
            <p className="mt-1 text-brand-charcoal-muted">
              In the live production application, the CC Club portal links to student attendance and speech evaluation records via Firebase Authentication. During this design review phase, prospective student inquiries are processed through our admissions desk.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
