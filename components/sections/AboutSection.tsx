"use client";

import { useEffect, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { copy } from "@/data/copy";

const manifestoPoints = [
  "Мы снимаем не только события, но и характер людей в моменте.",
  "Мы учимся чувствовать свет, чтобы кадр был живым, а не формальным.",
  "Мы работаем как команда, где каждый взгляд усиливает общий результат.",
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
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <article className="relative pl-6 sm:pl-8">
            <span className="absolute left-0 top-1 h-[88%] w-px bg-gradient-to-b from-[#d13d50] via-white/38 to-transparent" />

            {enableVariableProximity ? (
              <VariableProximity
                label="Фотография и видео для нас — способ удерживать время и делать его человеческим: через лица, тишину, движение и свет."
                fromFontVariationSettings="'wght' 360, 'opsz' 14"
                toFontVariationSettings="'wght' 920, 'opsz' 88"
                falloff="gaussian"
                radius={360}
                className="block max-w-2xl text-xl leading-relaxed text-white/82 sm:text-2xl"
              />
            ) : (
              <p className="max-w-2xl text-xl leading-relaxed text-white/82 sm:text-2xl">
                Фотография и видео для нас — способ удерживать время и делать его человеческим: через лица,
                тишину, движение и свет.
              </p>
            )}

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/64 sm:text-base">
              Мы строим общий визуальный язык, в котором важны не эффекты ради эффектов, а правда кадра,
              настроение и уважение к человеку перед камерой.
            </p>
          </article>

          <div className="space-y-5">
            {manifestoPoints.map((point) => (
              <div key={point} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d13d50]/90 shadow-[0_0_14px_rgba(209,61,80,0.65)]" />
                <p className="text-base leading-relaxed text-white/72">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
