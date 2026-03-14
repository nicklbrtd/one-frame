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
      <button
        type="button"
        onClick={onClick}
        className={`${styles.card} h-[172px] w-full overflow-hidden rounded-[20px] p-0 text-left`}
      >
        {member.isFormer ? (
          <p className="absolute right-2 top-2 z-10 rounded-full border border-white/25 bg-black/28 px-2 py-1 text-[8px] uppercase tracking-[0.11em] text-white/76">
            Уже не с нами
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

        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#05080ef0] via-[#05080e66] to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end px-3 pb-3 pt-2">
          <h3 className="truncate font-display text-[0.95rem] leading-none text-white">{member.name}</h3>
          <p className="mt-1 min-h-[2.1rem] line-clamp-2 text-[11px] leading-snug text-white/74">{member.description}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.card} h-[348px] w-full p-5 text-left`}
    >
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
          <p className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/26 px-3 py-1 text-[10px] uppercase tracking-[0.13em] text-white/76">
            Уже не с нами
          </p>
        ) : null}

        <h3 className="max-w-[86%] truncate font-display text-lg leading-none text-white">{member.name}</h3>
        <p className="mt-2 min-h-[2.9rem] line-clamp-2 text-sm leading-relaxed text-white/74">{member.description}</p>
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
    const active = members.filter((member) => !member.isFormer);
    const former = members.filter((member) => member.isFormer);
    if (former.length === 0 || active.length === 0) return members;

    const buckets: Member[][] = active.map(() => []);
    for (let index = 0; index < former.length; index += 1) {
      buckets[index % buckets.length].push(former[index]);
    }

    const arranged: Member[] = [];
    for (let index = 0; index < active.length; index += 1) {
      arranged.push(active[index], ...buckets[index]);
    }
    return arranged;
  }, []);

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedId) ?? null,
    [selectedId],
  );

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
          speed: 46,
          minHiddenRunEachSide: 420,
        }
      : {
          cardWidth: 152,
          cardHeight: 172,
          rowGap: 12,
          desiredGap: 12,
          speed: 38,
          minHiddenRunEachSide: 220,
        };

    let stageWidth = stage.clientWidth;
    let animationFrame = 0;
    let previousTimestamp = 0;
    let offset = 0;

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
      stageWidth = stage.clientWidth;
      const visibleRun = Math.max(stageWidth - config.cardWidth, 1);
      const requiredPerimeter = loopMembers.length * (config.cardWidth + config.desiredGap);
      const minHorizontalForSpacing = requiredPerimeter / 2 - layout.verticalRun;
      const horizontalRun = Math.max(
        visibleRun + config.minHiddenRunEachSide * 2,
        minHorizontalForSpacing,
      );

      const hiddenRunEachSide = (horizontalRun - visibleRun) / 2;
      layout.horizontalRun = horizontalRun;
      layout.leftX = -hiddenRunEachSide;
      layout.rightX = visibleRun + hiddenRunEachSide;
      layout.perimeter = 2 * (layout.horizontalRun + layout.verticalRun);
      layout.spacing = layout.perimeter / loopMembers.length;
      stage.style.height = `${layout.stageHeight}px`;
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
    <SectionShell id="members" eyebrow="Люди">
      <Reveal>
        <SectionHeading title={copy.members.title} subtitle={copy.members.text} />
      </Reveal>

      <div
        className={`relative mt-12 overflow-hidden border border-white/10 bg-[linear-gradient(160deg,rgba(11,17,26,0.9),rgba(8,12,18,0.76))] shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl ${
          isDesktopLayout ? "rounded-[30px] p-5" : "rounded-[26px] p-3"
        }`}
      >
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-[#06090f] to-transparent ${isDesktopLayout ? "w-24" : "w-8"}`} />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-[#06090f] to-transparent ${isDesktopLayout ? "w-24" : "w-8"}`} />

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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/58 px-5 md:backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(10,16,24,0.94),rgba(10,14,21,0.86))] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.42)]"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">Портрет участника</p>
              <div className="mt-4 h-48 w-48 overflow-hidden rounded-2xl border border-white/10 bg-white/8">
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
              <h3 className="mt-4 font-display text-5xl text-white">{selectedMember.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/64">{selectedMember.description}</p>

              {selectedMember.isFormer ? (
                <div className="mt-6 rounded-xl border border-rose-200/25 bg-rose-100/10 px-4 py-3 text-sm text-rose-100/80">
                  Уже не с нами
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mt-7 rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-[0.18em] text-white/64 transition hover:bg-white/8"
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
