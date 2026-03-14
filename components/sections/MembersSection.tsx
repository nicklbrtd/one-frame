"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { copy } from "@/data/copy";
import { Member, members } from "@/data/members";

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

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(12,18,28,0.92),rgba(9,13,20,0.76))] text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-transform hover:-translate-y-1 ${
        isDesktop ? "h-[348px] p-5" : "h-[260px] p-4 sm:h-[272px] sm:p-5"
      }`}
    >
      <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/6" />
      <div className="relative z-10">
      {isDesktop ? (
        <>
          <div className="mx-auto h-32 w-32 overflow-hidden rounded-xl border border-white/10 bg-white/8">
            {hasPhoto ? (
              <Image
                src={member.photo ?? ""}
                alt={member.name}
                width={128}
                height={128}
                className="h-full w-full object-cover object-[50%_14%]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-3xl text-white/70">
                {initialsFromName(member.name)}
              </div>
            )}
          </div>
          <div className="mt-5">
            <h3 className="font-display text-2xl text-white">{member.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/64">{member.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/8 text-white/78 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
            {hasPhoto ? (
              <Image
                src={member.photo ?? ""}
                alt={member.name}
                width={48}
                height={48}
                className="h-full w-full object-cover object-[50%_14%]"
              />
            ) : (
              <span className="font-display text-lg">{initialsFromName(member.name)}</span>
            )}
          </div>
          <h3 className="font-display text-2xl text-white">{member.name}</h3>
          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/64">{member.description}</p>
        </>
      )}

      {member.isFormer ? (
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-rose-200/80">Уже не с нами</p>
      ) : null}
      </div>
    </button>
  );
}

export function MembersSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const topRow = members.filter((_, index) => index % 2 === 0);
  const bottomRow = members.filter((_, index) => index % 2 !== 0);
  const repeatedTopRow = [...topRow, ...topRow];
  const repeatedBottomRow = [...bottomRow, ...bottomRow];

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <SectionShell id="members" eyebrow="Люди">
      <Reveal>
        <SectionHeading title={copy.members.title} subtitle={copy.members.text} />
      </Reveal>

      <div className="relative mt-12 hidden overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(11,17,26,0.9),rgba(8,12,18,0.76))] py-8 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#06090f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#06090f] to-transparent" />

        <div className="marquee-left flex min-w-max items-stretch gap-5 px-5">
          {repeatedTopRow.map((member, index) => (
            <div key={`desktop-top-${member.id}-${index}`} className="w-[290px] shrink-0">
              <MemberCard member={member} mode="desktop" onClick={() => setSelectedId(member.id)} />
            </div>
          ))}
        </div>

        <div className="marquee-right mt-5 flex min-w-max items-stretch gap-5 px-5">
          {repeatedBottomRow.map((member, index) => (
            <div key={`desktop-bottom-${member.id}-${index}`} className="w-[290px] shrink-0">
              <MemberCard member={member} mode="desktop" onClick={() => setSelectedId(member.id)} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
        {members.map((member) => (
          <div key={member.id}>
            <MemberCard member={member} mode="mobile" onClick={() => setSelectedId(member.id)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMember ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/58 px-5 backdrop-blur-md"
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
