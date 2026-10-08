import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Award, Search, Sparkles } from 'lucide-react';
import { CIE_A2_DEFINITIONS, CIEDefinition } from '../../data/cieDefinitions';

export const VerbatimDefinitionTrainer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [scoreHistory, setScoreHistory] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const topics = useMemo(() => {
    const list = Array.from(new Set(CIE_A2_DEFINITIONS.map((d) => d.topic)));
    return ['All', ...list];
  }, []);

  const filteredDefinitions = useMemo(() => {
    return CIE_A2_DEFINITIONS.filter((d) => {
      const matchesTopic = selectedTopic === 'All' || d.topic === selectedTopic;
      const matchesSearch =
        d.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, searchQuery]);

  const currentDef = filteredDefinitions[currentIndex] || filteredDefinitions[0];

  // Evaluate user answer against requiredKeywords
  const evaluationResult = useMemo(() => {
    if (!currentDef || !userAnswer.trim()) {
      return { score: 0, matchedGroups: [], missedGroups: [] };
    }

    const lowerAns = userAnswer.toLowerCase();
    const matchedGroups: string[] = [];
    const missedGroups: string[] = [];

    currentDef.requiredKeywords.forEach((synonyms) => {
      const found = synonyms.some((syn) => lowerAns.includes(syn.toLowerCase()));
      if (found) {
        matchedGroups.push(synonyms[0]);
      } else {
        missedGroups.push(synonyms[0]);
      }
    });

    const fraction = matchedGroups.length / currentDef.requiredKeywords.length;
    let awardedMarks = 0;
    if (currentDef.marks === 1) {
      awardedMarks = fraction >= 0.75 ? 1 : 0;
    } else if (currentDef.marks === 2) {
      if (fraction >= 0.85) awardedMarks = 2;
      else if (fraction >= 0.45) awardedMarks = 1;
      else awardedMarks = 0;
    } else {
      awardedMarks = Math.round(fraction * currentDef.marks);
    }

    return {
      score: awardedMarks,
      matchedGroups,
      missedGroups,
    };
  }, [currentDef, userAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || !currentDef) return;
    setHasEvaluated(true);
    setScoreHistory((prev) => ({
      ...prev,
      [currentDef.id]: evaluationResult.score,
    }));
  };

  const handleNext = () => {
    setHasEvaluated(false);
    setUserAnswer('');
    setCurrentIndex((prev) => (prev + 1) % filteredDefinitions.length);
  };

  const handleResetCurrent = () => {
    setHasEvaluated(false);
    setUserAnswer('');
  };

  const totalMastered = Object.values(scoreHistory).filter((s) => s > 0).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Paper 4</span>
            <span aria-hidden="true">·</span>
            <span>Verbatim Mark-Scheme Drill</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-mono">Strict Examiner Mode</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Exact Definitions & Key Terms Grader
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            In Paper 4, examiners look for precise key phrases. Missing words like &quot;per unit mass&quot; or &quot;from infinity&quot; results in instant 0 marks. Type your answer and compare against the official mark scheme.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Mastery Progress</div>
            <div className="text-sm font-semibold text-cyan-400">
              {totalMastered} / {CIE_A2_DEFINITIONS.length} Definitions
            </div>
          </div>
          <Award className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      {/* Filter & Topic Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTopic(t);
                setCurrentIndex(0);
                setHasEvaluated(false);
                setUserAnswer('');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedTopic === t
                  ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search term or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-600"
          />
        </div>
      </div>

      {/* Main Question Card */}
      {currentDef && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-sm">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-white">{currentDef.topic}</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-400">{currentDef.pastPaperRef}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              [{currentDef.marks} {currentDef.marks === 1 ? 'mark' : 'marks'}]
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs text-slate-400 mb-1">State or define:</div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {currentDef.term}
              </h3>
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">
                  Your Answer (write in full sentences with technical terms):
                </label>
                <textarea
                  rows={3}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="e.g. Work done per unit mass in bringing..."
                  disabled={hasEvaluated}
                  className="w-full p-3 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-600 font-sans leading-relaxed resize-none disabled:opacity-80"
                />
              </div>

              {!hasEvaluated ? (
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Pro tip: Include exact units or definitions per unit mass/time/volume where applicable.
                  </div>
                  <button
                    type="submit"
                    disabled={!userAnswer.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Submit to Examiner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetCurrent}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Next Definition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>

            {/* Detailed Mark Scheme Breakdown */}
            {hasEvaluated && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                {/* Score Banner */}
                <div
                  className={`p-4 rounded-lg flex items-center justify-between border ${
                    evaluationResult.score === currentDef.marks
                      ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                      : evaluationResult.score > 0
                      ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                      : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {evaluationResult.score === currentDef.marks ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : evaluationResult.score > 0 ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <div>
                      <div className="text-sm font-bold">
                        Examiner Score: {evaluationResult.score} / {currentDef.marks}{' '}
                        {currentDef.marks === 1 ? 'mark' : 'marks'}
                      </div>
                      <div className="text-xs opacity-90">
                        {evaluationResult.score === currentDef.marks
                          ? 'Full marks awarded! Exact criteria satisfied.'
                          : evaluationResult.score > 0
                          ? 'Partial credit. Check the underlined words in the mark scheme.'
                          : 'Zero marks. Core technical keywords were omitted.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Required Terms Detected:</span>
                    </div>
                    {evaluationResult.matchedGroups.length > 0 ? (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {evaluationResult.matchedGroups.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-slate-500 italic">None detected</div>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-rose-400 font-medium flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Missing Mandatory Terms:</span>
                    </div>
                    {evaluationResult.missedGroups.length > 0 ? (
                      <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                        {evaluationResult.missedGroups.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-emerald-400 italic">All key terms present!</div>
                    )}
                  </div>
                </div>

                {/* Official Verbatim Mark Scheme */}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official CIE Mark Scheme:</span>
                  </div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-line">
                    {currentDef.verbatimMarkScheme}
                  </div>
                </div>

                {/* Model Answer */}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-400 font-medium">Model Answer (Past Paper Standard):</div>
                  <p className="text-slate-200 italic font-serif text-sm">
                    &quot;{currentDef.sampleAcceptableAnswer}&quot;
                  </p>
                </div>

                {/* Examiner Report Warning */}
                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/50 space-y-1 text-xs">
                  <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Examiner Report Warning (Why Students Lose Marks):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentDef.examinerReportWarning}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
