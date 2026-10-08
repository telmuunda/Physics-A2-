import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

interface PitfallItem {
  id: string;
  paper: 'Paper 4' | 'Paper 5' | 'Both';
  topic: string;
  trap: string;
  fatalError: string;
  exactMarkSchemeFix: string;
  whyExaminerRejects: string;
}

const PITFALLS: PitfallItem[] = [
  {
    id: 'p1',
    paper: 'Paper 4',
    topic: 'Gravitational Fields',
    trap: 'Definition of Gravitational Potential',
    fatalError: 'Writing "Work done to move a mass from infinity"',
    exactMarkSchemeFix: 'Work done per unit mass in bringing a small test mass from infinity to the point.',
    whyExaminerRejects:
      'Missing "per unit mass" is an automatic 0. Gravitational potential is an intensive property per kilogram, whereas potential energy depends on mass.',
  },
  {
    id: 'p2',
    paper: 'Paper 4',
    topic: 'Gravitational Fields',
    trap: 'Why Potential is Always Negative',
    fatalError: 'Writing "Because gravity pulls objects down"',
    exactMarkSchemeFix:
      'Gravitational potential is defined to be zero at infinity. Because gravitational forces are attractive, work is done by the field / energy is released as mass approaches from infinity, making potential negative.',
    whyExaminerRejects:
      'Must mention two essential criteria: (1) Reference point of zero potential is at infinity, and (2) Gravitational force is attractive so work is done by the field.',
  },
  {
    id: 'p3',
    paper: 'Paper 4',
    topic: 'Oscillations',
    trap: 'Condition for Simple Harmonic Motion',
    fatalError: 'Writing "Force is proportional to displacement" or "Acceleration is proportional to distance"',
    exactMarkSchemeFix:
      'Acceleration is directly proportional to displacement from a fixed point and is always directed towards that fixed point (or in the opposite direction to displacement).',
    whyExaminerRejects:
      'Using "distance" instead of "displacement" loses the mark because displacement is a vector quantity. Also omitting "directly" or omitting the direction loses the second mark.',
  },
  {
    id: 'p4',
    paper: 'Paper 4',
    topic: 'Thermal Physics',
    trap: 'Internal Energy Definition',
    fatalError: 'Writing "Total kinetic and potential energy of all particles"',
    exactMarkSchemeFix:
      'Sum of the random distribution of kinetic and potential energies associated with the molecules / atoms of the system.',
    whyExaminerRejects:
      'The word "random" is mandatory in Cambridge mark schemes to distinguish microscopic internal thermal energy from bulk macroscopic kinetic energy.',
  },
  {
    id: 'p5',
    paper: 'Paper 4',
    topic: 'Electromagnetic Induction',
    trap: "Faraday's Law",
    fatalError: 'Writing "Induced emf is proportional to rate of change of magnetic flux"',
    exactMarkSchemeFix:
      'The magnitude of induced e.m.f. is directly proportional to the rate of change of magnetic flux linkage.',
    whyExaminerRejects:
      'Must be "magnetic flux linkage" for a coil of N turns (NΦ), not just magnetic flux (Φ). Also must state "rate of change", not "change".',
  },
  {
    id: 'p6',
    paper: 'Paper 4',
    topic: 'Electromagnetic Induction',
    trap: "Lenz's Law",
    fatalError: 'Writing "Induced current opposes the magnetic field"',
    exactMarkSchemeFix:
      'The direction of the induced e.m.f. or current is such as to oppose the change producing it.',
    whyExaminerRejects:
      'It opposes the CHANGE causing it, not the field itself! (e.g. if an external field is decreasing, Lenz law induces a field in the same direction to oppose the decrease).',
  },
  {
    id: 'p7',
    paper: 'Paper 4',
    topic: 'Quantum Physics',
    trap: 'Work Function Energy',
    fatalError: 'Writing "Energy needed to emit an electron from a metal"',
    exactMarkSchemeFix:
      'The minimum photon energy required to release an electron from the surface of a metal.',
    whyExaminerRejects:
      'Must include both "minimum" and "from the surface". Electrons inside the metal bulk require more energy due to collisions.',
  },
  {
    id: 'p8',
    paper: 'Paper 4',
    topic: 'Nuclear Physics',
    trap: 'Binding Energy of a Nucleus',
    fatalError: 'Writing "Energy that holds the nucleus together" or "Energy in the nuclear bonds"',
    exactMarkSchemeFix:
      'The minimum energy required to completely separate all the constituent nucleons of a nucleus to infinity.',
    whyExaminerRejects:
      'Casual phrasing is rejected. Binding energy must be defined by the work required to separate all constituent nucleons to infinity.',
  },
  {
    id: 'p9',
    paper: 'Paper 4',
    topic: 'Nuclear Physics',
    trap: 'Decay Constant vs Activity',
    fatalError: 'Defining decay constant as "the rate of decay of a radioactive substance"',
    exactMarkSchemeFix:
      'Decay constant (λ) is the probability per unit time of the decay of a given nucleus. Activity (A) is the rate of decay (decays per unit time).',
    whyExaminerRejects:
      'Confusing decay constant with activity is the #1 mistake in A2 Nuclear Physics. λ is probability per unit time (s⁻¹); Activity is dN/dt (Bq).',
  },
  {
    id: 'p10',
    paper: 'Paper 5',
    topic: 'Question 1: Planning',
    trap: 'Safety Considerations (1 Mark)',
    fatalError: 'Writing "Wear a lab coat and tie hair back" or "Be careful when handling weights"',
    exactMarkSchemeFix:
      'Must state: Specific Hazard -> Specific Risk -> Specific Precaution. E.g., "Wire under high tension (hazard) -> could snap and strike eye (risk) -> wear safety goggles and place protective screen around weights (precaution)".',
    whyExaminerRejects:
      'Examiners explicitly state in reports: general laboratory safety rules earn 0 marks. Safety precautions must address the specific hazards of the experimental setup.',
  },
  {
    id: 'p11',
    paper: 'Paper 5',
    topic: 'Question 1: Planning',
    trap: 'Controlled Variables',
    fatalError: 'Listing variables without stating HOW they are kept constant',
    exactMarkSchemeFix:
      'Name variable AND give exact physical method: "Keep length of wire L constant by clamping triangular wooden bridges at marked positions on the bench and measuring with a metre rule".',
    whyExaminerRejects:
      'Merely writing "keep temperature constant" or "keep length constant" receives 0 marks. You must specify the method or instrument used to maintain it.',
  },
  {
    id: 'p12',
    paper: 'Paper 5',
    topic: 'Question 2: Graphing',
    trap: 'Gradient Triangle Rule',
    fatalError: 'Using plotted data points in the calculation or drawing a small triangle',
    exactMarkSchemeFix:
      'Draw a gradient triangle where hypotenuse / base spans at least 50% of the drawn straight line, and read coordinates directly from grid line intersections on the line.',
    whyExaminerRejects:
      'If coordinates are taken from data points that do not lie precisely on the line of best fit, the gradient mark is immediately withheld.',
  },
  {
    id: 'p13',
    paper: 'Paper 5',
    topic: 'Question 2: Table & Significant Figures',
    trap: 'Significant Figures in Logarithmic Columns',
    fatalError: 'Giving ln(V) to 2 significant figures when V was 2 significant figures',
    exactMarkSchemeFix:
      'The number of decimal places in ln(x) must equal the number of significant figures in raw x (or +1). If V = 8.8 (2 s.f.), ln(V) must be 2.18 (2 d.p.) or 2.175 (3 d.p.).',
    whyExaminerRejects:
      'Mathematical convention: the integer part of a logarithm is the order of magnitude; significant figures are contained in the decimal mantissa.',
  },
  {
    id: 'p14',
    paper: 'Paper 5',
    topic: 'Question 2: Worst Acceptable Line',
    trap: 'Drawing the Worst Acceptable Line (WAL)',
    fatalError: 'Drawing a random second line or missing an error bar',
    exactMarkSchemeFix:
      'WAL must be either the steepest or shallowest straight line that passes through ALL error bars from the top of the first to the bottom of the last, clearly labeled "WAL".',
    whyExaminerRejects:
      'If the line fails to pass through even one error bar, or if it is drawn as a curve, the WAL mark and uncertainty in gradient marks are lost.',
  },
];

