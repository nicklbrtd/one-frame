import { ThreadsBackground } from "@/components/backgrounds/ThreadsBackground";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { TeacherSection } from "@/components/sections/TeacherSection";

const links = [
  { id: "home", label: "Начало" },
  { id: "about", label: "Кто мы" },
  { id: "manifest", label: "Манифест" },
  { id: "teacher", label: "Преп." },
  { id: "members", label: "Состав" },
  { id: "finale", label: "Финал" },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="hidden md:block">
        <GrainOverlay />
      </div>
      <FloatingNav links={links} />

      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <ThreadsBackground amplitude={0.9} distance={0.12} enableMouseInteraction />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(227,63,93,0.22),transparent_44%),radial-gradient(circle_at_84%_14%,rgba(62,111,224,0.2),transparent_48%),linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.5))]" />
      </div>

      <HeroSection />
      <AboutSection />
      <AtmosphereSection />
      <TeacherSection />
      <MembersSection />
      <FinaleSection />
    </main>
  );
}
