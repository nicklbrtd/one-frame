"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeacherSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell id="teacher" eyebrow="Наставник">
      <Reveal>
        <SectionHeading
          title="Наш преподаватель"
          subtitle="Человек, который ведет нас через сложные темы, поддерживает и помогает расти."
        />
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <motion.article
          className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(160deg,rgba(12,18,28,0.94),rgba(9,13,20,0.86))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8"
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#f08f8f]/25 blur-[74px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-[#8eb9ff]/20 blur-[78px]" />

          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[280px,1fr]">
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[22px] border border-white/10 bg-white/8">
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
              <h3 className="mt-3 font-display text-4xl text-white sm:text-5xl">Алла</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                Здесь будет текст о преподавателе: вклад, стиль преподавания и то, за что мы ценим ее больше всего.
              </p>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </SectionShell>
  );
}
