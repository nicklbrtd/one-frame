"use client";

import { HTMLAttributes, forwardRef, useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/cn";

import styles from "./VariableProximity.module.css";

type FalloffType = "linear" | "exponential" | "gaussian";

type MousePosition = {
  x: number;
  y: number;
};

interface ParsedSetting {
  axis: string;
  fromValue: number;
  toValue: number;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  radius?: number;
  falloff?: FalloffType;
}

const parseVariationSettings = (settings: string) =>
  new Map(
    settings
      .split(",")
      .map((entry) => entry.trim())
      .map((entry) => {
        const [name, value] = entry.split(" ");
        return [name.replace(/['"]/g, ""), Number.parseFloat(value)];
      }),
  );

const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1);

const calculateFalloff = (distanceFromPointer: number, radius: number, falloff: FalloffType) => {
  const normalized = Math.min(Math.max(1 - distanceFromPointer / radius, 0), 1);

  if (falloff === "exponential") {
    return normalized ** 2;
  }

  if (falloff === "gaussian") {
    return Math.exp(-((distanceFromPointer / (radius / 2)) ** 2) / 2);
  }

  return normalized;
};

export const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      radius = 50,
      falloff = "linear",
      className,
      style,
      ...restProps
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLSpanElement | null>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useRef<MousePosition>({ x: -9999, y: -9999 });
    const lastPositionRef = useRef<MousePosition>({ x: -9999, y: -9999 });
    const isHoveringRef = useRef(false);
    const wasHoveringRef = useRef(false);

    const parsedSettings = useMemo<ParsedSetting[]>(() => {
      const fromSettings = parseVariationSettings(fromFontVariationSettings);
      const toSettings = parseVariationSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    useEffect(() => {
      const rootElement = rootRef.current;
      if (!rootElement) {
        return;
      }

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = rootElement.getBoundingClientRect();
        mousePositionRef.current = {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      };

      const onPointerEnter = (event: PointerEvent) => {
        isHoveringRef.current = true;
        updatePointer(event.clientX, event.clientY);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!isHoveringRef.current) {
          return;
        }
        updatePointer(event.clientX, event.clientY);
      };

      const onPointerLeave = () => {
        isHoveringRef.current = false;
        mousePositionRef.current = { x: -9999, y: -9999 };
        lastPositionRef.current = { x: -9999, y: -9999 };
      };

      rootElement.addEventListener("pointerenter", onPointerEnter, { passive: true });
      rootElement.addEventListener("pointermove", onPointerMove, { passive: true });
      rootElement.addEventListener("pointerleave", onPointerLeave, { passive: true });

      return () => {
        rootElement.removeEventListener("pointerenter", onPointerEnter);
        rootElement.removeEventListener("pointermove", onPointerMove);
        rootElement.removeEventListener("pointerleave", onPointerLeave);
      };
    }, []);

    useEffect(() => {
      let frameId = 0;

      const loop = () => {
        if (!isHoveringRef.current) {
          if (wasHoveringRef.current) {
            letterRefs.current.forEach((letterRef) => {
              if (letterRef) {
                letterRef.style.fontVariationSettings = fromFontVariationSettings;
              }
            });
          }
          wasHoveringRef.current = false;
          frameId = requestAnimationFrame(loop);
          return;
        }

        wasHoveringRef.current = true;
        const pointer = mousePositionRef.current;
        if (pointer.x === lastPositionRef.current.x && pointer.y === lastPositionRef.current.y) {
          frameId = requestAnimationFrame(loop);
          return;
        }
        lastPositionRef.current = pointer;

        const rootElement = rootRef.current;
        if (!rootElement) {
          frameId = requestAnimationFrame(loop);
          return;
        }
        const rootRect = rootElement.getBoundingClientRect();

        letterRefs.current.forEach((letterRef) => {
          if (!letterRef) {
            return;
          }

          const rect = letterRef.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2 - rootRect.left;
          const centerY = rect.top + rect.height / 2 - rootRect.top;

          const currentDistance = distance(pointer.x, pointer.y, centerX, centerY);

          if (currentDistance >= radius) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
            return;
          }

          const falloffValue = calculateFalloff(currentDistance, radius, falloff);
          const newSettings = parsedSettings
            .map(({ axis, fromValue, toValue }) => {
              const value = fromValue + (toValue - fromValue) * falloffValue;
              return `'${axis}' ${value}`;
            })
            .join(", ");

          letterRef.style.fontVariationSettings = newSettings;
        });

        frameId = requestAnimationFrame(loop);
      };

      frameId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(frameId);
    }, [falloff, fromFontVariationSettings, parsedSettings, radius]);

    const words = useMemo(() => label.split(" "), [label]);
    const wordOffsets = useMemo(() => {
      const offsets: number[] = [];
      let total = 0;

      words.forEach((word, index) => {
        offsets[index] = total;
        total += word.length;
      });

      return offsets;
    }, [words]);

    return (
      <span
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(styles.root, className)}
        style={style}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((letter, letterIndex) => {
              const currentLetterIndex = wordOffsets[wordIndex] + letterIndex;

              return (
                <span
                  key={`${letter}-${currentLetterIndex}`}
                  ref={(element) => {
                    letterRefs.current[currentLetterIndex] = element;
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: fromFontVariationSettings,
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 ? <span style={{ display: "inline-block" }}>&nbsp;</span> : null}
          </span>
        ))}
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  },
);

VariableProximity.displayName = "VariableProximity";
