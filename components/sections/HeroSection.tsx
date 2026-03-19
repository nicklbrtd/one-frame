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
  const smoothPointerX = useSpring(pointerX, { stiffness: 46, damping: 20, mass: 0.9 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 46, damping: 20, mass: 0.9 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const filmMouseX = useTransform(smoothPointerX, [-1, 1], [-12, 12]);
  const filmMouseY = useTransform(smoothPointerY, [-1, 1], [-8, 8]);
  const filmScrollY = useTransform(scrollYProgress, [0, 1], [0, 128]);
  const filmScrollRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const filmX = useTransform(() => filmMouseX.get());
  const filmY = useTransform(() => filmMouseY.get() + filmScrollY.get());
  const filmRotate = useTransform(
    () => 7 + filmScrollRotate.get() + smoothPointerX.get() * 2.1 + smoothPointerY.get() * -1.3,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
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
    <section ref={heroRef} id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-20">
        <motion.div
          className="absolute -left-20 top-0 h-[24rem] w-[24rem] rounded-full bg-[#c53d54]/34 blur-[124px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, -20, 0],
                  x: [0, 18, 0],
                }
          }
          transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-7%] top-[14%] h-[26rem] w-[26rem] rounded-full bg-[#3469b8]/30 blur-[136px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, 24, 0],
                  x: [0, -20, 0],
                }
          }
          transition={{ duration: 15.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-18%] left-[24%] h-[22rem] w-[22rem] rounded-full bg-[#7a1629]/32 blur-[144px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[18%] top-[20%] h-[18rem] w-[18rem] rounded-full bg-[#f0ad6d]/10 blur-[118px]"
          animate={
            shouldReduceMotion || !allowHeroMotion
              ? undefined
              : {
                  opacity: [0.28, 0.45, 0.28],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto w-[min(1140px,92vw)]">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-white/14 bg-[linear-gradient(158deg,rgba(10,13,23,0.92),rgba(8,11,20,0.82))] shadow-[0_38px_130px_rgba(0,0,0,0.62)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(205,62,84,0.2),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(56,101,180,0.2),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,211,167,0.04)_0%,transparent_48%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.34)_85%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0.7px,transparent_0.9px)] [background-size:7px_7px]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[35px] border border-white/[0.09]" />

          <div className="pointer-events-none absolute left-5 top-5 hidden h-[74%] w-9 rounded-full border border-white/12 bg-black/22 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={`film-left-${index}`} className="h-2.5 w-2.5 rounded-[3px] bg-[#05070d]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
            ))}
          </div>
          <div className="pointer-events-none absolute right-5 bottom-5 hidden h-[74%] w-9 rounded-full border border-white/12 bg-black/22 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={`film-right-${index}`} className="h-2.5 w-2.5 rounded-[3px] bg-[#05070d]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
            ))}
          </div>

          <div className="pointer-events-none absolute left-10 top-10 h-6 w-6 border-l border-t border-white/30" />
          <div className="pointer-events-none absolute right-10 top-10 h-6 w-6 border-r border-t border-white/30" />
          <div className="pointer-events-none absolute bottom-10 left-10 h-6 w-6 border-b border-l border-white/30" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-6 w-6 border-b border-r border-white/30" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[11%] top-[19%] z-[6] hidden lg:block"
            style={shouldReduceMotion ? undefined : { x: filmX, y: filmY, rotate: filmRotate }}
          >
            <motion.div
              animate={
                shouldReduceMotion || !allowHeroMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                      rotate: [0, 0.7, 0],
                    }
              }
              transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[112px] w-[254px] overflow-hidden rounded-[17px] border border-white/18 bg-[linear-gradient(160deg,rgba(13,16,27,0.9),rgba(9,12,20,0.78))] shadow-[0_26px_64px_rgba(0,0,0,0.5)] backdrop-blur-lg"
            >
              <div className="absolute inset-x-0 top-0 z-10 h-[18px] border-b border-white/12 bg-black/34" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-[18px] border-t border-white/12 bg-black/34" />
              <div className="absolute inset-x-[14px] top-[4px] z-20 flex items-center justify-between">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span
                    key={`film-top-hole-${index}`}
                    className="h-[5px] w-[9px] rounded-[2px] bg-[#05070d]/88 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  />
                ))}
              </div>
              <div className="absolute inset-x-[14px] bottom-[4px] z-20 flex items-center justify-between">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span
                    key={`film-bottom-hole-${index}`}
                    className="h-[5px] w-[9px] rounded-[2px] bg-[#05070d]/88 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  />
                ))}
              </div>

              <div className="absolute inset-x-[16px] inset-y-[22px] grid grid-cols-3 gap-1.5">
                <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/24">
                  <Image
                    src="/members/nikita.png"
                    alt="Фрагмент пленки"
                    fill
                    sizes="160px"
                    className="object-cover object-top grayscale-[14%]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(69,108,183,0.18),rgba(175,54,76,0.16))]" />
                </div>
                <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/26">
                  <Image
                    src="/members/varya.png"
                    alt="Фрагмент пленки"
                    fill
                    sizes="160px"
                    className="object-cover object-top grayscale-[32%]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,215,164,0.14),rgba(66,101,170,0.18))]" />
                </div>
                <div className="flex flex-col justify-between rounded-md border border-white/10 bg-white/[0.04] p-1.5">
                  <p className="text-[7px] uppercase tracking-[0.16em] text-white/50">frame 27</p>
                  <p className="font-display text-sm leading-none text-white/84">memory</p>
                  <p className="text-[7px] uppercase tracking-[0.15em] text-white/45">24 fps</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36)_88%)]" />
            </motion.div>
          </motion.div>

          <div className="relative z-10 grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:items-end lg:p-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.64, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex rounded-full border border-[#f0a8b6]/32 bg-[#751a2c]/30 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#ffe8ef]"
              >
                {copy.hero.kicker}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-balance text-[4.9rem] leading-[0.82] tracking-[0.03em] text-transparent [text-shadow:0_8px_32px_rgba(0,0,0,0.55)] [background:linear-gradient(180deg,#f8fbff_0%,#d8e4f7_72%,#afc2e4_100%)] [background-clip:text] sm:text-[7rem] lg:text-[8.6rem]"
              >
                {copy.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.86, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-white/76 sm:text-xl"
              >
                {copy.hero.subtitle}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.76, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                {poeticKeywords.map((item, index) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/58"
                  >
                    {index > 0 ? <span className="h-[3px] w-[3px] rounded-full bg-white/38" /> : null}
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.76, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/62"
              >
                <span className="h-2 w-2 rounded-full bg-[#ff6072] shadow-[0_0_10px_rgba(255,96,114,0.8)]" />
                Rec
                <span className="text-white/44">00:02:26:03</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.86, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[390px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-white/14 bg-[linear-gradient(165deg,rgba(13,17,28,0.9),rgba(8,11,18,0.84))] p-3 shadow-[0_22px_64px_rgba(0,0,0,0.46)]">
                <div className="absolute inset-3 rounded-[22px] border border-white/18" />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/24"
                  animate={shouldReduceMotion || !allowHeroMotion ? undefined : { rotate: [0, 360] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/16"
                  animate={
                    shouldReduceMotion || !allowHeroMotion
                      ? undefined
                      : {
                          scale: [1, 1.04, 1],
                          opacity: [0.5, 0.9, 0.5],
                        }
                  }
                  transition={{ duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#f2d4bf]/46 bg-[#f2d4bf]/12"
                  animate={shouldReduceMotion || !allowHeroMotion ? undefined : { x: [0, 6, -4, 0], y: [0, -5, 3, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/56">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6072]" />
                    Rec
                  </span>
                  <span>24 fps</span>
                </div>

                <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2">
                  <div className="relative h-24 overflow-hidden rounded-lg border border-white/14 bg-black/30">
                    <Image
                      src="/members/nikita.png"
                      alt="Кадр участника"
                      fill
                      sizes="(max-width: 1024px) 35vw, 180px"
                      className="object-cover object-top opacity-80"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36))]" />
                  </div>
                  <div className="flex h-24 flex-col justify-between rounded-lg border border-white/14 bg-white/[0.04] p-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/54">Scene 03</p>
                    <p className="font-display text-lg leading-none text-white/86">light study</p>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/46">memory frame</p>
                  </div>
                  <div className="flex h-20 items-end rounded-lg border border-white/14 bg-[linear-gradient(140deg,rgba(255,226,177,0.1),rgba(93,129,201,0.14))] p-2">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/56">contact sheet</p>
                  </div>
                  <div className="relative h-20 overflow-hidden rounded-lg border border-white/14 bg-black/26">
                    <Image
                      src="/members/varya.png"
                      alt="Кадр участника"
                      fill
                      sizes="(max-width: 1024px) 35vw, 180px"
                      className="object-cover object-top opacity-70 grayscale-[25%]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(50,94,170,0.26),rgba(181,55,78,0.2))]" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24)_74%,rgba(0,0,0,0.52)_100%)]" />
              </div>
            </motion.div>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 flex items-center gap-4"
        >
          <motion.div
            className="h-px w-16 bg-gradient-to-r from-[#d13d50] to-white/20"
            animate={shouldReduceMotion || !allowHeroMotion ? undefined : { opacity: [0.45, 0.95, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-xs uppercase tracking-[0.3em] text-white/52">Прокрутите вниз</p>
        </motion.div>
      </div>
    </section>
  );
}
