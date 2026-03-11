import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";
import { moodWords } from "@/data/moods";

const repeated = [...moodWords, ...moodWords];

export function AtmosphereSection() {
  return (
    <SectionShell id="atmosphere" eyebrow="Texture">
      <Reveal>
        <SectionHeading title={copy.atmosphere.title} subtitle={copy.atmosphere.text} />
      </Reveal>

      <div className="relative mt-12 overflow-hidden rounded-[30px] border border-white/70 bg-white/60 py-8 shadow-[0_16px_60px_rgba(16,23,31,0.14)] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f6f5f2] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f6f5f2] to-transparent" />

        <div className="marquee-left flex min-w-max items-center gap-3 px-3">
          {repeated.map((word, index) => (
            <span
              key={`left-${index}-${word}`}
              className="rounded-full border border-slate-300/65 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.19em] text-slate-500"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="marquee-right mt-5 flex min-w-max items-center gap-3 px-3">
          {[...repeated].reverse().map((word, index) => (
            <span
              key={`right-${index}-${word}`}
              className="rounded-full border border-slate-300/65 bg-[#edf3f5]/80 px-4 py-2 text-xs uppercase tracking-[0.19em] text-slate-500"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
