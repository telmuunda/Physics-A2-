/**
 * Utility to draw bold, exaggerated, glowing vector arrows on Canvas 2D
 */
export function drawExaggeratedVector(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  options: {
    color: string;
    lineWidth?: number;
    headLength?: number;
    headAngle?: number;
    label?: string;
    labelOffset?: { x: number; y: number };
    glow?: boolean;
    dashed?: boolean;
  }
) {
  const {
    color,
    lineWidth = 3.5,
    headLength = 14,
    headAngle = Math.PI / 6,
    label,
    labelOffset = { x: 8, y: -8 },
    glow = true,
    dashed = false,
  } = options;

  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.hypot(dx, dy);

  if (length < 2) return; // Too short to draw

  ctx.save();

  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
  }

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (dashed) {
    ctx.setLineDash([5, 4]);
  } else {
    ctx.setLineDash([]);
  }

  // Draw shaft
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Draw Arrowhead
  ctx.setLineDash([]);
  const angle = Math.atan2(dy, dx);
  const actualHeadLen = Math.min(headLength, length * 0.45);

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - actualHeadLen * Math.cos(angle - headAngle),
    endY - actualHeadLen * Math.sin(angle - headAngle)
  );
  ctx.lineTo(
    endX - actualHeadLen * Math.cos(angle + headAngle),
    endY - actualHeadLen * Math.sin(angle + headAngle)
  );
  ctx.closePath();
  ctx.fill();

  // Draw Label if provided
  if (label) {
    ctx.shadowBlur = 0;
    ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillStyle = '#ffffff';
    // Backing box for text readability
    const textMetrics = ctx.measureText(label);
    const textX = endX + labelOffset.x;
    const textY = endY + labelOffset.y;

    ctx.fillStyle = 'rgba(9, 14, 26, 0.85)';
    ctx.fillRect(textX - 3, textY - 11, textMetrics.width + 6, 14);

    ctx.fillStyle = color;
    ctx.fillText(label, textX, textY);
  }

  ctx.restore();
}
