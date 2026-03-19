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
          className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(160deg,rgba(11,14,24,0.95),rgba(8,10,18,0.86))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.44)] backdrop-blur-xl sm:p-6"
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#c53c54]/30 blur-[74px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-[#3969b8]/24 blur-[78px]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.38)_85%)]" />

          <div className="relative z-10 grid items-center gap-5 md:grid-cols-[220px,1fr]">
            <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-[20px] border border-white/12 bg-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.34)]">
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
              <p className="text-xs uppercase tracking-[0.24em] text-white/58">Преподаватель</p>
              <h3 className="mt-3 font-display text-3xl leading-tight tracking-[0.02em] text-white sm:text-4xl">
                Стрельцова Алла Владимировна
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/74">
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
