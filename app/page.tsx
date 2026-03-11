import { GradualBlur } from "@/components/animations/GradualBlur";
import { ColorBends } from "@/components/backgrounds/ColorBends";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { MomentsSection } from "@/components/sections/MomentsSection";

const links = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О нас" },
  { id: "members", label: "Участники" },
  { id: "atmosphere", label: "Атмосфера" },
  { id: "moments", label: "Моменты" },
  { id: "finale", label: "Финал" },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <GrainOverlay />
      <FloatingNav links={links} />
      <GradualBlur
        position="top"
        target="page"
        height="4.25rem"
        strength={0.85}
        divCount={3}
        opacity={0.82}
        curve="ease-out"
      />
      <GradualBlur
        position="bottom"
        target="page"
        height="4.75rem"
        strength={1.1}
        divCount={3}
        opacity={0.82}
        curve="ease-out"
      />

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <ColorBends
          className="h-full w-full"
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
        <div className="absolute inset-0 bg-black/28" />
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
