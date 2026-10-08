import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { MathTex } from '../MathTex';
import { drawExaggeratedVector } from '../../utils/canvasVector';

export const CircularMotionBanking: React.FC = () => {
  const [bankAngle, setBankAngle] = useState<number>(30); // degrees
  const [radius, setRadius] = useState<number>(50); // meters
  const [mass, setMass] = useState<number>(1000); // kg
  const [gravity, setGravity] = useState<number>(9.81); // m/s^2
  const [vectorScale, setVectorScale] = useState<number>(2.5); // vector exaggeration boost
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Rotation phase angle for circular motion
  const [phi, setPhi] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ideal design speed without friction: v = sqrt(r * g * tan(theta))
  const thetaRad = (bankAngle * Math.PI) / 180;
  const designSpeed = Math.sqrt(radius * gravity * Math.tan(thetaRad));

  // Normal reaction magnitude: N = mg / cos(theta)
  const normalForce = (mass * gravity) / (Math.cos(thetaRad) || 0.001);
  const centripetalForce = normalForce * Math.sin(thetaRad); // N sin(theta) = m v^2 / r

  // Animation of circular revolution
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.03);
      lastTime = time;

      // Angular velocity omega = v / r
      const omega = (designSpeed / radius) * simSpeed;
      setPhi((p) => (p + omega * dt) % (Math.PI * 2));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [designSpeed, isPlaying, radius, simSpeed]);

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

    // Split Canvas into two views:
    // Left: 3D/Top Orbit perspective (Horizontal circle)
    // Right: Cross-Sectional Free-Body Diagram on Banked Ramp

    const midX = w * 0.48;

    // Divider line
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(midX, 20);
    ctx.lineTo(midX, h - 20);
    ctx.stroke();

    // ==========================================
    // LEFT VIEW: Orbit Perspective
    // ==========================================
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px ui-sans-serif';
    ctx.fillText('Horizontal Circular Orbit Perspective', 30, 35);

    const orbitCenterX = midX / 2;
    const orbitCenterY = h / 2;
    const ellipseRx = 130;
    const ellipseRy = 55; // tilted perspective

    // Elliptical track
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(orbitCenterX, orbitCenterY, ellipseRx, ellipseRy, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Center pivot
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(orbitCenterX, orbitCenterY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Position of car/mass in orbit
    const carOrbitX = orbitCenterX + ellipseRx * Math.cos(phi);
    const carOrbitY = orbitCenterY + ellipseRy * Math.sin(phi);

    // Radial dashed line to center
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(orbitCenterX, orbitCenterY);
    ctx.lineTo(carOrbitX, carOrbitY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Vehicle/Mass on orbit
    ctx.save();
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(carOrbitX, carOrbitY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Tangential Velocity Vector v on orbit
    const tanVx = -Math.sin(phi) * 45 * (vectorScale * 0.6);
    const tanVy = (Math.cos(phi) * 20 * (vectorScale * 0.6));
    drawExaggeratedVector(
      ctx,
      carOrbitX,
      carOrbitY,
      carOrbitX + tanVx,
      carOrbitY + tanVy,
      {
        color: '#06b6d4',
        lineWidth: 3.5,
        headLength: 12,
        label: `v = ${designSpeed.toFixed(1)} m/s`,
        glow: true,
      }
    );

    // Inward Centripetal Force Vector on orbit
    const radFx = (orbitCenterX - carOrbitX) * 0.4 * (vectorScale * 0.5);
    const radFy = (orbitCenterY - carOrbitY) * 0.4 * (vectorScale * 0.5);
    drawExaggeratedVector(
      ctx,
      carOrbitX,
      carOrbitY,
      carOrbitX + radFx,
      carOrbitY + radFy,
      {
        color: '#10b981',
        lineWidth: 3.5,
        headLength: 12,
        label: `Fc = mv²/r`,
        glow: true,
      }
    );

    // ==========================================
    // RIGHT VIEW: Cross-Sectional Free-Body Diagram
    // ==========================================
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px ui-sans-serif';
    ctx.fillText('Banked Track Cross-Section & Free-Body Forces', midX + 30, 35);

    const rampBaseX = midX + 60;
    const rampBaseY = 360;
    const rampW = 280;
    const rampH = rampW * Math.tan(thetaRad);

    // Draw Banked Wedge Track
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rampBaseX, rampBaseY);
    ctx.lineTo(rampBaseX + rampW, rampBaseY);
    ctx.lineTo(rampBaseX + rampW, rampBaseY - rampH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Bank angle arc (theta)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rampBaseX, rampBaseY, 45, 0, -thetaRad, true);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px ui-sans-serif';
    ctx.fillText(`θ = ${bankAngle}°`, rampBaseX + 55, rampBaseY - 12);

    // Car/Mass block on ramp
    const rampMidDist = 0.55;
    const blockX = rampBaseX + rampW * rampMidDist;
    const blockY = rampBaseY - rampH * rampMidDist;

    ctx.save();
    ctx.translate(blockX, blockY);
    ctx.rotate(-thetaRad);

    // Block
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 2;
    ctx.fillRect(-22, -24, 44, 24);
    ctx.strokeRect(-22, -24, 44, 24);
    ctx.restore();

    // ==============================================================
    // DRAW EXAGGERATED RESOLVED FORCES AT BLOCK CENTER (blockX, blockY - 10)
    // ==============================================================
    const fCenterY = blockY - 10;

    // 1. Weight Vector W = mg (Straight Down, Amber)
    const mgLen = Math.min(140, Math.max(40, 35 * vectorScale));
    drawExaggeratedVector(
      ctx,
      blockX,
      fCenterY,
      blockX,
      fCenterY + mgLen,
      {
        color: '#f59e0b',
        lineWidth: 4.5,
        headLength: 16,
        label: `W = mg`,
        labelOffset: { x: 8, y: 15 },
        glow: true,
      }
    );

    // 2. Normal Contact Force N (Perpendicular to ramp surface, Glowing Cyan)
    const nMag = mgLen / Math.cos(thetaRad);
    const nDirX = -Math.sin(thetaRad);
    const nDirY = -Math.cos(thetaRad);
    drawExaggeratedVector(
      ctx,
      blockX,
      fCenterY,
      blockX + nDirX * nMag,
      fCenterY + nDirY * nMag,
      {
        color: '#06b6d4',
        lineWidth: 4.5,
        headLength: 16,
        label: `N (Normal)`,
        labelOffset: { x: -30, y: -15 },
        glow: true,
      }
    );

    // 3. Vertical Component of Normal Force: N cos(theta) (balances mg, dashed cyan)
    drawExaggeratedVector(
      ctx,
      blockX,
      fCenterY,
      blockX,
      fCenterY - mgLen,
      {
        color: '#06b6d4',
        lineWidth: 3,
        headLength: 12,
        label: `N cosθ = mg`,
        labelOffset: { x: 8, y: -10 },
        dashed: true,
        glow: false,
      }
    );

    // 4. Horizontal Component of Normal Force: N sin(theta) = Centripetal Force (Glowing Emerald, pointing LEFT to center of curvature)
    const fcLen = mgLen * Math.tan(thetaRad);
    drawExaggeratedVector(
      ctx,
      blockX,
      fCenterY,
      blockX - fcLen,
      fCenterY,
      {
        color: '#10b981',
        lineWidth: 4.5,
        headLength: 16,
        label: `Fc = N sinθ = mv²/r`,
        labelOffset: { x: -80, y: -10 },
        glow: true,
      }
    );
  }, [bankAngle, designSpeed, mass, phi, radius, thetaRad, vectorScale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Canvas Stage */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Banked Curve &amp; Free-Body Vectors</span>
              <span aria-hidden="true">·</span>
              <span>CIE 9702 Circular Motion: <MathTex math="N\sin\theta = \frac{mv^2}{r}" /></span>
            </div>
            <div className="text-xs font-mono text-cyan-400">
              Design Speed: {designSpeed.toFixed(1)} m/s ({(designSpeed * 3.6).toFixed(0)} km/h)
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas ref={canvasRef} width={800} height={450} className="w-full h-full block" />
          </div>

          {/* Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Bank Angle (θ)</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">{bankAngle}°</div>
            </div>
            <div>
              <div className="text-slate-400">Weight (W = mg)</div>
              <div className="font-mono text-sm text-amber-400 tabular-nums">
                {(mass * gravity).toFixed(0)} N
              </div>
            </div>
            <div>
              <div className="text-slate-400">Normal Force (N)</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">
                {normalForce.toFixed(0)} N
              </div>
            </div>
            <div>
              <div className="text-slate-400">Centripetal Force (N sinθ)</div>
              <div className="font-mono text-sm text-emerald-400 tabular-nums">
                {centripetalForce.toFixed(0)} N
              </div>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/60">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={() => setPhi(0)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Position</span>
          </button>
        </div>
      </div>

      {/* Zone 2: Controls Deck */}
      <div className="lg:col-span-4 flex flex-col gap-4 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">Parameters &amp; Vectors</h3>

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
              Magnifies normal force <MathTex math="\vec{N}" />, weight <MathTex math="m\vec{g}" />, and centripetal force <MathTex math="\vec{F}_c" />.
            </p>
          </div>

          {/* Bank Angle */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Bank Angle (θ):</span>
              <span className="font-mono text-cyan-400">{bankAngle}°</span>
            </div>
            <input
              type="range"
              min="10"
              max="65"
              step="1"
              value={bankAngle}
              onChange={(e) => setBankAngle(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Curve Radius */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Curve Radius (r):</span>
              <span className="font-mono text-emerald-400">{radius} m</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Vehicle Mass */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Vehicle Mass (m):</span>
              <span className="font-mono text-amber-400">{mass} kg</span>
            </div>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Cambridge Theory Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 leading-relaxed">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Info className="w-4 h-4" />
            <span>CIE 9702 Exam Derivation (Topic 12)</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Resolving Vertically (Equilibrium):</span>
            <div className="text-cyan-300 font-mono">
              <MathTex block math="N \cos\theta = mg \implies N = \frac{mg}{\cos\theta}" />
            </div>
            <span className="text-slate-400 pt-1 block">Resolving Horizontally (Centripetal Force):</span>
            <div className="text-emerald-300 font-mono">
              <MathTex block math="N \sin\theta = \frac{m v^2}{r}" />
            </div>
            <span className="text-slate-400 pt-1 block">Dividing both equations (Frictionless Speed):</span>
            <div className="text-amber-300 font-mono">
              <MathTex block math="\tan\theta = \frac{v^2}{rg} \implies v = \sqrt{rg\tan\theta}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
