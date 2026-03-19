import { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-28 py-24 sm:py-32", className)}>
      <div className="mx-auto w-[min(1140px,92vw)]">
        {eyebrow ? (
          <p className="mb-6 inline-flex -rotate-[1.4deg] border border-[#f6efdb]/48 bg-[#132652]/72 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#f7f0df] shadow-[3px_3px_0_rgba(7,9,18,0.5)]">
            {eyebrow}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
