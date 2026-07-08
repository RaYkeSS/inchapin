"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/lib/utils";

import styles from "./dropdown.module.scss";

type RenderTrigger = (state: {
  open: boolean;
  toggle: () => void;
}) => ReactNode;

const menuVariants = cva(styles.menu, {
  variants: {
    align: {
      start: styles.alignStart,
      end: styles.alignEnd,
    },
  },
  defaultVariants: {
    align: "start",
  },
});

type DropdownProps = {
  trigger: RenderTrigger;
  children: ReactNode;
  className?: string;
  menuClassName?: string;
} & VariantProps<typeof menuVariants>;

const Dropdown = ({
  trigger,
  children,
  className,
  menuClassName,
  align,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !e.composedPath().includes(ref.current)) close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div ref={ref} className={cn(styles.dropdown, className)}>
      {trigger({ open, toggle })}
      {open && (
        <div
          role="menu"
          onClick={close}
          className={cn(menuVariants({ align }), menuClassName)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
