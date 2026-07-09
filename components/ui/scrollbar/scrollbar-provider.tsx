"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import SmoothScrollbar from "smooth-scrollbar";
import type { Scrollbar } from "smooth-scrollbar/scrollbar";

const MOBILE_BREAKPOINT = 768;

function shouldUseNativeScroll(): boolean {
  if (typeof window === "undefined") return true;
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return isMobile || prefersReducedMotion;
}

interface ScrollbarProviderProps {
  children: ReactNode;
}

export function ScrollbarProvider({ children }: ScrollbarProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  const pathname = usePathname();
  const [nativeScroll, setNativeScroll] = useState(true);

  useEffect(() => {
    const check = () => setNativeScroll(shouldUseNativeScroll());
    check();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", check);
    motion.addEventListener("change", check);
    return () => {
      window.removeEventListener("resize", check);
      motion.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    if (nativeScroll || !containerRef.current) return;

    if (!scrollbarRef.current) {
      scrollbarRef.current = SmoothScrollbar.init(containerRef.current, {
        damping: 0.03,
      });
    }

    return () => {
      scrollbarRef.current?.destroy();
      scrollbarRef.current = null;
    };
  }, [nativeScroll]);

  useEffect(() => {
    if (nativeScroll) {
      window.scrollTo(0, 0);
      return;
    }

    if (!scrollbarRef.current) return;

    requestAnimationFrame(() => {
      scrollbarRef.current?.update();
      scrollbarRef.current?.scrollTo(0, 0, 0);
    });
  }, [pathname, nativeScroll]);

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      style={nativeScroll ? undefined : { height: "100vh", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
