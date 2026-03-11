"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { motionConfig } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: motionConfig.itemDuration,
        ease: motionConfig.sectionEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
