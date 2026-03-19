import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="font-display text-balance text-5xl uppercase leading-[0.9] tracking-[0.04em] text-[#f7f1e2] [text-shadow:3px_3px_0_rgba(8,10,18,0.64)] sm:text-6xl lg:text-[4.5rem]">
        {title}
      </h2>
      {subtitle ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f5efdc]/78 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
