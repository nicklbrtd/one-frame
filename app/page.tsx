import { GradualBlur } from "@/components/animations/GradualBlur";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";

const links = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О нас" },
  { id: "members", label: "Участники" },
  { id: "finale", label: "Финал" },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <GrainOverlay />
      <FloatingNav links={links} />
      <GradualBlur
        className="hidden md:block"
        position="top"
        target="page"
        height="4.25rem"
        strength={0.85}
        divCount={3}
        opacity={0.82}
        curve="ease-out"
      />
      <GradualBlur
        className="hidden md:block"
        position="bottom"
        target="page"
        height="4.75rem"
        strength={1.1}
        divCount={3}
        opacity={0.82}
        curve="ease-out"
      />

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,92,122,0.2),transparent_36%),radial-gradient(circle_at_80%_24%,rgba(138,92,255,0.2),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(0,255,209,0.16),transparent_42%),linear-gradient(180deg,#070b12,#05070c)]" />
        <div className="absolute inset-0 bg-black/28" />
      </div>

      <HeroSection />
      <AboutSection />
      <MembersSection />
      <FinaleSection />
    </main>
  );
}
