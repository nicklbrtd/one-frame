import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="font-display text-balance text-4xl leading-[1.06] text-slate-900 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
