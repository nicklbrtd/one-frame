import { FloatingNav } from "@/components/layout/FloatingNav";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { MomentsSection } from "@/components/sections/MomentsSection";

const links = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "members", label: "People" },
  { id: "atmosphere", label: "Mood" },
  { id: "moments", label: "Moments" },
  { id: "finale", label: "Finale" },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <GrainOverlay />
      <FloatingNav links={links} />

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,#e4edf1_0%,#f6f5f2_45%,#f6f5f2_100%)]" />
      </div>

      <HeroSection />
      <AboutSection />
      <MembersSection />
      <AtmosphereSection />
      <MomentsSection />
      <FinaleSection />
    </main>
  );
}
