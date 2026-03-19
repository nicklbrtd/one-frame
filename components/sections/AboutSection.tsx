"use client";

import { useEffect, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { copy } from "@/data/copy";

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
        <SectionHeading title={copy.about.title} />
        {enableVariableProximity ? (
          <VariableProximity
            label={copy.about.text}
            fromFontVariationSettings="'wght' 320, 'opsz' 12"
            toFontVariationSettings="'wght' 980, 'opsz' 96"
            falloff="gaussian"
            radius={360}
            className="mt-5 block max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg"
          />
        ) : (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">{copy.about.text}</p>
        )}
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(12,14,24,0.9),rgba(8,10,18,0.82))] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:grid-cols-3">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(209,61,80,0.16),transparent_35%),radial-gradient(circle_at_82%_18%,rgba(45,91,162,0.16),transparent_38%)]" />
          <div className="relative z-10 grid gap-6 sm:grid-cols-3">
          {[
            "сюда можно что-то вставить",
            "сюда можно что-то вставить",
            "сюда можно что-то вставить",
            "сюда можно что-то вставить",
            "сюда можно что-то вставить",
            "сюда можно что-то вставить",
          ].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.1] to-white/[0.02] px-4 py-5 text-sm uppercase tracking-[0.18em] text-white/72"
            >
              {item}
            </div>
          ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
