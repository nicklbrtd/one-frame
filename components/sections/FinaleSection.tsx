import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/data/copy";

export function FinaleSection() {
  return (
    <SectionShell id="finale" className="pb-32 sm:pb-40" eyebrow="Финал">
      <Reveal>
        <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(160deg,rgba(10,12,20,0.92),rgba(8,10,18,0.8))] px-7 py-14 text-center shadow-[0_36px_110px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,61,80,0.18),transparent_35%),radial-gradient(circle_at_82%_16%,rgba(45,91,162,0.18),transparent_38%)]" />
          <h2 className="relative z-10 font-display text-balance text-5xl leading-[0.95] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
            {copy.finale.title}
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{copy.finale.text}</p>
          <p className="relative z-10 mt-12 text-xs uppercase tracking-[0.3em] text-white/52">ПДИВ 2026</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
