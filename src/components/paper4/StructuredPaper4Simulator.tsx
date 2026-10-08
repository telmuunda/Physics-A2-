import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, HelpCircle, Award } from 'lucide-react';
import { PAPER_4_QUESTIONS, Paper4Question, QuestionPart } from '../../data/paper4StructuredQuestions';
import { MathTex } from '../MathTex';

export const StructuredPaper4Simulator: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(PAPER_4_QUESTIONS[0].id);
  const [revealedParts, setRevealedParts] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [awardedMarks, setAwardedMarks] = useState<Record<string, number>>({});

  const activeQuestion =
    PAPER_4_QUESTIONS.find((q) => q.id === selectedQuestionId) || PAPER_4_QUESTIONS[0];

  const toggleReveal = (partId: string) => {
    setRevealedParts((prev) => ({
      ...prev,
      [partId]: !prev[partId],
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

      {/* Question Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PAPER_4_QUESTIONS.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => setSelectedQuestionId(q.id)}
            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedQuestionId === q.id
                ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Q{idx + 1}. {q.topic}</span>
            <span className="ml-2 text-slate-500">[{q.totalMarks}m]</span>
          </button>
        ))}
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

                {/* Mark Scheme Toggle Button */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleReveal(partKey)}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Hide Official Mark Scheme &amp; Solution</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Check Official Mark Scheme &amp; Self-Assess</span>
                      </>
                    )}
                  </button>

                  {/* Marks Assessor */}
                  {isRevealed && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Self-Award Marks:</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: part.marks + 1 }).map((_, m) => (
                          <button
                            key={m}
                            onClick={() => handleSetMark(partKey, m)}
                            className={`w-7 h-7 text-xs font-mono rounded border transition-colors ${
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
