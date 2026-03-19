"use client";

import { useEffect, useRef } from "react";

import styles from "./ThreadsBackground.module.css";

type ThreadsBackgroundProps = {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
};

type DustParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  phase: number;
};

export function ThreadsBackground({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isLowMotion = () => mobileQuery.matches || reducedMotionQuery.matches;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const start = performance.now();
    const pointer = { x: 0, y: 0 };
    let dust: DustParticle[] = [];

    const createDust = () => {
      const count = isLowMotion() ? 34 : 90;
      dust = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: 0.35 + Math.random() * 1.4,
        alpha: 0.1 + Math.random() * 0.28,
        speed: 0.12 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
      dpr = Math.min(window.devicePixelRatio || 1, isLowMotion() ? 1 : 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createDust();
    };

    const drawHaze = (timeMs: number) => {
      const t = (timeMs - start) * 0.00045;
      const px = pointer.x * 0.18;
      const py = pointer.y * 0.2;
      const distBias = Math.max(-0.8, Math.min(0.8, distance));

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const glowCount = isLowMotion() ? 4 : 6;
      for (let i = 0; i < glowCount; i += 1) {
        const ratio = i / Math.max(1, glowCount - 1);
        const x =
          width * (0.08 + ratio * 0.84) +
          Math.sin(t * (0.7 + ratio * 0.8) + i * 1.37) * width * 0.06 * amplitude +
          px * 48;
        const y =
          height * (0.22 + (i % 3) * 0.21) +
          Math.cos(t * (0.52 + ratio * 0.58) + i * 1.8) * height * 0.06 * amplitude +
          py * 36 +
          distBias * 22;
        const r = Math.min(width, height) * (0.22 + ratio * 0.12);
        const hue = i % 2 === 0 ? 350 : 221;
        const alpha = isLowMotion() ? 0.1 : 0.14;

        const glow = context.createRadialGradient(x, y, 0, x, y, r);
        glow.addColorStop(0, `hsla(${hue}, 82%, 62%, ${alpha})`);
        glow.addColorStop(0.54, `hsla(${hue}, 80%, 50%, ${alpha * 0.28})`);
        glow.addColorStop(1, "transparent");

        context.fillStyle = glow;
        context.fillRect(x - r, y - r, r * 2, r * 2);
      }

      context.save();
      context.translate(width * 0.52 + px * 34, height * 0.44 + py * 26);
      context.rotate(-0.21 + Math.sin(t * 0.32) * 0.05);
      const beamA = context.createLinearGradient(-width * 0.72, 0, width * 0.72, 0);
      beamA.addColorStop(0, "transparent");
      beamA.addColorStop(0.45, "rgba(241, 177, 113, 0.09)");
      beamA.addColorStop(0.55, "rgba(131, 173, 241, 0.11)");
      beamA.addColorStop(1, "transparent");
      context.fillStyle = beamA;
      context.fillRect(-width * 0.72, -height * 0.034, width * 1.44, height * 0.068);
      context.restore();

      context.save();
      context.translate(width * 0.42 + px * 22, height * 0.62 + py * 18);
      context.rotate(0.17 + Math.cos(t * 0.28) * 0.03);
      const beamB = context.createLinearGradient(-width * 0.62, 0, width * 0.62, 0);
      beamB.addColorStop(0, "transparent");
      beamB.addColorStop(0.46, "rgba(204, 73, 94, 0.08)");
      beamB.addColorStop(0.54, "rgba(73, 124, 210, 0.1)");
      beamB.addColorStop(1, "transparent");
      context.fillStyle = beamB;
      context.fillRect(-width * 0.62, -height * 0.028, width * 1.24, height * 0.056);
      context.restore();

      context.globalCompositeOperation = "overlay";
      context.strokeStyle = "rgba(245, 236, 215, 0.08)";
      context.lineWidth = 1;
      const stripeCount = isLowMotion() ? 8 : 14;
      for (let i = 0; i < stripeCount; i += 1) {
        const y = height * (0.16 + i * 0.05) + Math.sin(t * 0.9 + i) * 8;
        context.beginPath();
        context.moveTo(-40, y);
        context.lineTo(width + 40, y - 18);
        context.stroke();
      }

      context.globalCompositeOperation = "screen";
      for (let i = 0; i < dust.length; i += 1) {
        const particle = dust[i];
        const drift = t * particle.speed;
        const x =
          ((particle.x * width + Math.sin(drift + particle.phase) * 18 + px * 14) % width + width) % width;
        const y =
          ((particle.y * height + Math.cos(drift * 0.9 + particle.phase) * 10 + py * 10) % height + height) %
          height;
        const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(drift * 2 + particle.phase));

        context.beginPath();
        context.fillStyle = `rgba(238, 244, 255, ${particle.alpha * pulse})`;
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const render = (timeMs: number) => {
      drawHaze(isLowMotion() ? start : timeMs);
      if (!isLowMotion()) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const handleLowMotionChange = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      resize();
      render(performance.now());
    };

    resize();
    render(performance.now());

    const onPointerMove = (event: PointerEvent) => {
      if (!enableMouseInteraction || isLowMotion()) return;
      pointer.x = (event.clientX / width - 0.5) * 2;
      pointer.y = (event.clientY / height - 0.5) * 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mobileQuery.addEventListener("change", handleLowMotionChange);
    reducedMotionQuery.addEventListener("change", handleLowMotionChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      mobileQuery.removeEventListener("change", handleLowMotionChange);
      reducedMotionQuery.removeEventListener("change", handleLowMotionChange);
    };
  }, [amplitude, distance, enableMouseInteraction]);

  return (
    <div className={styles.threads}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.veil} />
    </div>
  );
}
