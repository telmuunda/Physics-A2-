import React, { useState } from 'react';
import { Search, Calculator, BookOpen, Sparkles } from 'lucide-react';
import { MathTex } from '../MathTex';

interface FormulaEntry {
  id: string;
  topic: string;
  name: string;
  latex: string;
  variables: { symbol: string; name: string; unit: string }[];
  examNotes: string;
}

const A2_FORMULAS: FormulaEntry[] = [
  {
    id: 'f_grav_force',
    topic: 'Gravitational Fields',
    name: "Newton's Law of Universal Gravitation",
    latex: 'F = \\frac{G M m}{r^2}',
    variables: [
      { symbol: 'F', name: 'Gravitational attraction force', unit: 'N' },
      { symbol: 'G', name: 'Gravitational constant (6.67 × 10⁻¹¹)', unit: 'N m² kg⁻²' },
      { symbol: 'M, m', name: 'Point masses', unit: 'kg' },
      { symbol: 'r', name: 'Separation between centres of masses', unit: 'm' },
    ],
    examNotes:
      'Only valid for point masses or spherical masses where separation r is measured from centres of mass.',
  },
  {
    id: 'f_grav_potential',
    topic: 'Gravitational Fields',
    name: 'Gravitational Potential',
    latex: '\\phi = -\\frac{G M}{r}',
    variables: [
      { symbol: 'φ (or Vg)', name: 'Gravitational potential', unit: 'J kg⁻¹' },
      { symbol: 'M', name: 'Mass creating the field', unit: 'kg' },
      { symbol: 'r', name: 'Distance from centre of mass', unit: 'm' },
    ],
    examNotes:
      'Always negative! Defined to be zero at infinity. Attractive field means energy is released moving from infinity.',
  },
  {
    id: 'f_orbital_period',
    topic: 'Circular Motion & Gravitation',
    name: "Kepler's Third Law (Circular Orbit)",
    latex: 'T^2 = \\frac{4\\pi^2}{G M} r^3',
    variables: [
      { symbol: 'T', name: 'Orbital period', unit: 's' },
      { symbol: 'r', name: 'Orbital radius', unit: 'm' },
      { symbol: 'M', name: 'Mass of central body', unit: 'kg' },
    ],
    examNotes:
      'Derived by equating gravitational force GMm/r² to centripetal force mrω² with ω = 2π/T.',
  },
  {
    id: 'f_shm_acceleration',
    topic: 'Oscillations',
    name: 'Defining Equation of SHM',
    latex: 'a = -\\omega^2 x',
    variables: [
      { symbol: 'a', name: 'Acceleration', unit: 'm s⁻²' },
      { symbol: 'ω', name: 'Angular frequency (2πf)', unit: 'rad s⁻¹' },
      { symbol: 'x', name: 'Displacement from equilibrium', unit: 'm' },
    ],
    examNotes:
      'Negative sign signifies acceleration is always directed in the opposite direction to displacement (towards equilibrium).',
  },
  {
    id: 'f_shm_velocity',
    topic: 'Oscillations',
    name: 'Velocity at Any Displacement in SHM',
    latex: 'v = \\pm\\omega \\sqrt{x_0^2 - x^2}',
    variables: [
      { symbol: 'v', name: 'Velocity', unit: 'm s⁻¹' },
      { symbol: 'x₀', name: 'Amplitude', unit: 'm' },
      { symbol: 'x', name: 'Current displacement', unit: 'm' },
    ],
    examNotes:
      'Maximum velocity vmax = ωx₀ occurs at equilibrium position x = 0.',
  },
  {
    id: 'f_first_law',
    topic: 'Thermal Physics',
    name: 'First Law of Thermodynamics',
    latex: '\\Delta U = q + w',
    variables: [
      { symbol: 'ΔU', name: 'Increase in internal energy', unit: 'J' },
      { symbol: 'q', name: 'Thermal energy transferred TO system', unit: 'J' },
      { symbol: 'w', name: 'Work done ON system (w = -pΔV for expansion)', unit: 'J' },
    ],
    examNotes:
      'CIE IUPAC convention: if system expands, work done BY system is positive, so work done ON system w is negative.',
  },
  {
    id: 'f_kinetic_gas',
    topic: 'Ideal Gases',
    name: 'Mean Translational Kinetic Energy of a Molecule',
    latex: '\\langle E_k \\rangle = \\frac{1}{2}m\\langle c^2 \\rangle = \\frac{3}{2} k T',
    variables: [
      { symbol: 'Ek', name: 'Mean translational kinetic energy', unit: 'J' },
      { symbol: 'k', name: 'Boltzmann constant (1.38 × 10⁻²³)', unit: 'J K⁻¹' },
      { symbol: 'T', name: 'Thermodynamic temperature', unit: 'K' },
    ],
    examNotes:
      'Shows temperature is a direct measure of average molecular kinetic energy. Independent of gas identity!',
  },
  {
    id: 'f_cap_discharge',
    topic: 'Capacitance',
    name: 'Exponential Discharge Equation',
    latex: 'x = x_0 e^{-\\frac{t}{R C}}',
    variables: [
      { symbol: 'x', name: 'Current charge Q, voltage V, or current I', unit: 'C, V, A' },
      { symbol: 'x₀', name: 'Initial value', unit: 'C, V, A' },
      { symbol: 'RC', name: 'Time constant τ', unit: 's' },
    ],
    examNotes:
      'Taking natural logs: ln(V) = ln(V₀) - t / (RC). Linear graph plotting ln(V) vs t has gradient = -1/(RC).',
  },
  {
    id: 'f_hall_voltage',
    topic: 'Magnetic Fields',
    name: 'Hall Voltage Across Semiconductor Slice',
    latex: 'V_H = \\frac{B I}{n t q}',
    variables: [
      { symbol: 'VH', name: 'Hall voltage', unit: 'V' },
      { symbol: 'B', name: 'Magnetic flux density', unit: 'T' },
      { symbol: 'I', name: 'Current through slice', unit: 'A' },
      { symbol: 'n', name: 'Number density of charge carriers', unit: 'm⁻³' },
      { symbol: 't', name: 'Thickness of slice in direction of B', unit: 'm' },
      { symbol: 'q', name: 'Charge of carrier (e.g. 1.60 × 10⁻¹⁹)', unit: 'C' },
    ],
    examNotes:
      'Why semiconductors are used: n is much smaller than metals, so VH is much larger and easily measurable.',
  },
  {
    id: 'f_faraday_coil',
    topic: 'Electromagnetic Induction',
    name: 'Peak Induced EMF in Rotating Coil',
    latex: 'E_0 = B A N \\omega = B A N (2\\pi f)',
    variables: [
      { symbol: 'E₀', name: 'Peak induced e.m.f.', unit: 'V' },
      { symbol: 'B', name: 'Magnetic flux density', unit: 'T' },
      { symbol: 'A', name: 'Area of each turn', unit: 'm²' },
      { symbol: 'N', name: 'Number of turns', unit: 'dimensionless' },
      { symbol: 'f', name: 'Frequency of rotation', unit: 'Hz' },
    ],
    examNotes:
      'Instantaneous emf is E = E₀ sin(ωt). Flux linkage is Φ_link = BAN cos(ωt). Note 90° phase shift!',
  },
  {
    id: 'f_photoelectric',
    topic: 'Quantum Physics',
    name: "Einstein's Photoelectric Equation",
    latex: 'h f = \\Phi + \\frac{1}{2}m v_{max}^2 = \\Phi + e V_s',
    variables: [
      { symbol: 'hf', name: 'Incident photon energy', unit: 'J' },
      { symbol: 'Φ', name: 'Work function energy', unit: 'J' },
      { symbol: 'Vs', name: 'Stopping potential', unit: 'V' },
    ],
    examNotes:
      'Plotting Vs vs f gives a straight line with gradient = h/e and x-intercept = threshold frequency f₀.',
  },
  {
    id: 'f_decay_law',
    topic: 'Nuclear Physics',
    name: 'Radioactive Decay Law',
    latex: 'A = \\lambda N \\quad\\text{and}\\quad N = N_0 e^{-\\lambda t}',
    variables: [
      { symbol: 'A', name: 'Activity', unit: 'Bq (s⁻¹)' },
      { symbol: 'λ', name: 'Decay constant (ln 2 / t_1/2)', unit: 's⁻¹' },
      { symbol: 'N', name: 'Number of undecayed nuclei remaining', unit: 'dimensionless' },
    ],
    examNotes:
      'Ensure half-life is converted to SECONDS when calculating Activity in Becquerels (Bq)!',
  },
  {
    id: 'f_ultrasound_reflection',
    topic: 'Medical Physics',
    name: 'Ultrasound Intensity Reflection Coefficient',
    latex: '\\alpha = \\frac{I_r}{I_0} = \\frac{(Z_2 - Z_1)^2}{(Z_2 + Z_1)^2}',
    variables: [
      { symbol: 'α', name: 'Fraction of intensity reflected', unit: 'dimensionless' },
      { symbol: 'Z₁, Z₂', name: 'Acoustic impedances (Z = ρc)', unit: 'kg m⁻² s⁻¹' },
    ],
    examNotes:
      'Explains why coupling gel is needed: between air (Z=430) and skin (Z=1.6×10⁶), α ≈ 99.9% is reflected without gel.',
  },
  {
    id: 'f_hubble_law',
    topic: 'Astronomy & Cosmology',
    name: "Hubble's Law & Redshift",
    latex: 'v = H_0 d \\quad\\text{and}\\quad \\frac{\\Delta\\lambda}{\\lambda} \\approx \\frac{v}{c}',
    variables: [
      { symbol: 'v', name: 'Recession velocity of galaxy', unit: 'm s⁻¹' },
      { symbol: 'H₀', name: 'Hubble constant (~2.4 × 10⁻¹⁸)', unit: 's⁻¹' },
      { symbol: 'd', name: 'Distance to galaxy', unit: 'm' },
    ],
    examNotes:
      '1 / H₀ gives estimate for the age of the Universe (assuming constant expansion rate).',
  },
  {
    id: 'f_p5_uncertainty_log',
    topic: 'Paper 5 Analysis',
    name: 'Uncertainty in Logarithmic Quantity',
    latex: '\\Delta \\ln(x) = \\frac{\\Delta x}{x}',
    variables: [
      { symbol: 'Δln(x)', name: 'Absolute uncertainty in ln(x)', unit: 'dimensionless' },
      { symbol: 'Δx', name: 'Absolute uncertainty in raw x', unit: 'same as x' },
      { symbol: 'x', name: 'Raw measurement value', unit: 'units of x' },
    ],
    examNotes:
      'Standard Paper 5 Q2 rule: absolute uncertainty in natural log is fractional uncertainty of raw data.',
  },
];

