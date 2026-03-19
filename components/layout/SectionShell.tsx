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
          <p className="mb-6 inline-flex rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/58 backdrop-blur-lg">
            {eyebrow}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
