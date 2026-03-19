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
};

export function FloatingNav({ links }: FloatingNavProps) {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const currentHash = window.location.hash.slice(1);
    const found = links.findIndex((link) => link.id === currentHash);
    return found >= 0 ? found : 0;
  });
  const [isCompact, setIsCompact] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const manualLockRef = useRef(false);
  const manualLockTimerRef = useRef<number | null>(null);

  const ids = useMemo(() => links.map((link) => link.id), [links]);

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

    setActiveIndex(index);
    scrollToSection(target);
    window.history.replaceState(null, "", `#${links[index].id}`);
  };

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
    let rafId = 0;
    let previousY = window.scrollY;
    let ticking = false;

    const updateState = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (Math.abs(delta) > 6) {
        if (delta > 0 && currentY > 72) {
          setIsCompact(true);
        } else if (delta < 0) {
          setIsCompact(false);
        }
      }

      if (currentY < 20) {
        setIsCompact(false);
      }

      previousY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(updateState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className={cn(styles.container, isCompact && styles.containerCompact)} ref={containerRef}>
      <div className={cn(styles.navWrap, isCompact && styles.navWrapCompact)}>
        <nav className={styles.nav} aria-label="Основные разделы">
          <ul className={cn(styles.list, isCompact && styles.listCompact)}>
            {links.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <li key={item.id} className={cn(styles.item, isActive && styles.itemActive)}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, index)}
                    className={cn(styles.link, isCompact && styles.linkCompact)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
