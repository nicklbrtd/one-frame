"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";
import { Member, members } from "@/data/members";
import styles from "./MembersSection.module.css";

const initialsFromName = (name: string) => {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 1) ?? "").toUpperCase();
};

type CardMode = "desktop" | "mobile";

function MemberCard({ member, mode, onClick }: { member: Member; mode: CardMode; onClick: () => void }) {
  const hasPhoto = Boolean(member.photo);
  const isDesktop = mode === "desktop";

  if (!isDesktop) {
    return (
      <button type="button" onClick={onClick} className={`${styles.card} h-[172px] w-full overflow-hidden rounded-[20px] p-0 text-left`}>
        {member.isFormer ? (
          <p className="absolute right-2 top-2 z-10 -rotate-[1.8deg] border border-[#f6efdc]/48 bg-[#6d2537]/86 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-[#fff3df] shadow-[2px_2px_0_rgba(7,9,18,0.44)]">
            Часть истории
          </p>
        ) : null}

        <div className="absolute inset-0 z-0 overflow-hidden bg-white/8">
          {hasPhoto ? (
            <Image src={member.photo ?? ""} alt={member.name} width={580} height={696} className="h-full w-full object-cover object-center" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-3xl text-white/70">
              {initialsFromName(member.name)}
            </div>
          )}
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#070914f0] via-[#0709147f] to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end px-3 pb-3 pt-2">
          <h3 className="truncate font-display text-[1rem] uppercase leading-none tracking-[0.04em] text-[#f8f1df]">{member.name}</h3>
          <p className="mt-1 min-h-[2.1rem] line-clamp-2 text-[11px] leading-snug text-[#f7f0dd]/84">{member.description}</p>
        </div>
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${styles.card} h-[348px] w-full p-5 text-left`}>
      <div className={styles.media}>
        {hasPhoto ? (
          <Image src={member.photo ?? ""} alt={member.name} width={580} height={696} className={styles.mediaImage} />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-5xl text-white/68">
            {initialsFromName(member.name)}
          </div>
        )}
      </div>
      <div className={styles.scrim} />
      <div className={`${styles.content} flex h-full flex-col justify-end`}>
        {member.isFormer ? (
          <p className="absolute right-3 top-3 -rotate-[1.8deg] border border-[#f6efdc]/46 bg-[#6d2537]/86 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#fff3df] shadow-[2px_2px_0_rgba(7,9,18,0.44)]">
            Часть истории
          </p>
        ) : null}

        <h3 className="max-w-[86%] truncate font-display text-xl uppercase leading-none tracking-[0.04em] text-[#f8f1df]">{member.name}</h3>
        <p className="mt-2 min-h-[2.9rem] line-clamp-2 text-sm leading-relaxed text-[#f7f0dd]/84">{member.description}</p>
      </div>
    </button>
  );
}

export function MembersSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loopMembers = useMemo(() => {
    const activeSource = members.filter((member) => !member.isFormer);
    const activePriority = ["nikita", "maksim"];
    const activeOrdered: Member[] = [
      ...activePriority
        .map((id) => activeSource.find((member) => member.id === id))
        .filter((member): member is Member => Boolean(member)),
      ...activeSource.filter((member) => !activePriority.includes(member.id)),
    ];

    const formerOrdered = members.filter((member) => member.isFormer);
    if (activeOrdered.length === 0 || formerOrdered.length === 0) {
      return members;
    }

    return [...activeOrdered, ...formerOrdered];
  }, []);

  const selectedMember = useMemo(() => members.find((member) => member.id === selectedId) ?? null, [selectedId]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktopLayout(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || loopMembers.length === 0) return;

    const config = isDesktopLayout
      ? {
          cardWidth: 290,
          cardHeight: 348,
          rowGap: 20,
          desiredGap: 20,
          speed: 50,
          minHiddenRunEachSide: 420,
        }
      : {
          cardWidth: 152,
          cardHeight: 172,
          rowGap: 12,
          desiredGap: 12,
          speed: 34,
          minHiddenRunEachSide: 220,
        };

    let animationFrame = 0;
    let previousTimestamp = 0;
    let offset = 0;
    let hasSeededOffset = false;

    const layout = {
      topY: 0,
      bottomY: config.cardHeight + config.rowGap,
      leftX: 0,
      rightX: 0,
      horizontalRun: 0,
      verticalRun: config.cardHeight + config.rowGap,
      perimeter: 0,
      spacing: 0,
      stageHeight: config.cardHeight * 2 + config.rowGap,
    };

    const recalculate = () => {
      const stageWidth = stage.clientWidth;
      const visibleRun = Math.max(stageWidth - config.cardWidth, 1);
      const requiredPerimeter = loopMembers.length * (config.cardWidth + config.desiredGap);
      const minHorizontalForSpacing = requiredPerimeter / 2 - layout.verticalRun;
      const horizontalRun = Math.max(visibleRun + config.minHiddenRunEachSide * 2, minHorizontalForSpacing);

      const hiddenRunEachSide = (horizontalRun - visibleRun) / 2;
      layout.horizontalRun = horizontalRun;
      layout.leftX = -hiddenRunEachSide;
      layout.rightX = visibleRun + hiddenRunEachSide;
      layout.perimeter = 2 * (layout.horizontalRun + layout.verticalRun);
      layout.spacing = layout.perimeter / loopMembers.length;
      stage.style.height = `${layout.stageHeight}px`;

      if (!hasSeededOffset) {
        offset = hiddenRunEachSide;
        hasSeededOffset = true;
      }
    };

    const pointAt = (distance: number) => {
      const loop = layout.perimeter;
      let d = ((distance % loop) + loop) % loop;

      if (d < layout.horizontalRun) {
        return { x: layout.rightX - d, y: layout.topY };
      }

      d -= layout.horizontalRun;
      if (d < layout.verticalRun) {
        return { x: layout.leftX, y: layout.topY + d };
      }

      d -= layout.verticalRun;
      if (d < layout.horizontalRun) {
        return { x: layout.leftX + d, y: layout.bottomY };
      }

      d -= layout.horizontalRun;
      return { x: layout.rightX, y: layout.bottomY - d };
    };

    const frame = (timestamp: number) => {
      if (!previousTimestamp) previousTimestamp = timestamp;
      const deltaSeconds = (timestamp - previousTimestamp) / 1000;
      previousTimestamp = timestamp;
      offset += config.speed * deltaSeconds;

      for (let index = 0; index < loopMembers.length; index += 1) {
        const card = itemRefs.current[index];
        if (!card) continue;
        const baseDistance = index * layout.spacing;
        const { x, y } = pointAt(baseDistance + offset);
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(frame);
    };

    recalculate();
    animationFrame = window.requestAnimationFrame(frame);

    const resizeObserver = new ResizeObserver(() => {
      recalculate();
    });
    resizeObserver.observe(stage);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [isDesktopLayout, loopMembers]);

  const cardWidth = isDesktopLayout ? 290 : 152;
  const cardMode: CardMode = isDesktopLayout ? "desktop" : "mobile";

  return (
    <SectionShell id="members" eyebrow="Глава 05">
      <Reveal>
        <SectionHeading title={copy.members.title} subtitle={copy.members.text} />
      </Reveal>

      <Reveal delay={0.06} className="mt-6">
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em]">
          <span className="border border-[#f6efdc]/44 bg-[#173061]/80 px-3 py-1 text-[#f8f1df]">кто-то есть</span>
          <span className="border border-[#f6efdc]/44 bg-[#6a2638]/80 px-3 py-1 text-[#fff3df]">кого-то нет</span>
        </div>
      </Reveal>

      <div
        className={`relative mt-8 overflow-hidden border-2 border-[#f6efdc]/26 bg-[linear-gradient(160deg,rgba(12,16,30,0.9),rgba(9,12,22,0.78))] shadow-[7px_8px_0_rgba(7,9,18,0.48)] ${
          isDesktopLayout ? "rounded-[30px] p-5" : "rounded-[26px] p-3"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_16%,rgba(229,65,92,0.18),transparent_38%),radial-gradient(circle_at_84%_18%,rgba(56,107,218,0.18),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(247,239,220,0.9)_0.7px,transparent_0.9px)] [background-size:8px_8px]" />
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-[#060710] via-[#060710d9] to-transparent ${isDesktopLayout ? "w-28" : "w-8"}`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-[#060710] via-[#060710d9] to-transparent ${isDesktopLayout ? "w-28" : "w-8"}`} />

        <div ref={stageRef} className={styles.loopStage}>
          {loopMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={styles.loopItem}
              style={{ width: `${cardWidth}px` }}
            >
              <MemberCard member={member} mode={cardMode} onClick={() => setSelectedId(member.id)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5 md:backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.2, 0.95, 0.35, 1] }}
              className="w-full max-w-xl rounded-[30px] border-2 border-[#f6efdc]/36 bg-[linear-gradient(160deg,rgba(15,19,36,0.94),rgba(10,13,25,0.9))] p-8 shadow-[8px_9px_0_rgba(7,9,18,0.5)]"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="inline-flex -rotate-[1.4deg] border border-[#f6efdc]/48 bg-[#f2e4c6]/90 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1f2230]">
                Портрет участника
              </p>
              <div className="mt-4 h-48 w-48 overflow-hidden rounded-2xl border-2 border-[#f6efdc]/34 bg-white/8 shadow-[4px_5px_0_rgba(7,9,18,0.42)]">
                {selectedMember.photo ? (
                  <Image
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover object-[50%_14%]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-5xl text-white/68">
                    {initialsFromName(selectedMember.name)}
                  </div>
                )}
              </div>
              <h3 className="mt-4 font-display text-5xl uppercase tracking-[0.03em] text-[#f8f1df]">{selectedMember.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#f7f0dd]/78">{selectedMember.description}</p>

              {selectedMember.isFormer ? (
                <div className="mt-6 inline-flex -rotate-[1.8deg] border border-[#f6efdc]/48 bg-[#6d2537]/86 px-3 py-2 text-sm uppercase tracking-[0.14em] text-[#fff3df]">
                  Часть нашей истории
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mt-7 border border-[#f6efdc]/48 bg-[#1a3365]/78 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#f8f1df] transition hover:bg-[#234281]"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}
