import React from 'react';
import { Award, ShieldCheck, GraduationCap, CheckCircle, BookCheck } from 'lucide-react';

export default function CredibilityBar() {
  const credentials = [
    { title: "British Council Certified", desc: "IELTS Master Trainer" },
    { title: "UGC NET Qualified", desc: "Higher Academic Standard" },
    { title: "TESOL & TEFL Certified", desc: "Global English Pedagogy" },
    { title: "TOEFL & PET Certified", desc: "Testing Specialist" },
    { title: "Published Author", desc: "3 Educational Guides" },
  ];

  return (
    <section className="bg-brand-ivory border-b border-brand-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {credentials.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2.5 p-2 rounded-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-brand-aubergine tracking-tight">{item.title}</p>
                <p className="text-[11px] text-brand-charcoal-muted font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
