"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { copy } from "@/data/copy";

export function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="Манифест">
      <Reveal>
        <SectionHeading title={copy.about.title} />
        <VariableProximity
          label={copy.about.text}
          fromFontVariationSettings="'wght' 320, 'opsz' 12"
          toFontVariationSettings="'wght' 980, 'opsz' 96"
          falloff="gaussian"
          radius={360}
          className="mt-5 block max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg"
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <div className="grid gap-6 rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(12,18,28,0.88),rgba(8,12,18,0.74))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:grid-cols-3">
          {[
            "Индивидуальность",
            "Единство",
            "Атмосфера",
            "Память",
            "Присутствие",
            "Идентичность",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-gradient-to-b from-white/8 to-white/[0.03] px-4 py-5 text-sm uppercase tracking-[0.16em] text-white/64"
            >
              {item}
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
