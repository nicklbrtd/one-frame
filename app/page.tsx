import { GradualBlur } from "@/components/animations/GradualBlur";
import { ThreadsBackground } from "@/components/backgrounds/ThreadsBackground";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { TeacherSection } from "@/components/sections/TeacherSection";

const links = [
  { id: "home", label: "Начало" },
  { id: "about", label: "Кто мы" },
  { id: "teacher", label: "Преп." },
  { id: "members", label: "Студенты" },
  { id: "finale", label: "Концовка" },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="hidden md:block">
        <GrainOverlay />
      </div>
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
        <ThreadsBackground amplitude={1} distance={0} enableMouseInteraction />
        <div className="absolute inset-0 bg-black/28" />
      </div>

      <HeroSection />
      <AboutSection />
      <TeacherSection />
      <MembersSection />
      <FinaleSection />
    </main>
  );
}
