"use client";

import { useEffect, useRef } from "react";

import styles from "./ThreadsBackground.module.css";

export function ThreadsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isLowMotion = () => mobileQuery.matches || reducedMotionQuery.matches;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const start = performance.now();

    const resize = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
      dpr = Math.min(window.devicePixelRatio || 1, isLowMotion() ? 1 : 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawThreads = (timeMs: number) => {
      const t = (timeMs - start) * 0.00038;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const lineCount = isLowMotion() ? 16 : 30;
      const steps = isLowMotion() ? 18 : 30;
      const stepX = width / steps;
      const amplitude = Math.min(height * 0.045, 34);

      for (let i = 0; i < lineCount; i += 1) {
        const ratio = i / Math.max(1, lineCount - 1);
        const yBase = ratio * height;
        const hueShift = 290 + ratio * 120;
        const alpha = isLowMotion() ? 0.08 : 0.14;

        context.beginPath();
        for (let s = 0; s <= steps; s += 1) {
          const x = s * stepX;
          const wave =
            Math.sin(x * 0.006 + t * 1.4 + i * 0.42) * amplitude +
            Math.cos(x * 0.0035 - t * 0.9 + i * 0.31) * (amplitude * 0.42);
          const y = yBase + wave;

          if (s === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.strokeStyle = `hsla(${hueShift}, 85%, 72%, ${alpha})`;
        context.lineWidth = isLowMotion() ? 1 : 1.2;
        context.stroke();
      }
    };

    const render = (timeMs: number) => {
      drawThreads(isLowMotion() ? start : timeMs);
      if (!isLowMotion()) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const handleLowMotionChange = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      render(performance.now());
    };

    resize();
    render(performance.now());

    window.addEventListener("resize", resize);
    mobileQuery.addEventListener("change", handleLowMotionChange);
    reducedMotionQuery.addEventListener("change", handleLowMotionChange);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", resize);
      mobileQuery.removeEventListener("change", handleLowMotionChange);
      reducedMotionQuery.removeEventListener("change", handleLowMotionChange);
    };
  }, []);

  return (
    <div className={styles.threads}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.veil} />
    </div>
  );
}
