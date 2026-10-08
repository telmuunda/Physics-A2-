import React, { useState, useEffect, useRef } from 'react';
import { Info, Sparkles } from 'lucide-react';
import { MathTex } from '../MathTex';

// Helper to convert wavelength in nm to RGB hex color
function nmToColor(wavelength: number): string {
  let r = 0, g = 0, b = 0;
  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    b = 1.0;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / (490 - 440);
    b = 1.0;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1.0;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1.0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1.0;
    g = -(wavelength - 645) / (645 - 580);
  } else if (wavelength >= 645 && wavelength <= 750) {
    r = 1.0;
  }

  // Intensity factor at edges of vision
  let factor = 1.0;
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + (0.7 * (wavelength - 380)) / (420 - 380);
  } else if (wavelength >= 700 && wavelength <= 750) {
    factor = 0.3 + (0.7 * (750 - wavelength)) / (750 - 700);
  }

  const red = Math.round(255 * Math.pow(r * factor, 0.8));
  const green = Math.round(255 * Math.pow(g * factor, 0.8));
  const blue = Math.round(255 * Math.pow(b * factor, 0.8));
  return `rgb(${red}, ${green}, ${blue})`;
}

export const WaveOpticsSimulation: React.FC = () => {
  const [mode, setMode] = useState<'double_slit' | 'snell'>('double_slit');

  // Double Slit parameters
  const [wavelength, setWavelength] = useState<number>(532); // nm (green laser)
  const [slitDistance, setSlitDistance] = useState<number>(0.25); // mm
  const [screenDistance, setScreenDistance] = useState<number>(1.2); // meters

  // Snell parameters
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // degrees
  const [n1, setN1] = useState<number>(1.0); // Medium 1
  const [n2, setN2] = useState<number>(1.52); // Medium 2

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fringe spacing: Delta y = (lambda * L) / d
  // lambda in meters = wavelength * 1e-9
  // d in meters = slitDistance * 1e-3
  // L in meters = screenDistance
  const fringeSpacingMm =
    ((wavelength * 1e-6 * screenDistance) / slitDistance); // in mm

  // Snell calculations
  const theta1Rad = (incidentAngle * Math.PI) / 180;
  const sinTheta2 = (n1 * Math.sin(theta1Rad)) / n2;
  const isTIR = sinTheta2 > 1.0;
  const theta2Deg = isTIR ? 0 : (Math.asin(sinTheta2) * 180) / Math.PI;
  const criticalAngleDeg = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;

  const laserColor = nmToColor(wavelength);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, w, h);

    if (mode === 'double_slit') {
      // Draw Double Slit simulation
      const slitBarrierX = 140;
      const screenX = w - 120;
      const midY = h / 2;

      // Draw incoming plane wavefronts
      ctx.strokeStyle = laserColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.5;
      for (let x = 30; x < slitBarrierX; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, h - 40);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw Barrier with 2 slits
      const slitSepPx = 40 + slitDistance * 60;
      const s1Y = midY - slitSepPx / 2;
      const s2Y = midY + slitSepPx / 2;
      const slitWidth = 6;

      ctx.fillStyle = '#334155';
      // top part
      ctx.fillRect(slitBarrierX - 3, 20, 6, s1Y - slitWidth / 2 - 20);
      // middle part
      ctx.fillRect(
        slitBarrierX - 3,
        s1Y + slitWidth / 2,
        6,
        s2Y - slitWidth / 2 - (s1Y + slitWidth / 2)
      );
      // bottom part
      ctx.fillRect(slitBarrierX - 3, s2Y + slitWidth / 2, 6, h - 20 - (s2Y + slitWidth / 2));

      // Draw wave ripples radiating from the two slits
      const numWaves = 14;
      const waveSpacing = 16;
      ctx.strokeStyle = laserColor;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.25;

      for (let i = 1; i <= numWaves; i++) {
        const r = i * waveSpacing;
        ctx.beginPath();
        ctx.arc(slitBarrierX, s1Y, r, -Math.PI / 2.3, Math.PI / 2.3);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(slitBarrierX, s2Y, r, -Math.PI / 2.3, Math.PI / 2.3);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw detector screen
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(screenX, 20, 10, h - 40);

      // Draw Interference Intensity Pattern along detector screen
      ctx.strokeStyle = laserColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const screenH = h - 60;
      const maxIntensityW = 85;

      for (let py = 30; py <= h - 30; py += 1.5) {
        const yOffsetMm = ((py - midY) / screenH) * 20; // scale
        // Phase difference beta = (pi * d * y) / (lambda * L)
        const beta = (Math.PI * (slitDistance * 1e-3) * (yOffsetMm * 1e-3)) / (wavelength * 1e-9 * screenDistance);
        const intensity = Math.pow(Math.cos(beta), 2);

        // Single slit diffraction envelope
        const alpha = (Math.PI * (0.04 * 1e-3) * (yOffsetMm * 1e-3)) / (wavelength * 1e-9 * screenDistance);
        const sinc = alpha === 0 ? 1 : Math.sin(alpha) / alpha;
        const totalI = intensity * Math.pow(sinc, 2);

        const px = screenX + 15 + totalI * maxIntensityW;
        if (py === 30) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw screen light fringes visualization
      for (let py = 30; py <= h - 30; py += 2) {
        const yOffsetMm = ((py - midY) / screenH) * 20;
        const beta = (Math.PI * (slitDistance * 1e-3) * (yOffsetMm * 1e-3)) / (wavelength * 1e-9 * screenDistance);
        const intensity = Math.pow(Math.cos(beta), 2);
        ctx.fillStyle = laserColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, intensity * 0.9));
        ctx.fillRect(screenX + 2, py, 6, 2);
      }
      ctx.globalAlpha = 1.0;

      // Screen label
      ctx.fillStyle = '#64748b';
      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillText('Projection Screen', screenX - 30, h - 12);
      ctx.fillText('Intensity Profile I(y)', screenX + 18, 25);
    } else {
      // Snell's Law Refraction
      const midX = w / 2;
      const midY = h / 2;

      // Medium 1 (top)
      ctx.fillStyle = '#090e1a';
      ctx.fillRect(0, 0, w, midY);

      // Medium 2 (bottom, tinted based on refractive index)
      ctx.fillStyle = `rgba(14, 165, 233, ${Math.min(0.25, 0.08 * n2)})`;
      ctx.fillRect(0, midY, w, h - midY);

      // Interface line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      // Normal line (vertical dashed)
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(midX, 20);
      ctx.lineTo(midX, h - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ray lengths
      const rayLen = 170;

      // Incident ray (from medium 1 down to origin)
      const incX = midX - rayLen * Math.sin(theta1Rad);
      const incY = midY - rayLen * Math.cos(theta1Rad);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(incX, incY);
      ctx.lineTo(midX, midY);
      ctx.stroke();

      // Reflected ray (in medium 1)
      const reflX = midX + rayLen * Math.sin(theta1Rad);
      const reflY = midY - rayLen * Math.cos(theta1Rad);

      ctx.strokeStyle = isTIR ? '#f59e0b' : 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = isTIR ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(midX, midY);
      ctx.lineTo(reflX, reflY);
      ctx.stroke();

      // Refracted ray (in medium 2)
      if (!isTIR) {
        const theta2Rad = (theta2Deg * Math.PI) / 180;
        const refrX = midX + rayLen * Math.sin(theta2Rad);
        const refrY = midY + rayLen * Math.cos(theta2Rad);

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(refrX, refrY);
        ctx.stroke();
      }

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px ui-sans-serif, system-ui';
      ctx.fillText(`Medium 1 (n = ${n1.toFixed(2)})`, 30, 40);
      ctx.fillText(`Medium 2 (n = ${n2.toFixed(2)})`, 30, midY + 40);

      if (isTIR) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '13px ui-sans-serif, system-ui, font-semibold';
        ctx.fillText('TOTAL INTERNAL REFLECTION (θ₁ ≥ θ_c)', midX + 30, midY - 30);
      }
    }
  }, [
    mode,
    wavelength,
    slitDistance,
    screenDistance,
    incidentAngle,
    n1,
    n2,
    laserColor,
    theta1Rad,
    theta2Deg,
    isTIR,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Stage */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-200">
                {mode === 'double_slit' ? "Young's Double-Slit Experiment" : "Snell's Law of Refraction"}
              </span>
              <span aria-hidden="true">·</span>
              <span>Wave Optics</span>
            </div>
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setMode('double_slit')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'double_slit'
                    ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Wave Interference
              </button>
              <button
                onClick={() => setMode('snell')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'snell'
                    ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Refraction & TIR
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas ref={canvasRef} width={800} height={450} className="w-full h-full block" />
          </div>

          {/* Real-time stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            {mode === 'double_slit' ? (
              <>
                <div>
                  <div className="text-slate-400">Wavelength (<MathTex math="\lambda" />)</div>
                  <div className="font-mono text-sm text-cyan-400 tabular-nums">
                    {wavelength} nm
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Fringe Spacing (<MathTex math="\Delta y" />)</div>
                  <div className="font-mono text-sm text-emerald-400 tabular-nums">
                    {fringeSpacingMm.toFixed(3)} mm
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Screen Distance (<MathTex math="L" />)</div>
                  <div className="font-mono text-sm text-slate-200 tabular-nums">
                    {screenDistance.toFixed(2)} m
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-slate-400">Incident Angle (<MathTex math="\theta_1" />)</div>
                  <div className="font-mono text-sm text-amber-400 tabular-nums">
                    {incidentAngle.toFixed(1)}°
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Refracted Angle (<MathTex math="\theta_2" />)</div>
                  <div className="font-mono text-sm text-cyan-400 tabular-nums">
                    {isTIR ? 'TIR (No refraction)' : `${theta2Deg.toFixed(1)}°`}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Critical Angle (<MathTex math="\theta_c" />)</div>
                  <div className="font-mono text-sm text-slate-200 tabular-nums">
                    {criticalAngleDeg ? `${criticalAngleDeg.toFixed(1)}°` : 'None (n₁ < n₂)'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Zone 2: Control & Concept Deck */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {mode === 'double_slit' ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-tight">Interference Controls</h2>

            {/* Wavelength Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Wavelength (<MathTex math="\lambda" />)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{wavelength} nm</span>
              </div>
              <input
                type="range"
                min="400"
                max="700"
                step="1"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full cursor-pointer accent-cyan-500"
              />
              <div
                className="h-2 rounded-full w-full border border-slate-800"
                style={{ backgroundColor: laserColor }}
              />
            </div>

            {/* Slit Separation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Slit Separation (<MathTex math="d" />)</span>
                <span className="font-mono text-amber-400 tabular-nums">{slitDistance.toFixed(2)} mm</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.02"
                value={slitDistance}
                onChange={(e) => setSlitDistance(Number(e.target.value))}
                className="w-full cursor-pointer accent-amber-500"
              />
            </div>

            {/* Screen Distance Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Screen Distance (<MathTex math="L" />)</span>
                <span className="font-mono text-emerald-400 tabular-nums">{screenDistance.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={screenDistance}
                onChange={(e) => setScreenDistance(Number(e.target.value))}
                className="w-full cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
              <div className="text-slate-400">Fringe Spacing Formula:</div>
              <div className="text-cyan-300">
                <MathTex block math="\Delta y = \frac{\lambda L}{d}" />
              </div>
              <p className="text-slate-400 text-[11px]">
                Notice that increasing wavelength <MathTex math="\lambda" /> or screen distance <MathTex math="L" /> spreads the fringes further apart, while increasing slit separation <MathTex math="d" /> packs them closer together.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-tight">Refraction Controls</h2>

            {/* Incident Angle */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Angle of Incidence (<MathTex math="\theta_1" />)</span>
                <span className="font-mono text-amber-400 tabular-nums">{incidentAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="1"
                value={incidentAngle}
                onChange={(e) => setIncidentAngle(Number(e.target.value))}
                className="w-full cursor-pointer accent-amber-500"
              />
            </div>

            {/* Medium 1 index */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Medium 1 Refractive Index (<MathTex math="n_1" />)</span>
                <span className="font-mono text-slate-200 tabular-nums">{n1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="w-full cursor-pointer accent-slate-400"
              />
            </div>

            {/* Medium 2 index */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Medium 2 Refractive Index (<MathTex math="n_2" />)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{n2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="w-full cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
              <div className="text-slate-400">Snell's Law:</div>
              <div className="text-cyan-300">
                <MathTex block math="n_1 \sin\theta_1 = n_2 \sin\theta_2" />
              </div>
              <div className="text-slate-400 pt-1">Critical Angle (for <MathTex math="n_1 > n_2" />):</div>
              <div className="text-amber-300">
                <MathTex block math="\theta_c = \arcsin\left(\frac{n_2}{n_1}\right)" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
