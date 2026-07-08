"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeaderSelect } from "~/components/layout/header/header-select";
import Modal from "~/components/ui/modal";

import { UI } from "~/data/ui";

import styles from "./burger-menu.module.scss";

export function BurgerMenu({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname && open) {
      handleClose();
    }
    prevPathname.current = pathname;
  }, [pathname, open, handleClose]);

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <button
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className={styles.burgerMenu}
        onClick={handleToggle}
      >
        <div className={`${styles.burgerIcon} ${open ? styles.open : ""}`}>
          <div />
          <div />
          <div />
        </div>
        <div className={styles.burgerText}>{children}</div>
      </button>

      {open && (
        <Modal onClose={handleClose} closing={closing}>
          <Modal.Header>{UI.menu.title}</Modal.Header>
          <Modal.Body>
            <nav className={styles.menuNav}>
              <ul>
                {UI.menu.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={pathname === item.href ? styles.active : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <HeaderSelect className={styles.menuSelect} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
