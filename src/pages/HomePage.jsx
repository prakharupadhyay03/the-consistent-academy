import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import CredibilityBar from '../components/home/CredibilityBar';
import FeaturedCourses from '../components/home/FeaturedCourses';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FounderSpotlight from '../components/home/FounderSpotlight';
import TestimonialsSection from '../components/home/TestimonialsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

import ScrollRevealSection from '../components/common/ScrollRevealSection';

export default function HomePage() {
  useEffect(() => {
    document.title = "The Consistent Academy | Learn with Clarity & Confidence";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ScrollRevealSection>
        <CredibilityBar />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <FeaturedCourses />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <WhyChooseUs />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <FounderSpotlight />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TestimonialsSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <GalleryPreview />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <FAQSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <CTASection />
      </ScrollRevealSection>
    </div>
  );
}
