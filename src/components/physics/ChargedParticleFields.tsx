import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Zap, Compass, Info } from 'lucide-react';
import { MathTex } from '../MathTex';
import { drawExaggeratedVector } from '../../utils/canvasVector';

export const ChargedParticleFields: React.FC = () => {
  const [mode, setMode] = useState<'velocity_selector' | 'magnetic_circle'>('velocity_selector');
  const [chargeType, setChargeType] = useState<'+' | '-'>('+');
  const [particleMass, setParticleMass] = useState<number>(1.0); // relative units (e.g. proton = 1, alpha = 4)
  const [velocity, setVelocity] = useState<number>(40); // m/s
  const [eField, setEField] = useState<number>(200); // V/m
  const [bField, setBField] = useState<number>(5.0); // T
  const [vectorScale, setVectorScale] = useState<number>(2.0); // Exaggeration factor
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Particle state: x, y, vx, vy
  const [pos, setPos] = useState<{ x: number; y: number; vx: number; vy: number }>({
    x: 40,
    y: 225,
    vx: 40,
    vy: 0,
  });

  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected velocity for undeflected condition: v_select = E / B
  const vSelected = eField / (bField || 0.001);

  // Reset particle
  const handleReset = useCallback(() => {
    if (mode === 'velocity_selector') {
      setPos({ x: 40, y: 225, vx: velocity, vy: 0 });
      trailRef.current = [{ x: 40, y: 225 }];
    } else {
      // Magnetic circle: start from bottom center shooting upward
      setPos({ x: 380, y: 380, vx: 0, vy: -velocity });
      trailRef.current = [{ x: 380, y: 380 }];
    }
  }, [mode, velocity]);

  useEffect(() => {
    handleReset();
  }, [mode, velocity, handleReset]);

  // Physics update loop
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.03);
      lastTime = time;

      setPos((prev) => {
        const q = chargeType === '+' ? 1.0 : -1.0;
        const m = Math.max(0.2, particleMass);

        let ax = 0;
        let ay = 0;

        if (mode === 'velocity_selector') {
          // In velocity selector region: x between 120 and 640
          if (prev.x >= 120 && prev.x <= 640) {
            // E-field is downward (+y)
            const FE_y = q * eField; // Downward for +q, Upward for -q

            // B-field is into page (+z)
            // Magnetic force F_B = q(v x B)
            // v = (vx, vy, 0), B = (0, 0, B)
            // v x B = (vy*B - 0, 0 - vx*B, 0) = (vy*B, -vx*B)
            // For +q with vx > 0: FB_y = -q * vx * B (Upward)
            const FB_x = q * prev.vy * bField;
            const FB_y = -q * prev.vx * bField;

            ax = (FB_x) / (m * 2);
            ay = (FE_y + FB_y) / (m * 2);
          }
        } else {
          // Pure magnetic circle region: x in [80, 720], y in [50, 400]
          if (prev.x >= 80 && prev.x <= 720 && prev.y >= 50 && prev.y <= 420) {
            const FB_x = q * prev.vy * bField;
            const FB_y = -q * prev.vx * bField;
            ax = FB_x / m;
            ay = FB_y / m;
          }
        }

        const nextVx = prev.vx + ax * dt;
        const nextVy = prev.vy + ay * dt;
        const nextX = prev.x + nextVx * dt;
        const nextY = prev.y + nextVy * dt;

        trailRef.current.push({ x: nextX, y: nextY });
        if (trailRef.current.length > 500) trailRef.current.shift();

        // Respawn if out of bounds
        if (nextX > 780 || nextX < 10 || nextY > 440 || nextY < 20) {
          setTimeout(handleReset, 100);
          return prev;
        }

        return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [bField, chargeType, eField, handleReset, isPlaying, mode, particleMass]);

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

    if (mode === 'velocity_selector') {
      // Draw Crossed Field Plates
      const plateLeft = 120;
      const plateRight = 640;
      const topPlateY = 120;
      const botPlateY = 330;

      // Top positive plate (+V)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(plateLeft, topPlateY - 14, plateRight - plateLeft, 14);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px ui-sans-serif';
      ctx.fillText('+ + + + + Positive Plate (+V) + + + + +', plateLeft + 140, topPlateY - 4);

      // Bottom negative plate (0V)
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(plateLeft, botPlateY, plateRight - plateLeft, 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('- - - - - Negative Plate (0V) - - - - -', plateLeft + 140, botPlateY + 11);

      // Draw E-field downward arrows
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.lineWidth = 1;
      for (let x = plateLeft + 40; x < plateRight; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, topPlateY + 6);
        ctx.lineTo(x, botPlateY - 6);
        ctx.stroke();
        // small arrowhead
        ctx.beginPath();
        ctx.moveTo(x, botPlateY - 6);
        ctx.lineTo(x - 3, botPlateY - 14);
        ctx.lineTo(x + 3, botPlateY - 14);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.fill();
      }

      // Draw Magnetic Field symbols (Crosses ⊗ into screen)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.2;
      for (let x = plateLeft + 30; x < plateRight; x += 50) {
        for (let y = topPlateY + 30; y < botPlateY; y += 45) {
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - 4, y - 4);
          ctx.lineTo(x + 4, y + 4);
          ctx.moveTo(x + 4, y - 4);
          ctx.lineTo(x - 4, y + 4);
          ctx.stroke();
        }
      }

      // Collimator slit barriers
      ctx.fillStyle = '#334155';
      ctx.fillRect(plateLeft - 10, 40, 10, 175);
      ctx.fillRect(plateLeft - 10, 245, 10, 160);
      ctx.fillRect(plateRight, 40, 10, 175);
      ctx.fillRect(plateRight, 245, 10, 160);

      // Undeviated reference line
      ctx.strokeStyle = '#334155';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(40, 225);
      ctx.lineTo(760, 225);
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // Pure Magnetic Circular Deflection
      const regLeft = 80;
      const regRight = 720;
      const regTop = 50;
      const regBot = 420;

      // Region border
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(regLeft, regTop, regRight - regLeft, regBot - regTop);

      // Crosses ⊗
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.2;
      for (let x = regLeft + 30; x < regRight; x += 45) {
        for (let y = regTop + 30; y < regBot; y += 45) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - 3.5, y - 3.5);
          ctx.lineTo(x + 3.5, y + 3.5);
          ctx.moveTo(x + 3.5, y - 3.5);
          ctx.lineTo(x - 3.5, y + 3.5);
          ctx.stroke();
        }
      }
    }

    // Draw Trajectory Trail
    if (trailRef.current.length > 1) {
      ctx.strokeStyle = chargeType === '+' ? '#38bdf8' : '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      trailRef.current.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    }

    // Draw Charged Particle
    ctx.save();
    ctx.shadowColor = chargeType === '+' ? '#38bdf8' : '#f43f5e';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = chargeType === '+' ? '#0284c7' : '#e11d48';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px ui-sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(chargeType, pos.x, pos.y);
    ctx.restore();

    // ==============================================================
    // DRAW EXAGGERATED GLOWING VECTORS AT CURRENT PARTICLE POSITION
    // ==============================================================
    const qVal = chargeType === '+' ? 1.0 : -1.0;
    const vMag = Math.hypot(pos.vx, pos.vy) || 0.001;
    const vUnitX = pos.vx / vMag;
    const vUnitY = pos.vy / vMag;

    // 1. Velocity Vector v (Thick Cyan Glowing Arrow)
    const vArrowLen = Math.min(100, Math.max(35, vMag * 1.4 * vectorScale));
    drawExaggeratedVector(
      ctx,
      pos.x,
      pos.y,
      pos.x + vUnitX * vArrowLen,
      pos.y + vUnitY * vArrowLen,
      {
        color: '#06b6d4',
        lineWidth: 4,
        headLength: 15,
        label: `v = ${vMag.toFixed(0)} m/s`,
        glow: true,
      }
    );

    // Forces in velocity selector
    if (mode === 'velocity_selector') {
      if (pos.x >= 120 && pos.x <= 640) {
        // Electric Force FE = qE (downward for +q, upward for -q)
        const feMag = Math.abs(eField) * 0.3 * vectorScale;
        const feEndY = pos.y + (qVal > 0 ? feMag : -feMag);
        drawExaggeratedVector(
          ctx,
          pos.x,
          pos.y,
          pos.x,
          feEndY,
          {
            color: '#f43f5e',
            lineWidth: 4,
            headLength: 14,
            label: `FE = qE`,
            labelOffset: { x: 10, y: qVal > 0 ? 10 : -10 },
            glow: true,
          }
        );

        // Magnetic Force FB = q(v x B) (upward for +q with vx>0)
        const fbMag = Math.abs(pos.vx * bField) * 0.3 * vectorScale;
        const fbEndY = pos.y - (qVal > 0 ? fbMag : -fbMag);
        drawExaggeratedVector(
          ctx,
          pos.x,
          pos.y,
          pos.x,
          fbEndY,
          {
            color: '#10b981',
            lineWidth: 4,
            headLength: 14,
            label: `FB = qvB`,
            labelOffset: { x: 10, y: qVal > 0 ? -10 : 10 },
            glow: true,
          }
        );
      }
    } else {
      // Pure Magnetic Field: Magnetic Force is perpendicular to v (towards circle centre)
      // FB = q(v x B)
      const fbX = qVal * pos.vy * bField;
      const fbY = -qVal * pos.vx * bField;
      const fbMag = Math.hypot(fbX, fbY) || 0.001;
      const fbUnitX = fbX / fbMag;
      const fbUnitY = fbY / fbMag;

      const fbArrowLen = Math.min(100, Math.max(35, fbMag * 0.4 * vectorScale));
      drawExaggeratedVector(
        ctx,
        pos.x,
        pos.y,
        pos.x + fbUnitX * fbArrowLen,
        pos.y + fbUnitY * fbArrowLen,
        {
          color: '#10b981',
          lineWidth: 4.5,
          headLength: 16,
          label: `FB (Centripetal)`,
          glow: true,
        }
      );
    }
  }, [bField, chargeType, eField, mode, pos, vectorScale]);

  // Radius in magnetic field: r = mv / (Bq)
  const theoreticalRadius = ((particleMass * velocity) / (bField * 1.0)).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Canvas Stage (65%) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-white">
                {mode === 'velocity_selector' ? 'Crossed E & B Velocity Selector' : 'Circular Deflection in B-Field'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Lorentz Force: <MathTex math="\vec{F} = q(\vec{E} + \vec{v}\times\vec{B})" /></span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setMode('velocity_selector')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'velocity_selector'
                    ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Velocity Selector
              </button>
              <button
                onClick={() => setMode('magnetic_circle')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  mode === 'magnetic_circle'
                    ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Circular Path (r = mv/Bq)
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas ref={canvasRef} width={800} height={450} className="w-full h-full block" />
          </div>

          {/* Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Particle Speed (v)</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">{velocity} m/s</div>
            </div>
            {mode === 'velocity_selector' ? (
              <>
                <div>
                  <div className="text-slate-400">Selector Velocity (v = E/B)</div>
                  <div className="font-mono text-sm text-amber-400 tabular-nums">
                    {vSelected.toFixed(1)} m/s
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Undeviated Condition</div>
                  <div className={`font-mono text-xs font-semibold ${Math.abs(velocity - vSelected) < 2 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {Math.abs(velocity - vSelected) < 2 ? '● BALANCED (FE = FB)' : '▲ DEVIATED (FE ≠ FB)'}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-slate-400">Orbit Radius (r = mv/Bq)</div>
                <div className="font-mono text-sm text-emerald-400 tabular-nums">
                  {theoreticalRadius} m
                </div>
              </div>
            )}
            <div>
              <div className="text-slate-400">Vector Exaggeration</div>
              <div className="font-mono text-sm text-purple-400 tabular-nums">{vectorScale}x Boost</div>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/60">
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
              <span>Fire Particle</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Charge:</span>
            <button
              onClick={() => setChargeType('+')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                chargeType === '+' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400'
              }`}
            >
              +q (Proton)
            </button>
            <button
              onClick={() => setChargeType('-')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${
                chargeType === '-' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-slate-400'
              }`}
            >
              -q (Electron)
            </button>
          </div>
        </div>
      </div>

      {/* Zone 2: Controls Deck (35%) */}
      <div className="lg:col-span-4 flex flex-col gap-4 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">Field & Vector Controls</h3>

          {/* Vector Exaggeration Slider */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between">
              <span className="text-purple-300 font-medium">Vector Line Exaggeration Boost:</span>
              <span className="font-mono text-purple-400 font-bold">{vectorScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.5"
              value={vectorScale}
              onChange={(e) => setVectorScale(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Magnifies glowing arrow shafts for velocity, electric force, and magnetic force.
            </p>
          </div>

          {/* Velocity */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Initial Velocity (v):</span>
              <span className="font-mono text-cyan-400">{velocity} m/s</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="2"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Magnetic Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Magnetic Flux Density (B):</span>
              <span className="font-mono text-emerald-400">{bField.toFixed(1)} T</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={bField}
              onChange={(e) => setBField(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Electric Field (for velocity selector) */}
          {mode === 'velocity_selector' && (
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Electric Field Strength (E):</span>
                <span className="font-mono text-rose-400">{eField} V/m</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={eField}
                onChange={(e) => setEField(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          )}

          {/* Particle Mass */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Particle Relative Mass (m):</span>
              <span className="font-mono text-slate-200">{particleMass.toFixed(1)} u</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.5"
              value={particleMass}
              onChange={(e) => setParticleMass(Number(e.target.value))}
              className="w-full accent-slate-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Cambridge Mark Scheme Theory */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 leading-relaxed">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Info className="w-4 h-4" />
            <span>CIE 9702 Syllabus Derivations</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Velocity Selector Equilibrium:</span>
            <div className="text-amber-300 font-mono">
              <MathTex block math="qE = qvB \implies v = \frac{E}{B}" />
            </div>
            <p className="text-[11px] text-slate-400">
              Independent of mass and charge! Only particles with exact speed <MathTex math="v = E/B" /> pass straight through.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Circular Orbit in Magnetic Field:</span>
            <div className="text-emerald-300 font-mono">
              <MathTex block math="F_B = \frac{mv^2}{r} \implies r = \frac{mv}{Bq}" />
            </div>
            <p className="text-[11px] text-slate-400">
              The magnetic force <MathTex math="q(\vec{v} \times \vec{B})" /> acts at 90° to velocity, doing NO work and causing centripetal acceleration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
