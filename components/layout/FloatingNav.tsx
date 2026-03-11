"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

type NavLink = {
  id: string;
  label: string;
};

type FloatingNavProps = {
  links: NavLink[];
};

export function FloatingNav({ links }: FloatingNavProps) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "");

  useEffect(() => {
    const sectionEls = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sectionEls.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <div className="rounded-full border border-white/50 bg-white/55 p-1 shadow-[0_14px_50px_rgba(22,24,28,0.16)] backdrop-blur-xl">
        <ul className="flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = activeId === link.id;

            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors sm:px-5",
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_8px_30px_rgba(28,35,44,0.14)]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
