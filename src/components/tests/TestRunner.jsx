import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Award,
  Sparkles,
  HelpCircle,
  Compass,
  Check,
  X
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import {
  sectionInstructions,
  leadershipLikertScale,
  leadershipArchetypesInfo
} from '../../data/testsData';

export default function TestRunner({ testData, onBackToSelection }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Flatten all questions across sections
  const allQuestions = testData.sections.flatMap(section =>
    section.questions.map(q => ({
      ...q,
      sectionTitle: section.title
    }))
  );

  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentIndex];
  const isLeadership = testData.testType === 'leadership' || testData.id === 'leadership';

  const getOptionKey = idx => String.fromCharCode(97 + idx); // 'a', 'b', 'c', 'd'

  // Handle option selection
  const handleSelectOption = val => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));
  };

  // Grammar test score calculations
  const calculateGrammarScore = () => {
    let correctCount = 0;
    allQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const attemptedCount = Object.keys(userAnswers).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    return {
      attempted: attemptedCount,
      correct: correctCount,
      wrong: attemptedCount - correctCount,
      percentage
    };
  };

  // Leadership assessment score calculations
  const calculateLeadershipScores = () => {
    const scores = {
      autocratic: 0,
      democratic: 0,
      laissezFaire: 0,
      transformational: 0,
      transactional: 0,
      servant: 0,
      situational: 0,
      coaching: 0,
      visionary: 0,
      bureaucratic: 0
    };

    allQuestions.forEach(q => {
      const ansVal = userAnswers[q.id];
      if (ansVal !== undefined && q.leadershipStyle) {
        // Scoring formula from original site: 1:-2, 2:-1, 3:0, 4:1, 5:2
        const points = { 1: -2, 2: -1, 3: 0, 4: 1, 5: 2 }[ansVal] || 0;
        scores[q.leadershipStyle] = (scores[q.leadershipStyle] || 0) + points;
      }
    });

    const sortedStyles = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const dominant = sortedStyles[0];
    const secondary = sortedStyles[1];

    return {
      scores,
      dominant,
      secondary,
      sortedStyles,
      answeredCount: Object.keys(userAnswers).length
    };
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  const currentSelection = userAnswers[currentQuestion.id];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // -------------------------------------------------------------
  // RENDER RESULTS SCREEN IF SUBMITTED
  // -------------------------------------------------------------
  if (isSubmitted) {
    if (isLeadership) {
      const { scores, dominant, secondary, sortedStyles } = calculateLeadershipScores();
      const dominantInfo = leadershipArchetypesInfo[dominant] || {
        name: dominant,
        label: "Strategic Leadership",
        description: "Adaptive managerial archetype."
      };
      const secondaryInfo = leadershipArchetypesInfo[secondary] || {
        name: secondary,
        label: "Secondary Style",
        description: "Complementary leadership qualities."
      };

      return (
        <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-elevated space-y-8">
            
            {/* Results Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-brand-mauve text-brand-purple mx-auto flex items-center justify-center shadow-subtle">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-mauve px-3 py-1 rounded-full">
                Psychometric Diagnostic Report
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-aubergine">
                Your Executive Leadership Profile
              </h2>
              <p className="text-sm text-brand-charcoal-muted max-w-xl mx-auto">
                Evaluated against 10 verified organizational archetypes based on your responses to 60 behavioral statements.
              </p>
            </div>

            {/* Dominant & Secondary Style Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary */}
              <div className="p-6 rounded-xl border-2 border-brand-purple/40 bg-gradient-to-br from-brand-mauve/40 to-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                    Dominant Archetype
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-purple text-white">
                    Primary
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-aubergine">
                  {dominantInfo.name} Leadership
                </h3>
                <p className="text-xs font-semibold text-brand-purple">
                  {dominantInfo.label}
                </p>
                <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed">
                  {dominantInfo.description}
                </p>
              </div>

              {/* Secondary */}
              <div className="p-6 rounded-xl border border-brand-border bg-brand-ivory/50 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal-muted">
                    Secondary Influence
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-mauve text-brand-aubergine">
                    Supporting
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-aubergine">
                  {secondaryInfo.name} Leadership
                </h3>
                <p className="text-xs font-semibold text-brand-purple">
                  {secondaryInfo.label}
                </p>
                <p className="text-xs sm:text-sm text-brand-charcoal-muted leading-relaxed">
                  {secondaryInfo.description}
                </p>
              </div>
            </div>

            {/* Full 10 Archetypes Breakdown */}
            <div className="space-y-4 pt-4 border-t border-brand-border">
              <h4 className="font-serif text-lg font-bold text-brand-aubergine">
                All 10 Archetypes Intensity Ranking
              </h4>
              <div className="space-y-2.5">
                {sortedStyles.map((styleKey, rank) => {
                  const styleInfo = leadershipArchetypesInfo[styleKey] || { name: styleKey };
                  const scoreVal = scores[styleKey] || 0;
                  // Normalized percentage from score range roughly -12 to +12
                  const percent = Math.min(100, Math.max(10, Math.round(((scoreVal + 12) / 24) * 100)));

                  return (
                    <div
                      key={styleKey}
                      className="p-3.5 rounded-xl border border-brand-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-brand-ivory text-brand-aubergine text-xs font-bold flex items-center justify-center shrink-0 border border-brand-border">
                          {rank + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-sm text-brand-aubergine">
                            {styleInfo.name}
                          </span>
                          <span className="text-xs text-brand-charcoal-muted ml-2">
                            ({scoreVal > 0 ? `+${scoreVal}` : scoreVal} pts)
                          </span>
                        </div>
                      </div>
                      <div className="w-full sm:w-48 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              rank === 0
                                ? 'bg-brand-purple'
                                : rank === 1
                                ? 'bg-brand-gold'
                                : 'bg-stone-300'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-stone-500 w-8 text-right">
                          {percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border">
              <Button variant="outline" size="md" onClick={handleRetake}>
                <RotateCcw className="w-4 h-4 mr-2" />
                <span>Retake Assessment</span>
              </Button>
              <Button variant="primary" size="md" onClick={onBackToSelection}>
                <span>Explore Other Tests</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      );
    }

    // Grammar Test Results Screen
    const { attempted, correct, wrong, percentage } = calculateGrammarScore();
    const isPass = percentage >= 65;

    return (
      <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-elevated space-y-8">
          
          {/* Header Banner */}
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-subtle ${
              isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-mauve px-3 py-1 rounded-full">
              Official Assessment Scorecard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-aubergine">
              {testData.title}
            </h2>
            <p className="text-sm text-brand-charcoal-muted max-w-md mx-auto">
              Diagnostic assessment completed across all {totalQuestions} evaluated questions.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal-muted block">
                Total Score
              </span>
              <span className="font-serif text-3xl font-bold text-brand-aubergine block mt-1">
                {correct} / {totalQuestions}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-border text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal-muted block">
                Accuracy Rate
              </span>
              <span className="font-serif text-3xl font-bold text-brand-purple block mt-1">
                {percentage}%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                Correct
              </span>
              <span className="font-serif text-3xl font-bold text-emerald-700 block mt-1">
                {correct}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block">
                Incorrect
              </span>
              <span className="font-serif text-3xl font-bold text-rose-700 block mt-1">
                {wrong}
              </span>
            </div>
          </div>

          {/* Proficiency Tier */}
          <div className="p-5 rounded-xl border border-brand-border bg-gradient-to-r from-brand-mauve/30 to-brand-ivory flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                Benchmarked Proficiency Level
              </span>
              <h4 className="font-serif text-xl font-bold text-brand-aubergine mt-1">
                {percentage >= 85
                  ? "Advanced Mastery (CEFR C1 Standard)"
                  : percentage >= 60
                  ? "Upper-Intermediate Competence (CEFR B2 Standard)"
                  : "Foundational / Needs Targeted Improvement (CEFR A2-B1)"}
              </h4>
              <p className="text-xs text-brand-charcoal-muted mt-0.5">
                {percentage >= 85
                  ? "Demonstrates high syntactic precision and strong grasp of nuances."
                  : percentage >= 60
                  ? "Good overall command; focus on complex idioms and subject-verb inversion."
                  : "Recommended for our structured foundational English acceleration modules."}
              </p>
            </div>
            <Button to="/contact" variant="primary" size="sm" className="shrink-0">
              <span>Discuss Results with Trainer</span>
            </Button>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-brand-border">
            <h4 className="font-serif text-xl font-bold text-brand-aubergine">
              Question-by-Question Review
            </h4>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {allQuestions.map((q, qIdx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const correctOptIndex = q.correctAnswer ? q.correctAnswer.charCodeAt(0) - 97 : 0;
                const correctText = q.options[correctOptIndex] || q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs sm:text-sm ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-brand-aubergine text-xs uppercase tracking-wider">
                        Q{qIdx + 1} • {q.sectionTitle || q.section}
                      </span>
                      <span className={`text-xs font-bold inline-flex items-center gap-1 px-2.5 py-0.5 rounded ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <p className="font-semibold text-brand-aubergine mb-2 leading-snug">
                      {q.question}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="text-brand-charcoal">
                        <strong>Your Answer:</strong>{' '}
                        {userAns
                          ? `${userAns.toUpperCase()}) ${
                              q.options[userAns.charCodeAt(0) - 97] || userAns
                            }`
                          : 'Not Answered'}
                      </span>
                      {!isCorrect && (
                        <span className="text-emerald-800 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded">
                          <strong>Correct Key:</strong> {q.correctAnswer.toUpperCase()}) {correctText}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border">
            <Button variant="outline" size="md" onClick={handleRetake}>
              <RotateCcw className="w-4 h-4 mr-2" />
              <span>Retake Test</span>
            </Button>
            <Button variant="primary" size="md" onClick={onBackToSelection}>
              <span>Explore Other Tests</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE QUESTION RUNNER VIEW
  // -------------------------------------------------------------
  const instructionHint = sectionInstructions[currentQuestion.section] ||
    sectionInstructions[currentQuestion.sectionTitle] ||
    "Choose the best answer according to grammatical conventions.";

  // Quick live score for grammar tests
  const liveScore = !isLeadership ? calculateGrammarScore().correct : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 animate-in fade-in duration-200">
      
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border">
        <button
          type="button"
          onClick={onBackToSelection}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-charcoal hover:text-brand-purple transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Tests Menu</span>
        </button>

        <div className="flex items-center gap-3">
          <Badge variant="mauve" size="sm">
            {testData.title}
          </Badge>
          {!isLeadership && answeredCount > 0 && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              Score: {liveScore} / {answeredCount}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Question Panel (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-card space-y-6">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-brand-purple uppercase tracking-wider font-bold">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-brand-charcoal-muted">
                {progressPercent}% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 rounded-full bg-brand-ivory border border-brand-border overflow-hidden">
              <div
                className="h-full bg-brand-purple rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Section & Instruction Badge */}
          <div className="p-3.5 rounded-xl bg-brand-ivory/70 border border-brand-border space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-mauve px-2 py-0.5 rounded">
                {currentQuestion.sectionTitle || currentQuestion.section}
              </span>
            </div>
            <p className="text-xs text-brand-charcoal-muted leading-relaxed font-sans">
              {instructionHint}
            </p>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-aubergine leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          {isLeadership ? (
            /* Leadership 1..5 Likert Scale */
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-brand-charcoal-muted uppercase tracking-wider">
                Select your level of agreement:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {leadershipLikertScale.map(opt => {
                  const isSelected = currentSelection === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(opt.value)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-brand-purple text-white border-brand-purple shadow-md scale-[1.02]'
                          : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-purple/40 hover:bg-brand-mauve/20'
                      }`}
                    >
                      <span className={`text-base font-bold ${isSelected ? 'text-white' : 'text-brand-aubergine'}`}>
                        {opt.value}
                      </span>
                      <span className="text-xs font-medium leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback badge for leadership */}
              {currentSelection !== undefined && (
                <div className="mt-4 p-3 rounded-xl bg-brand-mauve/40 border border-brand-mauve-border text-xs text-brand-aubergine flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Selected: <strong>{leadershipLikertScale.find(o => o.value === currentSelection)?.label}</strong>.
                    Evaluates {currentQuestion.leadershipStyle ? currentQuestion.leadershipStyle.toUpperCase() : 'Leadership'} dimension.
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Grammar Multiple Choice (A, B, C, D) with INSTANT RIGHT/WRONG FEEDBACK */
            <div className="space-y-3">
              <p className="text-xs font-bold text-brand-charcoal-muted uppercase tracking-wider">
                Select the correct answer:
              </p>

              {currentQuestion.options.map((optText, optIdx) => {
                const optKey = getOptionKey(optIdx);
                const isSelected = currentSelection === optKey;
                const isCorrect = currentQuestion.correctAnswer === optKey;
                const isAnswered = currentSelection !== undefined;

                // Dynamic styling based on INSTANT CORRECT/WRONG FEEDBACK
                let cardStyle = "bg-white text-brand-charcoal border-brand-border hover:border-brand-purple/40 hover:bg-brand-mauve/15";
                let badgeStyle = "bg-brand-ivory text-brand-aubergine border border-brand-border";

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    // Chosen and Correct -> Vivid Emerald
                    cardStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-semibold shadow-sm";
                    badgeStyle = "bg-emerald-600 text-white border-transparent";
                  } else if (isSelected && !isCorrect) {
                    // Chosen and Wrong -> Vivid Rose
                    cardStyle = "bg-rose-50 border-2 border-rose-500 text-rose-950 font-semibold shadow-sm";
                    badgeStyle = "bg-rose-600 text-white border-transparent";
                  } else if (isCorrect) {
                    // Not chosen, but is the correct answer -> Highlighted in gentle Emerald
                    cardStyle = "bg-emerald-50/60 border border-emerald-400 text-emerald-950 font-medium";
                    badgeStyle = "bg-emerald-500 text-white border-transparent";
                  } else {
                    // Neutral unchosen options
                    cardStyle = "bg-stone-50/50 text-stone-400 border-stone-200 opacity-60";
                    badgeStyle = "bg-stone-100 text-stone-400 border-stone-200";
                  }
                }

                return (
                  <button
                    key={optKey}
                    type="button"
                    onClick={() => handleSelectOption(optKey)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between text-sm transition-all duration-150 ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}>
                        {optKey.toUpperCase()}
                      </span>
                      <span className="leading-snug">{optText}</span>
                    </div>

                    {/* Instant validation badge indicator */}
                    {isAnswered && (
                      <div className="shrink-0 ml-3">
                        {isSelected && isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct!</span>
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-2.5 py-1 rounded-md">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Incorrect</span>
                          </span>
                        )}
                        {!isSelected && isCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            <Check className="w-3 h-3" />
                            <span>Correct Answer</span>
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Explanatory banner once answered */}
              {currentSelection !== undefined && (
                <div className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in ${
                  currentSelection === currentQuestion.correctAnswer
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  {currentSelection === currentQuestion.correctAnswer ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <p className="font-bold">
                      {currentSelection === currentQuestion.correctAnswer
                        ? "Great work! That is correct."
                        : `Incorrect. The correct answer is option (${currentQuestion.correctAnswer.toUpperCase()}).`}
                    </p>
                    <p className="text-xs opacity-90">
                      Evaluated under {currentQuestion.sectionTitle || currentQuestion.section}. Click Next to proceed or select another question from the navigator.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-brand-border">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            >
              <span>← Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {currentIndex < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                >
                  <span>Next Question →</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSubmitted(true)}
                >
                  <span>Submit &amp; View Results</span>
                  <Award className="w-4 h-4 ml-1.5" />
                </Button>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar Question Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-card space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-brand-aubergine">
                Question Navigator
              </h4>
              <span className="text-xs font-semibold text-brand-charcoal-muted">
                {answeredCount} / {totalQuestions} Done
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-brand-ivory border border-brand-border text-center">
                <span className="text-[11px] font-bold text-brand-charcoal-muted block">Answered</span>
                <span className="font-bold text-brand-aubergine text-sm">{answeredCount}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-brand-ivory border border-brand-border text-center">
                <span className="text-[11px] font-bold text-brand-charcoal-muted block">Remaining</span>
                <span className="font-bold text-brand-aubergine text-sm">{totalQuestions - answeredCount}</span>
              </div>
            </div>

            {/* Questions Grid Pills */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {allQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurrent = idx === currentIndex;
                const isAnswered = ans !== undefined;
                const isCorrect = !isLeadership && isAnswered && ans === q.correctAnswer;
                const isWrong = !isLeadership && isAnswered && ans !== q.correctAnswer;

                let pillColor = "bg-brand-ivory text-brand-charcoal border-brand-border hover:bg-brand-mauve/40";

                if (isLeadership) {
                  if (isAnswered) pillColor = "bg-brand-purple text-white border-brand-purple";
                } else if (isAnswered) {
                  if (isCorrect) pillColor = "bg-emerald-600 text-white border-emerald-600";
                  else if (isWrong) pillColor = "bg-rose-600 text-white border-rose-600";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${pillColor} ${
                      isCurrent ? 'ring-2 ring-brand-aubergine ring-offset-1 scale-105 shadow-sm' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            {!isLeadership && (
              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-charcoal-muted">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                  Correct
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                  Incorrect
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block"></span>
                  Unanswered
                </span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                variant="aubergine"
                size="md"
                className="w-full justify-center"
                onClick={() => setIsSubmitted(true)}
              >
                <span>Finish &amp; Submit Assessment</span>
              </Button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
