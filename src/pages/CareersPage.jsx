import React, { useEffect } from 'react';
import { Mail, Check, Briefcase } from 'lucide-react';
import { contactInfo } from '../data/contactInfo';
import Badge from '../components/common/Badge';

export default function CareersPage() {
  useEffect(() => {
    document.title = "Careers & Faculty Openings | The Consistent Academy";
    window.scrollTo(0, 0);
  }, []);

  const openings = [
    {
      id: "ielts-trainer",
      title: "IELTS Trainer (Speaking & Writing Specialist)",
      type: "Full-Time / Part-Time",
      location: "Pune / Hybrid",
      requirements: [
        "Certified trainer with official IELTS Academic Band 8.0+",
        "Demonstrated experience in evaluating Academic Task 1 & 2 essays",
        "Excellent rapport-building and speaking mock evaluation skills",
        "Minimum 2+ years of verified training experience"
      ]
    },
    {
      id: "spoken-english-mentor",
      title: "Spoken English & Fluency Mentor",
      type: "Full-Time",
      location: "Pune Classroom / Online",
      requirements: [
        "Neutral global accent with strong phonetic awareness",
        "Ability to lead high-energy interactive group speaking drills",
        "Experience coaching nervous or hesitant adult learners",
        "Fluency in English with strong contextual vocabulary"
      ]
    },
    {
      id: "teaching-assistant",
      title: "Academic Teaching Assistant & Coordinator",
      type: "Full-Time",
      location: "Pune, Maharashtra",
      requirements: [
        "Classroom administrative coordination and student batch tracking",
        "Grading objective grammar worksheets and practice drills",
        "Assisting head faculty during corporate and school workshops",
        "Graduate in English Literature or Education preferred"
      ]
    },
    {
      id: "writing-coach",
      title: "Creative Writing & Grammar Coach (Young Learners)",
      type: "Part-Time / Weekend",
      location: "Pune / Online",
      requirements: [
        "Passion for inspiring children (Ages 6–15) to read and write",
        "Strong foundation in grammar mechanics and punctuation",
        "Experience conducting elocution or debating workshops",
        "Patient, encouraging teaching temperament"
      ]
    },
    {
      id: "corporate-trainer",
      title: "Corporate Communication & Etiquette Trainer",
      type: "Contract / Workshop Based",
      location: "Onsite Client Visits & Hybrid",
      requirements: [
        "Corporate experience conducting dining and business communication workshops",
        "Deep familiarity with executive email writing and presentation delivery",
        "Certified corporate soft-skills trainer background",
        "Professional executive presence"
      ]
    }
  ];

  return (
    <div className="bg-brand-ivory py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3">
            <span>Faculty Recruitment</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-aubergine tracking-tight">
            Careers at The Consistent Academy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans">
            We are looking for passionate, certified educators, linguistic coaches, and academic mentors who believe in consistent, high-standard student outcomes.
          </p>
        </div>

        {/* Hiring Philosophy Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-white border border-brand-border shadow-subtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-purple">Pedagogy</span>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine mt-1">Author-Led Curricula</h3>
            <p className="text-xs text-brand-charcoal-muted mt-1 leading-relaxed">
              Work directly with structured, published materials developed across 19+ years of teaching excellence.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-brand-border shadow-subtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C5A26]">Cohort Quality</span>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine mt-1">Focused Cohort Sizes</h3>
            <p className="text-xs text-brand-charcoal-muted mt-1 leading-relaxed">
              We maintain controlled cohort limits to allow genuine 1-on-1 essay grading and spoken diagnostic assessments.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-brand-border shadow-subtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-aubergine">Growth</span>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine mt-1">Mentorship &amp; Honorarium</h3>
            <p className="text-xs text-brand-charcoal-muted mt-1 leading-relaxed">
              Competitive compensation, master trainer professional development, and collaborative academic leadership.
            </p>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-0.5 w-8 bg-brand-gold"></span>
            <h2 className="font-serif text-2xl font-bold text-brand-aubergine">
              Current Faculty &amp; Staff Openings ({openings.length})
            </h2>
          </div>

          {openings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-card hover:border-brand-purple/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="mauve" size="sm">{job.type}</Badge>
                  <span className="text-xs text-brand-charcoal-muted font-medium">• {job.location}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-aubergine">
                  {job.title}
                </h3>

                <div className="pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-aubergine mb-2">
                    Key Competencies &amp; Requirements:
                  </p>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-charcoal">
                        <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-2 md:pt-0">
                <a
                  href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(`Faculty Application: ${job.title}`)}`}
                  className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Apply via Email</span>
                </a>
                <span className="text-[10px] text-brand-charcoal-muted">Attach CV &amp; Scorecard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Application Advisory Notice */}
        <div className="bg-brand-mauve/30 rounded-xl border border-brand-mauve-border/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine">
              General Faculty Inquiries &amp; Guest Seminars
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-muted mt-1 max-w-2xl leading-relaxed">
              Do you specialize in corporate communication, elocution, or linguistic phonetics? We welcome proposals for weekend masterclasses and corporate training collaborations.
            </p>
          </div>
          <a
            href={`mailto:${contactInfo.email}?subject=${encodeURIComponent('Faculty Inquiry / Workshop Collaboration')}`}
            className="btn-outline text-xs py-2.5 px-4 shrink-0"
          >
            Send Academic Portfolio
          </a>
        </div>

      </div>
    </div>
  );
}
