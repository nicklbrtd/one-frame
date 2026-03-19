"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

import styles from "./ScrollSteps.module.css";

const STEP_COUNT = 11;
const IDLE_DELAY_MS = 1300;

type StepState = {
  opacity: number;
  scale: number;
  passed: boolean;
  active: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function ScrollSteps() {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0.02);
  const [isIdle, setIsIdle] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const ticking = useRef(false);

  const steps = useMemo(() => Array.from({ length: STEP_COUNT }, (_, index) => index), []);
  const activeIndex = Math.round(progress * (STEP_COUNT - 1));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const scheduleIdle = () => {
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
      }
      idleTimer.current = window.setTimeout(() => {
        setIsIdle(true);
      }, IDLE_DELAY_MS);
    };

    const handleFrame = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) > 1) {
        setIsIdle(false);

        if (delta > 0) {
          setProgress((prev) => clamp(prev + Math.min(delta, 140) * 0.001, 0, 1));
        } else {
          setProgress((prev) => clamp(prev - Math.min(Math.abs(delta), 140) * 0.0012, 0, 1));
        }

        scheduleIdle();
      }

      if (currentY < 16) {
        setProgress(0.02);
        setIsIdle(false);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = window.requestAnimationFrame(handleFrame);
    };

    scheduleIdle();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
      }
    };
  }, []);

  if (!isDesktop) {
    return null;
  }

  const getStepState = (index: number): StepState => {
    const passed = index <= activeIndex;
    const active = index === activeIndex;
    const distance = Math.abs(index - activeIndex);

    if (!passed) {
      return { opacity: 0.06, scale: 0.9, passed, active };
    }

    if (active) {
      return { opacity: 0.94, scale: 1.06, passed, active };
    }

    return {
      opacity: clamp(0.54 - distance * 0.085, 0.18, 0.6),
      scale: clamp(1 - distance * 0.03, 0.88, 1),
      passed,
      active,
    };
  };

  return (
    <aside aria-hidden className={styles.container}>
      <div className={styles.track} />

      {steps.map((step) => {
        const ratio = step / (STEP_COUNT - 1);
        const state = getStepState(step);
        const stepIdleNear = isIdle && !shouldReduceMotion && Math.abs(step - activeIndex) <= 1;

        return (
          <div
            key={step}
            className={cn(styles.step, step % 2 === 0 ? styles.stepLeft : styles.stepRight)}
            style={{
              top: `calc(${ratio * 100}% - 8px)`,
              opacity: state.opacity,
              transform: `scale(${state.scale})`,
            }}
          >
            <span
              className={cn(
                styles.print,
                styles.printMain,
                state.passed && styles.printPassed,
                state.active && styles.printActive,
                stepIdleNear && styles.printIdle,
              )}
            />
            <span
              className={cn(
                styles.print,
                styles.printSecondary,
                state.passed && styles.printPassed,
                state.active && styles.printActive,
                stepIdleNear && styles.printIdle,
              )}
            />
          </div>
        );
      })}

      <div className={styles.ghost} style={{ top: `calc(${progress * 100}% - 13px)` }}>
        <span className={cn(styles.ghostCore, isIdle && !shouldReduceMotion && styles.ghostCoreOrbit)} />
      </div>
    </aside>
  );
}
