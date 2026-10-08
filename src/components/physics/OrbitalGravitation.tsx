import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Info, Orbit } from 'lucide-react';
import { MathTex } from '../MathTex';
import { drawExaggeratedVector } from '../../utils/canvasVector';

export const OrbitalGravitation: React.FC = () => {
  const [initVelocity, setInitVelocity] = useState<number>(32); // initial tangential speed
  const [initRadius, setInitRadius] = useState<number>(180); // pixels from center
  const [centralMass, setCentralMass] = useState<number>(10000); // GM scale
  const [vectorScale, setVectorScale] = useState<number>(2.5); // vector exaggeration
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showKeplerArea, setShowKeplerArea] = useState<boolean>(true);

  // Position and velocity of satellite: relative to center (0, 0)
  const [sat, setSat] = useState<{ x: number; y: number; vx: number; vy: number }>({
    x: 180,
    y: 0,
    vx: 0,
    vy: -32,
  });

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reset orbit
  const handleReset = useCallback(() => {
    setSat({
      x: initRadius,
      y: 0,
      vx: 0,
      vy: -initVelocity,
    });
    trailRef.current = [{ x: initRadius, y: 0 }];
  }, [initRadius, initVelocity]);

  // Set preset for circular orbit: v_circ = sqrt(GM / r)
  const setCircularPreset = () => {
    const vCirc = Math.sqrt(centralMass / initRadius);
    setInitVelocity(Math.round(vCirc));
    setSat({
      x: initRadius,
      y: 0,
      vx: 0,
      vy: -vCirc,
    });
    trailRef.current = [{ x: initRadius, y: 0 }];
  };

  // Set preset for escape orbit: v_esc = sqrt(2 * GM / r)
  const setEscapePreset = () => {
    const vEsc = Math.sqrt((2 * centralMass) / initRadius) * 1.05;
    setInitVelocity(Math.round(vEsc));
    setSat({
      x: initRadius,
      y: 0,
      vx: 0,
      vy: -vEsc,
    });
    trailRef.current = [{ x: initRadius, y: 0 }];
  };

  // Update physics with RK4 for high orbital accuracy
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.03);
      lastTime = time;

      setSat((prev) => {
        const computeAccel = (px: number, py: number) => {
          const rSq = px * px + py * py;
          const r = Math.sqrt(rSq);
          if (r < 25) {
            // Collision with planet
            return { ax: 0, ay: 0 };
          }
          const aMag = centralMass / rSq;
          return {
            ax: -aMag * (px / r),
            ay: -aMag * (py / r),
          };
        };

        // RK4 step
        const a1 = computeAccel(prev.x, prev.y);
        const k1v = { x: a1.ax * dt, y: a1.ay * dt };
        const k1r = { x: prev.vx * dt, y: prev.vy * dt };

        const a2 = computeAccel(prev.x + 0.5 * k1r.x, prev.y + 0.5 * k1r.y);
        const k2v = { x: a2.ax * dt, y: a2.ay * dt };
        const k2r = { x: (prev.vx + 0.5 * k1v.x) * dt, y: (prev.vy + 0.5 * k1v.y) * dt };

        const a3 = computeAccel(prev.x + 0.5 * k2r.x, prev.y + 0.5 * k2r.y);
        const k3v = { x: a3.ax * dt, y: a3.ay * dt };
        const k3r = { x: (prev.vx + 0.5 * k2v.x) * dt, y: (prev.vy + 0.5 * k2v.y) * dt };

        const a4 = computeAccel(prev.x + k3r.x, prev.y + k3r.y);
        const k4v = { x: a4.ax * dt, y: a4.ay * dt };
        const k4r = { x: (prev.vx + k3v.x) * dt, y: (prev.vy + k3v.y) * dt };

        const nextX = prev.x + (k1r.x + 2 * k2r.x + 2 * k3r.x + k4r.x) / 6;
        const nextY = prev.y + (k1r.y + 2 * k2r.y + 2 * k3r.y + k4r.y) / 6;
        const nextVx = prev.vx + (k1v.x + 2 * k2v.x + 2 * k3v.x + k4v.x) / 6;
        const nextVy = prev.vy + (k1v.y + 2 * k2v.y + 2 * k3v.y + k4v.y) / 6;

        trailRef.current.push({ x: nextX, y: nextY });
        if (trailRef.current.length > 600) trailRef.current.shift();

        // Respawn if escaped far away
        if (Math.hypot(nextX, nextY) > 600) {
          setTimeout(handleReset, 100);
          return prev;
        }

        return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [centralMass, handleReset, isPlaying]);

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

    const centerX = w / 2;
    const centerY = h / 2;

    // Coordinate Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX, h - 20);
    ctx.moveTo(20, centerY);
    ctx.lineTo(w - 20, centerY);
    ctx.stroke();

    // Equipotential circles (dashed)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.setLineDash([4, 6]);
    [100, 160, 220, 280].forEach((r) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Kepler Equal Area sector preview
    if (showKeplerArea && trailRef.current.length > 30) {
      ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const recentPts = trailRef.current.slice(-30);
      recentPts.forEach((pt) => {
        ctx.lineTo(centerX + pt.x, centerY + pt.y);
      });
      ctx.closePath();
      ctx.fill();
    }

    // Trajectory Trail
    if (trailRef.current.length > 1) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trailRef.current.forEach((pt, i) => {
        const cx = centerX + pt.x;
        const cy = centerY + pt.y;
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();
    }

    // Central Planet (Earth/Sun)
    const planetRadius = 26;
    const pGrad = ctx.createRadialGradient(
      centerX - 6,
      centerY - 6,
      4,
      centerX,
      centerY,
      planetRadius
    );
    pGrad.addColorStop(0, '#60a5fa');
    pGrad.addColorStop(0.6, '#2563eb');
    pGrad.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px ui-sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', centerX, centerY);

    // Satellite Position
    const satCanvasX = centerX + sat.x;
    const satCanvasY = centerY + sat.y;

    ctx.save();
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(satCanvasX, satCanvasY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // ==============================================================
    // DRAW EXAGGERATED GLOWING VECTORS (FG, VELOCITY, ACCEL)
    // ==============================================================
    const rMag = Math.hypot(sat.x, sat.y) || 0.001;
    const rUnitX = sat.x / rMag;
    const rUnitY = sat.y / rMag;

    const vMag = Math.hypot(sat.vx, sat.vy) || 0.001;
    const vUnitX = sat.vx / vMag;
    const vUnitY = sat.vy / vMag;

    // 1. Gravitational Force Vector Fg pointing directly to central planet
    const fgMag = (centralMass / (rMag * rMag)) * 250 * vectorScale;
    const fgArrowLen = Math.min(120, Math.max(30, fgMag));
    drawExaggeratedVector(
      ctx,
      satCanvasX,
      satCanvasY,
      satCanvasX - rUnitX * fgArrowLen,
      satCanvasY - rUnitY * fgArrowLen,
      {
        color: '#f59e0b',
        lineWidth: 4.5,
        headLength: 16,
        label: `Fg = GMm/r²`,
        labelOffset: { x: -rUnitX * 10, y: -rUnitY * 10 - 10 },
        glow: true,
      }
    );

    // 2. Velocity Vector v (Tangential, glowing Cyan)
    const vArrowLen = Math.min(110, Math.max(30, vMag * 2.2 * vectorScale));
    drawExaggeratedVector(
      ctx,
      satCanvasX,
      satCanvasY,
      satCanvasX + vUnitX * vArrowLen,
      satCanvasY + vUnitY * vArrowLen,
      {
        color: '#06b6d4',
        lineWidth: 4,
        headLength: 15,
        label: `v = ${vMag.toFixed(1)}`,
        glow: true,
      }
    );

    // 3. Radial distance line from center to satellite (dashed)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(satCanvasX, satCanvasY);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [centralMass, sat, showKeplerArea, vectorScale]);

  // Current physics values
  const currentR = Math.hypot(sat.x, sat.y);
  const currentV = Math.hypot(sat.vx, sat.vy);
  const vCircAtR = Math.sqrt(centralMass / currentR);
  const vEscAtR = Math.sqrt((2 * centralMass) / currentR);
  const kineticEnergy = 0.5 * currentV * currentV;
  const potentialEnergy = -centralMass / currentR;
  const totalMechanicalEnergy = kineticEnergy + potentialEnergy;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Stage (65%) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Orbital Mechanics &amp; Kepler&apos;s Laws</span>
              <span aria-hidden="true">·</span>
              <span>Central Gravitational Field: <MathTex math="F_g = \frac{GMm}{r^2}" /></span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowKeplerArea(!showKeplerArea)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  showKeplerArea
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kepler Equal Area
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas ref={canvasRef} width={800} height={450} className="w-full h-full block" />
          </div>

          {/* Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Orbital Speed (v)</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">
                {currentV.toFixed(1)} km/s
              </div>
            </div>
            <div>
              <div className="text-slate-400">Circular Speed (v_circ)</div>
              <div className="font-mono text-sm text-emerald-400 tabular-nums">
                {vCircAtR.toFixed(1)} km/s
              </div>
            </div>
            <div>
              <div className="text-slate-400">Escape Velocity (v_esc)</div>
              <div className="font-mono text-sm text-rose-400 tabular-nums">
                {vEscAtR.toFixed(1)} km/s
              </div>
            </div>
            <div>
              <div className="text-slate-400">Total Energy (E)</div>
              <div className={`font-mono text-sm tabular-nums font-semibold ${totalMechanicalEnergy < 0 ? 'text-cyan-400' : 'text-amber-400'}`}>
                {totalMechanicalEnergy.toFixed(1)} {totalMechanicalEnergy < 0 ? '(Bound Orbit)' : '(Unbound / Escape)'}
              </div>
            </div>
          </div>
        </div>

        {/* Transport Controls & Orbit Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Quick Orbit Presets:</span>
            <button
              onClick={setCircularPreset}
              className="px-3 py-1.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 transition-colors"
            >
              Circular (e = 0)
            </button>
            <button
              onClick={setEscapePreset}
              className="px-3 py-1.5 rounded bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 transition-colors"
            >
              Escape Trajectory
            </button>
          </div>
        </div>
      </div>

      {/* Zone 2: Control Deck (35%) */}
      <div className="lg:col-span-4 flex flex-col gap-4 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">Orbital Parameters</h3>

          {/* Vector Exaggeration */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between">
              <span className="text-purple-300 font-medium">Vector Line Exaggeration Boost:</span>
              <span className="font-mono text-purple-400 font-bold">{vectorScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.5"
              value={vectorScale}
              onChange={(e) => setVectorScale(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Magnifies glowing gravitational attraction and tangential velocity vectors.
            </p>
          </div>

          {/* Launch Velocity */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Launch Tangential Speed (v₀):</span>
              <span className="font-mono text-cyan-400">{initVelocity} km/s</span>
            </div>
            <input
              type="range"
              min="15"
              max="55"
              step="1"
              value={initVelocity}
              onChange={(e) => {
                setInitVelocity(Number(e.target.value));
                setSat((prev) => ({ ...prev, vy: -Number(e.target.value) }));
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Initial Radius */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Orbital Separation (r₀):</span>
              <span className="font-mono text-amber-400">{initRadius} px</span>
            </div>
            <input
              type="range"
              min="100"
              max="260"
              step="10"
              value={initRadius}
              onChange={(e) => {
                setInitRadius(Number(e.target.value));
                setSat((prev) => ({ ...prev, x: Number(e.target.value) }));
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Central Mass */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Central Body Mass (M):</span>
              <span className="font-mono text-slate-200">{centralMass} GM</span>
            </div>
            <input
              type="range"
              min="5000"
              max="20000"
              step="1000"
              value={centralMass}
              onChange={(e) => setCentralMass(Number(e.target.value))}
              className="w-full accent-slate-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Cambridge Theory Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 leading-relaxed">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Info className="w-4 h-4" />
            <span>Key A2 Derivations (Topic 13)</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Total Mechanical Energy in Circular Orbit:</span>
            <div className="text-cyan-300 font-mono">
              <MathTex block math="E = E_k + E_p = \frac{GMm}{2r} - \frac{GMm}{r} = -\frac{GMm}{2r}" />
            </div>
            <p className="text-[11px] text-slate-400">
              Total energy is negative, meaning the satellite is gravitationally bound. As radius <MathTex math="r" /> decreases due to atmospheric drag, potential energy drops twice as fast as kinetic energy increases—so the satellite actually speeds up!
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Escape Velocity Derivation:</span>
            <div className="text-rose-300 font-mono">
              <MathTex block math="\frac{1}{2}m v_{esc}^2 - \frac{GMm}{R} = 0 \implies v_{esc} = \sqrt{\frac{2GM}{R}}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
