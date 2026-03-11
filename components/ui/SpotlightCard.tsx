"use client";

import { CSSProperties, MouseEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  tint?: string;
  onClick?: () => void;
};

export function SpotlightCard({ children, className, tint = "#b8d0d9", onClick }: SpotlightCardProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const onPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <motion.div
      onMouseMove={onPointerMove}
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(25,31,40,0.14)] backdrop-blur-sm",
        onClick ? "cursor-pointer" : undefined,
        className,
      )}
      style={
        {
          "--spot-x": `${spotlight.x}%`,
          "--spot-y": `${spotlight.y}%`,
          "--spot-color": tint,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--spot-color) 38%, transparent) 0%, transparent 48%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
