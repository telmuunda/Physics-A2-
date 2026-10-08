import React from 'react';
import { Target, Award, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ScoreTargetDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Target Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paper 4 Target Card */}
        <div className="p-6 rounded-xl border border-cyan-800/80 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-cyan-400">PAPER 4 (A2 STRUCTURED)</span>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
              TARGET: +90 / 100
            </span>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              90+ <span className="text-sm font-normal text-slate-400">/ 100 Marks</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Required for guaranteed 90th+ percentile A* across CIE 9702 variant components.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Section 1: Verbatim Definitions &amp; Law States</span>
              <span className="font-mono text-cyan-300 font-semibold">18 / 20</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-full w-[90%]" />
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Section 2: Mathematical Derivations &amp; Proofs</span>
              <span className="font-mono text-cyan-300 font-semibold">22 / 24</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-full w-[92%]" />
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Section 3: Calculations, Graphs &amp; Significant Figures</span>
              <span className="font-mono text-cyan-300 font-semibold">50 / 56</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-full w-[89%]" />
            </div>
          </div>
        </div>

        {/* Paper 5 Target Card */}
        <div className="p-6 rounded-xl border border-emerald-800/80 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-emerald-400">PAPER 5 (PLANNING &amp; EVALUATION)</span>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              TARGET: +25 / 30
            </span>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              25+ <span className="text-sm font-normal text-slate-400">/ 30 Marks</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Planning Q1 and Data Analysis Q2 with rigorous uncertainty propagation.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Question 1: Experimental Design &amp; Planning</span>
              <span className="font-mono text-emerald-300 font-semibold">13 / 15</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-emerald-500 h-full w-[87%]" />
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Question 2: Data Table, LOBF, WAL &amp; Uncertainties</span>
              <span className="font-mono text-emerald-300 font-semibold">13 / 15</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-emerald-500 h-full w-[87%]" />
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-emerald-300 flex items-center justify-between mt-2">
              <span>Combined A2 Total Needed:</span>
              <span className="font-bold font-mono text-white text-xs">115+ / 130 Marks (88.5%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Stakes Exam Rule Invariants */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Non-Negotiable Cambridge Exam Rules for +90/100 and +25/30
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-cyan-400 font-semibold">1. Significant Figures (SF)</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Final calculated values must match the least number of SF in raw data, or +1 SF. Writing 1 SF or 5 SF forfeits the Accuracy [A1] mark immediately.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-emerald-400 font-semibold">2. Units on Every Number</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Never leave a blank unit line. Memorize composite units: <strong className="text-slate-200">T = N A⁻¹ m⁻¹</strong>, <strong className="text-slate-200">Wb = T m²</strong>, <strong className="text-slate-200">F = C V⁻¹</strong>, and <strong className="text-slate-200">J kg⁻¹ K⁻¹</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-amber-400 font-semibold">3. Paper 5 Gradient Triangle</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              The gradient triangle hypotenuse MUST exceed 50% of the drawn straight line. Read coordinates strictly from grid intersections on the line, NEVER data points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
