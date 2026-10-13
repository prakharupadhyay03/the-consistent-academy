import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function SampleQuestionModal({ test, onClose, onStartFullTest }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!test) return null;

  const isLeadership = test.id === 'leadership-styles' || test.id === 'leadership';

  // Sample questions based on test type
  const sampleQuestions = isLeadership
    ? [
        {
          id: 1,
          question: "I prefer to make decisions on my own rather than involve the team.",
          section: "Decision-Making Style",
          archetype: "Autocratic",
          options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" }
          ],
          explanation: "Strong agreement correlates with Autocratic & Directive leadership styles."
        },
        {
          id: 2,
          question: "I consult my team before finalizing important decisions.",
          section: "Decision-Making Style",
          archetype: "Democratic",
          options: [
            { value: 1, label: "Strongly Disagree" },
            { value: 2, label: "Disagree" },
            { value: 3, label: "Neutral" },
            { value: 4, label: "Agree" },
            { value: 5, label: "Strongly Agree" }
          ],
          explanation: "High ratings indicate strong alignment with Democratic & Participative leadership."
        }
      ]
    : test.id === 'kids-grammar' || test.id === 'kids'
    ? [
        {
          id: 1,
          question: "The cat is sitting ___ the table.",
          options: ["on", "in", "at", "by"],
          correctAnswer: "a",
          section: "Fill in the Blanks",
          explanation: "Preposition of place: 'on' the surface of the table."
        },
        {
          id: 6,
          question: "Cat : Kitten :: Dog : ___",
          options: ["Puppy", "Calf", "Cub", "Foal"],
          correctAnswer: "a",
          section: "Analogy",
          explanation: "A kitten is a young cat, just as a puppy is a young dog."
        },
        {
          id: 11,
          question: "Tick the Grammatically Correct Sentence:",
          options: [
            "She don't like apples.",
            "She doesn't likes apples.",
            "She doesn't like apples.",
            "She not like apples."
          ],
          correctAnswer: "c",
          section: "Sentence Correction",
          explanation: "Third-person singular with auxiliary 'does not' takes base verb 'like'."
        }
      ]
    : [
        {
          id: 1,
          question: "Neither of the candidates ____ suitable for the position.",
          options: ["is", "are", "were", "have"],
          correctAnswer: "a",
          section: "Grammar & Subject-Verb Agreement",
          explanation: "'Neither of' followed by a plural noun takes a singular verb in standard formal English."
        },
        {
          id: 6,
          question: "Water : Thirst :: Food : ?",
          options: ["Hunger", "Appetite", "Starvation", "Meal"],
          correctAnswer: "a",
          section: "Challenging Verbal Analogy",
          explanation: "Water relieves thirst; food relieves hunger."
        },
        {
          id: 11,
          question: "Identify the meaning of: 'A hot potato'",
          options: [
            "A delicious food",
            "A controversial issue that is difficult to deal with",
            "A warm welcome",
            "An easy situation"
          ],
          correctAnswer: "b",
          section: "Idioms & Phrasal Verbs",
          explanation: "A 'hot potato' is a controversial, awkward issue that people avoid handling."
        }
      ];

  const handleSelectOption = (qId, optionVal) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionVal
    }));
  };

  const getOptionLetter = idx => String.fromCharCode(97 + idx); // 'a', 'b', 'c', 'd'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-aubergine/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-brand-border shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-ivory to-brand-mauve/40 p-5 sm:p-6 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-purple">
                  Interactive Sample Quiz
                </span>
                <Badge variant="neutral" size="sm">
                  {sampleQuestions.length} Questions
                </Badge>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-aubergine">
                {test.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-brand-charcoal-muted hover:text-brand-aubergine transition-colors"
            aria-label="Close sample modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-brand-charcoal-muted font-sans leading-relaxed">
            Try these authentic questions below. Click any option to see instant verification and academic feedback.
          </p>

          <div className="space-y-6">
            {sampleQuestions.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-xl border border-brand-border bg-brand-ivory/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-purple bg-brand-mauve px-2.5 py-0.5 rounded">
                      Question {qIndex + 1} • {q.section}
                    </span>
                    {selected !== undefined && !isLeadership && (
                      <span
                        className={`text-xs font-bold inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                          selected === q.correctAnswer
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {selected === q.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-brand-aubergine leading-snug">
                    {q.question}
                  </p>

                  {/* Options */}
                  {isLeadership ? (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                      {q.options.map(opt => {
                        const isChosen = selected === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt.value)}
                            className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                              isChosen
                                ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                                : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-purple/40 hover:bg-brand-mauve/20'
                            }`}
                          >
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {q.options.map((optText, optIdx) => {
                        const optKey = getOptionLetter(optIdx);
                        const isChosen = selected === optKey;
                        const isCorrect = q.correctAnswer === optKey;
                        const showValidation = selected !== undefined;

                        let cardStyle = "bg-white text-brand-charcoal border-brand-border hover:border-brand-purple/40 hover:bg-brand-mauve/10";
                        let badgeStyle = "bg-stone-100 text-brand-charcoal";

                        if (showValidation) {
                          if (isCorrect) {
                            cardStyle = "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium";
                            badgeStyle = "bg-emerald-600 text-white";
                          } else if (isChosen && !isCorrect) {
                            cardStyle = "bg-rose-50/80 border-rose-500 text-rose-950 line-through";
                            badgeStyle = "bg-rose-600 text-white";
                          } else {
                            cardStyle = "bg-stone-50 text-stone-400 border-stone-200 opacity-60";
                          }
                        } else if (isChosen) {
                          cardStyle = "bg-brand-mauve border-brand-purple text-brand-aubergine font-semibold";
                          badgeStyle = "bg-brand-purple text-white";
                        }

                        return (
                          <button
                            key={optKey}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optKey)}
                            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm transition-all duration-150 ${cardStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}>
                                {optKey.toUpperCase()}
                              </span>
                              <span>{optText}</span>
                            </div>
                            {showValidation && isCorrect && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                                ✓ Correct
                              </span>
                            )}
                            {showValidation && isChosen && !isCorrect && (
                              <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0">
                                ✕ Wrong
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation feedback */}
                  {selected !== undefined && q.explanation && (
                    <div className="mt-2 p-2.5 rounded-lg bg-brand-mauve/40 border border-brand-mauve-border text-xs text-brand-aubergine flex items-start gap-2">
                      <span className="font-bold shrink-0 text-brand-purple">Feedback:</span>
                      <span className="text-brand-charcoal">{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-brand-border flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            <span>Close Preview</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onStartFullTest(test);
            }}
          >
            <span>Start Full Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

      </div>
    </div>
  );
}
