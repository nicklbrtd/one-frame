"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/cn";

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxMedia({ children, className, speed = 40 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div ref={ref} className={cn("relative", className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
