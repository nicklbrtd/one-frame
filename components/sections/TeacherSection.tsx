"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeacherSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell id="teacher" eyebrow="Наставник" className="py-18 sm:py-22">
      <Reveal>
        <SectionHeading
          title="Наставник Нашей Группы"
          subtitle="Человек, который помогает нам видеть в кадре больше, чем просто изображение."
          className="max-w-4xl"
        />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <motion.article
          className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(154deg,rgba(14,16,24,0.86),rgba(10,12,20,0.56))] shadow-[0_34px_110px_rgba(0,0,0,0.5)]"
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(215,123,88,0.2),transparent_36%),radial-gradient(circle_at_84%_20%,rgba(52,94,176,0.18),transparent_40%)]" />
          <div className="relative z-10 grid md:grid-cols-[minmax(0,320px)_1fr]">
            <div className="relative h-[22rem] md:h-full">
              <Image
                src="/members/alla.png"
                alt="Стрельцова Алла Владимировна"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.26)_68%,rgba(0,0,0,0.58)_100%)]" />
              <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.22em] text-white/66">
                Mentor Portrait
              </p>
            </div>

            <div className="p-7 sm:p-10 md:p-12">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/56">Классный руководитель</p>
              <h3 className="mt-3 font-display text-4xl leading-[0.95] tracking-[0.02em] text-white sm:text-5xl">
                Стрельцова
                <br />
                Алла Владимировна
              </h3>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">
                Благодаря ее поддержке мы не боимся искать собственный визуальный голос, работать с характером
                и строить кадр с вниманием к деталям.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                Это спокойная, требовательная и вдохновляющая школа взгляда: где дисциплина кадра сочетается
                с уважением к личности и творческой свободе.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/54">
                <span className="h-px w-10 bg-gradient-to-r from-[#d13d50] to-white/20" />
                guidance in light and frame
              </div>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </SectionShell>
  );
}
