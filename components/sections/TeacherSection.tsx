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
          subtitle="Человек, который помогает нам видеть в кадре больше и чувствовать историю глубже."
          className="max-w-4xl"
        />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <motion.article
          className="relative overflow-hidden border-2 border-[#f6efdc]/38 bg-[linear-gradient(152deg,rgba(19,25,47,0.78),rgba(14,18,33,0.72))] shadow-[7px_8px_0_rgba(7,9,18,0.5)]"
          whileHover={shouldReduceMotion ? undefined : { y: -3, rotate: -0.3 }}
          transition={{ duration: 0.26, ease: [0.2, 0.95, 0.35, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />
          <div className="relative z-10 grid md:grid-cols-[minmax(0,330px)_1fr]">
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
              <p className="absolute bottom-4 left-4 -rotate-[2deg] border border-[#f6efdc]/56 bg-[#f2e4c6]/90 px-2 py-1 text-[9px] uppercase tracking-[0.15em] text-[#1f2230]">
                mentor spotlight
              </p>
            </div>

            <div className="p-7 sm:p-10 md:p-12">
              <p className="inline-flex -rotate-[1deg] border border-[#f6efdb]/42 bg-[#173061]/78 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f7f0df]">
                классный руководитель
              </p>
              <h3 className="mt-4 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-[#f8f1e3] [text-shadow:3px_3px_0_rgba(8,10,18,0.64)] sm:text-5xl">
                Стрельцова
                <br />
                Алла Владимировна
              </h3>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#f7f0dd]/78 sm:text-lg">
                Благодаря ее поддержке мы не боимся экспериментировать, искать свой стиль и делать кадр живым,
                а не шаблонным.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#f7f0dc]/64 sm:text-base">
                Это место, где дисциплина и творчество работают вместе: от идеи и раскадровки до финальной
                монтажной точки.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em]">
                <span className="border border-[#f6efdc]/42 bg-[#692537]/78 px-2 py-1 text-[#f8f1df]">frame guidance</span>
                <span className="border border-[#f6efdc]/42 bg-[#173061]/78 px-2 py-1 text-[#f8f1df]">light direction</span>
                <span className="border border-[#f6efdc]/42 bg-[#2d234f]/78 px-2 py-1 text-[#f8f1df]">story feedback</span>
              </div>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </SectionShell>
  );
}
