import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="font-display text-balance text-5xl leading-[0.95] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
