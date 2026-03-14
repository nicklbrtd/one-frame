import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/data/copy";

export function FinaleSection() {
  return (
    <SectionShell id="finale" className="pb-32 sm:pb-40" eyebrow="Финал">
      <Reveal>
        <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(160deg,rgba(10,16,24,0.88),rgba(10,14,21,0.7))] px-7 py-14 text-center shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:px-14 sm:py-20">
          <h2 className="font-display text-balance text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {copy.finale.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/64 sm:text-lg">{copy.finale.text}</p>
          <p className="mt-12 text-xs uppercase tracking-[0.24em] text-white/42">ПДИВ 2026</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