export const FormulaVault: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const topics = ['All', ...Array.from(new Set(A2_FORMULAS.map((f) => f.topic)))];

  const filtered = A2_FORMULAS.filter((f) => {
    const matchesTopic = selectedTopic === 'All' || f.topic === selectedTopic;
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.topic.toLowerCase().includes(search.toLowerCase()) ||
      f.examNotes.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Syllabus Data &amp; Formulae</span>
            <span aria-hidden="true">·</span>
            <span>Paper 4 &amp; Paper 5</span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-mono">Formula Vault</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Official A2 Formula &amp; Equation Repository
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete mathematical formulations, SI units, variable dimensional analysis, and Cambridge examiner execution notes.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <div className="text-xs">
            <div className="font-semibold text-white">{A2_FORMULAS.length} Key Formulas</div>
            <div className="text-slate-400">All A2 Topics Covered</div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedTopic === t
                  ? 'bg-cyan-950 text-cyan-200 border border-cyan-800'
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
            placeholder="Search equations or variables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-600"
          />
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 text-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{item.name}</span>
                <span className="font-mono text-[11px] text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {item.topic}
                </span>
              </div>

              {/* KaTeX Equation Display */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-300 font-serif text-base overflow-x-auto">
                <MathTex block math={item.latex} />
              </div>

              {/* Variables List */}
              <div className="space-y-1 pt-1">
                <div className="text-[11px] font-semibold text-slate-400">Variables &amp; SI Units:</div>
                <div className="grid grid-cols-1 gap-1 text-[11px]">
                  {item.variables.map((v, idx) => (
                    <div key={idx} className="flex justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/60">
                      <span className="font-mono text-slate-300">
                        <strong>{v.symbol}</strong>: {v.name}
                      </span>
                      <span className="font-mono text-emerald-400 font-medium">[{v.unit}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Examiner Guidance */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-2.5 rounded">
              <strong className="text-cyan-400">Cambridge Exam Note:</strong> {item.examNotes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
