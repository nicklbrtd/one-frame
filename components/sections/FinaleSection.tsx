import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { copy } from "@/data/copy";

export function FinaleSection() {
  return (
    <SectionShell id="finale" className="pb-32 sm:pb-40" eyebrow="Finale">
      <Reveal>
        <div className="rounded-[34px] border border-white/75 bg-white/65 px-7 py-14 text-center shadow-[0_24px_80px_rgba(16,23,31,0.14)] backdrop-blur-md sm:px-14 sm:py-20">
          <h2 className="font-display text-balance text-5xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl">
            {copy.finale.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{copy.finale.text}</p>
          <p className="mt-12 text-xs uppercase tracking-[0.24em] text-slate-500">College Group 2026</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
