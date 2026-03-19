"use client";

import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/cn";

import styles from "./EasterNotesLayer.module.css";

type NoteTone = "blue" | "red" | "paper";

type Note = {
  id: string;
  text: string;
  top: number;
  left: number;
  widthRem: number;
  baseRotate: number;
  depth: number;
  phase: number;
  tone: NoteTone;
};

const notes: Note[] = [
  {
    id: "n-1",
    text: "Говорят да поговаривают, что в этой группе есть староста, который не ходит на пары",
    top: 12,
    left: 56,
    widthRem: 30,
    baseRotate: -2.5,
    depth: 1.18,
    phase: 0.4,
    tone: "blue",
  },
  {
    id: "n-2",
    text: "А что если отчислиться и уехать далеко далеко далеко далеко далеко далеко",
    top: 28,
    left: 8,
    widthRem: 27,
    baseRotate: 2.1,
    depth: 0.92,
    phase: 1.2,
    tone: "red",
  },
  {
    id: "n-3",
    text: "Лестница - место, где всегда происходили странные вещи..",
    top: 41,
    left: 63,
    widthRem: 24,
    baseRotate: -3.2,
    depth: 1.1,
    phase: 2.5,
    tone: "paper",
  },
  {
    id: "n-4",
    text: "Не ходите на лестницу!!!",
    top: 56,
    left: 12,
    widthRem: 21,
    baseRotate: 2.6,
    depth: 0.98,
    phase: 3.7,
    tone: "blue",
  },
  {
    id: "n-5",
    text: "Куплю телевик. Продайте пж(",
    top: 73,
    left: 62,
    widthRem: 19,
    baseRotate: -2.4,
    depth: 1.22,
    phase: 4.6,
    tone: "red",
  },
  {
    id: "n-6",
    text: "Кто-то не спал всю ночь, чтобы сделать это задание.",
    top: 87,
    left: 15,
    widthRem: 26,
    baseRotate: 1.8,
    depth: 0.9,
    phase: 5.4,
    tone: "paper",
  },
];

const spring = { stiffness: 84, damping: 22, mass: 0.88 };

function ParallaxNote({ note, scrollY, shouldReduceMotion }: { note: Note; scrollY: MotionValue<number>; shouldReduceMotion: boolean }) {
  const yRaw = useTransform(scrollY, (v) => -v * (0.014 + note.depth * 0.009));
  const xRaw = useTransform(scrollY, (v) => Math.sin(v * 0.001 + note.phase) * (4 + note.depth * 4));
  const rotateRaw = useTransform(scrollY, (v) => note.baseRotate + Math.sin(v * 0.0008 + note.phase) * (1.4 + note.depth * 0.9));
  const blurRaw = useTransform(scrollY, (v) => Math.abs(Math.sin(v * 0.0007 + note.phase)) * 0.5);

  const y = useSpring(yRaw, spring);
  const x = useSpring(xRaw, spring);
  const rotate = useSpring(rotateRaw, spring);
  const blur = useSpring(blurRaw, spring);
  const blurFilter = useTransform(blur, (value) => `blur(${value.toFixed(2)}px)`);

  return (
    <motion.article
      className={styles.note}
      style={{
        top: `${note.top}%`,
        left: `${note.left}%`,
        width: `min(${note.widthRem}rem, 78vw)`,
        zIndex: Math.round(note.depth * 10),
        x: shouldReduceMotion ? undefined : x,
        y: shouldReduceMotion ? undefined : y,
        rotate: shouldReduceMotion ? `${note.baseRotate}deg` : rotate,
        filter: shouldReduceMotion ? undefined : blurFilter,
      }}
    >
      <div className={cn(styles.card, styles[note.tone], !shouldReduceMotion && styles.cardFloat)}>
        <p className={styles.label}>пасхалка</p>
        <p className={styles.text}>{note.text}</p>
      </div>
    </motion.article>
  );
}

export function EasterNotesLayer() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);
  const { scrollY } = useScroll();

  return (
    <div aria-hidden className={styles.container}>
      {notes.map((note) => (
        <ParallaxNote key={note.id} note={note} scrollY={scrollY} shouldReduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
