import { SectionShell } from "@/components/layout/SectionShell";
import { ParallaxMedia } from "@/components/ui/ParallaxMedia";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { copy } from "@/data/copy";
import { moments } from "@/data/moments";

const cardHeights = ["h-80", "h-[22rem]", "h-72", "h-96", "h-[21rem]", "h-80"];

export function MomentsSection() {
  return (
    <SectionShell id="moments" eyebrow="Память">
      <Reveal>
        <SectionHeading title={copy.moments.title} subtitle={copy.moments.text} />
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" amount={0.1}>
        {moments.map((moment, index) => (
          <StaggerItem key={moment.id}>
            <ParallaxMedia speed={index % 2 === 0 ? 24 : 36}>
              <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(12,18,28,0.92),rgba(9,13,20,0.76))] shadow-[0_22px_72px_rgba(0,0,0,0.34)]">
                <div className={cardHeights[index]} style={{ background: moment.tone }} />
                <div className="p-5">
                  <h3 className="font-display text-2xl text-white">{moment.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{moment.caption}</p>
                </div>
              </article>
            </ParallaxMedia>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
