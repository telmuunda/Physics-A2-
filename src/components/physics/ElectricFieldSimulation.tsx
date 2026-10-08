import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Plus, Minus, Trash2 } from 'lucide-react';
import { MathTex } from '../MathTex';
import { drawExaggeratedVector } from '../../utils/canvasVector';

interface PointCharge {
  id: string;
  x: number; // canvas coordinates
  y: number;
  q: number; // in microCoulombs (e.g. +2 or -2)
}

interface TestParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  q: number; // +1 for proton, -1 for electron
  trail: { x: number; y: number }[];
}

export const ElectricFieldSimulation: React.FC = () => {
  const [charges, setCharges] = useState<PointCharge[]>([
    { id: 'c1', x: 260, y: 220, q: 2 },
    { id: 'c2', x: 540, y: 220, q: -2 },
  ]);
  const [showFieldVectors, setShowFieldVectors] = useState<boolean>(true);
  const [vectorScale, setVectorScale] = useState<number>(2.0); // Vector exaggeration boost
  const [showPotential, setShowPotential] = useState<boolean>(false);
  const [selectedChargeType, setSelectedChargeType] = useState<number>(2); // +2 uC default to add

  const [testParticles, setTestParticles] = useState<TestParticle[]>([]);
  const [isSimulatingParticles, setIsSimulatingParticles] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const draggedChargeIdRef = useRef<string | null>(null);

  // Clear all
  const handleClear = () => {
    setCharges([]);
    setTestParticles([]);
  };

  // Reset to electric dipole preset
  const handleResetDipole = () => {
    setCharges([
      { id: 'c1', x: 260, y: 220, q: 2 },
      { id: 'c2', x: 540, y: 220, q: -2 },
    ]);
    setTestParticles([]);
  };

  // Reset to quadrapole preset
  const handleResetQuadrupole = () => {
    setCharges([
      { id: 'c1', x: 300, y: 150, q: 2 },
      { id: 'c2', x: 500, y: 150, q: -2 },
      { id: 'c3', x: 300, y: 290, q: -2 },
      { id: 'c4', x: 500, y: 290, q: 2 },
    ]);
    setTestParticles([]);
  };

  // Launch test particle
  const handleSpawnTestCharge = (qSign: number) => {
    setTestParticles((prev) => [
      ...prev,
      {
        x: 400,
        y: 100,
        vx: (Math.random() - 0.5) * 40,
        vy: 20,
        q: qSign,
        trail: [{ x: 400, y: 100 }],
      },
    ]);
  };

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if clicked an existing charge
    const clicked = charges.find(
      (c) => Math.hypot(c.x - x, c.y - y) < 22
    );

    if (clicked) {
      draggedChargeIdRef.current = clicked.id;
    } else {
      // Place a new charge if space is available
      const newCharge: PointCharge = {
        id: `charge_${Date.now()}`,
        x,
        y,
        q: selectedChargeType,
      };
      setCharges((prev) => [...prev, newCharge]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggedChargeIdRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCharges((prev) =>
      prev.map((c) =>
        c.id === draggedChargeIdRef.current ? { ...c, x, y } : c
      )
    );
  };

  const handlePointerUp = () => {
    draggedChargeIdRef.current = null;
  };

  // Physics animation loop for test charges
  useEffect(() => {
    if (!isSimulatingParticles || testParticles.length === 0) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      setTestParticles((particles) =>
        particles
          .map((p) => {
            let Ex = 0;
            let Ey = 0;
            const k = 4000; // electrostatic scale factor

            for (const c of charges) {
              const dx = p.x - c.x;
              const dy = p.y - c.y;
              const rSq = dx * dx + dy * dy;
              const r = Math.sqrt(rSq);
              if (r < 12) continue; // collision threshold
              const force = (k * c.q) / (rSq * r);
              Ex += force * dx;
              Ey += force * dy;
            }

            // Acceleration a = q * E / m
            const ax = p.q * Ex;
            const ay = p.q * Ey;

            const nVx = p.vx + ax * dt;
            const nVy = p.vy + ay * dt;
            const nX = p.x + nVx * dt;
            const nY = p.y + nVy * dt;

            const newTrail = [...p.trail, { x: nX, y: nY }];
            if (newTrail.length > 80) newTrail.shift();

            return {
              ...p,
              x: nX,
              y: nY,
              vx: nVx,
              vy: nVy,
              trail: newTrail,
            };
          })
          .filter(
            (p) =>
              p.x > -50 &&
              p.x < 850 &&
              p.y > -50 &&
              p.y < 500 &&
              !charges.some((c) => Math.hypot(c.x - p.x, c.y - p.y) < 14)
          )
      );

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [charges, isSimulatingParticles, testParticles.length]);

  // Main Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, w, h);

    const kConstant = 8000;

    // Field vectors grid
    if (showFieldVectors && charges.length > 0) {
      const spacing = 32;
      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          let Ex = 0;
          let Ey = 0;

          let tooClose = false;
          for (const c of charges) {
            const dx = x - c.x;
            const dy = y - c.y;
            const rSq = dx * dx + dy * dy;
            const r = Math.sqrt(rSq);
            if (r < 18) {
              tooClose = true;
              break;
            }
            const fieldMag = (kConstant * c.q) / (rSq * r);
            Ex += fieldMag * dx;
            Ey += fieldMag * dy;
          }

          if (tooClose) continue;

          const totalE = Math.hypot(Ex, Ey);
          if (totalE < 0.001) continue;

          const arrowLen = Math.min(26, Math.max(8, Math.log(totalE + 1) * 4.5 * (vectorScale * 0.7)));
          const dirX = Ex / totalE;
          const dirY = Ey / totalE;

          const opacity = Math.min(0.95, Math.max(0.3, totalE / 35));
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 2.2;

          ctx.beginPath();
          ctx.moveTo(x - (dirX * arrowLen) / 2, y - (dirY * arrowLen) / 2);
          ctx.lineTo(x + (dirX * arrowLen) / 2, y + (dirY * arrowLen) / 2);
          ctx.stroke();

          // Arrow head
          const headX = x + (dirX * arrowLen) / 2;
          const headY = y + (dirY * arrowLen) / 2;
          const angle = Math.atan2(dirY, dirX);
          ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(
            headX - 6 * Math.cos(angle - Math.PI / 6),
            headY - 6 * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            headX - 6 * Math.cos(angle + Math.PI / 6),
            headY - 6 * Math.sin(angle + Math.PI / 6)
          );
          ctx.fill();
        }
      }
    }

    // Test particle trails & heads + Exaggerated Vectors
    testParticles.forEach((p) => {
      if (p.trail.length > 1) {
        ctx.strokeStyle = p.q > 0 ? 'rgba(239, 68, 68, 0.6)' : 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        p.trail.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      ctx.fillStyle = p.q > 0 ? '#ef4444' : '#10b981';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Velocity Vector on test particle
      const vMag = Math.hypot(p.vx, p.vy);
      if (vMag > 5) {
        const vLen = Math.min(50, Math.max(15, vMag * 0.4 * vectorScale));
        drawExaggeratedVector(ctx, p.x, p.y, p.x + (p.vx / vMag) * vLen, p.y + (p.vy / vMag) * vLen, {
          color: '#06b6d4',
          lineWidth: 3.5,
          headLength: 12,
          label: 'v',
          glow: true,
        });
      }
    });

    // Draw Source Charges
    charges.forEach((c) => {
      const isPos = c.q > 0;
      const radius = 16;

      const grad = ctx.createRadialGradient(
        c.x - 3,
        c.y - 3,
        2,
        c.x,
        c.y,
        radius
      );
      if (isPos) {
        grad.addColorStop(0, '#f87171');
        grad.addColorStop(1, '#dc2626');
      } else {
        grad.addColorStop(0, '#60a5fa');
        grad.addColorStop(1, '#2563eb');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isPos ? '#fca5a5' : '#93c5fd';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sign symbol (+ or -)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isPos ? `+${c.q}` : `${c.q}`, c.x, c.y);
    });
  }, [charges, showFieldVectors, showPotential, testParticles, vectorScale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Sandbox Stage */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-200">Coulomb's Law & Vector Field Canvas</span>
              <span aria-hidden="true">·</span>
              <span>Click to add charge or drag existing</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFieldVectors(!showFieldVectors)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  showFieldVectors
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                E-Field Vectors
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full block cursor-crosshair touch-none"
            />
          </div>

          {/* Test Particle Launchers Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Launch Test Particle:</span>
              <button
                onClick={() => handleSpawnTestCharge(1)}
                className="px-2.5 py-1 rounded bg-red-950/80 text-red-300 border border-red-800/80 hover:bg-red-900 transition-colors"
              >
                +q Proton
              </button>
              <button
                onClick={() => handleSpawnTestCharge(-1)}
                className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition-colors"
              >
                -q Electron
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetDipole}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Dipole Preset
              </button>
              <button
                onClick={handleResetQuadrupole}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Quadrupole Preset
              </button>
              <button
                onClick={handleClear}
                className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 2: Control & Concept Deck */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white tracking-tight">Placement Tool & Vectors</h2>

          {/* Vector Exaggeration Slider */}
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs">
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
              Magnifies field line arrowheads and particle velocity vector lines.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <label className="text-slate-300">New Charge to Place on Click:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedChargeType(2)}
                className={`flex items-center justify-center gap-1.5 p-2 rounded border transition-colors ${
                  selectedChargeType > 0
                    ? 'border-red-600 bg-red-950/60 text-red-200'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Positive (+2 µC)</span>
              </button>
              <button
                onClick={() => setSelectedChargeType(-2)}
                className={`flex items-center justify-center gap-1.5 p-2 rounded border transition-colors ${
                  selectedChargeType < 0
                    ? 'border-blue-600 bg-blue-950/60 text-blue-200'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Negative (-2 µC)</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <div className="text-slate-400">Coulomb's Law (Electric Field):</div>
            <div className="text-cyan-300">
              <MathTex block math="\vec{E} = \frac{1}{4\pi\varepsilon_0}\sum_{i} \frac{q_i}{r_i^2}\hat{r}_i" />
            </div>
            <p className="text-slate-300 text-[11px] pt-1">
              Field vectors always originate outwards from positive source charges and terminate inwards upon negative charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
