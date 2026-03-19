"use client";

import { motion, useReducedMotion } from "framer-motion";

type DoodleProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

function useDrawMotion(delay = 0, duration = 0.95) {
  const reduceMotion = useReducedMotion();

  return {
    reduceMotion,
    path: {
      initial: reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
      whileInView: { pathLength: 1, opacity: 1 },
      viewport: { once: true, amount: 0.65 },
      transition: reduceMotion ? { duration: 0 } : { duration, delay, ease },
    },
  };
}

export function DoodleArrow({
  className,
  color = "#f5ecd5",
  strokeWidth = 2.6,
  delay = 0.1,
  duration = 1.05,
}: DoodleProps) {
  const { path } = useDrawMotion(delay, duration);

  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden>
      <motion.path
        d="M7 50 C31 39 55 30 82 19 C90 16 97 12 104 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...path}
      />
      <motion.path
        d="M94 5 L109 8 L98 21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={path.initial}
        whileInView={path.whileInView}
        viewport={path.viewport}
        transition={("duration" in path.transition && path.transition.duration === 0)
          ? path.transition
          : { duration: duration * 0.5, delay: delay + duration * 0.62, ease }}
      />
    </svg>
  );
}

export function DoodleCircle({
  className,
  color = "#f3ead2",
  strokeWidth = 2.4,
  delay = 0.12,
  duration = 1.2,
}: DoodleProps) {
  const { path } = useDrawMotion(delay, duration);

  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <motion.path
        d="M58 9 C83 7 105 27 111 52 C118 81 102 108 74 113 C45 118 18 102 11 74 C5 49 18 18 43 11 C48 9 53 9 58 9 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...path}
      />
    </svg>
  );
}

export function DoodleUnderline({
  className,
  color = "#f5ecd5",
  strokeWidth = 2.8,
  delay = 0.14,
  duration = 0.9,
}: DoodleProps) {
  const { path } = useDrawMotion(delay, duration);

  return (
    <svg viewBox="0 0 192 34" className={className} fill="none" aria-hidden>
      <motion.path
        d="M8 20 C31 26 54 14 79 20 C104 26 126 16 152 20 C164 22 176 20 186 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...path}
      />
    </svg>
  );
}

export function DoodleStar({
  className,
  color = "#f3ead2",
  strokeWidth = 2.3,
  delay = 0.16,
  duration = 0.72,
}: DoodleProps) {
  const { path } = useDrawMotion(delay, duration);

  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <motion.path
        d="M20 4 L23.5 14.8 L36 16.2 L26.8 23.8 L29.8 36 L20 29.4 L10.2 36 L13.2 23.8 L4 16.2 L16.5 14.8 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...path}
      />
    </svg>
  );
}

export function DoodleCross({
  className,
  color = "#f0e5c9",
  strokeWidth = 2.6,
  delay = 0.18,
  duration = 0.66,
}: DoodleProps) {
  const { path, reduceMotion } = useDrawMotion(delay, duration);

  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" aria-hidden>
      <motion.path
        d="M8 8 L28 28"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={path.initial}
        whileInView={path.whileInView}
        viewport={path.viewport}
        transition={reduceMotion ? { duration: 0 } : { duration: duration * 0.52, delay, ease }}
      />
      <motion.path
        d="M28 8 L8 28"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={path.initial}
        whileInView={path.whileInView}
        viewport={path.viewport}
        transition={reduceMotion ? { duration: 0 } : { duration: duration * 0.52, delay: delay + duration * 0.48, ease }}
      />
    </svg>
  );
}
