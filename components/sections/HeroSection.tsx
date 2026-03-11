"use client";

import { motion, useReducedMotion } from "framer-motion";

import { copy } from "@/data/copy";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#70a5e8]/24 blur-[110px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -24, 0],
                  x: [0, 18, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-5%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-[#58d2c8]/20 blur-[130px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 26, 0],
                  x: [0, -26, 0],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-14%] left-[30%] h-[24rem] w-[24rem] rounded-full bg-[#8563ff]/16 blur-[140px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/60 backdrop-blur-md"
        >
          {copy.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.92, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-6xl leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
        >
          {copy.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.84, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-white/66 sm:text-xl"
        >
          {copy.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3"
        >
          {["эффект присутствия", "мягкая динамика", "киношная глубина"].map((item) => (
            <div
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[11px] uppercase tracking-[0.22em] text-white/58 backdrop-blur-md"
            >
              {item}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-white/28" />
          <p className="text-xs uppercase tracking-[0.28em] text-white/46">Прокрутите вниз</p>
        </motion.div>
      </div>
    </section>
  );
}
