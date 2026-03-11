import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";

export function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="Manifesto">
      <Reveal>
        <SectionHeading title={copy.about.title} subtitle={copy.about.text} />
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <div className="grid gap-6 rounded-[28px] border border-white/65 bg-white/62 p-8 shadow-[0_18px_60px_rgba(17,23,31,0.12)] backdrop-blur-sm sm:grid-cols-3">
          {[
            "Individuality",
            "Togetherness",
            "Atmosphere",
            "Memory",
            "Presence",
            "Identity",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/65 bg-gradient-to-b from-white/70 to-[#edf2f6]/60 px-4 py-5 text-sm uppercase tracking-[0.16em] text-slate-600"
            >
              {item}
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
