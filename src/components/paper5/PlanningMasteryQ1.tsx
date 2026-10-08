import React, { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, ShieldAlert, Sliders, CheckCircle2, FileText, Compass } from 'lucide-react';
import { PLANNING_SCENARIOS, PlanningScenario } from '../../data/paper5Scenarios';

export const PlanningMasteryQ1: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});
  const [showFullMarkScheme, setShowFullMarkScheme] = useState<boolean>(false);

  const scenario = PLANNING_SCENARIOS[selectedScenarioIndex];

  const toggleCheck = (id: string) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(completedChecklist).filter(Boolean).length;
  const totalCheckItems = 5 + scenario.additionalDetailPoints.length; // 5 major categories + additional details

  return (
    <div className="space-y-6">
      {/* Paper 5 Q1 Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Paper 5</span>
            <span aria-hidden="true">·</span>
            <span>Question 1: Planning (15 Marks)</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-mono">Target: 13-15/15 Marks</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Question 1 Planning Blueprint &amp; Mark Scheme Checklist
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            In Paper 5 Q1, Cambridge examiners mark against 5 strict criteria: Defining the Problem [3m], Data Collection &amp; Diagram [5m], Method of Analysis [2m], Safety [1m], and Additional Detail [4m].
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Planning Criteria Met</div>
            <div className="text-sm font-bold font-mono text-emerald-400">
              {completedCount} / {totalCheckItems} Checkpoints
            </div>
            <div className="text-[10px] text-slate-500">
              {completedCount >= 10 ? 'Full 15 Marks Achievable' : 'Review missing items'}
            </div>
          </div>
          <Compass className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PLANNING_SCENARIOS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              setSelectedScenarioIndex(idx);
              setCompletedChecklist({});
              setShowFullMarkScheme(false);
            }}
            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedScenarioIndex === idx
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-800 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Experiment {idx + 1}: {s.title}</span>
          </button>
        ))}
      </div>

      {/* Scenario Brief Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <div>
          <span className="text-xs font-mono text-emerald-400">EXAM PROMPT &amp; INVESTIGATION BRIEF</span>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            {scenario.title}
          </h3>
          <p className="text-sm text-slate-300 mt-2 font-serif bg-slate-950 p-4 rounded-lg border border-slate-800/80 leading-relaxed">
            {scenario.investigationBrief}
          </p>
        </div>

        {/* Diagram Area */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300">
            Workable Experimental Apparatus Diagram (Mark Scheme Criterion M1):
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: scenario.svgDiagram }}
            className="rounded-lg border border-slate-800 overflow-hidden"
          />
          <p className="text-[11px] text-slate-500">
            Diagram requirement: Must show complete circuit/apparatus, clearly labeled with specific measuring instruments (e.g. signal generator, vibration generator, wooden bridges, slotted masses over pulley).
          </p>
        </div>
      </div>

      {/* 5-Category Cambridge Planning Blueprint Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category 1: Defining the Problem (3 Marks) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 font-mono">1. DEFINING THE PROBLEM [3 MARKS]</span>
            <button
              onClick={() => toggleCheck('p1')}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
            >
              {completedChecklist['p1'] ? (
                <CheckSquare className="w-4 h-4 text-cyan-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Independent Variable (IV):</span>
              <div className="font-semibold text-slate-100 mt-0.5">
                {scenario.independentVariable.name} ({scenario.independentVariable.symbol}) in {scenario.independentVariable.units}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                How varied: {scenario.independentVariable.howVaried}
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Dependent Variable (DV):</span>
              <div className="font-semibold text-slate-100 mt-0.5">
                {scenario.dependentVariable.name} ({scenario.dependentVariable.symbol}) in {scenario.dependentVariable.units}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Instrument: {scenario.dependentVariable.instrument}
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Controlled Variables (CV):</span>
              <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                {scenario.controlledVariables.map((cv, i) => (
                  <li key={i}>
                    <strong>{cv.variable}:</strong> {cv.howControlled}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Category 2: Method of Data Collection (5 Marks) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 font-mono">2. DATA COLLECTION &amp; MEASUREMENT [5 MARKS]</span>
            <button
              onClick={() => toggleCheck('p2')}
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              {completedChecklist['p2'] ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Step-by-Step Procedure:</span>
              <ol className="list-decimal list-inside mt-1 space-y-1.5 text-slate-300 leading-relaxed">
                <li>Assemble the apparatus as shown in the labeled diagram.</li>
                <li>Set initial value of {scenario.independentVariable.symbol} and measure using {scenario.dependentVariable.instrument}.</li>
                <li>{scenario.dependentVariable.howMeasured}</li>
                <li>Repeat measurements of DV at least 3 times for each trial and calculate the mean value.</li>
                <li>Vary {scenario.independentVariable.symbol} to obtain at least 6 different readings across a wide range.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Category 3: Method of Analysis (2 Marks) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 font-mono">3. METHOD OF ANALYSIS (y = mx + c) [2 MARKS]</span>
            <button
              onClick={() => toggleCheck('p3')}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
            >
              {completedChecklist['p3'] ? (
                <CheckSquare className="w-4 h-4 text-amber-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-slate-400">Linearized Equation:</span>
              <div className="font-mono text-cyan-300 text-sm">{scenario.methodOfAnalysis.linearizedEquation}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">y-axis:</span>
                <div className="font-mono text-slate-200 mt-0.5">{scenario.methodOfAnalysis.graphYAxis}</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">x-axis:</span>
                <div className="font-mono text-slate-200 mt-0.5">{scenario.methodOfAnalysis.graphXAxis}</div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="text-slate-300 font-mono text-[11px]">{scenario.methodOfAnalysis.gradientExpression}</div>
              <div className="text-slate-300 font-mono text-[11px]">{scenario.methodOfAnalysis.yInterceptExpression}</div>
              <p className="text-slate-400 text-[11px] pt-1">
                {scenario.methodOfAnalysis.constantDetermination}
              </p>
            </div>
          </div>
        </div>

        {/* Category 4: Safety Considerations (1 Mark) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 font-mono">4. SAFETY CONSIDERATION [1 MARK]</span>
            <button
              onClick={() => toggleCheck('p4')}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              {completedChecklist['p4'] ? (
                <CheckSquare className="w-4 h-4 text-rose-400" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-rose-950/20 border border-rose-900/40 space-y-1">
              <div className="text-rose-300 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Exact 3-Part Safety Requirement:</span>
              </div>
              <div className="text-slate-300 leading-relaxed">
                <div><strong>Specific Hazard:</strong> {scenario.safetyRequirement.hazard}</div>
                <div><strong>Specific Risk:</strong> {scenario.safetyRequirement.risk}</div>
                <div><strong>Precaution:</strong> {scenario.safetyRequirement.precaution}</div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-amber-400/90 flex items-start gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>{scenario.safetyRequirement.unacceptableGeneralization}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category 5: Additional Detail Checklist (4 Marks) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-400">5. ADDITIONAL DETAIL (D MARKS) [4 MARKS]</span>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Top Additional Points Awarded in Past Mark Schemes (Select all that apply)
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">Need at least 4 detailed points</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenario.additionalDetailPoints.map((pt, i) => {
            const checkKey = `d_${i}`;
            const isChecked = !!completedChecklist[checkKey];
            return (
              <div
                key={i}
                onClick={() => toggleCheck(checkKey)}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase">
                      {pt.category}
                    </span>
                    <p className="leading-relaxed font-medium">{pt.point}</p>
                    <p className="text-[11px] text-slate-500 italic">Why: {pt.whyRequired}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
