"use client";

import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

import styles from "./FloatingNav.module.css";

type NavLink = {
  id: string;
  label: string;
};

type FloatingNavProps = {
  links: NavLink[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleRadius?: number;
  timeVariance?: number;
  colors?: number[];
};

type Particle = {
  start: [number, number];
  end: [number, number];
  time: number;
  scale: number;
  color: string;
  rotate: number;
};

const noise = (n = 1) => n / 2 - Math.random() * n;

const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
};

const createParticleData = ({
  index,
  particleCount,
  particleDistances,
  particleRadius,
  animationTime,
  timeVariance,
  colors,
}: {
  index: number;
  particleCount: number;
  particleDistances: [number, number];
  particleRadius: number;
  animationTime: number;
  timeVariance: number;
  colors: number[];
}): Particle => {
  const rotate = noise(particleRadius / 10);
  const time = animationTime * 2 + noise(timeVariance * 2);

  return {
    start: getXY(particleDistances[0], particleCount - index, particleCount),
    end: getXY(particleDistances[1] + noise(7), particleCount - index, particleCount),
    time,
    scale: 1 + noise(0.2),
    color: `var(--color-${colors[Math.floor(Math.random() * colors.length)]}, white)`,
    rotate: rotate > 0 ? (rotate + particleRadius / 20) * 10 : (rotate - particleRadius / 20) * 10,
  };
};

