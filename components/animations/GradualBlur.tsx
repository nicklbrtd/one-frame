"use client";

import { CSSProperties, ReactNode, useMemo } from "react";

import { cn } from "@/lib/cn";

import styles from "./GradualBlur.module.css";

type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type BlurTarget = "parent" | "page";

type GradualBlurProps = {
  position?: BlurPosition;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  opacity?: number;
  curve?: BlurCurve;
  target?: BlurTarget;
  className?: string;
  style?: CSSProperties;
};

const CURVE_FUNCTIONS: Record<BlurCurve, (value: number) => number> = {
  linear: (value) => value,
  bezier: (value) => value * value * (3 - 2 * value),
  "ease-in": (value) => value * value,
  "ease-out": (value) => 1 - Math.pow(1 - value, 2),
  "ease-in-out": (value) => (value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2),
};

const DIRECTION_MAP: Record<BlurPosition, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

const roundToTenth = (value: number) => Math.round(value * 10) / 10;

export function GradualBlur({
  position = "bottom",
  strength = 2,
  height = "6rem",
  width,
  divCount = 5,
  exponential = false,
  zIndex = 40,
  opacity = 1,
  curve = "linear",
  target = "page",
  className,
  style,
}: GradualBlurProps) {
  const blurDivs = useMemo(() => {
    const nodes: ReactNode[] = [];
    const increment = 100 / divCount;
    const curveFn = CURVE_FUNCTIONS[curve];

    for (let i = 1; i <= divCount; i += 1) {
      let progress = i / divCount;
      progress = curveFn(progress);

      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const p1 = roundToTenth(increment * i - increment);
      const p2 = roundToTenth(increment * i);
      const p3 = roundToTenth(increment * i + increment);
      const p4 = roundToTenth(increment * i + increment * 2);

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) {
        gradient += `, black ${p3}%`;
      }
      if (p4 <= 100) {
        gradient += `, transparent ${p4}%`;
      }

      nodes.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(${DIRECTION_MAP[position]}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${DIRECTION_MAP[position]}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
          }}
        />,
      );
    }

    return nodes;
  }, [curve, divCount, exponential, opacity, position, strength]);

  const containerStyle = useMemo(() => {
    const isVertical = position === "top" || position === "bottom";

    const baseStyle: CSSProperties = {
      position: target === "page" ? "fixed" : "absolute",
      pointerEvents: "none",
      zIndex,
      ...style,
    };

    if (isVertical) {
      baseStyle.height = height;
      baseStyle.width = width || "100%";
      baseStyle.left = 0;
      baseStyle.right = 0;
      baseStyle[position] = 0;
    } else {
      baseStyle.width = width || height;
      baseStyle.height = "100%";
      baseStyle.top = 0;
      baseStyle.bottom = 0;
      baseStyle[position] = 0;
    }

    return baseStyle;
  }, [height, position, style, target, width, zIndex]);

  return (
    <div className={cn(styles.blur, className)} style={containerStyle} aria-hidden>
      <div className={styles.inner}>{blurDivs}</div>
    </div>
  );
}
