import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, FastForward, Info, Layers, Compass } from 'lucide-react';
import { MathTex } from '../MathTex';

interface PlanetGravity {
  name: string;
  g: number;
}

const GRAVITY_PRESETS: PlanetGravity[] = [
  { name: 'Earth (9.81 m/s²)', g: 9.81 },
  { name: 'Moon (1.62 m/s²)', g: 1.62 },
  { name: 'Mars (3.72 m/s²)', g: 3.72 },
  { name: 'Jupiter (24.79 m/s²)', g: 24.79 },
];

export const ProjectileMotion: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(30); // m/s
  const [angle, setAngle] = useState<number>(45); // degrees
  const [height, setHeight] = useState<number>(0); // m
  const [gravity, setGravity] = useState<number>(9.81);
  const [airDrag, setAirDrag] = useState<number>(0); // drag coefficient
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showTrail, setShowTrail] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 0.25x, 0.5x, 1x

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simTime, setSimTime] = useState<number>(0);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number; vx: number; vy: number }>({
    x: 0,
    y: 0,
    vx: 30 * Math.cos((45 * Math.PI) / 180),
    vy: 30 * Math.sin((45 * Math.PI) / 180),
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Trajectory history for trail
  const trajectoryPointsRef = useRef<{ x: number; y: number }[]>([]);

  // Theoretical calculations (ideal vacuum)
  const rad = (angle * Math.PI) / 180;
  const v0x = velocity * Math.cos(rad);
  const v0y = velocity * Math.sin(rad);

  const timeToApex = v0y / gravity;
  const maxApexHeight = height + (v0y * v0y) / (2 * gravity);
  const totalFlightTime =
    (v0y + Math.sqrt(v0y * v0y + 2 * gravity * height)) / gravity;
  const totalRange = v0x * totalFlightTime;

  // Reset simulation
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setSimTime(0);
    const r = (angle * Math.PI) / 180;
    const initVx = velocity * Math.cos(r);
    const initVy = velocity * Math.sin(r);
    setCurrentPos({ x: 0, y: height, vx: initVx, vy: initVy });
    trajectoryPointsRef.current = [{ x: 0, y: height }];
  }, [angle, height, velocity]);

  // When initial params change while stopped, update starting position
  useEffect(() => {
    if (!isPlaying && simTime === 0) {
      handleReset();
    }
  }, [velocity, angle, height, gravity, airDrag, isPlaying, simTime, handleReset]);

  // Simulation step
  const updatePhysics = useCallback(
    (dt: number) => {
      setCurrentPos((prev) => {
        if (prev.y < 0 && simTime > 0) {
          setIsPlaying(false);
          return { ...prev, y: 0 };
        }

        const v = Math.hypot(prev.vx, prev.vy);
        const dragX = -airDrag * v * prev.vx;
        const dragY = -gravity - airDrag * v * prev.vy;

        const nextVx = prev.vx + dragX * dt;
        const nextVy = prev.vy + dragY * dt;
        const nextX = prev.x + nextVx * dt;
        const nextY = Math.max(0, prev.y + nextVy * dt);

        if (nextY <= 0 && prev.y > 0) {
          setIsPlaying(false);
          trajectoryPointsRef.current.push({ x: nextX, y: 0 });
          return { x: nextX, y: 0, vx: nextVx, vy: 0 };
        }

        trajectoryPointsRef.current.push({ x: nextX, y: nextY });
        return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
      });

      setSimTime((t) => t + dt);
    },
    [airDrag, gravity, simTime]
  );

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const rawDt = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      // Cap dt to prevent physics exploding on lag spikes
      const dt = Math.min(rawDt, 0.05) * simSpeed;
      updatePhysics(dt);

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, simSpeed, updatePhysics]);

  // Step 1 frame
  const handleStepForward = () => {
    if (!isPlaying) {
      updatePhysics(0.04);
    }
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const heightPx = canvas.height;

    // Determine scale dynamically so the full trajectory fits comfortably
    const expectedMaxX = Math.max(80, totalRange * 1.25, currentPos.x * 1.15);
    const expectedMaxY = Math.max(30, maxApexHeight * 1.35, currentPos.y * 1.2);

    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 30;
    const paddingRight = 30;

    const plotW = width - paddingLeft - paddingRight;
    const plotH = heightPx - paddingBottom - paddingTop;

    const scaleX = plotW / expectedMaxX;
    const scaleY = plotH / expectedMaxY;
    const scale = Math.min(scaleX, scaleY);

    const toCanvasX = (worldX: number) => paddingLeft + worldX * scale;
    const toCanvasY = (worldY: number) => heightPx - paddingBottom - worldY * scale;

    // Clear background
    ctx.fillStyle = '#090e1a';
    ctx.fillRect(0, 0, width, heightPx);

    // Draw Grid Lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();

    // Horizontal grid lines
    const yStep = Math.max(5, Math.pow(10, Math.floor(Math.log10(expectedMaxY))) / 2);
    for (let gy = 0; gy <= expectedMaxY; gy += yStep) {
      const cy = toCanvasY(gy);
      ctx.moveTo(paddingLeft, cy);
      ctx.lineTo(width - paddingRight, cy);
    }

    // Vertical grid lines
    const xStep = Math.max(10, Math.pow(10, Math.floor(Math.log10(expectedMaxX))) / 2);
    for (let gx = 0; gx <= expectedMaxX; gx += xStep) {
      const cx = toCanvasX(gx);
      ctx.moveTo(cx, paddingTop);
      ctx.lineTo(cx, heightPx - paddingBottom);
    }
    ctx.stroke();

    // Axes labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'right';
    for (let gy = 0; gy <= expectedMaxY; gy += yStep) {
      ctx.fillText(`${gy}m`, paddingLeft - 8, toCanvasY(gy) + 4);
    }
    ctx.textAlign = 'center';
    for (let gx = 0; gx <= expectedMaxX; gx += xStep) {
      ctx.fillText(`${gx}m`, toCanvasX(gx), heightPx - paddingBottom + 18);
    }

    // Ground Baseline
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, toCanvasY(0));
    ctx.lineTo(width - paddingRight, toCanvasY(0));
    ctx.stroke();

    // Theoretical Vacuum Trajectory Curve (dotted)
    ctx.strokeStyle = '#0284c7';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * totalFlightTime;
      const x = v0x * t;
      const y = height + v0y * t - 0.5 * gravity * t * t;
      if (y < 0) break;
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Actual Simulated Trail
    if (showTrail && trajectoryPointsRef.current.length > 1) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      trajectoryPointsRef.current.forEach((pt, index) => {
        const cx = toCanvasX(pt.x);
        const cy = toCanvasY(pt.y);
        if (index === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();
    }

    // Launch Cannon / Platform
    const cannonBaseX = toCanvasX(0);
    const cannonBaseY = toCanvasY(height);
    ctx.save();
    ctx.translate(cannonBaseX, cannonBaseY);
    ctx.rotate(-rad);
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, -6, 28, 12);
    ctx.restore();

    // Cannon pivot circle
    ctx.beginPath();
    ctx.arc(cannonBaseX, cannonBaseY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#0284c7';
    ctx.fill();

    // Current Projectile Position
    const curX = toCanvasX(currentPos.x);
    const curY = toCanvasY(currentPos.y);

    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Velocity Vectors
    if (showVectors && (currentPos.vx !== 0 || currentPos.vy !== 0)) {
      const vecScale = 1.2;
      // Resultant velocity vector (Orange)
      const endVx = curX + currentPos.vx * vecScale;
      const endVy = curY - currentPos.vy * vecScale;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(endVx, endVy);
      ctx.stroke();

      // vx component (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(endVx, curY);
      ctx.stroke();

      // vy component (Emerald)
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(endVx, curY);
      ctx.lineTo(endVx, endVy);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Apex marker indicator
    const apexCanvasX = toCanvasX(v0x * timeToApex);
    const apexCanvasY = toCanvasY(maxApexHeight);
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(apexCanvasX, apexCanvasY, 3, 0, Math.PI * 2);
    ctx.fill();
  }, [
    currentPos,
    height,
    totalFlightTime,
    v0x,
    v0y,
    gravity,
    showTrail,
    showVectors,
    totalRange,
    maxApexHeight,
    rad,
    timeToApex,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Sandbox Stage (65% width) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="relative rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-200">Ballistics & Kinematics Canvas</span>
              <span aria-hidden="true">·</span>
              <span>2D Newtonian Physics</span>
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
                onClick={() => setShowTrail(!showTrail)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  showTrail ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                Trail
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative w-full aspect-[16/9] max-h-[460px] bg-slate-950">
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-full block"
            />
          </div>

          {/* Bottom Live Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Simulation Time</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">
                {simTime.toFixed(2)} s
              </div>
            </div>
            <div>
              <div className="text-slate-400">Coordinates (x, y)</div>
              <div className="font-mono text-sm text-slate-200 tabular-nums">
                ({currentPos.x.toFixed(1)}m, {currentPos.y.toFixed(1)}m)
              </div>
            </div>
            <div>
              <div className="text-slate-400">Apex Height (max H)</div>
              <div className="font-mono text-sm text-emerald-400 tabular-nums">
                {maxApexHeight.toFixed(1)} m
              </div>
            </div>
            <div>
              <div className="text-slate-400">Range (total R)</div>
              <div className="font-mono text-sm text-amber-400 tabular-nums">
                {totalRange.toFixed(1)} m
              </div>
            </div>
          </div>
        </div>

        {/* Playback Transport Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Launch / Resume'}</span>
            </button>
            <button
              onClick={handleStepForward}
              disabled={isPlaying}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs transition-colors whitespace-nowrap"
              title="Step forward 1 frame"
            >
              Step
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 mr-1">Speed:</span>
            {[0.25, 0.5, 1].map((s) => (
              <button
                key={s}
                onClick={() => setSimSpeed(s)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  simSpeed === s ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Zone 2: Control & Concept Deck (35% width) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Parameter Sliders Deck */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white tracking-tight">Kinematic Parameters</h2>

          {/* Velocity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Initial Velocity (<MathTex math="v_0" />)</span>
              <span className="font-mono text-cyan-400 tabular-nums">{velocity} m/s</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Launch Angle Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Launch Angle (<MathTex math="\theta" />)</span>
              <span className="font-mono text-amber-400 tabular-nums">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Initial Height Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Initial Height (<MathTex math="y_0" />)</span>
              <span className="font-mono text-emerald-400 tabular-nums">{height} m</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Gravity Selector */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <label className="block text-xs text-slate-300">Gravitational Acceleration (<MathTex math="g" />)</label>
            <div className="grid grid-cols-2 gap-1.5">
              {GRAVITY_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setGravity(p.g)}
                  className={`px-2 py-1.5 text-xs text-left rounded border transition-colors ${
                    Math.abs(gravity - p.g) < 0.01
                      ? 'border-cyan-600 bg-cyan-950/60 text-cyan-200'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Air Drag Resistance */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Air Drag Resistance (<MathTex math="k" />)</span>
              <span className="font-mono text-slate-300 tabular-nums">
                {airDrag === 0 ? 'Vacuum (0.00)' : airDrag.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.05"
              step="0.005"
              value={airDrag}
              onChange={(e) => setAirDrag(Number(e.target.value))}
              className="w-full accent-slate-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Concept Deck & Mathematical Equations */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-xs leading-relaxed">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Physics Principle & Derivations</span>
          </div>
          <p className="text-slate-300">
            Horizontal and vertical motions are strictly independent. The horizontal velocity is constant while the vertical velocity accelerates downward under gravity.
          </p>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="text-slate-400">Position Equations:</div>
            <div className="text-cyan-300">
              <MathTex block math="x(t) = v_0 \cos\theta \cdot t" />
            </div>
            <div className="text-cyan-300">
              <MathTex block math="y(t) = y_0 + v_0 \sin\theta \cdot t - \frac{1}{2}gt^2" />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="text-slate-400">Maximum Range (when <MathTex math="y_0 = 0" />):</div>
            <div className="text-amber-300">
              <MathTex block math="R = \frac{v_0^2 \sin(2\theta)}{g}" />
            </div>
            <p className="text-slate-400 text-[11px]">
              Maximum range occurs when <MathTex math="\sin(2\theta) = 1" />, yielding exactly <strong className="text-slate-200">45°</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
