"use client";

import { useEffect, useRef } from "react";

/* ─── Warm White + Navy + Gold Palette ─── */

// Soft warm white base
const BG = { r: 247, g: 247, b: 245 };  // #F7F7F5

// Gentle warm tones for ambient depth
const WARM_CREAM   = { r: 242, g: 238, b: 230 };  // very pale warm cream
const SAND_MIST    = { r: 237, g: 235, b: 231 };  // soft sand mist
const IVORY_WASH   = { r: 245, g: 241, b: 234 };  // hint of ivory
const GOLD_HINT    = { r: 255, g: 240, b: 200 };  // very faint warm gold wash
const ROYAL_GLOW   = { r: 51,  g: 78,  b: 172 };  // subtle royal blue accent glow (very faint)

/* ─── Types ─── */

interface Blob {
  x: number;
  y: number;
  r: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  px: number;
  py: number;
  speed: number;
}

interface BokehOrb {
  x: number;
  y: number;
  r: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  breathSpeed: number;
  color: { r: number; g: number; b: number };
}

interface Particle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number;
  vy: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Gentle mouse-reactive glow
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ═══ Ambient Gradient Blobs ═══
       Large, extremely soft warm washes that create
       gentle depth — like warm ambient light in a café. */
    const meshBlobs: Blob[] = [
      // Top-left: warm cream wash
      { x: 0.10, y: 0.05, r: 0.55, color: WARM_CREAM,   alpha: 0.30, px: 0,   py: 0.5,  speed: 0.00006 },
      // Right: soft sand mist
      { x: 0.85, y: 0.20, r: 0.50, color: SAND_MIST,    alpha: 0.20, px: 1.2, py: 0.8,  speed: 0.00005 },
      // Center-bottom: ivory wash
      { x: 0.50, y: 0.65, r: 0.60, color: IVORY_WASH,   alpha: 0.22, px: 2.5, py: 1.5,  speed: 0.00004 },
      // Bottom-left: warm cream pool
      { x: 0.15, y: 0.80, r: 0.45, color: WARM_CREAM,   alpha: 0.18, px: 3.8, py: 2.2,  speed: 0.00005 },
      // Top-right: gold hint wash
      { x: 0.75, y: 0.10, r: 0.35, color: GOLD_HINT,    alpha: 0.08, px: 4.5, py: 3.0,  speed: 0.00007 },
      // Subtle royal blue accent — center (barely visible)
      { x: 0.45, y: 0.35, r: 0.20, color: ROYAL_GLOW,   alpha: 0.012, px: 1.0, py: 2.0,  speed: 0.00008 },
      // Bottom-right: sand mist
      { x: 0.80, y: 0.75, r: 0.40, color: SAND_MIST,    alpha: 0.16, px: 3.0, py: 0.3,  speed: 0.00005 },
    ];

    /* ═══ Bokeh Orbs ═══
       Very faint, blurred warm gold/cream light spots. */
    const bokehOrbs: BokehOrb[] = Array.from({ length: 8 }, () => {
      const isGold = Math.random() > 0.6;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 40 + Math.random() * 90,
        baseAlpha: 0.012 + Math.random() * 0.02,
        alpha: 0,
        phase: Math.random() * Math.PI * 2,
        breathSpeed: 0.0002 + Math.random() * 0.0004,
        color: isGold ? GOLD_HINT : WARM_CREAM,
      };
    });

    /* ═══ Floating Particles ═══
       Tiny warm gold-toned motes — very delicate. */
    const particles: Particle[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 0.8,
      alpha: 0.04 + Math.random() * 0.08,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -0.02 - Math.random() * 0.08,
    }));

    let animId: number;

    const animate = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* ── 1. Base Fill: clean warm white ── */
      ctx.fillStyle = `rgb(${BG.r}, ${BG.g}, ${BG.b})`;
      ctx.fillRect(0, 0, w, h);

      /* ── 2. Soft vertical warm gradient ── */
      const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
      baseGrad.addColorStop(0,    "rgba(247, 247, 245, 0.5)");    // warm white top
      baseGrad.addColorStop(0.3,  "rgba(242, 238, 230, 0.25)");   // cream transition
      baseGrad.addColorStop(0.65, "rgba(237, 235, 231, 0.20)");   // sand mist
      baseGrad.addColorStop(1,    "rgba(232, 228, 220, 0.30)");   // warm base
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── 3. Diagonal warm wash (top-left to center) — golden light ── */
      const sunGrad = ctx.createLinearGradient(0, 0, w * 0.6, h * 0.5);
      sunGrad.addColorStop(0,   "rgba(255, 240, 200, 0.10)");
      sunGrad.addColorStop(0.5, "rgba(255, 240, 200, 0.03)");
      sunGrad.addColorStop(1,   "transparent");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── 4. Mesh Blobs: ambient warm washes ── */
      for (const blob of meshBlobs) {
        const bx = blob.x * w + Math.sin(time * blob.speed + blob.px) * w * 0.015;
        const by = blob.y * h + Math.cos(time * blob.speed + blob.py) * h * 0.015;
        const br = blob.r * Math.max(w, h);
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        grad.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.alpha})`);
        grad.addColorStop(0.35, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.alpha * 0.45})`);
        grad.addColorStop(0.7, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.alpha * 0.1})`);
        grad.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      /* ── 5. Mouse-reactive warm glow ── */
      mouse.x += (mouse.tx - mouse.x) * 0.025;
      mouse.y += (mouse.ty - mouse.y) * 0.025;
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
      mouseGrad.addColorStop(0, `rgba(${GOLD_HINT.r}, ${GOLD_HINT.g}, ${GOLD_HINT.b}, 0.04)`);
      mouseGrad.addColorStop(0.5, `rgba(${WARM_CREAM.r}, ${WARM_CREAM.g}, ${WARM_CREAM.b}, 0.02)`);
      mouseGrad.addColorStop(1, "transparent");
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── 6. Bokeh Orbs: soft warm light patches ── */
      for (const orb of bokehOrbs) {
        const breath = 0.5 + 0.5 * Math.sin(time * orb.breathSpeed + orb.phase);
        orb.alpha = orb.baseAlpha * (0.4 + 0.6 * breath);

        const ox = orb.x + Math.sin(time * 0.00004 + orb.phase) * 10;
        const oy = orb.y + Math.cos(time * 0.00003 + orb.phase * 1.3) * 8;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${orb.alpha})`);
        grad.addColorStop(0.3, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${orb.alpha * 0.5})`);
        grad.addColorStop(0.7, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${orb.alpha * 0.1})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      /* ── 7. Particles (warm floating motes) ── */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 163, 115, ${p.alpha})`;
        ctx.fill();
      }

      /* ── 8. Soft edge vignette ── */
      const vigW = w / 2;
      const vigH = h / 2;
      const vigGrad = ctx.createRadialGradient(vigW, vigH, Math.min(w, h) * 0.35, vigW, vigH, Math.max(w, h) * 0.8);
      vigGrad.addColorStop(0, "transparent");
      vigGrad.addColorStop(0.7, "rgba(237, 235, 231, 0.06)");
      vigGrad.addColorStop(1, "rgba(226, 223, 217, 0.12)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
