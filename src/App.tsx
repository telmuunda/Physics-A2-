import React, { useState } from 'react';
import { Target, Award, BookOpen, CheckSquare, LineChart, AlertOctagon, Layers, Activity } from 'lucide-react';
import { ScoreTargetDashboard } from './components/ScoreTargetDashboard';
import { VerbatimDefinitionTrainer } from './components/paper4/VerbatimDefinitionTrainer';
import { StructuredPaper4Simulator } from './components/paper4/StructuredPaper4Simulator';
import { PlanningMasteryQ1 } from './components/paper5/PlanningMasteryQ1';
import { AnalysisEvaluationQ2 } from './components/paper5/AnalysisEvaluationQ2';
import { BlacklistExaminerReport } from './components/BlacklistExaminerReport';
import { FormulaVault } from './components/vault/FormulaVault';
import { ProjectileMotion } from './components/physics/ProjectileMotion';
import { PendulumSimulation } from './components/physics/PendulumSimulation';
import { WaveOpticsSimulation } from './components/physics/WaveOpticsSimulation';
import { ElectricFieldSimulation } from './components/physics/ElectricFieldSimulation';

type NavTab =
  | 'target'
  | 'p4_definitions'
  | 'p4_structured'
  | 'p5_planning'
  | 'p5_analysis'
  | 'blacklist'
  | 'vault'
  | 'simulations';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('target');
  const [activeSim, setActiveSim] = useState<'projectile' | 'pendulum' | 'waves' | 'electric'>('projectile');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Contract (Zone 1: Brand, Zone 2: Nav, Zone 3: Action) */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('target')}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap text-left"
        >
          CIE 9702 A2 Mastery
        </button>

        {/* Zone 2: Navigation Links (Single Line, 1-2 words each) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('target')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'target' ? 'text-white bg-slate-900 font-semibold' : 'hover:text-white'
            }`}
          >
            Target +90/+25
          </button>
          <button
            onClick={() => setActiveTab('p4_definitions')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'p4_definitions' ? 'text-cyan-300 bg-cyan-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            P4 Definitions
          </button>
          <button
            onClick={() => setActiveTab('p4_structured')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'p4_structured' ? 'text-cyan-300 bg-cyan-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            P4 Exam Practice
          </button>
          <button
            onClick={() => setActiveTab('p5_planning')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'p5_planning' ? 'text-emerald-300 bg-emerald-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            P5 Q1 Planning
          </button>
          <button
            onClick={() => setActiveTab('p5_analysis')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'p5_analysis' ? 'text-emerald-300 bg-emerald-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            P5 Q2 Analysis
          </button>
          <button
            onClick={() => setActiveTab('blacklist')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'blacklist' ? 'text-rose-300 bg-rose-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            Examiner Pitfalls
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'vault' ? 'text-amber-300 bg-amber-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            Formula Vault
          </button>
          <button
            onClick={() => setActiveTab('simulations')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'simulations' ? 'text-purple-300 bg-purple-950/60 font-semibold' : 'hover:text-white'
            }`}
          >
            Lab Simulators
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('p4_definitions')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Start Drill
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1 p-2 bg-slate-900 border-b border-slate-800 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('target')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'target' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
        >
          Target
        </button>
        <button
          onClick={() => setActiveTab('p4_definitions')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'p4_definitions' ? 'bg-cyan-950 text-cyan-200' : 'text-slate-400'}`}
        >
          P4 Defs
        </button>
        <button
          onClick={() => setActiveTab('p4_structured')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'p4_structured' ? 'bg-cyan-950 text-cyan-200' : 'text-slate-400'}`}
        >
          P4 Exam
        </button>
        <button
          onClick={() => setActiveTab('p5_planning')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'p5_planning' ? 'bg-emerald-950 text-emerald-200' : 'text-slate-400'}`}
        >
          P5 Q1
        </button>
        <button
          onClick={() => setActiveTab('p5_analysis')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'p5_analysis' ? 'bg-emerald-950 text-emerald-200' : 'text-slate-400'}`}
        >
          P5 Q2
        </button>
        <button
          onClick={() => setActiveTab('blacklist')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'blacklist' ? 'bg-rose-950 text-rose-200' : 'text-slate-400'}`}
        >
          Pitfalls
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'vault' ? 'bg-amber-950 text-amber-200' : 'text-slate-400'}`}
        >
          Formulas
        </button>
        <button
          onClick={() => setActiveTab('simulations')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'simulations' ? 'bg-purple-950 text-purple-200' : 'text-slate-400'}`}
        >
          Simulators
        </button>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {activeTab === 'target' && <ScoreTargetDashboard />}
        {activeTab === 'p4_definitions' && <VerbatimDefinitionTrainer />}
        {activeTab === 'p4_structured' && <StructuredPaper4Simulator />}
        {activeTab === 'p5_planning' && <PlanningMasteryQ1 />}
        {activeTab === 'p5_analysis' && <AnalysisEvaluationQ2 />}
        {activeTab === 'blacklist' && <BlacklistExaminerReport />}
        {activeTab === 'vault' && <FormulaVault />}
        {activeTab === 'simulations' && (
          <div className="space-y-6">
            {/* Simulation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Interactive Physical Systems</span>
                  <span aria-hidden="true">·</span>
                  <span>HTML5 Canvas Physics Engines</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-purple-400 font-mono">Visual Intuition</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight mt-1">
                  A2 Physical Concept Laboratories
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Simulate oscillatory motion, wave interference, ballistic trajectories, and electrostatic vector fields in real time to build deep mathematical and physical intuition.
                </p>
              </div>

              {/* Sim Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
                <button
                  onClick={() => setActiveSim('projectile')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeSim === 'projectile'
                      ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Kinematics
                </button>
                <button
                  onClick={() => setActiveSim('pendulum')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeSim === 'pendulum'
                      ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Harmonic SHM
                </button>
                <button
                  onClick={() => setActiveSim('waves')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeSim === 'waves'
                      ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Wave Optics
                </button>
                <button
                  onClick={() => setActiveSim('electric')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeSim === 'electric'
                      ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Coulomb Fields
                </button>
              </div>
            </div>

            {/* Active Simulation */}
            {activeSim === 'projectile' && <ProjectileMotion />}
            {activeSim === 'pendulum' && <PendulumSimulation />}
            {activeSim === 'waves' && <WaveOpticsSimulation />}
            {activeSim === 'electric' && <ElectricFieldSimulation />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>Cambridge International A Level Physics (CIE 9702)</span>
          <span aria-hidden="true">·</span>
          <span>A2 Level Papers 4 &amp; 5 Mastery Program</span>
          <span aria-hidden="true">·</span>
          <span>Target Score: +90/100 (Paper 4) &amp; +25/30 (Paper 5)</span>
        </div>
      </footer>
    </div>
  );
}
