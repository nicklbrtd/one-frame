"use client";

import { useEffect, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { copy } from "@/data/copy";

const supportLines = [
  "Мы разные по характеру, но в кадре звучим как одна команда.",
  "Фотография и видео для нас - способ удержать момент и услышать друг друга.",
  "Каждый проект мы проживаем вместе: от идеи до финального кадра.",
];

const moodTags = ["свет", "кадр", "движение", "лица", "время"];

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
    <SectionShell id="about" eyebrow="Глава 02">
      <Reveal>
        <SectionHeading title={copy.about.title} subtitle={copy.about.text} className="max-w-4xl" />
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <article className="relative overflow-hidden border-2 border-[#f6efdb]/38 bg-[linear-gradient(142deg,rgba(20,26,49,0.82),rgba(14,18,34,0.72))] p-6 shadow-[6px_7px_0_rgba(7,9,18,0.5)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />
            <p className="relative inline-flex -rotate-[1.8deg] border border-[#f7efdd]/54 bg-[#f2e4c5]/92 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#20232d]">
              кто мы в этой истории
            </p>

            {enableVariableProximity ? (
              <VariableProximity
                label="Мы не просто группа. Мы одна лента кадров, где у каждого есть свой голос и свой свет."
                fromFontVariationSettings="'wght' 450, 'opsz' 14"
                toFontVariationSettings="'wght' 900, 'opsz' 80"
                falloff="gaussian"
                radius={330}
                className="relative mt-5 block max-w-2xl text-xl leading-relaxed text-[#f8f1df] sm:text-2xl"
              />
            ) : (
              <p className="relative mt-5 max-w-2xl text-xl leading-relaxed text-[#f8f1df] sm:text-2xl">
                Мы не просто группа. Мы одна лента кадров, где у каждого есть свой голос и свой свет.
              </p>
            )}

            <p className="relative mt-5 max-w-xl text-sm leading-relaxed text-[#f7f0dc]/72 sm:text-base">
              Нам важны не идеальные позы, а живые эмоции, честные лица и чувство времени, которое остается
              после просмотра.
            </p>

            <ul className="relative mt-6 flex flex-wrap gap-2">
              {moodTags.map((tag, index) => (
                <li
                  key={tag}
                  className={`border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                    index % 2 === 0
                      ? "border-[#f6efdc]/44 bg-[#173061]/80 text-[#f8f1df]"
                      : "border-[#f6efdc]/44 bg-[#6a2638]/80 text-[#fff3e0]"
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>

          <div className="space-y-4">
            {supportLines.map((line, index) => (
              <div
                key={line}
                className={`relative border-2 p-4 text-sm leading-relaxed text-[#f8f1de] shadow-[4px_5px_0_rgba(7,9,18,0.46)] sm:text-[0.97rem] ${
                  index % 2 === 0
                    ? "-rotate-[1.1deg] border-[#f6efdc]/40 bg-[#1a2f5c]/76"
                    : "rotate-[1deg] border-[#f6efdc]/36 bg-[#622338]/76"
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
