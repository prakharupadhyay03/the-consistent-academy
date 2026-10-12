import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowUpRight, Clock, Navigation, ExternalLink } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';
import { courses } from '../data/courses';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ContactMap from '../components/contact/ContactMap';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefilledCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: prefilledCourse,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Admissions & Location | The Consistent Academy";
    window.scrollTo(0, 0);
    if (prefilledCourse) {
      setFormData(prev => ({ ...prev, course: prefilledCourse }));
    }
  }, [prefilledCourse]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Please enter a valid full name';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.course) {
      errs.course = 'Please select a course or area of interest';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your learning goals';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The Consistent Academy, Pune, Maharashtra, India')}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('The Consistent Academy, Pune, Maharashtra, India')}`;

  return (
    <div className="bg-brand-ivory py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3">
            <span>Direct Admissions &amp; Inquiries</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-aubergine tracking-tight">
            Connect with The Consistent Academy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans">
            Have questions regarding upcoming IELTS cohorts, corporate training modules, or young learner elocution classes? Reach out directly to our admissions team or send an inquiry below.
          </p>
        </div>

        {/* Dual-Column Layout: Form & Verified Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Col 1: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-brand-border shadow-card p-6 sm:p-10">
            
            {/* Direct Admissions Guidance Banner */}
            <div className="mb-6 p-4 rounded-xl bg-brand-ivory border border-brand-border/90 flex items-start gap-3.5 text-xs text-brand-charcoal">
              <div className="w-8 h-8 rounded-lg bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5 border border-brand-mauve-border">
                <MessageSquare className="w-4 h-4 text-brand-purple" />
              </div>
              <div>
                <p className="font-heading font-bold text-brand-aubergine text-xs sm:text-[13px]">
                  Direct Admissions &amp; Course Counseling Desk
                </p>
                <p className="mt-0.5 text-brand-charcoal-muted leading-relaxed">
                  We provide personalized 1-on-1 counseling for all course inquiries. Complete the form below to structure your enquiry, or connect directly via telephone at <a href={`tel:${contactInfo.phoneRaw}`} className="font-semibold text-brand-purple hover:underline">{contactInfo.phone}</a> or our verified WhatsApp desk.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-aubergine">
                    Course Enquiry Details Prepared
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-charcoal-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-brand-aubergine">{formData.name}</strong>. Your enquiry for <strong className="text-brand-purple">{formData.course}</strong> is ready. Connect directly with admissions using either instant channel below:
                  </p>
                </div>

                <div className="pt-2 max-w-md mx-auto space-y-2.5">
                  <a
                    href={`https://wa.me/917709109830?text=${encodeURIComponent(`Hello Admissions, my name is ${formData.name}.\n\nI would like to enquire about: ${formData.course}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nGoals / Message:\n${formData.message}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary py-3 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send to Admissions on WhatsApp (+91 77091 09830)</span>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(`Course Enquiry: ${formData.course} - ${formData.name}`)}&body=${encodeURIComponent(`Hello The Consistent Academy Admissions,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProgram of Interest: ${formData.course}\n\nGoals & Inquiries:\n${formData.message}\n\nThank you.`)}`}
                    className="w-full btn-outline py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 rounded-lg bg-white"
                  >
                    <Mail className="w-4 h-4 text-brand-purple" />
                    <span>Send via Official Email ({contactInfo.email})</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-brand-charcoal-muted hover:text-brand-aubergine underline font-medium"
                  >
                    Edit or Modify Enquiry Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-aubergine mb-1.5">
                    Full Name <span className="text-brand-purple">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-brand-border bg-brand-ivory/30'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-aubergine mb-1.5">
                      Email Address <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-brand-border bg-brand-ivory/30'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-aubergine mb-1.5">
                      Phone Number <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-brand-border bg-brand-ivory/30'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Course Selection Dropdown */}
                <div>
                  <label htmlFor="course" className="block text-xs font-bold uppercase tracking-wider text-brand-aubergine mb-1.5">
                    Course / Program of Interest <span className="text-brand-purple">*</span>
                  </label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple ${
                      errors.course ? 'border-red-400 bg-red-50/20' : 'border-brand-border bg-brand-ivory/30'
                    }`}
                  >
                    <option value="">-- Please select a program --</option>
                    <optgroup label="Adults & Professionals">
                      {courses.filter(c => c.category === 'adults').map(c => (
                        <option key={c.id} value={c.title}>{c.title} ({c.price})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Kids & Young Learners">
                      {courses.filter(c => c.category === 'kids').map(c => (
                        <option key={c.id} value={c.title}>{c.title} ({c.price})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Teacher / Educator Pedagogy">
                      {courses.filter(c => c.category === 'educators').map(c => (
                        <option key={c.id} value={c.title}>{c.title} ({c.price})</option>
                      ))}
                    </optgroup>
                    <option value="General Diagnostic Consultation">General Diagnostic Consultation</option>
                  </select>
                  {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-aubergine mb-1.5">
                    Your Goals or Inquiries <span className="text-brand-purple">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your target IELTS band (e.g. 7.5), country destination, preferred batch timings, or specific questions..."
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-brand-border bg-brand-ivory/30'
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                {/* Submit Button & Privacy Note */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Prepare &amp; Send Course Enquiry</span>
                  </button>
                  <p className="text-[11px] text-brand-charcoal-muted text-center leading-relaxed">
                    Privacy assurance: Your contact information is kept strictly confidential and used solely for educational consultation and course scheduling.
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Col 2: Verified Academy Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle hover:border-brand-purple/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-muted">
                    Direct Admissions Line
                  </span>
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="block font-heading text-xl font-bold text-brand-aubergine hover:text-brand-purple transition-colors mt-0.5"
                  >
                    {contactInfo.phone}
                  </a>
                  <p className="text-xs text-brand-charcoal-muted mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-purple" />
                    <span>{contactInfo.timings}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle hover:border-brand-purple/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-muted">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="block font-sans text-sm font-bold text-brand-aubergine hover:text-brand-purple transition-colors mt-0.5 break-all"
                  >
                    {contactInfo.email}
                  </a>
                  <p className="text-xs text-brand-charcoal-muted mt-1">
                    Replies typically within 24 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Community Card */}
            <div className="bg-white rounded-xl border border-emerald-200/80 p-6 shadow-subtle hover:border-emerald-400 transition-colors bg-emerald-50/20">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Official Community
                  </span>
                  <h4 className="font-heading text-base font-bold text-brand-aubergine mt-0.5">
                    WhatsApp Learners Channel
                  </h4>
                  <p className="text-xs text-brand-charcoal-muted mt-1 mb-3">
                    Daily vocabulary drills, test announcements, and direct mentor coordination.
                  </p>
                  <a
                    href={contactInfo.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <span>Join Free Community</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Location Card */}
            <div className="bg-white rounded-xl border border-brand-border p-6 shadow-subtle">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-gold-light border border-brand-gold-border text-[#7C5A26] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal-muted">
                    Academy Headquarters
                  </span>
                  <h4 className="font-heading text-base font-bold text-brand-aubergine mt-0.5">
                    {contactInfo.location}
                  </h4>
                  <p className="text-xs text-brand-charcoal-muted mt-1">
                    Serving classroom batches in Pune and worldwide learners via live hybrid classrooms.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Section 9: Prominent Google Maps Preview Location Section */}
        <section className="mt-16 pt-12 border-t border-brand-border" aria-labelledby="map-heading">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C5A26] bg-brand-gold-light border border-brand-gold-border px-3 py-1 rounded-md">
              Academy Location &amp; Directions
            </span>
            <h2 id="map-heading" className="font-heading text-3xl sm:text-4xl font-bold text-brand-aubergine mt-3">
              Find Your Way to Us
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-charcoal-muted leading-relaxed">
              View our location on Google Maps and get directions.
            </p>
          </div>

          {/* Large Interactive Map Card Container */}
          <div className="bg-white rounded-2xl border border-brand-border p-3 sm:p-5 lg:p-6 shadow-card">
            
            {/* Interactive Leaflet Map Component */}
            <ContactMap
              searchUrl={googleMapsSearchUrl}
              directionsUrl={googleMapsDirectionsUrl}
              academyName={contactInfo.institutionName}
              locationText={contactInfo.location}
            />

            {/* Compact Location Information Row below Map */}
            <div className="mt-5 pt-4 border-t border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="text-xs text-brand-charcoal-muted max-w-xl">
                <p className="font-semibold text-brand-aubergine flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                  <span>Location verified: <strong>{contactInfo.location}</strong></span>
                </p>
                <p className="text-[11px] text-brand-charcoal-light mt-0.5 leading-relaxed">
                  Centred on Pune metropolitan region. For specific classroom batch schedules and centre inquiries, please contact admissions.
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple font-heading font-semibold"
                  aria-label="Open The Consistent Academy location in Google Maps (opens in a new tab)"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-purple" />
                </a>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple font-heading font-semibold"
                  aria-label="Get driving and transit directions to The Consistent Academy on Google Maps (opens in a new tab)"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
