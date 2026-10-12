import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found | The Consistent Academy";
  }, []);

  return (
    <div className="bg-brand-ivory py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-xl border border-brand-border shadow-card">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-purple bg-brand-mauve px-3 py-1 rounded-md">
          Status 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-aubergine mt-4 mb-2">
          Page Not Located
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed mb-6 font-sans">
          The requested page could not be found. It may have been relocated or updated as part of our academic website refinement.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary" size="sm">
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span>Return Home</span>
          </Button>
          <Button to="/courses" variant="outline" size="sm">
            <span>Browse Courses</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
