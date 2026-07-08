"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import Close from "~/components/icons/close";

import styles from "./modal.module.scss";
import type {
  ModalBodyProps,
  ModalContextType,
  ModalHeaderProps,
  ModalProps,
} from "./types";

export type { ModalBodyProps, ModalHeaderProps, ModalProps } from "./types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ModalComponent({
  children,
  onClose,
  closing: externalClosing,
  ariaLabel,
}: ModalProps) {
  const [internalClosing, setInternalClosing] = useState(false);
  const closing = externalClosing ?? internalClosing;
  const ref = useRef<HTMLDivElement>(null);

  const startClose = useCallback(() => {
    if (closing) return;
    setInternalClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [closing, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closing) {
        startClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [startClose, closing]);

  useEffect(() => {
    return () => {
      setInternalClosing(false);
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute("disabled"),
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  const content = useMemo(
    () => (
      <ModalContext.Provider
        value={{
          onClose,
          closing,
          setClosing: setInternalClosing,
          startClose,
        }}
      >
        <div className={`${styles.overlay} ${closing ? styles.closing : ""}`}>
          <button onClick={startClose} className={styles.closeBtn}>
            <Close />
          </button>
          <div
            ref={ref}
            className={`${styles.modalContent} ${closing ? styles.closingContent : ""}`}
            role="dialog"
            aria-modal
            aria-label={ariaLabel}
          >
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    ),
    [children, closing, onClose, startClose, ariaLabel],
  );

  if (typeof document === "undefined") return null;

  return createPortal(content, document.body);
}

function ModalHeader({ children }: ModalHeaderProps) {
  return <div className={styles.modalHeader}>{children}</div>;
}

function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles.modalBody}>{children}</div>;
}

const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
}) as typeof ModalComponent & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
};

export { ModalBody, ModalHeader };
export default Modal;
