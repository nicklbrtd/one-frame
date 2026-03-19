"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { copy } from "@/data/copy";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [allowHeroMotion, setAllowHeroMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const sync = () => setAllowHeroMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-16 top-8 h-[20rem] w-[20rem] rounded-full bg-[#c53c54]/30 blur-[120px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, -22, 0],
                  x: [0, 16, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-6%] top-[16%] h-[25rem] w-[25rem] rounded-full bg-[#2d5ba2]/30 blur-[130px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, 24, 0],
                  x: [0, -22, 0],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-16%] left-[28%] h-[22rem] w-[22rem] rounded-full bg-[#6e1426]/28 blur-[140px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, -20, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto w-[min(1140px,92vw)]">
        <motion.article
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(160deg,rgba(10,12,20,0.92),rgba(8,10,18,0.82))] p-7 shadow-[0_34px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl sm:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(204,61,85,0.18),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(67,109,188,0.22),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[33px] border border-white/[0.08]" />
          <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.34)_84%)]" />

          <div className="relative z-10 grid gap-9 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex rounded-full border border-[#e99dad]/35 bg-[#6f1828]/28 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#ffe7ed]"
              >
                {copy.hero.kicker}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-balance text-[5.4rem] leading-[0.82] tracking-[0.02em] text-transparent [text-shadow:0_8px_32px_rgba(0,0,0,0.52)] [background:linear-gradient(180deg,#f8fbff_0%,#c6d4eb_78%,#9eb3d9_100%)] [background-clip:text] sm:text-[7.2rem] lg:text-[9rem]"
              >
                {copy.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.84, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-white/72 sm:text-xl"
              >
                {copy.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.74, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {["Team Showcase", "Class of 2026", "Cinematic Edition"].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/14 bg-white/[0.045] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/72 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 lg:justify-items-end"
            >
              {[
                ["Релиз", "2026"],
                ["Формат", "Digital Poster"],
                ["Статус", "In Progress"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="w-full rounded-2xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 text-right backdrop-blur-lg lg:max-w-[220px]"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/48">{label}</p>
                  <p className="mt-1 font-display text-xl leading-none text-white">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.62 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-[#d13d50] to-white/25" />
          <p className="text-xs uppercase tracking-[0.3em] text-white/52">Прокрутите вниз</p>
        </motion.div>
      </div>
    </section>
  );
}
