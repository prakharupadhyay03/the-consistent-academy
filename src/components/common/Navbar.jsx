import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { contactInfo } from '../../data/contactInfo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Tests', path: '/tests' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR — Approximately 36px high on desktop */}
      <div className="bg-brand-aubergine text-white text-[11px] sm:text-xs h-9 border-b border-brand-aubergine-deep flex items-center">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between gap-3">
          {/* Left: gold dot, British Council accreditation, separator, 19+ years experience */}
          <div className="flex items-center gap-2 text-stone-300 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true"></span>
            <span className="font-heading font-medium text-stone-100 truncate">
              British Council Certified IELTS Master Trainer
            </span>
            <span className="text-stone-500 hidden sm:inline select-none">•</span>
            <span className="text-stone-300 hidden sm:inline whitespace-nowrap font-sans">
              19+ Years of Academic Mentorship
            </span>
          </div>

          {/* Right: phone icon + phone number, separator, Learners Community link */}
          <div className="flex items-center gap-3 sm:gap-4 text-stone-300 shrink-0 text-xs font-sans">
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
              title="Call Admissions"
            >
              <Phone className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="hidden sm:inline font-heading font-medium text-stone-200">{contactInfo.phone}</span>
              <span className="sm:hidden text-[11px] font-heading font-medium text-stone-200">Call</span>
            </a>
            <span className="text-stone-600 select-none">|</span>
            <a
              href={contactInfo.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold font-heading font-medium"
              title="Join WhatsApp Learners Community"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">Learners Community</span>
            </a>
          </div>
        </div>
      </div>

      {/* FLOATING PILL NAVBAR WRAPPER */}
      <header className="sticky top-0 z-50 pointer-events-none transition-all duration-200">
        <div className="w-full max-w-[1400px] mx-auto px-3.5 sm:px-5 lg:px-7 pt-2.5 pb-2.5 lg:pt-3 lg:pb-3.5">

          {/* Main Floating Capsule */}
          <div className="pointer-events-auto bg-brand-ivory/95 backdrop-blur-md rounded-full border border-brand-border shadow-[0_4px_20px_-2px_rgba(53,33,59,0.08),0_2px_6px_-1px_rgba(53,33,59,0.04)] transition-all">

            {/* Desktop Three-Part Layout (lg+): Brand (~320px), Nav (Center), Actions (~300px) */}
            <div className="hidden lg:flex items-center justify-between h-[64px] xl:h-[68px] px-5 xl:px-7 gap-3 xl:gap-5">

              {/* 1. Left: Academy Logo, Academy Name & Tagline */}
              <div className="flex items-center shrink-0 min-w-0">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 xl:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-full p-0.5"
                >
                  <img
                    src="/logo.png"
                    alt="The Consistent Academy Emblem"
                    className="w-9 h-9 xl:w-10 xl:h-10 object-contain rounded-full p-1 bg-white border border-brand-border shadow-subtle group-hover:border-brand-purple/40 transition-colors shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading font-bold text-[0.98rem] xl:text-[1.125rem] text-brand-aubergine tracking-tight leading-none group-hover:text-brand-purple transition-colors whitespace-nowrap">
                      The Consistent Academy
                    </span>
                    <span className="text-[9.5px] xl:text-[10px] font-sans font-medium text-brand-charcoal-muted tracking-wide mt-1 whitespace-nowrap">
                      Learn with Clarity &amp; Confidence
                    </span>
                  </div>
                </Link>
              </div>

              {/* 2. Centre: Flexible Navigation Area (Home | Courses | Blog | Careers | Tests | Contact) */}
              <nav className="flex items-center justify-center min-w-0" aria-label="Main Navigation">
                <div className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2">
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`px-2.5 xl:px-3.5 py-1.5 text-[13px] xl:text-[13.5px] font-heading rounded-full transition-colors relative whitespace-nowrap group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${active
                            ? 'text-brand-aubergine font-bold'
                            : 'font-medium text-brand-charcoal hover:text-brand-purple'
                          }`}
                      >
                        <span>{link.name}</span>
                        {active && (
                          <span className="absolute bottom-0 inset-x-2.5 xl:inset-x-3.5 h-[2px] bg-brand-purple rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* 3. Right: Phone Icon & Number + Solid Purple Enroll Now Button */}
              <div className="flex items-center justify-end gap-2.5 xl:gap-4 shrink-0">
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="text-xs xl:text-[13px] font-heading font-semibold text-brand-aubergine hover:text-brand-purple transition-colors px-1 py-1.5 flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded-full"
                  title="Call Admissions"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  <span>{contactInfo.phone}</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center font-heading font-semibold text-white bg-brand-purple hover:bg-brand-purple-hover px-4 xl:px-5 py-2 xl:py-2.5 rounded-full shadow-sm transition-all ease-out hover:-translate-y-0.5 hover:shadow whitespace-nowrap text-xs xl:text-[13px] active:translate-y-0"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 link-arrow shrink-0" />
                </Link>
              </div>

            </div>

            {/* Mobile / Tablet Header (< lg): Compact Pill Capsule */}
            <div className="flex lg:hidden items-center justify-between h-14 sm:h-16 px-3.5 sm:px-5">
              <Link
                to="/"
                className="flex items-center gap-2 sm:gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-full p-0.5 min-w-0"
              >
                <img
                  src="/logo.png"
                  alt="The Consistent Academy Emblem"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full p-1 bg-white border border-brand-border shadow-subtle shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-bold text-[0.88rem] sm:text-base text-brand-aubergine tracking-tight leading-none truncate">
                    The Consistent Academy
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium text-brand-charcoal-muted tracking-wide mt-0.5 truncate hidden xs:block sm:block">
                    Learn with Clarity &amp; Confidence
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center font-heading font-semibold text-white bg-brand-purple hover:bg-brand-purple-hover text-xs py-1.5 px-3 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-all"
                >
                  Enroll Now
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-full text-brand-aubergine hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </div>

          {/* Mobile Drawer Menu — Floating Rounded Card matching Pill Theme */}
          {mobileMenuOpen && (
            <div className="pointer-events-auto lg:hidden mt-2 mx-auto rounded-2xl bg-brand-ivory/98 backdrop-blur-md border border-brand-border shadow-[0_12px_28px_-4px_rgba(53,33,59,0.14)] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
              <nav className="space-y-1" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`block px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-heading transition-colors ${active
                          ? 'bg-white text-brand-aubergine font-bold shadow-subtle border-l-4 border-brand-purple'
                          : 'font-medium text-brand-charcoal hover:bg-white/60'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-brand-border space-y-2.5">
                <Link
                  to="/contact"
                  className="w-full btn-primary text-sm py-2.5 justify-center font-heading font-semibold rounded-full"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>

                <div className="pt-1 flex flex-col gap-2 text-xs text-brand-charcoal-muted">
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:text-brand-aubergine font-heading font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Call Admissions: {contactInfo.phone}</span>
                  </a>
                  <a
                    href={contactInfo.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-1.5 rounded-lg text-emerald-800 hover:text-emerald-950 font-heading font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Join Learners Community</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
}
