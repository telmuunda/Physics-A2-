import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Zap } from 'lucide-react';
import { MathTex } from '../MathTex';
import { drawExaggeratedVector } from '../../utils/canvasVector';

export const LenzInductionSimulation: React.FC = () => {
  const [bField, setBField] = useState<number>(2.0); // Tesla
  const [rodLength, setRodLength] = useState<number>(0.8); // meters
  const [resistance, setResistance] = useState<number>(4.0); // Ohms
  const [pullForce, setPullForce] = useState<number>(10.0); // Newtons
  const [rodMass, setRodMass] = useState<number>(0.5); // kg
  const [vectorScale, setVectorScale] = useState<number>(2.5); // Vector exaggeration boost
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Rod state: position x (pixels), velocity v (m/s)
  const [rodPos, setRodPos] = useState<number>(180);
  const [rodVel, setRodVel] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Terminal velocity: F_pull = (B^2 L^2 v) / R  =>  v_term = (F_pull * R) / (B^2 L^2)
  const bL = bField * rodLength;
  const terminalVelocity = (pullForce * resistance) / (bL * bL || 0.001);

  // Induced EMF & current at current velocity
  const inducedEmf = bField * rodLength * rodVel;
  const inducedCurrent = inducedEmf / resistance;
  const magneticBrakingForce = bField * inducedCurrent * rodLength; // F = BIL

  // Power
  const mechanicalPower = pullForce * rodVel;
  const electricalPower = inducedCurrent * inducedCurrent * resistance;

  // Reset
  const handleReset = () => {
    setRodPos(180);
    setRodVel(0);
  };

  // Physics animation loop
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.03);
      lastTime = time;

      setRodVel((v) => {
        // Net force: F_net = F_pull - F_mag
        const currentBraking = (bField * bField * rodLength * rodLength * v) / resistance;
        const fNet = pullForce - currentBraking;
        const accel = fNet / rodMass;
        const nextV = Math.max(0, v + accel * dt);
        return nextV;
      });

      setRodPos((x) => {
        const nextX = x + rodVel * 35 * dt; // pixel scale
        // Wrap around loop if reaches edge
        if (nextX > 680) return 180;
        return nextX;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [bField, isPlaying, pullForce, resistance, rodLength, rodMass, rodVel]);

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

    const railLeft = 140;
    const railRight = 720;
    const railTop = 130;
    const railBot = 310;
    const railGap = railBot - railTop;

    // Draw Magnetic Field Region (⊗ symbols)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.2;
    for (let x = railLeft + 25; x < railRight; x += 45) {
      for (let y = railTop - 25; y <= railBot + 25; y += 40) {
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

    // Draw Conducting Rails
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    // Top rail
    ctx.beginPath();
    ctx.moveTo(railLeft, railTop);
    ctx.lineTo(railRight, railTop);
    ctx.stroke();

    // Bottom rail
    ctx.beginPath();
    ctx.moveTo(railLeft, railBot);
    ctx.lineTo(railRight, railBot);
    ctx.stroke();

    // Resistor Load on Left connecting the rails
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(railLeft, railTop);
    ctx.lineTo(railLeft, railTop + railGap / 2 - 25);
    // zigzag resistor
    const rMidY = railTop + railGap / 2;
    ctx.lineTo(railLeft - 8, rMidY - 18);
    ctx.lineTo(railLeft + 8, rMidY - 8);
    ctx.lineTo(railLeft - 8, rMidY + 2);
    ctx.lineTo(railLeft + 8, rMidY + 12);
    ctx.lineTo(railLeft, rMidY + 22);
    ctx.lineTo(railLeft, railBot);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px ui-sans-serif';
    ctx.fillText(`R = ${resistance.toFixed(1)} Ω`, railLeft - 65, rMidY + 4);

    // Current Circulation Arrows along rails if rod is moving
    if (rodVel > 0.1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#10b981';

      // Arrow in rod (pointing UP from bottom rail to top rail)
      const curArrowY = railTop + railGap / 2;
      ctx.beginPath();
      ctx.moveTo(rodPos - 12, curArrowY + 18);
      ctx.lineTo(rodPos - 12, curArrowY - 18);
      ctx.stroke();
      // Arrowhead pointing UP
      ctx.beginPath();
      ctx.moveTo(rodPos - 12, curArrowY - 18);
      ctx.lineTo(rodPos - 16, curArrowY - 10);
      ctx.lineTo(rodPos - 8, curArrowY - 10);
      ctx.fill();

      ctx.font = 'bold 11px ui-sans-serif';
      ctx.fillText(`I = ${inducedCurrent.toFixed(2)} A`, rodPos - 60, curArrowY - 4);
    }

    // Draw Sliding Metal Rod
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(rodPos - 6, railTop - 15, 12, railGap + 30);
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 2;
    ctx.strokeRect(rodPos - 6, railTop - 15, 12, railGap + 30);
    ctx.restore();

    // ==============================================================
    // DRAW EXAGGERATED VECTORS (PULL FORCE, BRAKING FORCE, VELOCITY)
    // ==============================================================
    const rodMidY = railTop + railGap / 2;

    // 1. External Pulling Force Vector (Amber, pointing RIGHT)
    const pullLen = Math.min(130, Math.max(35, pullForce * 4.5 * vectorScale));
    drawExaggeratedVector(
      ctx,
      rodPos,
      rodMidY - 20,
      rodPos + pullLen,
      rodMidY - 20,
      {
        color: '#f59e0b',
        lineWidth: 4.5,
        headLength: 16,
        label: `F_pull = ${pullForce.toFixed(0)} N`,
        glow: true,
      }
    );

    // 2. Magnetic Braking Force Vector FB = BIL (Rose Red, pointing LEFT - Lenz's Law)
    const brakingLen = Math.min(130, Math.max(0, magneticBrakingForce * 4.5 * vectorScale));
    if (brakingLen > 5) {
      drawExaggeratedVector(
        ctx,
        rodPos,
        rodMidY + 20,
        rodPos - brakingLen,
        rodMidY + 20,
        {
          color: '#f43f5e',
          lineWidth: 4.5,
          headLength: 16,
          label: `F_mag = ${magneticBrakingForce.toFixed(1)} N (BIL)`,
          labelOffset: { x: -70, y: -8 },
          glow: true,
        }
      );
    }

    // 3. Velocity Vector v (Glowing Cyan, pointing RIGHT)
    const velLen = Math.min(120, Math.max(25, rodVel * 10 * vectorScale));
    if (rodVel > 0.05) {
      drawExaggeratedVector(
        ctx,
        rodPos,
        rodMidY,
        rodPos + velLen,
        rodMidY,
        {
          color: '#06b6d4',
          lineWidth: 4,
          headLength: 15,
          label: `v = ${rodVel.toFixed(2)} m/s`,
          glow: true,
        }
      );
    }
  }, [bField, inducedCurrent, magneticBrakingForce, pullForce, resistance, rodLength, rodPos, rodVel, vectorScale]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Zone 1: Interactive Canvas Stage (65%) */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Motional EMF &amp; Magnetic Braking (Lenz&apos;s Law)</span>
              <span aria-hidden="true">·</span>
              <span>Faraday Induced EMF: <MathTex math="\mathcal{E} = BLv" /></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <span>Terminal Velocity: {terminalVelocity.toFixed(2)} m/s</span>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950">
            <canvas ref={canvasRef} width={800} height={450} className="w-full h-full block" />
          </div>

          {/* Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/80 border-t border-slate-800 text-xs">
            <div>
              <div className="text-slate-400">Rod Speed (v)</div>
              <div className="font-mono text-sm text-cyan-400 tabular-nums">
                {rodVel.toFixed(2)} m/s
              </div>
            </div>
            <div>
              <div className="text-slate-400">Induced EMF (E = BLv)</div>
              <div className="font-mono text-sm text-emerald-400 tabular-nums">
                {inducedEmf.toFixed(2)} V
              </div>
            </div>
            <div>
              <div className="text-slate-400">Induced Current (I = E/R)</div>
              <div className="font-mono text-sm text-amber-400 tabular-nums">
                {inducedCurrent.toFixed(2)} A
              </div>
            </div>
            <div>
              <div className="text-slate-400">Braking Force (F = BIL)</div>
              <div className="font-mono text-sm text-rose-400 tabular-nums">
                {magneticBrakingForce.toFixed(2)} N
              </div>
            </div>
          </div>

          {/* Power Balance Bar */}
          <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-300">Energy Conservation: Mechanical vs Thermal Dissipation</span>
              <span className="font-mono text-cyan-400">
                P_mech: {mechanicalPower.toFixed(1)} W | P_elec (I²R): {electricalPower.toFixed(1)} W
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              <div
                style={{
                  width: `${mechanicalPower > 0 ? Math.min(100, (electricalPower / (mechanicalPower || 1)) * 100) : 0}%`,
                }}
                className="bg-rose-500 transition-all duration-75"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Mechanical Work Input (F_pull · v)</span>
              <span>Thermal Heating in Resistor (I²R = (BLv)²/R)</span>
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
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Rod</span>
          </button>
        </div>
      </div>

      {/* Zone 2: Controls Deck (35%) */}
      <div className="lg:col-span-4 flex flex-col gap-4 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">System Parameters</h3>

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
              Magnifies glowing pull force (amber), magnetic braking force (rose), and velocity arrows.
            </p>
          </div>

          {/* Pull Force */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Applied Pulling Force (F_pull):</span>
              <span className="font-mono text-amber-400">{pullForce.toFixed(1)} N</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={pullForce}
              onChange={(e) => setPullForce(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Magnetic Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Magnetic Flux Density (B):</span>
              <span className="font-mono text-cyan-400">{bField.toFixed(1)} T</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.5"
              value={bField}
              onChange={(e) => setBField(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* Circuit Resistance */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Load Resistance (R):</span>
              <span className="font-mono text-emerald-400">{resistance.toFixed(1)} Ω</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Theory Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 leading-relaxed">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Info className="w-4 h-4" />
            <span>Lenz&apos;s Law &amp; Terminal Speed Derivation</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-slate-400">Terminal Velocity Equilibrium:</span>
            <div className="text-amber-300 font-mono">
              <MathTex block math="F_{pull} = F_B = \frac{B^2 L^2 v_{term}}{R} \implies v_{term} = \frac{F_{pull} R}{B^2 L^2}" />
            </div>
            <p className="text-[11px] text-slate-400">
              Lenz&apos;s Law requires the induced current to create a magnetic force opposing the change producing it. Thus the magnetic force <MathTex math="F_B = BIL" /> always acts in the opposite direction to velocity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
