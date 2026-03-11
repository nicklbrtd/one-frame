"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerGroup";
import { copy } from "@/data/copy";
import { members } from "@/data/members";

export function MembersSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedMember = useMemo(
    () => members.find((member) => member.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <SectionShell id="members" eyebrow="People">
      <Reveal>
        <SectionHeading title={copy.members.title} subtitle={copy.members.text} />
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.09}>
        {members.map((member) => (
          <StaggerItem key={member.id}>
            <SpotlightCard tint={member.color} onClick={() => setSelectedId(member.id)}>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/75 font-display text-lg text-slate-700 shadow-[0_8px_20px_rgba(18,22,27,0.11)]">
                {member.name.slice(0, 1)}
              </div>
              <h3 className="font-display text-3xl text-slate-900">{member.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.phrase}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {member.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-500"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {selectedMember ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/35 px-5 backdrop-blur-sm"
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
              className="w-full max-w-xl rounded-[30px] border border-white/70 bg-white/87 p-8 shadow-[0_28px_90px_rgba(15,20,27,0.26)]"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Member chapter</p>
              <h3 className="mt-3 font-display text-5xl text-slate-900">{selectedMember.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{selectedMember.phrase}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selectedMember.keywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="rounded-xl border border-slate-200/90 bg-white/75 px-4 py-3 text-sm uppercase tracking-[0.14em] text-slate-500"
                  >
                    {keyword}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-slate-200/80 bg-[#eef3f5] px-4 py-3 text-sm text-slate-600">
                Mood: <span className="font-medium text-slate-800">{selectedMember.mood}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="mt-7 rounded-full border border-slate-300/80 px-5 py-2 text-xs uppercase tracking-[0.18em] text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}
