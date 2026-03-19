import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/data/copy";

export function FinaleSection() {
  return (
    <SectionShell id="finale" className="pb-36 sm:pb-44" eyebrow="Финал">
      <Reveal>
        <div className="relative overflow-hidden border-2 border-[#f6efdc]/38 bg-[linear-gradient(150deg,rgba(16,22,42,0.74),rgba(13,17,32,0.7))] px-6 py-16 text-center shadow-[7px_8px_0_rgba(7,9,18,0.5)] sm:px-12 sm:py-22">
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />
          <div className="pointer-events-none absolute left-[14%] top-[16%] h-12 w-12 rotate-[15deg] border border-[#f6efdc]/34" />
          <div className="pointer-events-none absolute right-[10%] bottom-[18%] h-14 w-14 rounded-full border border-[#f6efdc]/28" />

          <p className="relative mx-auto inline-flex -rotate-[2deg] border border-[#f6efdc]/56 bg-[#f2e4c6]/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#1f2230]">
            the next chapter
          </p>

          <h2 className="relative mt-6 font-display text-balance text-6xl uppercase leading-[0.88] tracking-[0.04em] text-[#f7f1e3] [text-shadow:4px_4px_0_rgba(8,10,18,0.66)] sm:text-7xl lg:text-[6.5rem]">
            {copy.finale.title}
          </h2>
          <p className="relative mx-auto mt-7 max-w-3xl text-balance text-lg leading-relaxed text-[#f7f0dd]/76 sm:text-xl">
            {copy.finale.text}
          </p>

          <div className="relative mt-12 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em]">
            <span className="border border-[#f6efdc]/42 bg-[#173061]/78 px-2 py-1 text-[#f8f1df]">archive</span>
            <span className="border border-[#f6efdc]/42 bg-[#692537]/78 px-2 py-1 text-[#f8f1df]">memory</span>
            <span className="border border-[#f6efdc]/42 bg-[#2d234f]/78 px-2 py-1 text-[#f8f1df]">next frame</span>
          </div>

          <p className="relative mt-12 text-[10px] uppercase tracking-[0.34em] text-[#f7f0dd]/52">ПДИВ 2026</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
