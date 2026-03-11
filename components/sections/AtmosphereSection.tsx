import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";
import { moodWords } from "@/data/moods";

const repeated = [...moodWords, ...moodWords];

export function AtmosphereSection() {
  return (
    <SectionShell id="atmosphere" eyebrow="Фактура">
      <Reveal>
        <SectionHeading title={copy.atmosphere.title} subtitle={copy.atmosphere.text} />
      </Reveal>

      <div className="relative mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(11,17,26,0.9),rgba(8,12,18,0.76))] py-8 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#06090f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#06090f] to-transparent" />

        <div className="marquee-left flex min-w-max items-center gap-3 px-3">
          {repeated.map((word, index) => (
            <span
              key={`left-${index}-${word}`}
              className="rounded-full border border-white/8 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.19em] text-white/56"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="marquee-right mt-5 flex min-w-max items-center gap-3 px-3">
          {[...repeated].reverse().map((word, index) => (
            <span
              key={`right-${index}-${word}`}
              className="rounded-full border border-[#7ad5cf]/12 bg-[#7ad5cf]/8 px-4 py-2 text-xs uppercase tracking-[0.19em] text-white/58"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
