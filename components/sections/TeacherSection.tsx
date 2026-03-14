"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeacherSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell id="teacher" eyebrow="Наставник" className="py-16 sm:py-20">
      <Reveal>
        <SectionHeading
          title="Классный руководитель"
          subtitle=""
        />
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <motion.article
          className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(12,18,28,0.94),rgba(9,13,20,0.86))] p-4 shadow-[0_20px_64px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6"
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#f08f8f]/25 blur-[74px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-[#8eb9ff]/20 blur-[78px]" />

          <div className="relative z-10 grid items-center gap-5 md:grid-cols-[220px,1fr]">
            <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[20px] border border-white/10 bg-white/8">
              <Image
                src="/members/alla.png"
                alt="Преподаватель"
                width={640}
                height={640}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/46">Преподаватель</p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl">
                Стрельцова Алла Владимировна
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/72">
                сюда можно что-то вставить
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/62">
                сюда можно что-то вставить
              </p>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </SectionShell>
  );
}
