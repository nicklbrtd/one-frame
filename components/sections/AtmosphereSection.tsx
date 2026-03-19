"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { DoodleArrow, DoodleCross } from "@/components/ui/Doodles";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";

const pulseTags = ["свет", "ритм", "фокус", "вспышка", "кадр 03"];

export function AtmosphereSection() {
  const stageRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });

  const beamX = useTransform(scrollYProgress, [0, 1], [-140, 140]);
  const beamRotate = useTransform(scrollYProgress, [0, 1], [-11, 11]);

  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.12, 0.92]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  const cardA = {
    y: useTransform(scrollYProgress, [0, 1], [86, -54]),
    rotate: useTransform(scrollYProgress, [0, 1], [-12, 8]),
  };
  const cardB = {
    y: useTransform(scrollYProgress, [0, 1], [-62, 62]),
    rotate: useTransform(scrollYProgress, [0, 1], [10, -8]),
  };
  const cardC = {
    y: useTransform(scrollYProgress, [0, 1], [56, -42]),
    rotate: useTransform(scrollYProgress, [0, 1], [7, -6]),
  };

  return (
    <SectionShell id="impact" eyebrow="Глава 03">
      <Reveal>
        <SectionHeading title={copy.atmosphere.title} subtitle={copy.atmosphere.text} className="max-w-4xl" />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <section
          ref={stageRef}
          className="relative min-h-[32rem] overflow-hidden border-2 border-[#f6efdc]/36 bg-[linear-gradient(150deg,rgba(15,20,39,0.86),rgba(9,13,26,0.78))] p-6 shadow-[8px_9px_0_rgba(7,9,18,0.5)] sm:p-8 md:min-h-[34rem]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.8px,transparent_1px)] [background-size:8px_8px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_26%,rgba(229,66,93,0.24),transparent_42%),radial-gradient(circle_at_84%_24%,rgba(60,110,225,0.24),transparent_44%),radial-gradient(circle_at_52%_78%,rgba(245,212,138,0.16),transparent_40%)]" />
          <DoodleArrow
            className="pointer-events-none absolute left-[6%] top-[8%] hidden h-14 w-36 rotate-[-10deg] lg:block"
            color="rgba(244, 233, 206, 0.66)"
            delay={0.24}
            duration={1.04}
          />
          <DoodleCross
            className="pointer-events-none absolute right-[8%] top-[14%] hidden h-7 w-7 lg:block"
            color="rgba(233, 225, 204, 0.54)"
            delay={0.52}
            duration={0.64}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-[12%] top-[46%] h-24 w-[58%] bg-[linear-gradient(90deg,transparent,rgba(240,200,124,0.2),rgba(104,148,236,0.24),transparent)] blur-[10px]"
            style={shouldReduceMotion ? undefined : { x: beamX, rotate: beamRotate }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f6efdc]/28"
            style={shouldReduceMotion ? undefined : { scale: coreScale, rotate: coreRotate }}
          >
            <motion.div
              className="absolute inset-4 rounded-full border border-[#f6efdc]/24"
              animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(243,223,178,0.9)_0%,rgba(233,75,102,0.24)_46%,rgba(68,119,228,0.2)_100%)]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.46, 0.9, 0.46],
                      scale: [0.92, 1.08, 0.92],
                    }
              }
              transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>

          <motion.article
            className="absolute left-[5%] top-[14%] w-[min(25rem,78vw)] border-2 border-[#f6efdc]/44 bg-[#173061]/78 p-4 text-[#f8f1df] shadow-[5px_6px_0_rgba(7,9,18,0.46)]"
            style={shouldReduceMotion ? undefined : { y: cardA.y, rotate: cardA.rotate }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f8f1df]/74">вспышка</p>
            <p className="mt-2 font-display text-3xl uppercase leading-[0.92]">Крути страницу - и кадр оживает.</p>
          </motion.article>

          <motion.article
            className="absolute right-[6%] top-[18%] w-[min(20rem,66vw)] border-2 border-[#f6efdc]/42 bg-[#692537]/78 p-4 text-[#fff3df] shadow-[5px_6px_0_rgba(7,9,18,0.46)]"
            style={shouldReduceMotion ? undefined : { y: cardB.y, rotate: cardB.rotate }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#fff3df]/72">момент</p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">Тут свет, движение и лица собираются в один нервный, живой ритм.</p>
          </motion.article>

          <motion.article
            className="absolute bottom-[10%] right-[14%] w-[min(22rem,72vw)] border-2 border-[#f6efdc]/44 bg-[#f2e4c6]/92 p-4 text-[#1f2230] shadow-[5px_6px_0_rgba(7,9,18,0.42)]"
            style={shouldReduceMotion ? undefined : { y: cardC.y, rotate: cardC.rotate }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3e4156]">пометка</p>
            <p className="mt-2 font-display text-3xl uppercase leading-[0.9]">Сцена меняется от твоего скролла</p>
          </motion.article>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
            {pulseTags.map((tag, index) => (
              <span
                key={tag}
                className={`border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                  index % 2 === 0
                    ? "border-[#f6efdc]/44 bg-[#173061]/80 text-[#f8f1df]"
                    : "border-[#f6efdc]/44 bg-[#6a2638]/80 text-[#fff3df]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </Reveal>
    </SectionShell>
  );
}
