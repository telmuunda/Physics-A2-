import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, HelpCircle, Award, Sparkles, Check, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { PAPER_4_QUESTIONS, Paper4Question, QuestionPart } from '../../data/paper4StructuredQuestions';
import { MathTex } from '../MathTex';
import { smartEvaluateStructuredPart, StructuredPartEvaluation } from '../../utils/markingEvaluator';

export const StructuredPaper4Simulator: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(PAPER_4_QUESTIONS[0].id);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedParts, setRevealedParts] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [awardedMarks, setAwardedMarks] = useState<Record<string, number>>({});
  const [evaluations, setEvaluations] = useState<Record<string, StructuredPartEvaluation>>({});

  const topics = useMemo(() => {
    const list = Array.from(new Set(PAPER_4_QUESTIONS.map((q) => q.topic)));
    return ['All', ...list];
  }, []);

  const filteredQuestions = useMemo(() => {
    return PAPER_4_QUESTIONS.filter((q, idx) => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const qNumStr = `q${idx + 1}`;
      const matchesSearch =
        searchQuery === '' ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qNumStr.includes(searchQuery.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, searchQuery]);

  const activeQuestion =
    PAPER_4_QUESTIONS.find((q) => q.id === selectedQuestionId) ||
    filteredQuestions[0] ||
    PAPER_4_QUESTIONS[0];

  const activeIndexInAll = PAPER_4_QUESTIONS.findIndex((q) => q.id === activeQuestion.id);

  const handlePrevQuestion = () => {
    if (activeIndexInAll > 0) {
      setSelectedQuestionId(PAPER_4_QUESTIONS[activeIndexInAll - 1].id);
    }
  };

  const handleNextQuestion = () => {
    if (activeIndexInAll < PAPER_4_QUESTIONS.length - 1) {
      setSelectedQuestionId(PAPER_4_QUESTIONS[activeIndexInAll + 1].id);
    }
  };

  const toggleReveal = (partKey: string) => {
    setRevealedParts((prev) => ({
      ...prev,
      [partKey]: !prev[partKey],
    }));
  };

  const handleSmartCheck = (partKey: string, part: QuestionPart) => {
    const input = userInputs[partKey] || '';
    const result = smartEvaluateStructuredPart(input, part);
    setEvaluations((prev) => ({
      ...prev,
      [partKey]: result,
    }));
    setAwardedMarks((prev) => ({
      ...prev,
      [partKey]: result.score,
    }));
    setRevealedParts((prev) => ({
      ...prev,
      [partKey]: true,
    }));
  };

  const handleSetMark = (partKey: string, marks: number) => {
    setAwardedMarks((prev) => ({
      ...prev,
      [partKey]: marks,
    }));
  };

  const totalPossible = PAPER_4_QUESTIONS.reduce((acc, q) => acc + q.totalMarks, 0);
  const totalEarned = Object.values(awardedMarks).reduce((acc, m) => acc + m, 0);
  const percentage = Math.round((totalEarned / (totalPossible || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner with 90+ Target Tracker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Paper 4 (A2 Structured)</span>
            <span aria-hidden="true">·</span>
            <span>2 Hours · 100 Marks</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono">Target: 90+/100 (A*)</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Exam Paper Practice &amp; Mark Scheme Examiner
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete past paper structured questions. Every question uses official Cambridge marking nomenclature: <strong className="text-slate-200">[B]</strong> independent, <strong className="text-slate-200">[M]</strong> method, <strong className="text-slate-200">[A]</strong> accuracy, and <strong className="text-slate-200">[C]</strong> compensatory marks.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Score Tracker</div>
            <div className="text-base font-bold font-mono text-cyan-400">
              {totalEarned} / {totalPossible} ({percentage}%)
            </div>
            <div className="text-[10px] text-slate-500">
              {percentage >= 90 ? '🌟 Grade A* (90+ Pace)' : 'Target: 90% needed'}
            </div>
          </div>
          <Award className="w-7 h-7 text-cyan-400" />
        </div>
      </div>

      {/* Topic Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedTopic === t
                  ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 65 questions (e.g. Q48, Millikan, Fission)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-600 w-56 sm:w-64 font-sans"
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevQuestion}
              disabled={activeIndexInAll <= 0}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              title="Previous Question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-cyan-400 px-1">
              Q{activeIndexInAll + 1} / {PAPER_4_QUESTIONS.length}
            </span>
            <button
              onClick={handleNextQuestion}
              disabled={activeIndexInAll >= PAPER_4_QUESTIONS.length - 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              title="Next Question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filteredQuestions.map((q) => {
          const originalIndex = PAPER_4_QUESTIONS.findIndex((item) => item.id === q.id);
          const isSelected = selectedQuestionId === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-cyan-900/90 text-cyan-100 border border-cyan-600 shadow-sm font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Q{originalIndex + 1}. {q.topic}</span>
              <span className="ml-1.5 text-slate-500">[{q.totalMarks}m]</span>
            </button>
          );
        })}
      </div>

      {/* Active Question Display */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-sm">
        {/* Context Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between gap-3 text-xs text-slate-400 mb-2">
            <span className="font-semibold text-cyan-400">{activeQuestion.topic}</span>
            <span className="font-mono text-slate-300">Total: {activeQuestion.totalMarks} Marks</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            {activeQuestion.title}
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed font-serif bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            {activeQuestion.context}
          </p>
        </div>

        {/* Question Parts */}
        <div className="divide-y divide-slate-800/80 p-6 space-y-6">
          {activeQuestion.parts.map((part) => {
            const partKey = `${activeQuestion.id}_${part.partId}`;
            const isRevealed = !!revealedParts[partKey];
            const currentMark = awardedMarks[partKey] || 0;
            const inputVal = userInputs[partKey] || '';

            return (
              <div key={part.partId} className="pt-6 first:pt-0 space-y-4">
                {/* Part Header & Text */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      Part {part.partId}
                    </span>
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">
                      {part.questionText}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    [{part.marks} {part.marks === 1 ? 'mark' : 'marks'}]
                  </div>
                </div>

                {/* Candidate Workspace */}
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={inputVal}
                    onChange={(e) =>
                      setUserInputs((prev) => ({
                        ...prev,
                        [partKey]: e.target.value,
                      }))
                    }
                    placeholder="Type your derivation, explanation or calculation working here..."
                    className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-600 font-mono resize-y"
                  />
                </div>

                {/* Actions & Mark Assessor */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSmartCheck(partKey, part)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-700/80 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Smart Check &amp; Grade Working</span>
                    </button>
                    <button
                      onClick={() => toggleReveal(partKey)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          <span>Hide Scheme</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          <span>Show Official Scheme</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Marks Assessor */}
                  {isRevealed && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Awarded:</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: part.marks + 1 }).map((_, m) => (
                          <button
                            key={m}
                            onClick={() => handleSetMark(partKey, m)}
                            className={`w-7 h-7 text-xs font-mono rounded border transition-colors cursor-pointer ${
                              currentMark === m
                                ? 'bg-cyan-600 text-white border-cyan-500 font-bold'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Smart Evaluation Card if performed */}
                {evaluations[partKey] && (
                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-cyan-800/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Smart Examiner Evaluation:</span>
                      </span>
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {evaluations[partKey].score} / {part.marks} Marks
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs">{evaluations[partKey].feedback}</p>

                    {evaluations[partKey].numericDetails && (
                      <div className="text-[11px] p-2 rounded bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-slate-400">
                          Calculation Check:{' '}
                          <span
                            className={
                              evaluations[partKey].numericMatched
                                ? 'text-emerald-400 font-medium'
                                : 'text-rose-400 font-medium'
                            }
                          >
                            {evaluations[partKey].numericDetails?.note}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                      {evaluations[partKey].keyPointsMatched.length > 0 && (
                        <div className="text-emerald-400 space-y-0.5">
                          <span className="font-semibold">Key Points Detected:</span>
                          <ul className="list-disc list-inside text-slate-300">
                            {evaluations[partKey].keyPointsMatched.map((kp, idx) => (
                              <li key={idx}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {evaluations[partKey].keyPointsMissed.length > 0 && (
                        <div className="text-amber-400 space-y-0.5">
                          <span className="font-semibold">Required Method Points Missed:</span>
                          <ul className="list-disc list-inside text-slate-300">
                            {evaluations[partKey].keyPointsMissed.map((kp, idx) => (
                              <li key={idx}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Revealed Mark Scheme & Solution Details */}
                {isRevealed && (
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4 text-xs animate-in fade-in duration-200">
                    {/* Cambridge Official Mark Scheme */}
                    <div className="space-y-1">
                      <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CIE Official Mark Scheme [B/M/A/C marks]:</span>
                      </div>
                      <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-line leading-relaxed">
                        {part.markScheme}
                      </div>
                    </div>

                    {/* Model Answer */}
                    <div className="space-y-1">
                      <div className="text-slate-400 font-semibold">
                        Full Model Answer (for maximum marks):
                      </div>
                      <div className="p-3 rounded bg-slate-900/80 border border-slate-800 text-slate-300 font-serif leading-relaxed whitespace-pre-line text-xs">
                        {part.modelAnswer}
                      </div>
                    </div>

                    {/* Examiner Notes */}
                    <div className="p-3 rounded bg-amber-950/20 border border-amber-900/40 text-slate-300 space-y-1">
                      <div className="text-amber-400 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Examiner Report Insight &amp; Common Pitfalls:</span>
                      </div>
                      <p className="leading-relaxed">{part.examinerNotes}</p>
                    </div>

                    {/* Numerical Check if applicable */}
                    {part.calculatedAnswer && (
                      <div className="p-3 rounded bg-cyan-950/20 border border-cyan-900/40 text-cyan-200 flex items-center justify-between">
                        <span>
                          Expected Numerical Value:{' '}
                          <strong className="font-mono">
                            {part.calculatedAnswer.value} {part.calculatedAnswer.unit}
                          </strong>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Required Significant Figures: {part.calculatedAnswer.sf} s.f.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
