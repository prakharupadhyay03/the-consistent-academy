import React, { useState, useEffect } from 'react';
import { 
  UserRound, 
  CalendarDays, 
  ArrowRight, 
  X, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function BlogPage() {
  useEffect(() => {
    document.title = "Community Blogs | The Consistent Academy";
    window.scrollTo(0, 0);
  }, []);

  // Initial community blogs matching the original reference
  const [articles, setArticles] = useState([
    {
      id: 'boost-comprehension-skills',
      title: 'Who to boost your comprehension skills',
      author: 'Vidya Wankhade',
      date: '14 Oct 2024',
      readTime: '5 min read',
      excerpt: 'Comprehension is not merely passive word recognition; it is an active cognitive dialogue with the author. Discover structural reading methods, topic sentence identification, and semantic grouping to double your retention without re-reading paragraphs.',
      content: `Comprehension is not merely passive word recognition; it is an active cognitive dialogue with the author. Most learners struggle with reading speed because they mentally pronounce every single syllable—a habit known as subvocalization—which caps reading efficiency at spoken conversation speed.

To truly elevate your comprehension skills, you must shift from passive absorption to strategic questioning:

1. The Top-Down Structural Scan: Before reading word-for-word, survey headings, concluding sentences, and typographic signposts. This creates a mental framework upon which detailed ideas can hang.
2. Contextual Deduction: Rather than pausing at every unfamiliar term, infer meaning from sentence syntax and surrounding contrasts.
3. Active Summarization: After each paragraph, pause for three seconds to distill the central thesis into a single 5-word sentence.

By training your mind to look for the thesis rather than getting lost in supporting clauses, you will unlock rapid understanding whether preparing for IELTS Academic passages or analyzing complex workplace documentation.`
    },
    {
      id: 'fifteen-minutes-reading',
      title: 'How 15 minutes of reading can change your life',
      author: 'Ananya Joshi',
      date: '04 Oct 2024',
      readTime: '4 min read',
      excerpt: 'Building a consistent reading routine does not require hours of daily commitment. Discover how fifteen dedicated, focused minutes of non-fiction reading each morning compounds into expansive vocabulary, sharper articulation, and sustained concentration.',
      content: `Building a consistent reading routine does not require hours of daily commitment. Many aspiring readers set unrealistic goals—promising to read an hour each evening—only to abandon the ambition after three exhausting workdays.

The compound effect of just fifteen focused minutes each morning is transformative:

1. Vocabulary in Living Context: 15 minutes of reading exposes you to approximately 3,500 words daily. Over a single year, that amounts to over 1.2 million words, naturally introducing advanced idioms and grammatical constructs in their natural habitats.
2. Cognitive Grounding: Morning reading acts as intellectual meditation, calming cognitive clutter before digital notifications fragment your attention span.
3. Expressive Fluency: As your mental repertoire expands, your spoken clarity elevates automatically. You will find yourself choosing precise adjectives rather than relying on repetitive fillers.

Start with quality editorial essays or curated non-fiction. Protect those 15 minutes as your untouchable sanctuary of daily intellectual growth.`
    },
    {
      id: 'secret-to-master-english',
      title: 'Secret to master english',
      author: 'Rohan Kulkarni',
      date: '24 Sep 2024',
      readTime: '6 min read',
      excerpt: 'Why do students who memorize thousands of grammar rules still freeze when speaking to native speakers? Uncover the critical distinction between linguistic knowledge and spontaneous communication reflexes, and the daily immersion habit that bridges the divide.',
      content: `Why do students who memorize thousands of grammar rules still freeze when speaking in professional settings? The answer lies in the fundamental distinction between explicit linguistic knowledge and automatic communication reflexes.

Grammar tables teach you how language works on paper, but spontaneous speech demands real-time retrieval under pressure:

1. Stop Translating from Your Native Tongue: When you translate internally, your brain executes a 3-step loop: Concept -> Native Language -> Grammar Filter -> English Output. This lag causes vocal hesitations and unnatural cadence.
2. The 3-Sentence Reaction Drill: Whenever you encounter a news headline or everyday situation, vocalize three connected English sentences out loud immediately.
3. Shadowing Fluent Speakers: Listen to accredited podcasts and repeat sentences simultaneously, matching tone, pitch, and pauses.

Mastery is not about perfection; it is about momentum. Speak with conviction, allow occasional errors without self-judgment, and let consistent practice build unshakeable conversational ease.`
    },
    {
      id: 'crack-group-discussion',
      title: 'Master guide to crack Group Discussion',
      author: 'Nikhil Sharma',
      date: '15 Sep 2024',
      readTime: '5 min read',
      excerpt: 'Group Discussions in campus recruitments and corporate interviews are never about dominating the conversation or shouting the loudest. Master the proven framework of constructive initiation, nuanced transitions, and structured consensus building.',
      content: `Group Discussions in campus recruitments and corporate assessments are widely misunderstood. Many candidates assume that speaking the most words or speaking with maximum volume demonstrates leadership. In reality, evaluators penalize aggression and reward collaborative clarity.

Here is the exact playbook to score in the top percentile:

1. Strategic Initiation: If you know the topic well, initiate with a balanced overview and a clear definition of parameters. If you are uncertain of the nuances, wait 30 seconds, listen carefully to early speakers, and enter as the synthesizer.
2. Bridge Building: Elevate the discussion by acknowledging peers: "I agree with Rohan's point regarding economic feasibility, and to build on that, we must also consider the digital infrastructure..."
3. Steering the Divergence: When the group veers off-topic, tactfully bring focus back to the core challenge. Evaluators value candidates who facilitate collective progress over solitary showmanship.

Remember: GD evaluators look for future colleagues, not talk-show hosts. Demonstrate empathy, poise, and logical coherence.`
    },
    {
      id: 'ielts-in-ten-days',
      title: 'How to Prepare for IELTS in 10 Days: A Practical Guide for Quick Success',
      author: 'Vidya Wankhade',
      date: '28 Aug 2024',
      readTime: '7 min read',
      excerpt: 'Facing an urgent test booking with only a single week and a half left? Here is an intensive 10-day battle plan prioritizing high-yield scoring patterns, time-management protocols, and examiner-focused criteria to maximize your band score.',
      content: `Facing an urgent test booking with only a single week and a half left? While long-term preparation is always ideal, a focused 10-day sprint can systematically eliminate preventable errors and boost your overall band by a crucial 0.5 to 1.0 points.

Here is your intensive day-by-day battle plan:

Days 1–3: Diagnostic Calibration & Pattern Mastery
• Take two official Cambridge practice tests under strict timed conditions.
• Identify your primary leak: Is it Listening section 3 distractors, Reading passage 3 time management, or Task 2 cohesion?
• Master the exact Band Descriptors: Learn how lexical precision and grammatical range are objectively graded.

Days 4–7: The Writing & Speaking Intensive
• Stop memorizing pre-written templates; examiners instantly penalize formulaic clichés.
• Practice 2 full Task 2 essays daily focusing on clean 4-paragraph structure: Introduction with clear thesis, two balanced body paragraphs with evidence, and a logical conclusion.
• Record your spoken responses for Part 2 cue cards daily, listening back to correct filler words like "um" and "basically".

Days 8–9: Full Mock Simulation
• Complete a full 3-hour test (Listening, Reading, Writing) without pauses at the exact time of day your actual exam is scheduled.

Day 10: Mental Rest & Logistics Review
• Review your high-value vocabulary list, verify test venue documentation, and sleep early. Confidence and calm focus are your greatest assets on exam morning.`
    },
    {
      id: 'overcoming-conversation-hesitation',
      title: 'Overcoming Hesitation in Everyday Conversations',
      author: 'Tanvi Deshmukh',
      date: '10 Aug 2024',
      readTime: '4 min read',
      excerpt: 'Do you feel articulate in your head, but tongue-tied when you open your mouth? Learn how to rewire your linguistic reflexes, embrace strategic conversational pauses, and communicate with authentic confidence in any social or business setting.',
      content: `Do you feel articulate in your head, but tongue-tied the instant you open your mouth? You are not lacking intelligence or knowledge; you are simply caught in an overthinking reflex that interrupts your natural vocal flow.

To overcome everyday conversation hesitation:

1. Normalize the Silent Pause: Native speakers frequently pause to gather thoughts. Instead of filling pauses with nervous fillers like "uh" or rushing into half-baked sentences, hold eye contact, take a steady breath, and speak when ready. A deliberate pause projects gravitas.
2. Use Modular Openers: Keep dependable starter phrases ready: "From my perspective...", "What caught my attention was...", or "Let's look at the underlying reason..."
3. Embrace 80% Precision: In spoken conversation, clarity and emotional warmth matter far more than flawless grammatical syntax. Give yourself permission to speak imperfectly.

Fluency is built through repetition in low-stakes environments. Practice with supportive peers, join community discussions, and trust your voice.`
    }
  ]);

  // Modal states
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Close modal on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };

    if (selectedArticle) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedArticle]);

  return (
    <div className="bg-brand-ivory min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* A. Blog Introduction (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-aubergine tracking-tight mb-3">
            Community Blogs
          </h1>
          <p className="text-base sm:text-lg text-brand-charcoal-muted font-sans font-medium">
            Share insights, stories and learning experiences ✨
          </p>
        </div>

        {/* C. Community Blog Cards (Three-Column Desktop Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-brand-border/80 p-6 sm:p-7 shadow-subtle hover:shadow-card hover:border-brand-purple/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full group"
            >
              {/* Card Header & Content */}
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-brand-aubergine group-hover:text-brand-purple transition-colors duration-150 leading-snug mb-3 min-h-[3.25rem]">
                  {art.title}
                </h2>

                {/* Meta details with UserRound & CalendarDays */}
                <div className="flex items-center gap-4 text-xs sm:text-[13px] text-brand-charcoal-muted mb-4 font-sans">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <UserRound className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                    <span className="truncate font-medium">{art.author}</span>
                  </div>
                  <span className="text-stone-300 select-none">•</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <CalendarDays className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                    <span>{art.date}</span>
                  </div>
                </div>

                {/* Excerpt clamped to 4-5 lines */}
                <p className="text-xs sm:text-[13.5px] text-brand-charcoal leading-relaxed line-clamp-4 font-sans mb-5">
                  {art.excerpt}
                </p>
              </div>

              {/* Card Footer: Read More link */}
              <div className="pt-4 border-t border-brand-border/60 mt-auto">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(art)}
                  className="font-heading font-semibold text-xs sm:text-sm text-brand-purple group-hover:text-brand-purple-hover inline-flex items-center gap-1 transition-colors group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple rounded"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-150 shrink-0" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>





      {/* ========================================================================= */}
      {/* MODAL 3: Read More Article Reader Modal */}
      {/* ========================================================================= */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-aubergine-deep/60 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-modal-title"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="relative bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-elevated border border-brand-border max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Top-Right Cancel / Close Button (Always visible during scrolling) */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-stone-100 border border-brand-border text-brand-aubergine hover:text-brand-purple shadow-sm hover:shadow transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
              aria-label="Close article reader"
              title="Close reader (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Article Content Container */}
            <div className="overflow-y-auto p-6 sm:p-10 flex-grow scroll-smooth">
              {/* Header info */}
              <div className="pb-4 border-b border-brand-border mb-6 pr-12 sm:pr-14">
                <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-brand-purple bg-brand-purple-pale px-2.5 py-0.5 rounded-full mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Community Article</span>
                </span>
                <h2 id="reader-modal-title" className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-brand-aubergine leading-snug">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-brand-charcoal-muted mt-3 font-sans">
                  <div className="flex items-center gap-1.5">
                    <UserRound className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="font-medium text-brand-aubergine">{selectedArticle.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Article body */}
              <div className="prose max-w-none text-brand-charcoal font-sans text-sm sm:text-base leading-relaxed space-y-4">
                {selectedArticle.content.split('\n\n').map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Close footer */}
              <div className="mt-8 pt-5 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-charcoal-muted">
                  The Consistent Academy Community
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-brand-aubergine hover:bg-brand-aubergine-light text-white text-xs sm:text-sm font-heading font-semibold transition-colors shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