export function FloatingNav({
  links,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleRadius = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: FloatingNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const currentHash = window.location.hash.slice(1);
    const found = links.findIndex((link) => link.id === currentHash);
    return found >= 0 ? found : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const manualLockRef = useRef(false);
  const manualLockTimerRef = useRef<number | null>(null);

  const ids = useMemo(() => links.map((link) => link.id), [links]);

  const clearParticles = () => {
    const el = filterRef.current;
    if (!el) {
      return;
    }

    const particles = el.querySelectorAll(`.${styles.particle}`);
    particles.forEach((particleEl) => {
      particleEl.remove();
    });
  };

  const createParticles = () => {
    const effectEl = filterRef.current;
    if (!effectEl || shouldReduceMotion || isMobile) {
      return;
    }

    const bubbleTime = animationTime * 2 + timeVariance;
    effectEl.style.setProperty("--time", `${bubbleTime}ms`);

    clearParticles();
    effectEl.classList.remove(styles.activeEffect);

    for (let i = 0; i < particleCount; i += 1) {
      const particleData = createParticleData({
        index: i,
        particleCount,
        particleDistances,
        particleRadius,
        animationTime,
        timeVariance,
        colors,
      });

      setTimeout(() => {
        if (!filterRef.current) {
          return;
        }

        const particleEl = document.createElement("span");
        const pointEl = document.createElement("span");

        particleEl.classList.add(styles.particle);
        pointEl.classList.add(styles.point);

        particleEl.style.setProperty("--start-x", `${particleData.start[0]}px`);
        particleEl.style.setProperty("--start-y", `${particleData.start[1]}px`);
        particleEl.style.setProperty("--end-x", `${particleData.end[0]}px`);
        particleEl.style.setProperty("--end-y", `${particleData.end[1]}px`);
        particleEl.style.setProperty("--time", `${particleData.time}ms`);
        particleEl.style.setProperty("--scale", `${particleData.scale}`);
        particleEl.style.setProperty("--color", particleData.color);
        particleEl.style.setProperty("--rotate", `${particleData.rotate}deg`);

        particleEl.appendChild(pointEl);
        filterRef.current.appendChild(particleEl);

        requestAnimationFrame(() => {
          filterRef.current?.classList.add(styles.activeEffect);
        });

        setTimeout(() => {
          try {
            particleEl.remove();
          } catch {
            // no-op
          }
        }, particleData.time);
      }, 30);
    }
  };

  const updateEffectPosition = (liEl: HTMLElement) => {
    if (!navWrapRef.current || !filterRef.current || !textRef.current) {
      return;
    }

    const containerRect = navWrapRef.current.getBoundingClientRect();
    const itemRect = liEl.getBoundingClientRect();
    const left = `${itemRect.left - containerRect.left}px`;
    const top = `${itemRect.top - containerRect.top}px`;
    const width = `${itemRect.width}px`;
    const height = `${itemRect.height}px`;

    Object.assign(filterRef.current.style, { left, top, width, height });
    Object.assign(textRef.current.style, { left, top, width, height });

    textRef.current.textContent = liEl.textContent ?? "";
  };

  const triggerTextEffect = () => {
    if (!textRef.current || isMobile) {
      return;
    }

    textRef.current.classList.remove(styles.textActive);
    void textRef.current.offsetWidth;
    textRef.current.classList.add(styles.textActive);
  };

  const scrollToSection = (target: HTMLElement) => {
    const navBottom = containerRef.current?.getBoundingClientRect().bottom ?? 0;
    const safetyGap = 20;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const nextTop = Math.max(0, targetTop - navBottom - safetyGap);

    window.scrollTo({
      top: nextTop,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const applyActiveIndex = (index: number, withParticles: boolean) => {
    if (index < 0 || index >= links.length) {
      return;
    }

    setActiveIndex(index);

    requestAnimationFrame(() => {
      const activeLi = navRef.current?.querySelectorAll("li")[index] as HTMLElement | undefined;
      if (!activeLi) {
        return;
      }

      updateEffectPosition(activeLi);
      triggerTextEffect();

      if (withParticles) {
        createParticles();
      }
    });
  };

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();

    const target = document.getElementById(links[index].id);
    if (!target) {
      return;
    }

    manualLockRef.current = true;
    if (manualLockTimerRef.current !== null) {
      window.clearTimeout(manualLockTimerRef.current);
    }
    manualLockTimerRef.current = window.setTimeout(() => {
      manualLockRef.current = false;
      manualLockTimerRef.current = null;
    }, shouldReduceMotion ? 260 : 1400);

    applyActiveIndex(index, true);
    scrollToSection(target);
    window.history.replaceState(null, "", `#${links[index].id}`);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const sectionEls = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sectionEls.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualLockRef.current) {
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]) {
          return;
        }

        const id = visible[0].target.id;
        const nextIndex = ids.findIndex((current) => current === id);

        if (nextIndex >= 0) {
          setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        }
      },
      {
        rootMargin: "-43% 0px -46% 0px",
        threshold: [0.2, 0.35, 0.55, 0.72],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (manualLockTimerRef.current !== null) {
        window.clearTimeout(manualLockTimerRef.current);
      }
    };
  }, [ids]);

  useEffect(() => {
    const activeLi = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
    if (!activeLi) {
      return;
    }

    updateEffectPosition(activeLi);
    textRef.current?.classList.add(styles.textActive);

    const resizeObserver = new ResizeObserver(() => {
      const li = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
      if (li) {
        updateEffectPosition(li);
      }
    });

    if (navWrapRef.current) {
      resizeObserver.observe(navWrapRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    const list = navRef.current;
    if (!list) {
      return;
    }

    const syncEffect = () => {
      const li = list.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
      if (li) {
        updateEffectPosition(li);
      }
    };

    list.addEventListener("scroll", syncEffect, { passive: true });
    return () => list.removeEventListener("scroll", syncEffect);
  }, [activeIndex]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.navWrap} ref={navWrapRef}>
        <nav className={styles.nav} aria-label="Основные разделы">
          <ul className={styles.list} ref={navRef}>
            {links.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <li key={item.id} className={cn(styles.item, isActive && styles.itemActive)}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, index)}
                    className={styles.link}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span className={cn(styles.effect, styles.filter)} ref={filterRef} aria-hidden />
        <span className={cn(styles.effect, styles.text)} ref={textRef} aria-hidden />
      </div>
    </div>
  );
}
