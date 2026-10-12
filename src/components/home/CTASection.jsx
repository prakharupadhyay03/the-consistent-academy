import React from 'react';
import { ArrowRight, Phone, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import { contactInfo } from '../../data/contactInfo';

export default function CTASection() {
  return (
    <section className="py-20 bg-brand-aubergine text-white border-b border-brand-aubergine-deep relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Academic Accent Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-stone-200 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
          <span>Admissions &amp; Batch Enrollment</span>
        </div>

        {/* Main CTA Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Ready to Learn with Clarity &amp; Confidence?
        </h2>

        {/* Supporting description */}
        <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Take a free 15-minute diagnostic test to benchmark your current grammar and communication proficiency, or connect directly with our admissions counselor.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" className="shadow-md">
            <span>Enroll / Speak with Mentor</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button 
            to="/tests" 
            variant="outline" 
            size="lg" 
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            <Compass className="w-4 h-4 mr-2 text-brand-gold" />
            <span>Take Free Diagnostic Test</span>
          </Button>
        </div>

        {/* Direct Contact Links */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>Direct Call: {contactInfo.phone}</span>
          </a>

          <span className="text-stone-600">•</span>

          <a
            href={contactInfo.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Join Verified WhatsApp Community</span>
          </a>
        </div>

      </div>
    </section>
  );
}
