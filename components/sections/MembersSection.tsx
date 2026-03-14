"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { copy } from "@/data/copy";
import { members } from "@/data/members";

export function MembersSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const topRow = members;
  const bottomRow = [...members].reverse();
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
              <SpotlightCard tint={member.color} onClick={() => setSelectedId(member.id)}>
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 font-display text-lg text-white/78 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                  {member.name.slice(0, 1)}
                </div>
                <h3 className="font-display text-3xl text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/64">{member.phrase}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/52"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="marquee-right mt-5 flex min-w-max items-stretch gap-5 px-5">
          {repeatedBottomRow.map((member, index) => (
            <div key={`desktop-bottom-${member.id}-${index}`} className="w-[290px] shrink-0">
              <SpotlightCard tint={member.color} onClick={() => setSelectedId(member.id)}>
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 font-display text-lg text-white/78 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                  {member.name.slice(0, 1)}
                </div>
                <h3 className="font-display text-3xl text-white">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/64">{member.phrase}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {member.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/52"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
        {members.map((member) => (
          <div key={member.id}>
            <SpotlightCard tint={member.color} onClick={() => setSelectedId(member.id)}>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 font-display text-lg text-white/78 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                {member.name.slice(0, 1)}
              </div>
              <h3 className="font-display text-3xl text-white">{member.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/64">{member.phrase}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {member.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/52"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </SpotlightCard>
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
              <h3 className="mt-3 font-display text-5xl text-white">{selectedMember.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/64">{selectedMember.phrase}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selectedMember.keywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="rounded-xl border border-white/8 bg-white/6 px-4 py-3 text-sm uppercase tracking-[0.14em] text-white/54"
                  >
                    {keyword}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#7ad5cf]/15 bg-[#7ad5cf]/8 px-4 py-3 text-sm text-white/62">
                Настроение: <span className="font-medium text-white">{selectedMember.mood}</span>
              </div>

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