export const BlacklistExaminerReport: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = PITFALLS.filter((p) => {
    const matchesPaper = selectedPaper === 'All' || p.paper === selectedPaper || p.paper === 'Both';
    const matchesSearch =
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.trap.toLowerCase().includes(search.toLowerCase()) ||
      p.fatalError.toLowerCase().includes(search.toLowerCase());
    return matchesPaper && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Examiner Reports Compilation</span>
            <span aria-hidden="true">·</span>
            <span>2018 - 2024 Past Papers</span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-400 font-mono">The Blacklist</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Top 14 Examiner Pitfalls (Why Students Miss 90+)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            A comprehensive breakdown of fatal mistakes, vague phrasings, and common misconceptions that cost students marks in Paper 4 and Paper 5, directly excerpted from Cambridge Principal Examiner Reports.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <AlertOctagon className="w-6 h-6 text-rose-400" />
          <div className="text-xs">
            <div className="font-semibold text-rose-300">Zero-Tolerance Zone</div>
            <div className="text-slate-400">Strict keyword enforcement</div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['All', 'Paper 4', 'Paper 5'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedPaper(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedPaper === tab
                  ? 'bg-rose-950 text-rose-200 border border-rose-800'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pitfalls or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-600"
          />
        </div>
      </div>

      {/* Pitfall Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{item.trap}</span>
                <span className="font-mono text-[11px] text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {item.paper} · {item.topic}
                </span>
              </div>

              {/* Fatal Error */}
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-medium">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>The Fatal Mistake (0 Marks):</span>
                </div>
                <p className="text-slate-300 font-serif leading-relaxed italic">
                  &quot;{item.fatalError}&quot;
                </p>
              </div>

              {/* Exact Mark Scheme Fix */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exact Mark Scheme Phrasing (Full Marks):</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
                  {item.exactMarkSchemeFix}
                </p>
              </div>
            </div>

            {/* Why Examiner Rejects */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Examiner Rationale:</strong> {item.whyExaminerRejects}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
