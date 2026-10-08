import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { MathTex } from '../MathTex';

export const PendulumSimulation: React.FC = () => {
  const [length, setLength] = useState<number>(1.5); // meters
  const [mass, setMass] = useState<number>(1.0); // kg
  const [gravity, setGravity] = useState<number>(9.81); // m/s^2
  const [damping, setDamping] = useState<number>(0.05); // air resistance / friction
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showPhaseSpace, setShowPhaseSpace] = useState<boolean>(true);

  // State of pendulum: theta (radians), omega (angular velocity rad/s)
  const [theta, setTheta] = useState<number>(Math.PI / 4); // 45 degrees
  const [omega, setOmega] = useState<number>(0);

  const stateRef = useRef({ theta: Math.PI / 4, omega: 0 });
  const phaseHistoryRef = useRef<{ theta: number; omega: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Theoretical small-angle period
  const smallAnglePeriod = 2 * Math.PI * Math.sqrt(length / gravity);

  // Energy calculations
  const h = length * (1 - Math.cos(stateRef.current.theta));
  const pe = mass * gravity * h;
  const v = length * stateRef.current.omega;
  const ke = 0.5 * mass * v * v;
  const totalE = pe + ke;

  // Reset
  const handleReset = useCallback(() => {
    stateRef.current = { theta: Math.PI / 4, omega: 0 };
    setTheta(Math.PI / 4);
    setOmega(0);
    phaseHistoryRef.current = [];
  }, []);

  // Update physics with RK4 integration for stability
  const stepPhysics = useCallback(
    (dt: number) => {
      if (isDraggingRef.current) return;

      const f = (th: number, om: number) => {
        const dTheta = om;
        const dOmega = -(gravity / length) * Math.sin(th) - damping * om;
        return { dTheta, dOmega };
      };

      const curTh = stateRef.current.theta;
      const curOm = stateRef.current.omega;

      const k1 = f(curTh, curOm);
      const k2 = f(curTh + 0.5 * dt * k1.dTheta, curOm + 0.5 * dt * k1.dOmega);
      const k3 = f(curTh + 0.5 * dt * k2.dTheta, curOm + 0.5 * dt * k2.dOmega);
      const k4 = f(curTh + dt * k3.dTheta, curOm + dt * k3.dOmega);

      const nextTheta =
        curTh + (dt / 6) * (k1.dTheta + 2 * k2.dTheta + 2 * k3.dTheta + k4.dTheta);
      const nextOmega =
        curOm + (dt / 6) * (k1.dOmega + 2 * k2.dOmega + 2 * k3.dOmega + k4.dOmega);

      stateRef.current = { theta: nextTheta, omega: nextOmega };
      setTheta(nextTheta);
      setOmega(nextOmega);

      // Record phase space
      phaseHistoryRef.current.push({ theta: nextTheta, omega: nextOmega });
      if (phaseHistoryRef.current.length > 300) {
        phaseHistoryRef.current.shift();
      }
    },
    [damping, gravity, length]
  );

  // Animation Loop
  useEffect(() => {
    let animId: number;
    let lastTime: number = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (isPlaying) {
        stepPhysics(dt);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, stepPhysics]);

  // Main Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, w, h);

    const pivotX = w / 2;
    const pivotY = 50;
    const pxScale = 120; // pixels per meter
    const bobX = pivotX + length * pxScale * Math.sin(theta);
    const bobY = pivotY + length * pxScale * Math.cos(theta);

    // Draw reference dashed vertical
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + length * pxScale + 30);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw angle arc
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const arcRadius = 45;
    if (theta >= 0) {
      ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - theta, true);
    } else {
      ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - theta, false);
    }
    ctx.stroke();

    // String
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Pivot mount
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Bob
    const bobRadius = 10 + mass * 4;
    const gradient = ctx.createRadialGradient(
      bobX - 4,
      bobY - 4,
      2,
      bobX,
      bobY,
      bobRadius
    );
    gradient.addColorStop(0, '#38bdf8');
    gradient.addColorStop(1, '#0284c7');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Vectors
    if (showVectors) {
      // Velocity vector (tangential)
      const vTang = length * omega;
      const vScale = 14;
      const vx = vTang * Math.cos(theta);
      const vy = -vTang * Math.sin(theta);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bobX, bobY);
      ctx.lineTo(bobX + vx * vScale, bobY + vy * vScale);
      ctx.stroke();

      // Gravity force vector (downward)
      const fgScale = 6;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bobX, bobY);
      ctx.lineTo(bobX, bobY + mass * gravity * fgScale);
      ctx.stroke();
    }
  }, [theta, omega, length, mass, gravity, showVectors]);

  // Phase Space Canvas render
  useEffect(() => {
    if (!showPhaseSpace) return;
    const canvas = phaseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, w, h);

    const midX = w / 2;
    const midY = h / 2;

    // Crosshairs
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, h);
    ctx.stroke();

    // Trace phase portrait
    const scaleTh = w / (Math.PI * 2);
    const scaleOm = h / 12;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    phaseHistoryRef.current.forEach((pt, i) => {
      const cx = midX + pt.theta * scaleTh;
      const cy = midY - pt.omega * scaleOm;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    // Current point
    const curX = midX + stateRef.current.theta * scaleTh;
    const curY = midY - stateRef.current.omega * scaleOm;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(curX, curY, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [theta, omega, showPhaseSpace]);

  // Interactive Drag on Bob
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pivotX = canvas.width / 2;
    const pivotY = 50;
    const dx = x - pivotX;
    const dy = y - pivotY;

    if (dy > 0) {
      isDraggingRef.current = true;
      const newTheta = Math.atan2(dx, dy);
      stateRef.current = { theta: newTheta, omega: 0 };
      setTheta(newTheta);
      setOmega(0);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pivotX = canvas.width / 2;
    const pivotY = 50;
    const dx = x - pivotX;
    const dy = y - pivotY;

    if (dy > 0) {
      const newTheta = Math.atan2(dx, dy);
      stateRef.current = { theta: newTheta, omega: 0 };
      setTheta(newTheta);
      setOmega(0);
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Sandbox Stage (65% width) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="relative rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-200">Harmonic Motion & Phase Space Canvas</span>
              <span aria-hidden="true">·</span>
              <span>Drag bob to set angle</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVectors(!showVectors)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  showVectors ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vectors
              </button>
              <button
                onClick={() => setShowPhaseSpace(!showPhaseSpace)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  showPhaseSpace ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                Phase Space
              </button>
            </div>
          </div>

          {/* Dual Canvas Layout or Single */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-950">
            {/* Main Pendulum Canvas */}
            <div className={`${showPhaseSpace ? 'md:col-span-8' : 'md:col-span-12'} relative aspect-[4/3] max-h-[380px]`}>
              <canvas
                ref={canvasRef}
                width={500}
                height={380}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
              />
            </div>

            {/* Phase Space Portrait Canvas */}
            {showPhaseSpace && (
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
                <div className="p-2 text-[11px] text-slate-400 border-b border-slate-800/80 bg-slate-900/40">
                  Phase Portrait (<MathTex math="\theta \text{ vs } \omega" />)
                </div>
                <div className="relative flex-1 aspect-square md:aspect-auto">
                  <canvas
                    ref={phaseCanvasRef}
                    width={250}
                    height={250}
                    className="w-full h-full block"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Real-time Conservation of Energy Stack Bar */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Energy Conservation Balance</span>
              <span className="font-mono text-cyan-400 tabular-nums">
                Total E: {totalE.toFixed(2)} J
              </span>
            </div>
            {/* Visual Energy Bar */}
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              <div
                style={{ width: `${totalE > 0 ? (pe / totalE) * 100 : 0}%` }}
                className="bg-amber-500 transition-all duration-75"
                title={`Potential Energy: ${pe.toFixed(2)} J`}
              />
              <div
                style={{ width: `${totalE > 0 ? (ke / totalE) * 100 : 0}%` }}
                className="bg-emerald-500 transition-all duration-75"
                title={`Kinetic Energy: ${ke.toFixed(2)} J`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Potential (<MathTex math="PE = mgh" />): {pe.toFixed(2)} J</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Kinetic (<MathTex math="KE = \frac{1}{2}mv^2" />): {ke.toFixed(2)} J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset (45°)</span>
          </button>
          <div className="text-xs text-slate-400 ml-auto">
            Small-angle period: <span className="font-mono text-cyan-400">{smallAnglePeriod.toFixed(2)}s</span>
          </div>
        </div>
      </div>

      {/* Zone 2: Control & Concept Deck */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white tracking-tight">Oscillation Parameters</h2>

          {/* Length */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">String Length (<MathTex math="L" />)</span>
              <span className="font-mono text-cyan-400 tabular-nums">{length.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Mass */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Bob Mass (<MathTex math="m" />)</span>
              <span className="font-mono text-emerald-400 tabular-nums">{mass.toFixed(1)} kg</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Damping / Air Friction */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Damping Factor (<MathTex math="\gamma" />)</span>
              <span className="font-mono text-amber-400 tabular-nums">{damping.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.2"
              step="0.005"
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Gravity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Gravity (<MathTex math="g" />)</span>
              <span className="font-mono text-slate-200 tabular-nums">{gravity.toFixed(2)} m/s²</span>
            </div>
            <input
              type="range"
              min="1.6"
              max="25"
              step="0.1"
              value={gravity}
              onChange={(e) => setGravity(Number(e.target.value))}
              className="w-full accent-slate-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Theoretical Concept Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-xs leading-relaxed">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Non-Linear Pendulum Mechanics</span>
          </div>
          <p className="text-slate-300">
            For small amplitudes, <MathTex math="\sin\theta \approx \theta" /> produces simple harmonic motion with period <MathTex math="T = 2\pi\sqrt{L/g}" />. At larger angles, restoring force non-linearities prolong the period.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="text-slate-400">Governing Differential Equation:</div>
            <div className="text-cyan-300">
              <MathTex block math="\frac{d^2\theta}{dt^2} + \gamma \frac{d\theta}{dt} + \frac{g}{L}\sin\theta = 0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
