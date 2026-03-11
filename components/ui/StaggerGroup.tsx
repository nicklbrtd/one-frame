"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { motionConfig } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
};

export function StaggerGroup({ children, className, amount = 0.12 }: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: amount,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionConfig.itemDuration,
            ease: motionConfig.sectionEase,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
