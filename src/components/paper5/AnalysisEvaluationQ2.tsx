import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, Eye, Compass, RefreshCw } from 'lucide-react';
import { ANALYSIS_SCENARIOS, AnalysisScenario } from '../../data/paper5Scenarios';

export const AnalysisEvaluationQ2: React.FC = () => {
  const [scenario] = useState<AnalysisScenario>(ANALYSIS_SCENARIOS[0]);
  const [showBestFit, setShowBestFit] = useState<boolean>(true);
  const [showWorstFit, setShowWorstFit] = useState<boolean>(true);
  const [showErrorBars, setShowErrorBars] = useState<boolean>(true);
  const [showGradientTriangle, setShowGradientTriangle] = useState<boolean>(true);

  // Canvas ref for graphing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gradient and uncertainty calculations
  const deltaM = Math.abs(scenario.bestFitGradient - scenario.worstFitGradient);
  const deltaC = Math.abs(scenario.bestFitIntercept - scenario.worstFitIntercept);

  // Percentage uncertainty in gradient
  const pctUncertM = (deltaM / Math.abs(scenario.bestFitGradient)) * 100;

  // Render graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, w, h);

    const padLeft = 60;
    const padBottom = 50;
    const padTop = 30;
    const padRight = 30;

    const plotW = w - padLeft - padRight;
    const plotH = h - padBottom - padTop;

    // Data ranges:
    // x: 0 to 70 s
    // y: 0.8 to 2.6
    const minX = 0;
    const maxX = 70;
    const minY = 0.8;
    const maxY = 2.6;

    const toX = (valX: number) => padLeft + ((valX - minX) / (maxX - minX)) * plotW;
    const toY = (valY: number) => h - padBottom - ((valY - minY) / (maxY - minY)) * plotH;

    // Draw Grid Lines (similar to mm graph paper)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // Vertical grid lines (every 10s)
    for (let gx = 0; gx <= maxX; gx += 5) {
      const cx = toX(gx);
      ctx.beginPath();
      ctx.strokeStyle = gx % 10 === 0 ? '#334155' : '#1e293b';
      ctx.moveTo(cx, padTop);
      ctx.lineTo(cx, h - padBottom);
      ctx.stroke();
    }

    // Horizontal grid lines (every 0.2)
    for (let gy = 0.8; gy <= maxY + 0.01; gy += 0.1) {
      const cy = toY(gy);
      ctx.beginPath();
      ctx.strokeStyle = Math.round(gy * 10) % 2 === 0 ? '#334155' : '#1e293b';
      ctx.moveTo(padLeft, cy);
      ctx.lineTo(w - padRight, cy);
      ctx.stroke();
    }

    // Axes numbers
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'right';
    for (let gy = 0.8; gy <= maxY + 0.01; gy += 0.2) {
      ctx.fillText(gy.toFixed(1), padLeft - 8, toY(gy) + 4);
    }
    ctx.textAlign = 'center';
    for (let gx = 0; gx <= maxX; gx += 10) {
      ctx.fillText(`${gx}`, toX(gx), h - padBottom + 16);
    }

    // Axis Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px ui-sans-serif, system-ui';
    ctx.fillText('t / s (Time)', padLeft + plotW / 2, h - padBottom + 35);
    ctx.save();
    ctx.translate(18, padTop + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('ln(V / V)', 0, 0);
    ctx.restore();

    // Plot Line of Best Fit (Cyan)
    if (showBestFit) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const yStart = scenario.bestFitGradient * 0 + scenario.bestFitIntercept;
      const yEnd = scenario.bestFitGradient * 70 + scenario.bestFitIntercept;
      ctx.moveTo(toX(0), toY(yStart));
      ctx.lineTo(toX(70), toY(yEnd));
      ctx.stroke();
    }

    // Plot Worst Acceptable Line (Amber - steepest or shallowest passing through all error bars)
    if (showWorstFit) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      const yStartW = scenario.worstFitGradient * 0 + scenario.worstFitIntercept;
      const yEndW = scenario.worstFitGradient * 70 + scenario.worstFitIntercept;
      ctx.moveTo(toX(0), toY(yStartW));
      ctx.lineTo(toX(70), toY(yEndW));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Plot Large Gradient Triangle (M3 Mark in Paper 5: Hypotenuse >= 50% line length)
    if (showGradientTriangle && showBestFit) {
      const triX1 = 5;
      const triX2 = 65;
      const triY1 = scenario.bestFitGradient * triX1 + scenario.bestFitIntercept;
      const triY2 = scenario.bestFitGradient * triX2 + scenario.bestFitIntercept;

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(toX(triX1), toY(triY1));
      ctx.lineTo(toX(triX2), toY(triY1));
      ctx.lineTo(toX(triX2), toY(triY2));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#c084fc';
      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillText('Δx ≥ 50% of line (Paper 5 rule)', toX((triX1 + triX2) / 2), toY(triY1) + 12);
    }

    // Plot Data Points and Error Bars
    scenario.tableData.forEach((row) => {
      const cx = toX(row.calcX);
      const cy = toY(row.calcY);

      // Error bar (vertical on ln(V))
      if (showErrorBars) {
        const topY = toY(row.calcY + row.calcUncertY);
        const botY = toY(row.calcY - row.calcUncertY);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, topY);
        ctx.lineTo(cx, botY);
        // Error bar caps
        ctx.moveTo(cx - 3, topY);
        ctx.lineTo(cx + 3, topY);
        ctx.moveTo(cx - 3, botY);
        ctx.lineTo(cx + 3, botY);
        ctx.stroke();
      }

      // Point marker (small cross or crisp circle <= half small square)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 3.5, cy - 3.5);
      ctx.lineTo(cx + 3.5, cy + 3.5);
      ctx.moveTo(cx - 3.5, cy + 3.5);
      ctx.lineTo(cx + 3.5, cy - 3.5);
      ctx.stroke();
    });
  }, [scenario, showBestFit, showWorstFit, showErrorBars, showGradientTriangle]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>CIE 9702 Paper 5</span>
            <span aria-hidden="true">·</span>
            <span>Question 2: Analysis &amp; Evaluation (15 Marks)</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono">Target: 13-15/15 Marks</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-1">
            Data Table, Error Bars, Best Fit &amp; Worst Line Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Cambridge examiners award marks for: (1) Correct SF and DP in calculated column, (2) Correct uncertainty propagation, (3) Accurately plotted error bars, (4) Line of best fit and worst acceptable line (WAL), (5) Large gradient triangle ($\ge 50\%$ line length), and (6) Final constants with units and absolute uncertainties.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Question 2 Weight</div>
            <div className="text-base font-bold font-mono text-cyan-400">
              15 Marks (50% of Paper 5)
            </div>
            <div className="text-[10px] text-slate-500">
              Combined target: +25/30
            </div>
          </div>
          <Compass className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      {/* Part 1: Completed Data Table with SF Rules */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400">PART (b): TABLE COMPLETION &amp; SF RULES</span>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Experimental Data Table (Raw vs. Calculated with Uncertainties)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            [3 Marks]
          </span>
        </div>

        {/* SF Rule Banner */}
        <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-200 leading-relaxed">
          <strong>Cambridge Mark Scheme SF / DP Invariant:</strong> {scenario.sfRuleExplanation}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                <th className="p-3 font-mono">{scenario.tableHeaders.rawX}</th>
                <th className="p-3 font-mono">{scenario.tableHeaders.rawY}</th>
                <th className="p-3 font-mono text-cyan-400">{scenario.tableHeaders.calcX}</th>
                <th className="p-3 font-mono text-cyan-400">{scenario.tableHeaders.calcY}</th>
                <th className="p-3 font-mono text-amber-400">{scenario.tableHeaders.calcUncertY}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {scenario.tableData.map((row) => (
                <tr key={row.index} className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-slate-200">{row.rawX}</td>
                  <td className="p-3 font-mono text-slate-200">
                    {row.rawY.toFixed(1)} ± {row.uncertY.toFixed(1)}
                  </td>
                  <td className="p-3 font-mono text-slate-200">{row.calcX}</td>
                  <td className="p-3 font-mono text-cyan-300 font-semibold">{row.calcY.toFixed(3)}</td>
                  <td className="p-3 font-mono text-amber-300">± {row.calcUncertY.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 2: Interactive Graph Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Canvas Graph (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-white">Grid Graph Viewport</span>
                <span aria-hidden="true">·</span>
                <span>ln(V) vs t</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setShowBestFit(!showBestFit)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    showBestFit
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Best-Fit Line
                </button>
                <button
                  onClick={() => setShowWorstFit(!showWorstFit)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    showWorstFit
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Worst Acceptable Line (WAL)
                </button>
                <button
                  onClick={() => setShowErrorBars(!showErrorBars)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    showErrorBars
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Error Bars
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] max-h-[460px] bg-slate-950">
              <canvas ref={canvasRef} width={700} height={500} className="w-full h-full block" />
            </div>

            <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400" />
                  <span className="text-slate-300">Best-Fit Gradient (m)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-400 border-t border-dashed" />
                  <span className="text-slate-300">Worst Acceptable Line (WAL)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-purple-400 border-t border-dotted" />
                  <span className="text-slate-300">Gradient Triangle (&ge;50% line)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cambridge Analysis Mark Breakdown Deck (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-xs">
          {/* Gradient Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              1. Gradient Determination &amp; Uncertainty
            </h4>
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Best-Fit Gradient (m_best):</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {scenario.bestFitGradient.toFixed(4)} s⁻¹
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Worst-Fit Gradient (m_worst):</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {scenario.worstFitGradient.toFixed(4)} s⁻¹
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-slate-200">
                <span>Uncertainty Δm = |m_best - m_worst|:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  ± {deltaM.toFixed(4)} s⁻¹ ({pctUncertM.toFixed(1)}%)
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Examiner Mark Scheme Criterion: You must state the read-offs from the grid lines used to calculate the gradient, not from data points in the table. The points must span more than half the length of the line.
            </p>
          </div>

          {/* Intercept Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              2. y-Intercept Determination
            </h4>
            <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Best-Fit y-intercept (c_best):</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {scenario.bestFitIntercept.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Worst-Fit y-intercept (c_worst):</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {scenario.worstFitIntercept.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-slate-200">
                <span>Uncertainty Δc:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  ± {deltaC.toFixed(3)}
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
              Initial Potential Difference V₀ = e^(y-intercept) = e^({scenario.bestFitIntercept.toFixed(3)}) ={' '}
              <strong className="text-cyan-400">{Math.exp(scenario.bestFitIntercept).toFixed(1)} V</strong>
            </div>
          </div>

          {/* Final Constant Determination */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              3. Target Constant (Capacitance C)
            </h4>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <div className="text-slate-300 font-mono">
                {scenario.finalTargetConstant.expression}
              </div>
              <div className="text-sm font-bold font-mono text-emerald-300">
                C = ({scenario.finalTargetConstant.bestValue * 1e6} ±{' '}
                {(scenario.finalTargetConstant.uncertainty * 1e6).toFixed(1)}) μF
              </div>
              <p className="text-[11px] text-slate-400">
                Correct unit: <strong className="text-slate-200">F (Farads)</strong> or <strong className="text-slate-200">μF</strong>. Marks are lost if unit is omitted or uncertainty has incorrect number of significant figures!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
