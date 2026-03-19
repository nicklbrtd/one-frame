"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { copy } from "@/data/copy";

const poeticKeywords = ["свет", "кадр", "пленка", "память", "движение"];
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [allowHeroMotion, setAllowHeroMotion] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 42, damping: 22, mass: 0.9 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 42, damping: 22, mass: 0.9 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const collageX = useTransform(smoothPointerX, [-1, 1], [-8, 8]);
  const collageY = useTransform(smoothPointerY, [-1, 1], [-6, 6]);

  const filmMouseX = useTransform(smoothPointerX, [-1, 1], [-10, 10]);
  const filmMouseY = useTransform(smoothPointerY, [-1, 1], [-7, 7]);
  const filmScrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const filmScrollRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filmX = useTransform(() => filmMouseX.get());
  const filmY = useTransform(() => filmMouseY.get() + filmScrollY.get());
  const filmRotate = useTransform(
    () => -7 + filmScrollRotate.get() + smoothPointerX.get() * 1.8 + smoothPointerY.get() * -1.1,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setAllowHeroMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !allowHeroMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nx = clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      const ny = clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
      pointerX.set(nx);
      pointerY.set(ny);
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [allowHeroMotion, pointerX, pointerY, shouldReduceMotion]);

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[96vh] items-center overflow-hidden pt-28 pb-16 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[-11%] top-[4%] h-[24rem] w-[24rem] rounded-full bg-[#bf3449]/30 blur-[116px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  x: [0, 16, 0],
                  y: [0, -18, 0],
                }
          }
          transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] top-[10%] h-[26rem] w-[26rem] rounded-full bg-[#355fa8]/28 blur-[128px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  x: [0, -14, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[34%] top-[10%] h-[17rem] w-[17rem] rounded-full bg-[#e6b078]/10 blur-[110px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  scale: [1, 1.07, 1],
                  opacity: [0.24, 0.42, 0.24],
                }
          }
          transition={{ duration: 10.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid items-end gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8 xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl"
          >
            <p className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/68">
              <span className="h-px w-10 bg-gradient-to-r from-[#d44358] to-transparent" />
              {copy.hero.kicker}
            </p>

            <h1 className="mt-6 font-display text-[4.8rem] leading-[0.84] tracking-[0.04em] text-[#f2f6ff] [text-shadow:0_12px_34px_rgba(0,0,0,0.56)] sm:text-[6.6rem] lg:text-[8.6rem]">
              {copy.hero.title}
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/78 sm:text-[1.28rem]">
              {copy.hero.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-white/56">
              {poeticKeywords.map((item, index) => (
                <li key={item} className="inline-flex items-center gap-2">
                  {index > 0 ? <span className="h-[3px] w-[3px] rounded-full bg-white/34" /> : null}
                  {item}
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 flex items-center gap-4"
            >
              <motion.div
                className="h-px w-16 bg-gradient-to-r from-[#d13d50] to-white/22"
                animate={
                  shouldReduceMotion || !allowHeroMotion ? undefined : { opacity: [0.45, 0.95, 0.45] }
                }
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-xs uppercase tracking-[0.3em] text-white/52">Прокрутите вниз</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.92, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
            style={shouldReduceMotion ? undefined : { x: collageX, y: collageY }}
          >
            <div className="relative h-[27rem] overflow-visible sm:h-[31rem]">
              <article className="absolute inset-0 overflow-hidden rounded-[30px] bg-[linear-gradient(160deg,rgba(13,16,26,0.9),rgba(9,11,20,0.74))] shadow-[0_32px_110px_rgba(0,0,0,0.56)]">
                <Image
                  src="/members/maksim.png"
                  alt="Портрет участника"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="object-cover object-[50%_12%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(206,62,84,0.2),transparent_38%,rgba(56,96,175,0.22)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_24%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.6)_100%)]" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/62">Visual Storytelling Group</p>
                  <p className="mt-2 max-w-xs font-display text-3xl leading-[0.94] tracking-[0.02em] text-white sm:text-[2.2rem]">
                    кадры, в которых живет характер
                  </p>
                </div>
              </article>

              <article className="absolute -left-4 bottom-[14%] h-[9.8rem] w-[11.4rem] overflow-hidden rounded-2xl bg-black/50 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:w-[12.4rem]">
                <Image
                  src="/members/anya.png"
                  alt="Фрагмент серии"
                  fill
                  sizes="220px"
                  className="object-cover object-[50%_12%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(229,184,119,0.24),rgba(64,102,174,0.2))]" />
                <p className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.18em] text-white/72">contact sheet</p>
              </article>

              <article className="absolute right-0 top-[6%] flex h-[8.4rem] w-[12.2rem] flex-col justify-between rounded-2xl bg-[linear-gradient(145deg,rgba(13,16,26,0.84),rgba(11,13,22,0.52))] p-3 shadow-[0_16px_36px_rgba(0,0,0,0.42)] sm:w-[13.4rem]">
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/52">scene 04</p>
                <p className="font-display text-2xl leading-none text-white/88">light study</p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/48">REC 00:03:12:08</p>
              </article>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-[-4%] hidden md:block"
                style={
                  shouldReduceMotion ? undefined : { x: filmX, y: filmY, rotate: filmRotate }
                }
              >
                <motion.div
                  animate={
                    shouldReduceMotion || !allowHeroMotion
                      ? undefined
                      : {
                          y: [0, -3, 0],
                          rotate: [0, 0.8, 0],
                        }
                  }
                  transition={{ duration: 10.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[96px] w-[236px] overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,rgba(12,15,26,0.92),rgba(8,11,20,0.78))] shadow-[0_22px_52px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-x-0 top-0 z-10 h-[16px] bg-black/34" />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-[16px] bg-black/34" />

                  <div className="absolute inset-x-[14px] top-[4px] z-20 flex items-center justify-between">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={`top-hole-${index}`}
                        className="h-[5px] w-[9px] rounded-[2px] bg-[#05070d]/88"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-x-[14px] bottom-[4px] z-20 flex items-center justify-between">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={`bottom-hole-${index}`}
                        className="h-[5px] w-[9px] rounded-[2px] bg-[#05070d]/88"
                      />
                    ))}
                  </div>

                  <div className="absolute inset-x-[14px] inset-y-[18px] grid grid-cols-3 gap-1.5">
                    <div className="relative overflow-hidden rounded-md">
                      <Image
                        src="/members/varya.png"
                        alt="Пленочный кадр"
                        fill
                        sizes="110px"
                        className="object-cover object-[50%_16%] grayscale-[12%]"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-md">
                      <Image
                        src="/members/nikita.png"
                        alt="Пленочный кадр"
                        fill
                        sizes="110px"
                        className="object-cover object-[50%_12%] grayscale-[30%]"
                      />
                    </div>
                    <div className="flex items-end rounded-md bg-white/[0.06] p-1.5">
                      <p className="text-[7px] uppercase tracking-[0.16em] text-white/56">frame 27</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
