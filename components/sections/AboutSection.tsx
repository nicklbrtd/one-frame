"use client";

import { useEffect, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { copy } from "@/data/copy";

const manifestoPoints = [
  "снимаем моменты так, чтобы в кадре оставались эмоции, а не только картинка",
  "учимся работать со светом и движением как с языком истории",
  "делаем проекты вместе: от идеи и раскадровки до финального монтажа",
];

export function AboutSection() {
  const [enableVariableProximity, setEnableVariableProximity] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 721px)");
    const update = () => setEnableVariableProximity(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <SectionShell id="about" eyebrow="Манифест">
      <Reveal>
        <SectionHeading title={copy.about.title} subtitle={copy.about.text} className="max-w-4xl" />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <article className="relative overflow-hidden border-2 border-[#f6efdb]/38 bg-[linear-gradient(145deg,rgba(20,28,52,0.8),rgba(15,19,36,0.68))] p-6 shadow-[6px_7px_0_rgba(7,9,18,0.48)] sm:p-8">
            <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rotate-[12deg] border border-[#f7efdc]/36" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />

            <p className="relative inline-flex -rotate-[2deg] border border-[#f7efdd]/54 bg-[#f2e4c5]/92 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#20232d]">
              group manifesto
            </p>

            {enableVariableProximity ? (
              <VariableProximity
                label="Фотография и видео для нас — это способ говорить о людях честно, ярко и по-настоящему живо."
                fromFontVariationSettings="'wght' 420, 'opsz' 14"
                toFontVariationSettings="'wght' 900, 'opsz' 80"
                falloff="gaussian"
                radius={340}
                className="relative mt-5 block max-w-2xl text-xl leading-relaxed text-[#f8f1df] sm:text-2xl"
              />
            ) : (
              <p className="relative mt-5 max-w-2xl text-xl leading-relaxed text-[#f8f1df] sm:text-2xl">
                Фотография и видео для нас — это способ говорить о людях честно, ярко и по-настоящему живо.
              </p>
            )}

            <p className="relative mt-5 max-w-xl text-sm leading-relaxed text-[#f7f0dc]/68 sm:text-base">
              Мы не хотим стерильных кадров. Нам важны характер, энергия и чувство времени, которое остается в
              памяти после просмотра.
            </p>
          </article>

          <div className="space-y-4">
            {manifestoPoints.map((point, index) => (
              <div
                key={point}
                className={`relative border-2 p-4 text-sm uppercase leading-relaxed tracking-[0.08em] text-[#f8f1de] shadow-[4px_5px_0_rgba(7,9,18,0.46)] sm:text-[0.95rem] ${
                  index % 2 === 0
                    ? "-rotate-[1.2deg] border-[#f6efdc]/42 bg-[#172b57]/74"
                    : "rotate-[1deg] border-[#f6efdc]/36 bg-[#682538]/74"
                }`}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
