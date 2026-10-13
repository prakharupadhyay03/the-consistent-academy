import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle2,
  Check,
  ArrowRight,
  HelpCircle,
  LogIn,
  User,
  LogOut,
  Sparkles,
  BookOpen,
  GraduationCap,
  Briefcase,
  Layers,
  Lock,
  Mail,
  Building2,
  Award,
  AlertCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import TestRunner from '../components/tests/TestRunner';
import SampleQuestionModal from '../components/tests/SampleQuestionModal';
import {
  kidsTestData,
  adultsTestData,
  leadershipTestData
} from '../data/testsData';

export default function TestsPage() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tca_test_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auth form state
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authCompany, setAuthCompany] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active test execution & modal states
  const [activeTest, setActiveTest] = useState(null);
  const [activeSampleTest, setActiveSampleTest] = useState(null);

  useEffect(() => {
    document.title = "Diagnostic Tests & Assessment | The Consistent Academy";
    window.scrollTo(0, 0);
  }, [activeTest]);

  // Handle Login / Registration submit
  const handleAuthSubmit = e => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }

    if (isRegisterMode && !authName.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }

    setAuthLoading(true);

    setTimeout(() => {
      const userObj = {
        name: authName.trim() || authEmail.split('@')[0],
        email: authEmail.trim(),
        company: authCompany.trim() || 'Independent Learner',
        role: isRegisterMode ? 'Registered Candidate' : 'Active Learner',
        signedInAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('tca_test_user', JSON.stringify(userObj));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setCurrentUser(userObj);
      setAuthLoading(false);
    }, 400);
  };

  // Quick Demo Access (zero-friction login)
  const handleDemoAccess = () => {
    const demoUser = {
      name: 'Prakhar Upadhyay',
      email: 'learner.demo@theconsistentacademy.in',
      company: 'The Consistent Academy',
      role: 'Verified Candidate',
      signedInAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('tca_test_user', JSON.stringify(demoUser));
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(demoUser);
  };

  // Handle Sign Out
  const handleSignOut = () => {
    try {
      localStorage.removeItem('tca_test_user');
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
    setActiveTest(null);
    setActiveSampleTest(null);
  };

  // The 3 authentic tests configured from real platform
  const testCards = [
    {
      id: 'kids',
      title: "Grammar Diagnostic Test for Kids",
      badge: "School Level (Ages 5–17)",
      target: "Young Learners & School Students",
      length: "25 Multiple-Choice Questions",
      duration: "15 Minutes",
      topics: [
        "Fill in the Blanks (Prepositions, Articles, Conjunctions)",
        "Analogy (Word Associations & Relationships)",
        "Grammar & Sentence Correction",
        "Synonyms & Contextual Vocabulary",
        "Degrees of Comparison (Adjectives & Adverbs)"
      ],
      description: "A friendly, comprehensive diagnostic quiz assessing sentence structure, verb tenses, and grammatical accuracy for school students.",
      data: kidsTestData,
      accentColor: "from-blue-600 to-indigo-600",
      buttonText: "Start Kids Test"
    },
    {
      id: 'adults',
      title: "Advanced Grammar & Precision Test",
      badge: "CEFR B2–C1 Advanced",
      target: "Adults, College Students & IELTS Aspirants",
      length: "28 Advanced Diagnostic Questions",
      duration: "20 Minutes",
      topics: [
        "Fill-in-the-Blanks (Complex Clauses & Mood)",
        "Challenging Verbal Analogies",
        "Idioms & Contextual Phrasal Verbs",
        "One-Word Substitution & Lexical Range",
        "Sentence Improvement & Syntactic Precision"
      ],
      description: "Benchmarked against CEFR B2–C1 standards. Evaluates linguistic precision required for academic writing, IELTS/PTE bands, and professional articulation.",
      data: adultsTestData,
      accentColor: "from-brand-purple to-brand-aubergine",
      buttonText: "Start Adults Test"
    },
    {
      id: 'leadership',
      title: "Executive Leadership Style Diagnostic",
      badge: "Psychometric Assessment",
      target: "Managers, Team Leads, Entrepreneurs & Educators",
      length: "60 Psychometric Likert Statements",
      duration: "25 Minutes",
      topics: [
        "10 Evaluated Archetypes (Visionary, Coaching, Servant, etc.)",
        "Decision-Making Style & Autonomy Distribution",
        "Communication, Delegation & Influence",
        "People, Conflict & Performance Optimization"
      ],
      description: "A comprehensive psychometric evaluation identifying your primary and secondary leadership styles across 10 verified organizational models.",
      data: leadershipTestData,
      accentColor: "from-amber-600 to-brand-aubergine",
      buttonText: "Start Leadership Test"
    }
  ];

  // Leadership archetypes list
  const leadershipArchetypes = [
    "Visionary",
    "Coaching",
    "Democratic",
    "Servant",
    "Transformational",
    "Situational",
    "Transactional",
    "Bureaucratic",
    "Autocratic",
    "Laissez-Faire"
  ];

  // If a test is actively running, render the interactive TestRunner
  if (activeTest) {
    return (
      <div className="bg-brand-ivory min-h-screen pt-8 pb-20">
        <TestRunner
          testData={activeTest}
          onBackToSelection={() => setActiveTest(null)}
        />
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-mauve text-brand-aubergine border border-brand-mauve-border mb-3">
            <span>Skill Benchmarking Center</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-aubergine tracking-tight">
            English &amp; Leadership Diagnostic Tests
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-charcoal-muted leading-relaxed font-sans">
            Diagnose grammatical precision, identify sentence structure errors, or evaluate your managerial communication style with our verified benchmark assessments.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* LOGIN SECTION (Authentic Main Website Feature) */}
        {/* ------------------------------------------------------------------ */}
        {!currentUser ? (
          <div className="mb-16 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-card space-y-6">
              
              {/* Login Card Header */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-brand-mauve text-brand-purple mx-auto flex items-center justify-center shadow-subtle">
                  <LogIn className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-aubergine">
                  Welcome to Diagnostic Tests
                </h2>
                <p className="text-xs sm:text-sm text-brand-charcoal-muted">
                  {isRegisterMode
                    ? "Create your assessment account to begin tests and track your score."
                    : "Sign in to access your test dashboard and evaluate all questions."}
                </p>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex rounded-xl bg-brand-ivory p-1 border border-brand-border text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    !isRegisterMode
                      ? 'bg-white text-brand-aubergine shadow-sm'
                      : 'text-brand-charcoal-muted hover:text-brand-aubergine'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    isRegisterMode
                      ? 'bg-white text-brand-aubergine shadow-sm'
                      : 'text-brand-charcoal-muted hover:text-brand-aubergine'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isRegisterMode && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-purple" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        value={authName}
                        onChange={e => setAuthName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-ivory/30 text-brand-charcoal text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-purple" />
                        <span>Company / School</span>
                      </label>
                      <input
                        type="text"
                        value={authCompany}
                        onChange={e => setAuthCompany(e.target.value)}
                        placeholder="e.g. Delhi Public School / TCS"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-ivory/30 text-brand-charcoal text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="learner@example.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-ivory/30 text-brand-charcoal text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Password</span>
                  </label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-brand-ivory/30 text-brand-charcoal text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={authLoading}
                  className="w-full justify-center"
                >
                  {authLoading ? (
                    <span>Processing...</span>
                  ) : (
                    <span>{isRegisterMode ? "Create Account & Start" : "Sign In to Tests"}</span>
                  )}
                </Button>
              </form>

              {/* Zero-friction Demo Access */}
              <div className="pt-4 border-t border-brand-border text-center space-y-3">
                <p className="text-xs text-brand-charcoal-muted">
                  Want to explore tests directly without typing credentials?
                </p>
                <button
                  type="button"
                  onClick={handleDemoAccess}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-brand-aubergine hover:underline transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>One-Click Guest Access / Preview All Tests</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* User Logged In Bar */
          <div className="mb-12 bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center font-bold text-sm shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm sm:text-base text-brand-aubergine">
                    Welcome, {currentUser.name}
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Authenticated
                  </span>
                </div>
                <p className="text-xs text-brand-charcoal-muted">
                  {currentUser.email} • {currentUser.company}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-brand-border text-stone-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CHOOSE YOUR TEST: The 3 Real Tests from Main Website */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-0.5 w-8 bg-brand-gold"></span>
            <h2 className="font-serif text-2xl font-bold text-brand-aubergine">
              Choose Your Diagnostic Assessment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testCards.map(test => (
              <div
                key={test.id}
                className="bg-white rounded-xl border border-brand-border p-6 sm:p-7 shadow-card flex flex-col justify-between hover:shadow-elevated transition-shadow duration-200"
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

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-aubergine mb-1.5 leading-snug">
                    {test.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-purple mb-3">
                    {test.target}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed mb-5">
                    {test.description}
                  </p>

                  {/* Evaluated Competencies */}
                  <div className="border-t border-brand-border pt-4 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand-aubergine mb-2.5">
                      Curriculum Coverage:
                    </p>
                    <ul className="space-y-2 text-xs text-brand-charcoal">
                      {test.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          <span className="leading-tight">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-brand-border flex flex-col gap-3 mt-auto">
                  <div className="flex items-center justify-between text-xs text-brand-charcoal-muted">
                    <span className="font-semibold text-brand-aubergine">{test.length}</span>
                    <span>Est. {test.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveSampleTest(test)}
                      className="flex-1 text-center text-xs font-semibold py-2 px-3 rounded-lg border border-brand-border text-brand-charcoal hover:text-brand-purple hover:border-brand-purple/40 hover:bg-brand-mauve/20 transition-all"
                    >
                      View Sample
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        if (!currentUser) {
                          handleDemoAccess();
                        }
                        setActiveTest(test.data);
                      }}
                      className="flex-1 justify-center"
                    >
                      <span>{test.buttonText}</span>
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 10 EVALUATED LEADERSHIP ARCHETYPES (Clean Preserved Framework) */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-16">
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

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-3.5">
              {leadershipArchetypes.map((name, idx) => (
                <div
                  key={idx}
                  className="group rounded-lg p-3 sm:p-4 bg-brand-ivory/50 border border-brand-border text-center flex items-center justify-center min-h-[58px] sm:min-h-[64px] hover:border-brand-purple/50 hover:bg-brand-purple-subtle/50 hover:shadow-subtle transition-all duration-200"
                >
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-brand-aubergine group-hover:text-brand-purple transition-colors duration-200">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology notice */}
        <div className="bg-brand-mauve/30 rounded-xl border border-brand-mauve-border/60 p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-lg bg-brand-mauve text-brand-purple flex items-center justify-center shrink-0">
            {/* Official React Atom Logo */}
            <svg
              viewBox="-11.5 -10.23174 23 20.46348"
              className="w-6 h-6 text-brand-purple"
              aria-hidden="true"
            >
              <circle cx="0" cy="0" r="2.05" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-aubergine">How Diagnostic Feedback Is Provided</h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-muted mt-1 leading-relaxed font-sans">
              Upon completing any assessment on this portal, you get immediate question-by-question feedback with right/wrong indicators and explanations. For a personalized consultation and customized study roadmap, you can book a one-on-one session with our master trainers.
            </p>
          </div>
          <div className="shrink-0">
            <Button to="/contact" variant="primary" size="md">
              <span>Book Assessment Call</span>
            </Button>
          </div>
        </div>

      </div>

      {/* Interactive Sample Modal */}
      {activeSampleTest && (
        <SampleQuestionModal
          test={activeSampleTest}
          onClose={() => setActiveSampleTest(null)}
          onStartFullTest={test => {
            if (!currentUser) {
              handleDemoAccess();
            }
            setActiveTest(test.data);
          }}
        />
      )}
    </div>
  );
}
