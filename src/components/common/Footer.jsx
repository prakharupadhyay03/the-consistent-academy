import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ArrowUpRight, Award, Shield } from 'lucide-react';
import { contactInfo } from '../../data/contactInfo';

export default function Footer() {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <footer className="bg-brand-aubergine text-brand-ivory border-t border-brand-aubergine-deep">
      {/* Upper Footer: Core Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-7 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-2.5 sm:space-y-4">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <img 
                src="/logo.png" 
                alt="The Consistent Academy Emblem" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md p-1 bg-white border border-brand-border shrink-0"
              />
              <div>
                <span className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-brand-mauve transition-colors">
                  The Consistent Academy
                </span>
                <p className="text-xs text-stone-300 font-sans mt-0.5">Learn with Clarity &amp; Confidence</p>
              </div>
            </Link>
            
            <p className="text-xs sm:text-sm text-stone-300 leading-normal sm:leading-relaxed max-w-sm font-sans">
              Empowering learners to achieve true English fluency through consistent practice, individual feedback, and British Council-certified mentorship led by author Vidya Wankhade.
            </p>

            <div className="pt-0.5 sm:pt-1 flex items-center gap-2 text-xs text-[#DFCEB1] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
              <span>British Council Certified IELTS Master Trainer • 19+ Yrs Exp</span>
            </div>

            {/* Social channels */}
            <div className="pt-1 sm:pt-2 flex items-center gap-2 sm:gap-2.5">
              <a 
                href={contactInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-brand-purple flex items-center justify-center text-stone-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="Instagram page for The Consistent Academy"
              >
                IG
              </a>
              <a 
                href={contactInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-brand-purple flex items-center justify-center text-stone-200 hover:text-white transition-colors text-xs font-bold"
                aria-label="LinkedIn organization page for The Consistent Academy"
              >
                IN
              </a>
              <a 
                href={contactInfo.whatsappCommunityUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2.5 h-8 rounded-md bg-white/10 hover:bg-emerald-700 flex items-center gap-1.5 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
                aria-label="WhatsApp Community channel"
              >
                <span>WhatsApp Community</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Programs & Courses */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-2.5 pb-1.5 sm:mb-4 sm:pb-2 lg:mb-5 lg:pb-2.5 border-b border-white/10 font-sans">
              Academic Curricula
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  IELTS, TOEFL &amp; PTE Master
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Corporate Survival English
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Crack Your Interview
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Dining &amp; Social Etiquette
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Executive Leadership Presence
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Kids Elocution &amp; TedX
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  EELTA Teacher Pedagogy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-2.5 pb-1.5 sm:mb-4 sm:pb-2 lg:mb-5 lg:pb-2.5 border-b border-white/10 font-sans">
              Academy Directory
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  All 13 Programs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Founder &amp; Books
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Diagnostic Tests</span>
                  <span className="text-[10px] bg-brand-gold text-brand-aubergine px-1.5 py-0.5 rounded font-bold">Free</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Faculty Recruitment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Academy Blog &amp; Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Details & Admissions */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-2.5 pb-1.5 sm:mb-4 sm:pb-2 lg:mb-5 lg:pb-2.5 border-b border-white/10 font-sans">
              Admissions Coordination
            </h3>
            <div className="space-y-2.5 sm:space-y-3.5 lg:space-y-4 text-xs sm:text-sm text-stone-300">
              <a 
                href={`tel:${contactInfo.phoneRaw}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">{contactInfo.phone}</p>
                  <p className="text-xs text-stone-400 mt-0.5">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                </div>
              </a>

              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors group min-w-0"
              >
                <Mail className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span className="break-words select-all text-xs sm:text-[13px] text-stone-200 group-hover:text-white transition-colors">
                  {contactInfo.email}
                </span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">{contactInfo.location}</p>
                  <a 
                    href={contactInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#DFCEB1] hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Colophon in Deep Aubergine Dark */}
      <div className="border-t border-white/10 bg-brand-aubergine-deep py-4 sm:py-5 lg:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-stone-300">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 sm:gap-4 text-xs text-stone-300 text-center sm:text-left">
            <p>© {new Date().getFullYear()} The Consistent Academy. All rights reserved.</p>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white underline transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white underline transition-colors"
            >
              Terms of Service
            </button>
          </div>
          
          {/* Distinct Developer & Engineering Attribution */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400 bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10">
            <span className="text-stone-400">Developed by</span>
            <a
              href="https://www.thinkbuild.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white hover:underline font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded"
            >
              ThinkBuild
            </a>
          </div>
        </div>
      </div>

      {/* Legal Info Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl text-brand-charcoal max-w-md w-full p-6 shadow-elevated border border-brand-border">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-heading text-lg font-bold text-brand-aubergine">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h4>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-brand-charcoal-muted leading-relaxed mb-4">
              The official {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} documentation is currently being finalized in consultation with academy legal advisors. The Consistent Academy adheres to strict data privacy principles and never sells student personal information.
            </p>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="btn-primary text-xs py-1.5 px-4"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
