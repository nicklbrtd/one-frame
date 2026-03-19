"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";

const principles = [
  "Свет - это не эффект, а эмоция внутри сцены.",
  "Кадр - это не поза, а момент присутствия.",
  "Монтаж - это не склейка, а дыхание истории.",
];

const keywords = ["свет", "кадр", "память", "характер", "фокус", "история"];

export function AtmosphereSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionShell id="manifest" eyebrow="Глава 03">
      <Reveal>
        <SectionHeading title={copy.atmosphere.title} subtitle={copy.atmosphere.text} className="max-w-4xl" />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <motion.article
            className="relative overflow-hidden border-2 border-[#f6efdc]/38 bg-[linear-gradient(150deg,rgba(18,24,46,0.84),rgba(12,16,31,0.75))] p-6 shadow-[6px_7px_0_rgba(7,9,18,0.5)] sm:p-8"
            whileHover={shouldReduceMotion ? undefined : { y: -2, rotate: -0.25 }}
            transition={{ duration: 0.28, ease: [0.2, 0.95, 0.35, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />
            <p className="relative inline-flex -rotate-[2deg] border border-[#f6efdc]/54 bg-[#f2e4c6]/92 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#20232d]">
              мы снимаем время
            </p>

            <h3 className="relative mt-5 max-w-2xl font-display text-4xl uppercase leading-[0.9] tracking-[0.03em] text-[#f8f2e4] [text-shadow:3px_3px_0_rgba(8,10,18,0.66)] sm:text-5xl">
              Мы учимся видеть
              <br />
              через кадр,
              <br />
              свет и друг друга.
            </h3>

            <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-[#f7f0dd]/74 sm:text-base">
              Для нас фотография и видео - это общий язык. Через него мы говорим о характере, доверии и
              моментах, которые нельзя переснять так же.
            </p>
          </motion.article>

          <div className="space-y-4">
            {principles.map((line, index) => (
              <Reveal key={line} delay={0.1 + index * 0.1} y={18}>
                <div
                  className={`relative border-2 p-4 text-sm leading-relaxed text-[#f8f1df] shadow-[4px_5px_0_rgba(7,9,18,0.46)] sm:text-base ${
                    index % 2 === 0
                      ? "-rotate-[0.9deg] border-[#f6efdc]/40 bg-[#1b315f]/74"
                      : "rotate-[0.8deg] border-[#f6efdc]/34 bg-[#622338]/74"
                  }`}
                >
                  {line}
                </div>
              </Reveal>
            ))}

            <div className="mt-5 flex flex-wrap gap-2">
              {keywords.map((word, index) => (
                <span
                  key={word}
                  className={`border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                    index % 2 === 0
                      ? "border-[#f6efdc]/44 bg-[#173061]/80 text-[#f8f1df]"
                      : "border-[#f6efdc]/40 bg-[#6a2638]/80 text-[#fff3df]"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
