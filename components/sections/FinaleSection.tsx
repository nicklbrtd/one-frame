import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/data/copy";

export function FinaleSection() {
  return (
    <SectionShell id="finale" className="pb-36 sm:pb-44" eyebrow="Финал">
      <Reveal>
        <div className="relative text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c73950]/22 blur-[108px]" />
          <div className="pointer-events-none absolute left-[30%] top-[40%] h-[14rem] w-[14rem] rounded-full bg-[#3d67b3]/18 blur-[96px]" />

          <h2 className="relative font-display text-balance text-6xl leading-[0.9] tracking-[0.03em] text-[#f2f6ff] sm:text-7xl lg:text-[6.6rem]">
            {copy.finale.title}
          </h2>
          <p className="relative mx-auto mt-7 max-w-3xl text-balance text-lg leading-relaxed text-white/74 sm:text-xl">
            {copy.finale.text}
          </p>

          <p className="relative mt-14 text-[10px] uppercase tracking-[0.34em] text-white/50">ПДИВ 2026</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
