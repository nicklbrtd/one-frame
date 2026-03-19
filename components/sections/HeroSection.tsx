"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { copy } from "@/data/copy";

const tags = ["scene 01", "frame 27", "mood", "rec", "archive"];
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [allowHeroMotion, setAllowHeroMotion] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 46, damping: 22, mass: 0.85 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 46, damping: 22, mass: 0.85 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const collageX = useTransform(smoothPointerX, [-1, 1], [-10, 10]);
  const collageY = useTransform(smoothPointerY, [-1, 1], [-8, 8]);

  const filmMouseX = useTransform(smoothPointerX, [-1, 1], [-9, 9]);
  const filmMouseY = useTransform(smoothPointerY, [-1, 1], [-7, 7]);
  const filmScrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const filmScrollRotate = useTransform(scrollYProgress, [0, 1], [0, 11]);
  const filmX = useTransform(() => filmMouseX.get());
  const filmY = useTransform(() => filmMouseY.get() + filmScrollY.get());
  const filmRotate = useTransform(
    () => -10 + filmScrollRotate.get() + smoothPointerX.get() * 2 + smoothPointerY.get() * -1.15,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setAllowHeroMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !allowHeroMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nx = clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      const ny = clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
      pointerX.set(nx);
      pointerY.set(ny);
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [allowHeroMotion, pointerX, pointerY, shouldReduceMotion]);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[96vh] items-center overflow-hidden pb-16 pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-6%] top-[10%] h-[15rem] w-[15rem] rounded-full bg-[#ef3f5d]/24 blur-[70px]" />
        <div className="absolute right-[-8%] top-[12%] h-[17rem] w-[17rem] rounded-full bg-[#3b72ea]/24 blur-[78px]" />
        <div className="absolute left-[42%] top-[6%] h-40 w-40 rounded-full bg-[#f3c177]/12 blur-[54px]" />

        <div className="absolute left-[8%] top-[18%] h-12 w-12 rotate-[-12deg] border-2 border-[#f5efdd]/44" />
        <div className="absolute right-[10%] top-[62%] h-14 w-14 rounded-full border-2 border-[#f5efdd]/32" />
        <div className="absolute left-[52%] top-[20%] h-[2px] w-24 rotate-[21deg] bg-[#f5efdd]/44" />
      </div>

      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <RevealBlock>
            <div className="relative z-10 max-w-2xl">
              <p className="inline-flex -rotate-[2deg] border-2 border-[#f5efde]/55 bg-[#102347]/82 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-[#f6efdd] shadow-[4px_4px_0_rgba(6,8,16,0.52)]">
                {copy.hero.kicker}
              </p>

              <h1 className="mt-6 font-display text-[5rem] uppercase leading-[0.84] tracking-[0.04em] text-[#f7f1e3] [text-shadow:4px_4px_0_rgba(7,9,18,0.72)] sm:text-[6.8rem] lg:text-[8.8rem]">
                {copy.hero.title}
              </h1>

              <p className="mt-5 max-w-xl border-l-4 border-[#f5e7c9]/78 pl-4 text-balance text-lg leading-relaxed text-[#f5efdd] sm:text-[1.2rem]">
                {copy.hero.subtitle}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <li
                    key={tag}
                    className={`inline-flex items-center border-2 px-3 py-1 text-[10px] uppercase tracking-[0.18em] shadow-[3px_3px_0_rgba(6,8,16,0.45)] ${
                      index % 2 === 0
                        ? "border-[#f5efde]/58 bg-[#172f5e]/82 text-[#f8f2e4]"
                        : "border-[#f5efde]/44 bg-[#732338]/86 text-[#fff6ea]"
                    }`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: 0.25 }}
                className="mt-12 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#f5efdd]/74"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#f5efdd]/46">↓</span>
                scroll to next frame
              </motion.div>
            </div>
          </RevealBlock>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.64, delay: 0.08 }}
            className="relative mx-auto w-full max-w-[560px]"
            style={shouldReduceMotion ? undefined : { x: collageX, y: collageY }}
          >
            <div className="relative h-[28rem] sm:h-[32rem]">
              <article className="absolute left-[4%] top-[2%] h-[78%] w-[72%] rotate-[-2deg] overflow-hidden border-2 border-[#f6efdb]/55 bg-[#121a32] shadow-[8px_10px_0_rgba(6,8,16,0.5)]">
                <Image
                  src="/members/maksim.png"
                  alt="Портрет участника"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover object-[50%_12%]"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(229,63,91,0.3),transparent_40%),radial-gradient(circle_at_82%_18%,rgba(60,110,225,0.26),transparent_42%)]" />
                <div className="absolute inset-0 opacity-[0.2] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:7px_7px]" />
                <p className="absolute left-4 top-4 -rotate-[2deg] border border-[#f7f0df]/56 bg-[#f3e4c5]/90 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-[#20232c]">
                  lead frame
                </p>
                <p className="absolute bottom-4 left-4 font-display text-2xl uppercase tracking-[0.03em] text-[#f8f3e5] [text-shadow:2px_2px_0_rgba(8,10,18,0.62)]">
                  character in focus
                </p>
              </article>

              <article className="absolute right-[6%] top-[12%] h-[34%] w-[38%] rotate-[4deg] overflow-hidden border-2 border-[#f7f0dd]/45 bg-[#0f1530] shadow-[6px_7px_0_rgba(6,8,16,0.45)]">
                <Image
                  src="/members/anya.png"
                  alt="Фрагмент"
                  fill
                  sizes="260px"
                  className="object-cover object-[50%_12%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(64,110,214,0.24),rgba(232,70,94,0.2))]" />
              </article>

              <article className="absolute right-[12%] bottom-[4%] h-[31%] w-[44%] rotate-[-3deg] border-2 border-[#f7f0dd]/46 bg-[#f2e4c6]/92 p-3 text-[#1f2230] shadow-[6px_7px_0_rgba(6,8,16,0.42)]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#3e4156]">doodle note</p>
                <p className="mt-2 font-display text-[1.65rem] uppercase leading-[0.9]">we shoot moments together</p>
              </article>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-[2%] top-[56%] hidden md:block"
                style={shouldReduceMotion ? undefined : { x: filmX, y: filmY, rotate: filmRotate }}
              >
                <motion.div
                  animate={
                    shouldReduceMotion || !allowHeroMotion
                      ? undefined
                      : {
                          y: [0, -4, 0],
                          rotate: [0, 0.9, 0],
                        }
                  }
                  transition={{ duration: 9.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[98px] w-[246px] overflow-hidden border-2 border-[#f7f0df]/5 bg-[#0d1328]/92 shadow-[7px_8px_0_rgba(6,8,16,0.5)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[16px] bg-black/40" />
                  <div className="absolute inset-x-0 bottom-0 h-[16px] bg-black/40" />
                  <div className="absolute inset-x-[14px] top-[4px] flex items-center justify-between">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span key={`top-hole-${index}`} className="h-[5px] w-[9px] bg-[#060910]" />
                    ))}
                  </div>
                  <div className="absolute inset-x-[14px] bottom-[4px] flex items-center justify-between">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span key={`bottom-hole-${index}`} className="h-[5px] w-[9px] bg-[#060910]" />
                    ))}
                  </div>

                  <div className="absolute inset-x-[14px] inset-y-[18px] grid grid-cols-3 gap-1.5">
                    <div className="relative overflow-hidden border border-[#f7f0df]/24">
                      <Image
                        src="/members/varya.png"
                        alt="Пленка"
                        fill
                        sizes="110px"
                        className="object-cover object-[50%_16%]"
                      />
                    </div>
                    <div className="relative overflow-hidden border border-[#f7f0df]/24">
                      <Image
                        src="/members/nikita.png"
                        alt="Пленка"
                        fill
                        sizes="110px"
                        className="object-cover object-[50%_12%]"
                      />
                    </div>
                    <div className="flex items-end border border-[#f7f0df]/24 bg-[#17244a] p-1.5">
                      <p className="text-[7px] uppercase tracking-[0.16em] text-[#f5e9cc]">frame 27</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RevealBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
