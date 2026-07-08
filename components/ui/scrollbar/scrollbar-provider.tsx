"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import SmoothScrollbar from "smooth-scrollbar";
import type { Scrollbar } from "smooth-scrollbar/scrollbar";

const MOBILE_BREAKPOINT = 768;

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

interface ScrollbarProviderProps {
  children: ReactNode;
}

export function ScrollbarProvider({ children }: ScrollbarProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(getIsMobile());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    if (!scrollbarRef.current) {
      scrollbarRef.current = SmoothScrollbar.init(containerRef.current, {
        damping: 0.03,
      });
    }

    return () => {
      scrollbarRef.current?.destroy();
      scrollbarRef.current = null;
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
      return;
    }

    if (!scrollbarRef.current) return;

    requestAnimationFrame(() => {
      scrollbarRef.current?.update();
      scrollbarRef.current?.scrollTo(0, 0, 0);
    });
  }, [pathname, isMobile]);

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      style={isMobile ? undefined : { height: "100vh", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}
