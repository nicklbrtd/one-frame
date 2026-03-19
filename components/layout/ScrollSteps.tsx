"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import styles from "./ScrollSteps.module.css";

type Step = {
  id: number;
  side: -1 | 1;
  yRatio: number;
  xOffset: number;
  angle: number;
  size: number;
  baseOpacity: number;
  phase: number;
};

const STEP_COUNT = 64;
const TRAIL_LENGTH = 14;
const IDLE_DELAY_MS = 1200;
const SIDE_BAND = 18;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const seeded = (input: number) => {
  const value = Math.sin(input * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
};

const buildSteps = (): Step[] => {
  const steps: Step[] = [];
  let drift = 0;

  for (let i = 0; i < STEP_COUNT; i += 1) {
    const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
    const yRatio = i / (STEP_COUNT - 1);
    const driftJitter = (seeded(i + 9) - 0.5) * 2.8;

    drift = clamp(drift + driftJitter, -8, 8);

    steps.push({
      id: i,
      side,
      yRatio,
      xOffset: side * (SIDE_BAND + seeded(i + 21) * 5.4) + drift,
      angle: side * (10 + seeded(i + 33) * 10) + (seeded(i + 45) - 0.5) * 3,
      size: 0.86 + seeded(i + 57) * 0.26,
      baseOpacity: 0.68 + seeded(i + 69) * 0.22,
      phase: seeded(i + 81) * Math.PI * 2,
    });
  }

  return steps;
};

function drawFootprint(
  ctx: CanvasRenderingContext2D,
  step: Step,
  x: number,
  y: number,
  strength: number,
  idle: boolean,
  time: number,
) {
  const pulse = idle ? 0.92 + Math.sin(time * 0.0017 + step.phase) * 0.08 : 1;
  const opacity = clamp(strength * step.baseOpacity * pulse, 0, 1);
  const width = 14 * step.size;
  const height = 28 * step.size;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((step.angle * Math.PI) / 180);
  ctx.scale(step.side, 1);

  const bodyGradient = ctx.createRadialGradient(0, 5, 1, 0, 2, height * 0.8);
  bodyGradient.addColorStop(0, `rgba(175, 190, 218, ${0.24 * opacity})`);
  bodyGradient.addColorStop(0.58, `rgba(128, 144, 176, ${0.2 * opacity})`);
  bodyGradient.addColorStop(1, `rgba(94, 106, 132, ${0})`);

  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.ellipse(0, 8, width * 0.54, height * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, -2, width * 0.42, height * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  const toeColor = `rgba(182, 198, 225, ${0.18 * opacity})`;
  ctx.fillStyle = toeColor;
  const toes = [
    { x: -4.2, y: -15, r: 2.2 },
    { x: -1.2, y: -16.4, r: 2.05 },
    { x: 1.9, y: -16.2, r: 1.95 },
    { x: 4.5, y: -14.6, r: 1.7 },
  ];

  toes.forEach((toe) => {
    ctx.beginPath();
    ctx.arc(toe.x * step.size, toe.y * step.size, toe.r * step.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

export function ScrollSteps() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const targetProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const lastScrollYRef = useRef(0);
  const lastActiveAtRef = useRef(0);

  const steps = useMemo(() => buildSteps(), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getProgress = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      return clamp(window.scrollY / maxScroll, 0, 1);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const isIdle = time - lastActiveAtRef.current > IDLE_DELAY_MS;

      const target = targetProgressRef.current;
      const current = displayProgressRef.current;
      const smoothing = shouldReduceMotion ? 1 : 0.16;
      const next = lerp(current, target, smoothing);
      displayProgressRef.current = next;

      const cursor = next * (steps.length - 1);

      ctx.clearRect(0, 0, width, height);

      const mist = ctx.createLinearGradient(0, 0, 0, height);
      mist.addColorStop(0, "rgba(198, 206, 222, 0.02)");
      mist.addColorStop(0.5, "rgba(155, 168, 198, 0.035)");
      mist.addColorStop(1, "rgba(122, 136, 166, 0.02)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;

      for (let i = 0; i < steps.length; i += 1) {
        const step = steps[i];
        const delta = cursor - i;

        let strength = 0;

        if (delta >= -0.5 && delta < 0.15) {
          strength = ((delta + 0.5) / 0.65) * 0.7;
        } else if (delta >= 0.15) {
          strength = 1 - (delta - 0.15) / TRAIL_LENGTH;
        }

        strength = clamp(strength, 0, 1);
        if (strength <= 0.012) continue;

        const active = Math.abs(delta) <= 0.62;
        const y = step.yRatio * height;

        let x = centerX + step.xOffset;
        let angleInfluence = 0;

        if (active) {
          x += directionRef.current * 0.9;
          angleInfluence = directionRef.current * 1.7;
        }

        if (isIdle && !shouldReduceMotion && Math.abs(delta) < 2.2) {
          x += Math.sin(time * 0.0011 + step.phase) * 0.7;
        }

        const renderStep: Step = {
          ...step,
          angle: step.angle + angleInfluence,
        };

        drawFootprint(ctx, renderStep, x, y, strength, isIdle, time);
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      directionRef.current = currentY >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = currentY;

      targetProgressRef.current = getProgress();
      lastActiveAtRef.current = performance.now();
    };

    resize();
    lastScrollYRef.current = window.scrollY;
    targetProgressRef.current = getProgress();
    displayProgressRef.current = targetProgressRef.current;
    lastActiveAtRef.current = performance.now();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, shouldReduceMotion, steps]);

  if (!enabled) {
    return null;
  }

  return (
    <aside aria-hidden className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </aside>
  );
}
